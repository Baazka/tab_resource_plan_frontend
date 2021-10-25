import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Oathtype, Language, Languagetype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
import { Office } from "./library";

const axios = require("axios");
var dateFormat = require("dateformat");

function UrChadvar(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    async function fetchData() {
      let temp;
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/exam/" + props.person_id
      );
      console.log("urchadavarlistItemlength", listItems.data?.Exam.length);
      console.log("urchadavarlistItem", listItems.data?.Exam);
      temp = listItems.data?.Exam.filter((item) => item.EXAM_TYPE_ID !== 2);
      console.log(temp, "testm1");
      if (temp !== undefined && temp.length > 0) {
        console.log(temp, "testm");
        if (temp.length == 2) {
          loadData({
            Exam: temp.sort(function (a, b) {
              return a.EXAM_TYPE_ID - b.EXAM_TYPE_ID;
            }),
          });
        } else {
          let examtype;
          temp.map((a) => {
            if (a.EXAM_TYPE_ID === 3) examtype = 1;
            else if (a.EXAM_TYPE_ID === 1) examtype = 3;
          });

          loadData({
            Exam: temp
              .concat({
                PERSON_ID: props.person_id,
                EXAM_TYPE_ID: examtype,
                EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
                IS_EXAM: 0,
                OFFICE_ID: "1",
                EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
                EXAM_POINT: "",
                DECISION_NO: "",
                DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
                DECISION_DESC: "",
                CREATED_BY: userDetils?.USER_ID,
                CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                ROWTYPE: "NEW",
                IS_ACTIVE: "1",
              })
              .sort(function (a, b) {
                return a.EXAM_TYPE_ID - b.EXAM_TYPE_ID;
              }),
          });
        }
      } else {
        loadData({
          Exam: [
            {
              PERSON_ID: props.person_id,
              EXAM_TYPE_ID: 1,
              EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
              IS_EXAM: 0,
              OFFICE_ID: "1",
              EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              EXAM_POINT: "0",
              DECISION_NO: "",
              DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              DECISION_DESC: "",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
              IS_ACTIVE: "1",
            },

            {
              PERSON_ID: props.person_id,
              EXAM_TYPE_ID: 3,
              EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
              IS_EXAM: 0,
              OFFICE_ID: "1",
              EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              EXAM_POINT: "0",
              DECISION_NO: "",
              DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              DECISION_DESC: "",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
              IS_ACTIVE: "1",
            },
          ],
        });
      }
    }
    fetchData();
  }, [props]);

  function saveToDB() {
    props.loading(true);
    let newRow = data.Exam.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data.Exam.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;
    console.log("oldRow", oldRow);
    console.log("oldRowdata", data);

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/exam/",
        method: "POST",
        data: { exam: newRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") {
            message = 1;
            if (message !== 2) alert.show("амжилттай хадгаллаа");
            setEdit(!edit);
            props.loading(false);
          } else {
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          }
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("Системийн алдаа");
          setEdit(!edit);
          props.loading(false);
        });
    }
    if (oldRow?.length > 0) {
      console.log("update", JSON.stringify(oldRow));
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/exam/",
        method: "PUT",
        data: { exam: oldRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") {
            message = 2;
            //history.push('/sample')
            if (message !== 1) alert.show("амжилттай хадгаллаа");
            setEdit(!edit);
            props.loading(false);
          } else {
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("Системийн алдаа");
          setEdit(!edit);
          props.loading(false);
        });
    }
  }

  function setOffice(value) {
    console.log("officeID", value);
    let temp = [...data?.Exam];

    temp[value.index].OFFICE_ID = value.OFFICE_ID;
    temp[value.index].UPDATED_BY = userDetils?.USER_ID;
    temp[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ Exam: temp });
  }

  let listItems;
  if (data?.Exam !== undefined && data.Exam.length !== 0) {
    listItems = (
      <div>
        <div
          className="box"
          style={{
            marginTop: "80px",
            width: "98%",
            height: "auto",
            marginLeft: "15px",
          }}
        >
          <div className="columns">
            <div className="column is-11">
              <span className="headerTextBold">
                1.Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл
              </span>
            </div>
            <div className="column is -1">
              {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
                <button
                  className="buttonTsenkher"
                  onClick={() => setEdit(!edit)}
                >
                  Засварлах
                </button>
              )}
            </div>
          </div>
          <div className="columns">
            <table className="table is-bordered">
              <thead>
                <tr>
                  <td>№</td>
                  <td>Мэдээллийн агуулга</td>
                  <td>Шалгалт өгсөн эсэх</td>
                  <td>Шалгалт өгсөн байршил /Аймаг,хот/</td>
                  <td>Огноо</td>
                  <td>Шалгалтын оноо</td>
                  <td>Шийдвэрийн дугаар</td>
                  <td>Шийдвэрийн огноо</td>
                  <td>Тайлбар</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ерөнхий шалгалт өгсөн эсэх</td>
                  <td>
                    <select
                      disabled={edit}
                      className="Borderless"
                      value={data?.Exam[0].IS_EXAM}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].IS_EXAM = text.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    >
                      <option value={1}>Өгсөн</option>
                      <option value={0}>Өгөөгүй</option>
                    </select>
                  </td>
                  <td>
                    <Office
                      personChild={data.Exam[0]}
                      setPersonChild={setOffice}
                      fullWidth={true}
                      index={"0"}
                      edit={edit}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="date"
                      disabled={edit}
                      className="Borderless"
                      value={dateFormat(data.Exam[0].EXAM_DATE, "yyyy-mm-dd")}
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[0].EXAM_DATE = e.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="утгаа оруулна уу"
                      style={{ width: "70px" }}
                      disabled={edit}
                      className="Borderless"
                      value={data.Exam[0]?.EXAM_POINT}
                      type="number"
                      min="0"
                      max="100"
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].EXAM_POINT = text.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="утгаа оруулна уу"
                      style={{ width: "70px" }}
                      disabled={edit}
                      className="Borderless"
                      rows="1"
                      cols="10"
                      wrap="soft"
                      value={data.Exam[0]?.DECISION_NO}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].DECISION_NO = text.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      disabled={edit}
                      className="Borderless"
                      value={dateFormat(
                        data.Exam[0].DECISION_DATE,
                        "yyyy-mm-dd"
                      )}
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[0].DECISION_DATE = e.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    />
                  </td>
                  <td>
                    {" "}
                    <textarea
                      disabled={edit}
                      className="Borderless"
                      rows="2"
                      cols="45"
                      wrap="soft"
                      value={data.Exam[0]?.DECISION_DESC}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].DECISION_DESC = text.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    />
                  </td>
                </tr>
                <td>2</td>
                <td>Тусгай шалгалт өгсөн эсэх</td>
                <td>
                  <select
                    disabled={edit}
                    className="Borderless"
                    value={data.Exam[1].IS_EXAM}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[1].IS_EXAM = text.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  >
                    <option value={1}>Өгсөн</option>
                    <option value={0}>Өгөөгүй</option>
                  </select>
                </td>
                <td>
                  <Office
                    personChild={data.Exam[1]}
                    setPersonChild={setOffice}
                    fullWidth={true}
                    index={"2"}
                    edit={edit}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="date"
                    disabled={edit}
                    className="Borderless"
                    value={dateFormat(data.Exam[1].EXAM_DATE, "yyyy-mm-dd")}
                    onChange={(e) => {
                      let value = [...data?.Exam];
                      value[1].EXAM_DATE = e.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    style={{ width: "70px" }}
                    disabled={edit}
                    className="Borderless"
                    type="number"
                    min="0"
                    max="100"
                    value={data.Exam[1]?.EXAM_POINT}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[1].EXAM_POINT = text.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    style={{ width: "70px" }}
                    disabled={edit}
                    className="Borderless"
                    rows="1"
                    cols="10"
                    wrap="soft"
                    value={data.Exam[1]?.DECISION_NO}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[1].DECISION_NO = text.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    disabled={edit}
                    className="Borderless"
                    value={dateFormat(data.Exam[1].DECISION_DATE, "yyyy-mm-dd")}
                    onChange={(e) => {
                      let value = [...data?.Exam];
                      value[1].DECISION_DATE = e.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <textarea
                    disabled={edit}
                    className="Borderless"
                    rows="2"
                    cols="45"
                    wrap="soft"
                    value={data.Exam[1]?.DECISION_DESC}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[1].DECISION_DESC = text.target.value;
                      value[1].UPDATED_BY = userDetils?.USER_ID;
                      value[1].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
              </tbody>
            </table>
          </div>
          <div className="columns">
            <div className="column is-11"></div>

            {!edit ? (
              <div className="column is-1 ">
                {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
                <button className="buttonTsenkher" onClick={saveToDB}>
                  Хадгалах
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function TangaragBurtgel(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/oath/" + props.person_id
      );
      console.log(listItems, "Tangarag");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  function saveToDB() {
    props.loading(true);
    if (requiredField() === true) {
      let newRow = data?.Oath?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Oath?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/oath/",
          method: "POST",
          data: { oath: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/oath/",
          method: "PUT",
          data: { oath: oldRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }

  function requiredField() {
    console.log("testestsetsetsetsetsetse", data.Oath);
    for (let i = 0; i < data.Oath.length; i++) {
      if (data.Oath[i].OATH_TYPE === null || data.Oath[i].OATH_TYPE === "") {
        alert.show("тангаргийн төрөл оруулан уу");
        return false;
      } else if (
        data.Oath[i].DECISION_NO === null ||
        data.Oath[i].DECISION_NO === ""
      ) {
        alert.show("тангаргийн шийдвэрийн дугаар оруулан уу");
        return false;
      } else if (i === data.Oath.length - 1) {
        return true;
      }
    }
  }
  async function addRow() {
    let value = data.Oath;
    value.push({
      PERSON_ID: props.person_id,
      OATH_ID: 1,
      OATH_TYPE_ID: 1,
      OATH_TYPE: "",
      OATH_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      DECISION_NO: "",
      DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Oath: value });
  }
  useEffect(() => {
    if (data?.Oath === undefined || data?.Oath.length === 0)
      loadData({
        Oath: [
          {
            PERSON_ID: props.person_id,
            OATH_ID: 1,
            OATH_TYPE_ID: 1,
            OATH_TYPE: "",
            OATH_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            DECISION_NO: "",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data]);
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/oathDelete",
        method: "POST",
        data: {
          oath: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Oath: data?.Oath.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Oath !== undefined && data?.Oath.length !== 0) {
    listItems = (
      <div
        className=" box"
        style={{
          width: "98%",
          height: "auto",
          marginLeft: "10px",
          marginTop: "1.5%",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span className="headerTextBold">2.Тангаргийн бүртгэл</span>
          </div>
          <div className="column is-1">
            {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            )}
          </div>
        </div>
        <div className="columns">
          <div className="column is-11">
            <table className="table is-bordered p-3">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td style={{ width: "300px" }}>
                    <span className="textSaaral">Тангаргийн төрөл</span>
                  </td>
                  <td style={{ width: "250px" }}>
                    <span className="textSaaral">Тангараг өргөсөн огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Тангаргийн шийдвэрийн дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Тангаргийн шийдвэрийн огноо
                    </span>
                  </td>
                  {!edit ? (
                    <td
                      style={{
                        borderColor: "transparent",
                        border: "none",
                        paddingLeft: "0px",
                      }}
                    >
                      <img
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                      <input
                        style={{ width: "40px", visibility: "hidden" }}
                      ></input>
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.Oath?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        value={data.Oath[index]?.OATH_TYPE}
                        onChange={(text) => {
                          let value = [...data?.Oath];
                          value[index].OATH_TYPE = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Oath: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Oath[index].OATH_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Oath];
                          value[index].OATH_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Oath: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        value={data.Oath[index]?.DECISION_NO}
                        onChange={(text) => {
                          let value = [...data?.Oath];
                          value[index].DECISION_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Oath: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Oath[index].DECISION_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Oath];
                          value[index].DECISION_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Oath: value });
                        }}
                      />
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeRow(index, value)}
                        />
                        <input
                          style={{ width: "40px", visibility: "hidden" }}
                        ></input>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="columns">
          <div className="column is-11"></div>

          {!edit ? (
            <div className="column is-1 ">
              {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function GadaadKhel(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/language/" + props.person_id
      );
      console.log(listItems, "Tangarag");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  function saveToDB() {
    props.loading(true);
    console.log("data", data);
    if (requiredField(data) === true) {
      let newRow = data?.Language?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Language?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/Language/",
          method: "POST",
          data: { language: newRow, PERSON_ID: props.person_id },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/Language/",
          method: "PUT",
          data: { language: oldRow, PERSON_ID: props.person_id },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function setLanguage(value) {
    let arr = data.Language;
    arr[value.index] = value;
    loadData({ Language: arr });
  }
  function requiredField() {
    for (let i = 0; i < data.Language.length; i++) {
      if (
        data.Language[i].EXAM_NAME === null ||
        data.Language[i].EXAM_NAME === ""
      ) {
        alert.show("Шалгалтын Нэр оруулан уу");
        return false;
      } else if (
        data.Language[i].CONFIRMATION_NO === null ||
        data.Language[i].CONFIRMATION_NO === ""
      ) {
        alert.show("Батламжийн дугаар оруулан уу");
        return false;
      } else if (i === data.Language.length - 1) {
        return true;
      }
    }
  }
  async function addRow() {
    let value = data.Language;
    value.push({
      PERSON_ID: props.person_id,
      LANGUAGE_ID: 1,
      LANGUAGE_NAME: "",
      LANGUAGE_READ: 1,
      LANGUAGE_WRITE: 1,
      LANGUAGE_LISTEN: 1,
      LANGUAGE_SPEAK: 1,
      EXAM_NAME: "",
      EXAM_POINT: 0,
      EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      CONFIRMATION_NO: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Language: value });
  }
  useEffect(() => {
    if (data?.Language === undefined || data?.Language.length === 0)
      loadData({
        Language: [
          {
            PERSON_ID: props.person_id,
            LANGUAGE_ID: 1,
            LANGUAGE_NAME: "",
            LANGUAGE_READ: 1,
            LANGUAGE_WRITE: 1,
            LANGUAGE_LISTEN: 1,
            LANGUAGE_SPEAK: 1,
            EXAM_NAME: "",
            EXAM_POINT: 0,
            EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            CONFIRMATION_NO: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data]);
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/languageDelete",
        method: "POST",
        data: {
          language: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              PERSON_ID: props.person_id,
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Language: data?.Language.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Language !== undefined && data?.Language.length !== 0) {
    listItems = (
      <div
        className=" box"
        style={{
          width: "98%",
          height: "auto",
          marginLeft: "10px",
          marginTop: "1%",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span className="headerTextBold">3.Гадаад хэлний мэдлэг</span>
          </div>
          <div className="column is-1">
            {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            )}
          </div>
        </div>
        <div className="columns">
          <div className="column is-11">
            <table className="table is-bordered p-3">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td style={{ width: "300px" }}>
                    <span className="textSaaral">Гадаад хэлний нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Ярих</span>
                  </td>
                  <td>
                    <span className="textSaaral">Сонсож ойлгох</span>
                  </td>
                  <td>
                    <span className="textSaaral">Унших</span>
                  </td>
                  <td>
                    <span className="textSaaral">Бичих</span>
                  </td>
                  <td>
                    <span className="textSaaral">Шалгалтын нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Дүнгийн мэдээлэл</span>
                  </td>
                  <td>
                    <span className="textSaaral">Шалгалт өгсөн огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">Батламжийн дугаар</span>
                  </td>
                  {!edit ? (
                    <td
                      style={{
                        borderColor: "transparent",
                        border: "none",
                        paddingLeft: "0px",
                      }}
                    >
                      <img
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                      <input
                        style={{ width: "30px", visibility: "hidden" }}
                      ></input>
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.Language?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <Language
                        personChild={data.Language[index]}
                        setPersonChild={setLanguage}
                        index={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Languagetype
                        personChild={data.Language[index]}
                        setPersonChild={setLanguage}
                        index={index}
                        type="LANGUAGE_SPEAK"
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Languagetype
                        personChild={data.Language[index]}
                        setPersonChild={setLanguage}
                        index={index}
                        type="LANGUAGE_LISTEN"
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Languagetype
                        personChild={data.Language[index]}
                        setPersonChild={setLanguage}
                        index={index}
                        type="LANGUAGE_READ"
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Languagetype
                        personChild={data.Language[index]}
                        setPersonChild={setLanguage}
                        index={index}
                        type="LANGUAGE_WRITE"
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Language[index]?.EXAM_NAME}
                        onChange={(text) => {
                          let value = [...data?.Language];
                          value[index].EXAM_NAME = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Language: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Language[index]?.EXAM_POINT}
                        onChange={(text) => {
                          let value = [...data?.Language];
                          value[index].EXAM_POINT = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Language: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Language[index].EXAM_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Language];
                          value[index].EXAM_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Language: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Language[index]?.CONFIRMATION_NO}
                        onChange={(text) => {
                          let value = [...data?.Language];
                          value[index].CONFIRMATION_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Language: value });
                        }}
                      />
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                          width: "80px",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeRow(index, value)}
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="columns">
          <div className="column is-11"></div>

          {!edit ? (
            <div className="column is-1 ">
              {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

export { UrChadvar, TangaragBurtgel, GadaadKhel };
