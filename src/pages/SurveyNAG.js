import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { useHistory } from "react-router-dom";
import Iframe from "react-iframe";
import { useAlert } from "react-alert";

var dateFormat = require("dateformat");
const SurveyNAG = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [selected, setSelected] = useState({
    darga: [],
    maneger: [],
    senior: [],
  });
  const alert = useAlert();
  let ar1 = [];
  let ar2 = [];
  let ar3 = [];
  useEffect(() => {
    async function test() {
      let jagsaaltsHEAD = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/electionAttandee/" + 2,
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaaltsHEAD?.data);
      console.log(jagsaaltsHEAD);
    }
    test();
    setTimeout(() => {
      onlyHeadCheckBox();
    }, 500);
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  function onlyHeadCheckBox() {
    var checkboxgroup = document
      .getElementById("HEAD")
      .getElementsByTagName("input");
    var limit = 1;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroup.length; i++) {
          checkedcount += checkboxgroup[i].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          console.log("You can select maximum of " + limit + " checkbox.");
          alert.show(limit + " -өөс дээш хүн сонгох боломжгүй.");
          //alert.show("өгөгдөл байхгүй байна");
          this.checked = false;
        }
      };
    }
  }
  function CheckBox() {
    var checkboxgroup = document
      .getElementById("HEAD")
      .getElementsByTagName("input");

    let c1, c2, c3;

    ar1 = [];
    for (var i = 0; i < checkboxgroup.length; i++) {
      var checkedcount = 0;
      for (var i = 0; i < checkboxgroup.length; i++) {
        checkedcount += checkboxgroup[i].checked ? 1 : 0;

        if (checkboxgroup[i].checked) ar1.push(checkboxgroup[i].value);
      }
      c1 = checkedcount;
    }

    //console.log(ar1, ar2, ar3, "Baaz");
    if (c1 == 0) alert.show("сонгоно уу.");
    // else if (c2 == 0) alert("Менежер сонгоно уу.");
    // else if (c3 == 0) alert("Ахлах аудитор сонгоно уу.");
    else return true;
  }
  var cols = [];
  for (let index = 0; index < jagsaalt?.length; index++) {
    {
      cols.push(
        <div class="column is-3">
          <div class="card is-clickable" style={{ height: 120 }}>
            <div class="card-content">
              <div class="media">
                {/* <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src=""
                      alt=""
                    />
                  </figure>
                </div> */}
                <div class="media-content">
                  <p style={{ fontSize: "18px" }}>
                    {jagsaalt[index].USER_NAME}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaalt[index].USER_POSITION}
                  </p>
                  <div style={{ position: "absolute", bottom: 20 }}>
                    <input
                      type="checkbox"
                      id={jagsaalt[index].ID}
                      value={jagsaalt[index].ID}
                      onChange={(value) => {
                        if (
                          document.getElementById(jagsaalt[index].ID).checked
                        ) {
                          let temp = selected;
                          selected.darga.push(jagsaalt[index]);
                          setSelected(temp);
                        } else {
                          let temp = selected;
                          temp.darga = selected.darga.filter(
                            (a, ind) => a.ID !== jagsaalt[index].ID
                          );
                          setSelected(temp);
                        }
                      }}
                    />
                    <label for={jagsaalt[index].ID} style={{ marginLeft: 5 }}>
                      сонгох
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function saveToDB() {
    console.log("end", selected);
    if (CheckBox()) {
      DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/electionCheck/2/" + userDetails.USER_ID,
        method: "GET",
        data: {},
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          console.log(response?.data?.CNT);
          if (response?.data?.CNT === 0) {
            DataRequest({
              url: "http://hr.audit.mn/hr/api/v1/electionAttandee/2/",
              method: "POST",
              data: {
                ELECTION_ID: 2,
                USER_ID: userDetails?.USER_ID,
                ELECTION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
                HEAD_C1:
                  selected.darga[0] === undefined ? null : selected.darga[0].ID,
                HEAD_C2: null,
                HEAD_C3: null,
                HEAD_C4: null,
                MAN_C1: 0,
                SENIOR_C1: 0,
                SENIOR_C2: null,
              },
            })
              .then(function (response) {
                console.log("UpdateResponse", response);
                if (response?.data?.message === "success") {
                  alert.show("амжилттай хадгаллаа");
                  props.loading(false);
                } else {
                  alert.show("Системийн алдаа");
                  props.loading(false);
                }
              })
              .catch(function (error) {
                // console.log(error.response);
                // alert.show("Системийн алдаа");
                // props.loading(false);
              });
          } else {
            alert.show("Санал илгээсэн байна.");
            props.loading(false);
          }
        })
        .catch(function (error) {
          // console.log(error.response);
          // alert.show("Системийн алдаа");
          // props.loading(false);
        });
    }
  }

  return (
    <div>
      <div style={{ marginLeft: "2%", height: "95vh" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              marginTop: "80px",
              marginLeft: "80px",
              width: "94.7%",
            }}
          >
            <div
              class="card"
              style={{ height: window.innerHeight - 100, overflow: "scroll" }}
            >
              <div class="card-content">
                {/* <p class="title" style={{ textAlign: "center" }}>
                  Ёс зүйн зөвлөлийн гишүүдийг сонгох санал асуулга
                </p> */}
                <div
                  class="box"
                  style={{
                    borderColor: "ffecb5",
                    backgroundColor: "#fff3cd",
                    padding: "15px",
                    color: "#664d03",
                  }}
                >
                  ЁС ЗҮЙН ЗӨВЛӨЛИЙН ГИШҮҮНИЙГ СОНГОН ШАЛГАРУУЛАХ САНАЛ АСУУЛГА
                </div>
                <br />
                <div>
                  <div class="subtitle">Аудитын удирдах түвшний ажилтан</div>
                  <hr />
                  <div id="HEAD">
                    <div class="columns" style={{ flexWrap: "wrap" }}>
                      {cols}
                    </div>
                    <br />
                  </div>

                  <button
                    style={{
                      float: "right",
                      backgroundColor: "#198754",
                      borderColor: "#198754",
                      borderRadius: "0.25rem",
                      padding: " 0.375rem 0.75rem",
                      color: "white",
                    }}
                    onClick={() => saveToDB()}
                  >
                    Илгээх
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyNAG;
