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

const Survey = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();

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
    onlyOneCheckBox();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  function onlyOneCheckBox() {
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
          alert("You can select maximum of " + limit + " checkbox.");
          //alert.show("өгөгдөл байхгүй байна");
          this.checked = false;
        }
      };
    }
  }
  var cols = [];
  for (let index = 0; index < jagsaalt?.length; index++) {
    {
      console.log();
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
                  <p>{jagsaalt[index].USER_NAME}</p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaalt[index].USER_POSITION}
                  </p>
                  {/* <p style={{ fontSize: "12px" }}>Мэдээлэл технологийн төв</p> */}
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

  //onlyOneCheckBox();
  function saveToDB() {
    alert("save");
    //props.loading(true);

    // if (requiredField(data) === true) {
    //   let newRow = data?.Award?.filter((value) => value.ROWTYPE === "NEW");
    //   let oldRow = data?.Award?.filter(
    //     (value) =>
    //       value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    //   );
    //   let message = 0;
    // } else {
    //   props.loading(false);
    // }
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
                  <p>{jagsaaltman[indexMan].USER_NAME}</p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaaltman[indexMan].USER_POSITION}
                  </p>
                  {/* <p style={{ fontSize: "12px" }}>Мэдээлэл технологийн төв</p> */}
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
                  <p>{jagsaaltsen[indexSen].USER_NAME}</p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaaltsen[indexSen].USER_POSITION}
                  </p>
                  {/* <p style={{ fontSize: "12px" }}>Мэдээлэл технологийн төв</p> */}
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
            <div class="card">
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
                    <button
                      className="buttonTsenkher"
                      style={{ float: "right" }}
                      onClick={saveToDB}
                    >
                      Хадгалах
                    </button>
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
