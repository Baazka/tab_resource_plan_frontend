import React, { useEffect, useState } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import hrUrl from "../hrUrl";

var dateFormat = require("dateformat");
const SurveyFin = (props) => {
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
        url: hrUrl + "/electionAttandee/" + 3 + "/" + "HEAD",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaaltsHEAD?.data);
      //console.log(jagsaaltsHEAD);
    }
    test();
    setTimeout(() => {
      onlyHeadCheckBox();
    }, 500);
    //console.log("jagsaalt", jagsaalt);
  }, [props]);

  function onlyHeadCheckBox() {
    var checkboxgroup = document
      .getElementById("HEAD")
      .getElementsByTagName("input");
    var limit = 4;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var j = 0; j < checkboxgroup.length; j++) {
          checkedcount += checkboxgroup[j].checked ? 1 : 0;
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

    var checkboxgroupMAN = document
      .getElementById("MAN")
      .getElementsByTagName("input");

    var checkboxgroupSEN = document
      .getElementById("SEN")
      .getElementsByTagName("input");

    let c1, c2, c3;

    ar1 = [];
    for (var i = 0; i < checkboxgroup.length; i++) {
      var checkedcount = 0;
      for (var j = 0; j < checkboxgroup.length; j++) {
        checkedcount += checkboxgroup[j].checked ? 1 : 0;

        if (checkboxgroup[j].checked) ar1.push(checkboxgroup[j].value);
      }
      c1 = checkedcount;
    }
    ar2 = [];
    for (var i = 0; i < checkboxgroupMAN.length; i++) {
      var checkedcount = 0;
      for (var j = 0; j < checkboxgroupMAN.length; j++) {
        checkedcount += checkboxgroupMAN[j].checked ? 1 : 0;
        if (checkboxgroupMAN[j].checked) ar2.push(checkboxgroupMAN[j].value);
      }
      c2 = checkedcount;
    }
    ar3 = [];
    for (var i = 0; i < checkboxgroupSEN.length; i++) {
      var checkedcount = 0;
      for (var j = 0; j < checkboxgroupSEN.length; j++) {
        checkedcount += checkboxgroupSEN[j].checked ? 1 : 0;
        if (checkboxgroupSEN[j].checked) ar3.push(checkboxgroupSEN[j].value);
      }
      c3 = checkedcount;
    }

    //console.log(ar1, ar2, ar3, "Baaz");
    if (c1 === 0) alert.show("сонгоно уу.");
    else if (c2 === 0) alert.show("Менежер сонгоно уу.");
    else if (c3 === 0) alert.show("Ахлах аудитор сонгоно уу.");
    else return true;
  }
  function onlyManCheckBox() {
    var checkboxgroup = document
      .getElementById("MAN")
      .getElementsByTagName("input");
    var limit = 1;
    for (var i = 0; i < checkboxgroup.length; i++) {
      checkboxgroup[i].onclick = function () {
        var checkedcount = 0;
        for (var j = 0; j < checkboxgroup.length; j++) {
          checkedcount += checkboxgroup[j].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          //console.log("You can select maximum of " + limit + " checkbox.");
          alert.show(limit + " -өөс дээш хүн сонгох боломжгүй.");
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
        for (var j = 0; j < checkboxgroup.length; j++) {
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
                          console.log("delete", temp.darga);
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
    //console.log("end", selected);
    if (CheckBox()) {
      DataRequest({
        url: hrUrl + "/electionCheck/3/" + userDetails.USER_ID,
        method: "GET",
        data: {},
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          console.log(response?.data?.CNT);
          if (response?.data?.CNT === 0) {
            DataRequest({
              url: hrUrl + "/electionAttandee/1/",
              method: "POST",
              data: {
                ELECTION_ID: 3,
                USER_ID: userDetails?.USER_ID,
                ELECTION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
                HEAD_C1:
                  selected.darga[0] === undefined ? null : selected.darga[0].ID,
                HEAD_C2:
                  selected.darga[1] === undefined ? null : selected.darga[1].ID,
                HEAD_C3:
                  selected.darga[2] === undefined ? null : selected.darga[2].ID,
                HEAD_C4:
                  selected.darga[3] === undefined ? null : selected.darga[3].ID,
                MAN_C1:
                  selected.maneger[0] === undefined
                    ? null
                    : selected.maneger[0].ID,
                SENIOR_C1:
                  selected.senior[0] === undefined
                    ? null
                    : selected.senior[0].ID,
                SENIOR_C2:
                  selected.senior[1] === undefined
                    ? null
                    : selected.senior[1].ID,
              },
            })
              .then(function (response) {
                //console.log("UpdateResponse", response);
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

  //MAN
  const [jagsaaltman, setJagsaaltMan] = useState();

  useEffect(() => {
    async function test() {
      let jagsaaltsMAN = await DataRequest({
        url: hrUrl + "/electionAttandee/" + 3 + "/" + "MAN",
        method: "GET",
        data: {},
      });
      setJagsaaltMan(jagsaaltsMAN?.data);
      //console.log(jagsaaltsMAN);
    }
    test();
    setTimeout(() => {
      onlyManCheckBox();
    }, 500);
    //console.log("jagsaalt", jagsaaltman);
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
                    <input
                      type="checkbox"
                      id={jagsaaltman[indexMan].ID}
                      value={jagsaaltman[indexMan].ID}
                      onChange={() => {
                        if (
                          document.getElementById(jagsaaltman[indexMan].ID)
                            .checked
                        ) {
                          let temp = selected;
                          temp.maneger.push(jagsaaltman[indexMan]);
                          setSelected(temp);
                        } else {
                          let temp = selected;
                          temp.maneger = selected.maneger.filter(
                            (a, ind) => a.ID !== jagsaaltman[indexMan].ID
                          );
                          setSelected(temp);
                          //console.log("delete");
                        }
                      }}
                    />
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
        url: hrUrl + "/electionAttandee/" + 3 + "/SEN",
        method: "GET",
        data: {},
      });
      setJagsaaltSen(jagsaaltsSEN?.data);
      //console.log(jagsaaltsSEN);
    }
    test();
    setTimeout(() => {
      onlySenCheckBox();
    }, 500);
    //console.log("jagsaalt", jagsaaltsen);
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
                    <input
                      type="checkbox"
                      id={jagsaaltsen[indexSen].ID}
                      value={jagsaaltsen[indexSen].ID}
                      onChange={(value) => {
                        if (
                          document.getElementById(jagsaaltsen[indexSen].ID)
                            .checked
                        ) {
                          let temp = selected;
                          temp.senior.push(jagsaaltsen[indexSen]);
                          setSelected(temp);
                        } else {
                          let temp = selected;
                          temp.senior = temp.senior.filter(
                            (a, ind) => a.ID !== jagsaaltsen[indexSen].ID
                          );

                          setSelected({ ...temp });
                        }
                      }}
                    />
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
                  <div class="subtitle">
                    ҮНДЭСНИЙ АУДИТЫН ГАЗРЫН УДИРДАХ АЛБАН ТУШААЛТАН
                  </div>
                  <hr />
                  <div id="HEAD">
                    <div class="columns" style={{ flexWrap: "wrap" }}>
                      {cols}
                    </div>
                    <br />
                  </div>
                  <div id="MAN">
                    <div class="subtitle">ҮНДЭСНИЙ АУДИТЫН ГАЗРЫН МЕНЕЖЕР</div>
                    <hr />
                    <div>
                      <div class="columns" style={{ flexWrap: "wrap" }}>
                        {colsMan}
                      </div>
                      <br />
                    </div>
                  </div>
                  <div id="SEN">
                    <div class="subtitle">
                      ҮНДЭСНИЙ АУДИТЫН ГАЗРЫН АХЛАХ АУДИТОР
                    </div>
                    <hr />
                    <div>
                      <div class="columns" style={{ flexWrap: "wrap" }}>
                        {colsSen}
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
    </div>
  );
};

export default SurveyFin;
