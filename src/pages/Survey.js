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

const Survey = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const alert = useAlert();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function test() {
      let jagsaaltsHEAD = await DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/electionAttandee/" + 1 + "/" + "HEAD",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaaltsHEAD?.data);
      console.log(jagsaaltsHEAD);
    }
    test();
    setTimeout(() => {
      onlyHeadCheckBox();
    }, 1000);
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  function onlyHeadCheckBox() {
    var checkboxgroup = document
      .getElementById("HEAD")
      .getElementsByTagName("input");
    var limit = 4;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroup.length; i++) {
          checkedcount += checkboxgroup[i].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          console.log("You can select maximum of " + limit + " checkbox.");
          alert(limit + " -өөс дээш хүн сонгох боломжгүй.");
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

    var checkboxgroupMAN = document
      .getElementById("MAN")
      .getElementsByTagName("input");

    var checkboxgroupSEN = document
      .getElementById("SEN")
      .getElementsByTagName("input");

    let c1, c2, c3;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroup.length; i++) {
          checkedcount += checkboxgroup[i].checked ? 1 : 0;
        }
        c1 = checkedcount;
      };
    }

    for (var i = 0; i < checkboxgroupMAN.length; i++) {
      checkboxgroupMAN[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroupMAN.length; i++) {
          checkedcount += checkboxgroupMAN[i].checked ? 1 : 0;
        }
        c2 = checkedcount;
      };
    }
    for (var i = 0; i < checkboxgroupSEN.length; i++) {
      checkboxgroupcheckboxgroupSENMAN[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroupSEN.length; i++) {
          checkedcount += checkboxgroupSEN[i].checked ? 1 : 0;
        }
        c3 = checkedcount;
      };
    }

    if (c1 < 0) alert("сонгоно уу.");
    else if (c2 < 0) alert("Менежер сонгоно уу.");
    else if (c3 < 0) alert("Ахлах аудитор сонгоно уу.");
    else true;
  }
  function onlyManCheckBox() {
    var checkboxgroup = document
      .getElementById("MAN")
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
          alert(limit + " -өөс дээш хүн сонгох боломжгүй.");
          //alert.show("өгөгдөл байхгүй байна");
          this.checked = false;
        }
      };
    }
  }
  function onlySenCheckBox() {
    var checkboxgroup = document
      .getElementById("SEN")
      .getElementsByTagName("input");
    var limit = 2;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var i = 0; i < checkboxgroup.length; i++) {
          checkedcount += checkboxgroup[i].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          console.log("You can select maximum of " + limit + " checkbox.");
          alert(limit + " -өөс дээш хүн сонгох боломжгүй.");
          //alert.show("өгөгдөл байхгүй байна");
          this.checked = false;
        }
      };
    }
  }
  var cols = [];
  for (let index = 0; index < jagsaalt?.length; index++) {
    {
      cols.push(
        <div class="column is-3">
          <div class="card is-clickable" style={{ height: 170 }}>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src={"election/" + jagsaalt[index].USER_PICTURE}
                      alt={jagsaalt[index].USER_NAME}
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p style={{ fontSize: "18px" }}>
                    {jagsaalt[index].USER_NAME}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaalt[index].USER_POSITION}
                  </p>
                  <div style={{ position: "absolute", bottom: 20 }}>
                    <input type="checkbox" id={jagsaalt[index].ID} />
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
    CheckBox();
    // DataRequest({
    //   url: "http://localhost:3002/api/v1/education/",
    //   method: "POST",
    //   data: {
    //     ELECTION_ID: 1,
    //     USER_ID: userDetails?.USER_ID,
    //     ELECTION_DATE: new Date(),
    //     HEAD_C1: null,
    //     HEAD_C2: null,
    //     HEAD_C3: null,
    //     HEAD_C4: null,
    //     MAN_C1: null,
    //     SENIOR_C1: null,
    //     SENIOR_C2: null,
    //   },
    // })
    //   .then(function (response) {
    //     console.log("UpdateResponse", response);
    //     if (response?.data?.message === "success") {
    //       alert.show("амжилттай хадгаллаа");
    //       props.loading(false);
    //     } else {
    //       alert.show("Системийн алдаа");
    //       props.loading(false);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.response);
    //     alert.show("Системийн алдаа");
    //     props.loading(false);
    //   });
  }

  //MAN
  const [jagsaaltman, setJagsaaltMan] = useState();

  useEffect(() => {
    async function test() {
      let jagsaaltsMAN = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/electionAttandee/" + 1 + "/" + "MAN",
        method: "GET",
        data: {},
      });
      setJagsaaltMan(jagsaaltsMAN?.data);
      console.log(jagsaaltsMAN);
    }
    test();
    setTimeout(() => {
      onlyManCheckBox();
    }, 1000);
    console.log("jagsaalt", jagsaaltman);
  }, [props]);

  var colsMan = [];
  for (let indexMan = 0; indexMan < jagsaaltman?.length; indexMan++) {
    {
      colsMan.push(
        <div class="column is-3">
          <div class="card is-clickable">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src={"election/" + jagsaaltman[indexMan].USER_PICTURE}
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p style={{ fontSize: "18px" }}>
                    {jagsaaltman[indexMan].USER_NAME}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaaltman[indexMan].USER_POSITION}
                  </p>
                  <p style={{ fontSize: "12px", color: "#1f5fa6" }}>
                    {jagsaaltman[indexMan].SUB_DEPARTMENT_NAME}
                  </p>
                  <div style={{ position: "absolute", bottom: 20 }}>
                    <input type="checkbox" id={jagsaaltman[indexMan].ID} />
                    <label
                      for={jagsaaltman[indexMan].ID}
                      style={{ marginLeft: 5 }}
                    >
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
  //Sen
  const [jagsaaltsen, setJagsaaltSen] = useState();

  useEffect(() => {
    async function test() {
      let jagsaaltsSEN = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/electionAttandee/" + 1 + "/" + "SEN",
        method: "GET",
        data: {},
      });
      setJagsaaltSen(jagsaaltsSEN?.data);
      console.log(jagsaaltsSEN);
    }
    test();
    setTimeout(() => {
      onlySenCheckBox();
    }, 1000);
    console.log("jagsaalt", jagsaaltsen);
  }, [props]);

  var colsSen = [];
  for (let indexSen = 0; indexSen < jagsaaltsen?.length; indexSen++) {
    {
      colsSen.push(
        <div class="column is-3">
          <div class="card is-clickable">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src={"election/" + jagsaaltsen[indexSen].USER_PICTURE}
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p style={{ fontSize: "18px" }}>
                    {jagsaaltsen[indexSen].USER_NAME}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaaltsen[indexSen].USER_POSITION}
                  </p>
                  <p style={{ fontSize: "12px", color: "#1f5fa6" }}>
                    {jagsaaltsen[indexSen].SUB_DEPARTMENT_NAME}
                  </p>
                  <div style={{ position: "absolute", bottom: 20 }}>
                    <input type="checkbox" id={jagsaaltsen[indexSen].ID} />
                    <label
                      for={jagsaaltsen[indexSen].ID}
                      style={{ marginLeft: 5 }}
                    >
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
  return (
    <div>
      <div style={{ marginLeft: "2%" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "20%",
              left: "7%",
              zIndex: 1,
              top: "100px",
              width: "91.7%",
            }}
          >
            <div class="card" style={{ overflow: "auto", height: "100vh" }}>
              <div class="card-content">
                <p class="title" style={{ textAlign: "center" }}>
                  Ёс зүйн зөвлөлийн гишүүдийг сонгох санал асуулга
                </p>
                <div
                  class="box"
                  style={{
                    borderColor: "ffecb5",
                    backgroundColor: "#fff3cd",
                    padding: "15px",
                    color: "#664d03",
                  }}
                >
                  Ёс зүйн зөвлөлийн гишүүдийг сонгох санал асуулга
                </div>
                <br />
                <div>
                  <div class="subtitle">Аудитын удирдах түвшний ажилтан</div>
                  <hr />
                  <div id="HEAD">
                    <div class="columns" style={{ flexWrap: "wrap" }}>
                      {cols}
                    </div>
                    {/* <button
                      className="buttonTsenkher"
                      style={{ float: "right" }}
                      onClick={saveToDB}
                    >
                      Хадгалах
                    </button>*/}
                    <br />
                  </div>
                  <div id="MAN">
                    <div class="subtitle">Менежер</div>
                    <hr />
                    <div>
                      <div class="columns" style={{ flexWrap: "wrap" }}>
                        {colsMan}
                      </div>
                      {/* <button
                      className="buttonTsenkher"
                      style={{ float: "right" }}
                      onClick={saveToDB}
                    >
                      Хадгалах
                    </button> */}
                      <br />
                    </div>
                  </div>
                  <div id="SEN">
                    <div class="subtitle">Ахлах аудитор</div>
                    <hr />
                    <div>
                      <div class="columns" style={{ flexWrap: "wrap" }}>
                        {colsSen}
                      </div>

                      <br />
                    </div>
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
                    onClick={saveToDB}
                  >
                    Илгээх
                  </button>
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

export default Survey;
