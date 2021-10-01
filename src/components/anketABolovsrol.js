import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Edutype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");

function Bolowsrol(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [dataSecond, loadDataSecond] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/education/" + props.person_id
      );
      loadData({
        Education: listItems?.data?.Education.filter(
          (a) => a.EDUCATION_LEVEL === 1
        ),
      });
      loadDataSecond({
        Education: listItems?.data?.Education.filter(
          (a) => a.EDUCATION_LEVEL === 2
        ),
      });
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (data?.Education === undefined || data?.Education.length === 0)
      loadData({
        Education: [
          {
            PERSON_ID: props.person_id,
            EDUCATION_ID: 1,
            EDUCATION_TYPE_ID: 1,
            EDUCATION_TYPE_NAME: "",
            EDUCATION_LEVEL: 1,
            EDUCATION_COUNTRY: "",
            SCHOOL_NAME: "",
            START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            PROFESSION_NAME: "",
            DIPLOM_NO: "",
            SCHOOL_CONTACT: "",
            DIPLOM_SUBJECT: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
    if (
      dataSecond?.Education === undefined ||
      dataSecond?.Education.length === 0
    )
      loadDataSecond({
        Education: [
          {
            PERSON_ID: props.person_id,
            EDUCATION_ID: 1,
            EDUCATION_TYPE_ID: 1,
            EDUCATION_TYPE_NAME: "",
            EDUCATION_LEVEL: 2,
            EDUCATION_COUNTRY: "",
            SCHOOL_NAME: "",
            START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            PROFESSION_NAME: "",
            DIPLOM_NO: "",
            SCHOOL_CONTACT: "",
            DIPLOM_SUBJECT: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data, dataSecond]);

  function saveToDB() {
    props.loading(true);
    let combined = data?.Education.concat(dataSecond?.Education);

    if (requiredField(combined) === true) {
      let newRow = combined?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = combined?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/education/",
          method: "POST",
          data: { education: newRow, PERSON_ID: props.person_id },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/education/",
          method: "PUT",
          data: { education: oldRow, PERSON_ID: props.person_id },
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
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }

  function setEduType(value) {
    let arr = data.Education;
    arr[value.index] = value;
    console.log("test", value);
    loadData({ Education: arr });
  }
  function setEduTypeSecond(value) {
    let arr = dataSecond.Education;
    arr[value.index] = value;
    loadDataSecond({ Education: arr });
  }
  function requiredField(value) {
    // for (let i = 0; i < value.length; i++) {
    //   if (value[i].SCHOOL_NAME === null || value[i].SCHOOL_NAME === "") {
    //     alert.show("Сургуулийн нэр оруулан уу");
    //     return false;
    //   } else if (
    //     value[i].PROFESSION_NAME === null ||
    //     value[i].PROFESSION_NAME === ""
    //   ) {
    //     alert.show("Эзэмшсэн мэргэжил оруулан уу");
    //     return false;
    //   } else if (value[i].DIPLOM_NO === null || value[i].DIPLOM_NO === "") {
    //     alert.show("Гэрчилгээ дипломын дугаар оруулан уу");
    //     return false;
    //   } else if (
    //     value[i].DIPLOM_SUBJECT === null ||
    //     value[i].DIPLOM_SUBJECT === ""
    //   ) {
    //     alert.show("Гэрчилгээ дипломын дугаар оруулан уу");
    //     return false;
    //   } else if (i === value.length - 1) {
    return true;
    //   }
    // }
  }
  async function addRow() {
    let value = data.Education;
    value.push({
      PERSON_ID: props.person_id,
      EDUCATION_ID: 1,
      EDUCATION_TYPE_ID: 1,
      EDUCATION_TYPE_NAME: "",
      EDUCATION_LEVEL: 1,
      EDUCATION_COUNTRY: "",
      SCHOOL_NAME: "",
      START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      PROFESSION_NAME: "",
      DIPLOM_NO: "",
      SCHOOL_CONTACT: "",
      DIPLOM_SUBJECT: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Education: value });
  }

  async function addRowSecond() {
    let value = dataSecond.Education;
    value.push({
      PERSON_ID: props.person_id,
      EDUCATION_ID: 1,
      EDUCATION_TYPE_ID: 1,
      EDUCATION_TYPE_NAME: "",
      EDUCATION_LEVEL: 2,
      EDUCATION_COUNTRY: "",
      SCHOOL_NAME: "",
      START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      PROFESSION_NAME: "",
      DIPLOM_NO: "",
      SCHOOL_CONTACT: "",
      DIPLOM_SUBJECT: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadDataSecond({ Education: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/educationDelete",
        method: "POST",
        data: {
          education: {
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
      Education: data?.Education.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Education !== undefined) {
    listItems = (
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div class="columns">
          <div class="column is-11">
            <span className="headerTextBold">
              3.Боловсролын талаарх мэдээлэл
            </span>
          </div>
          <div className="column is-1">
            {userDetils?.USER_TYPE_NAME.includes("BRANCH_DIRECTOR") ? null : (
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
        <div class="columns">
          <div class="column is-12">
            <em className="has-text-link	">
              3.1.Боловсрол (суурь боловсрол, дипломын дээд боловсрол, бакалавр,
              магистрын зэргийг оролцуулна)
            </em>
          </div>
        </div>
        <div className="table-container">
          <div class="columns">
            <div class="column is-12">
              <table className="table is-bordered p-3">
                <thead>
                  <tr>
                    <td>
                      <span className="textSaaral">№</span>
                    </td>
                    <td style={{ width: " 180px" }}>
                      <span className="textSaaral">Боловсролын зэрэг</span>
                    </td>
                    <td>
                      <span className="textSaaral">
                        Боловсрол эзэмшсэн газар
                      </span>
                    </td>
                    <td>
                      <span style={{ color: "red" }}>*</span>
                      <span className="textSaaral">Сургуулийн нэр</span>
                    </td>
                    <td>
                      <span className="textSaaral">Элссэн он,сар</span>
                    </td>
                    <td>
                      <span className="textSaaral">Төгссөн он,сар</span>
                    </td>
                    <td>
                      <span className="textSaaral">Эзэмшсэн мэргэжил</span>
                    </td>
                    <td>
                      <span className="textSaaral">
                        Гэрчилгээ, дипломын дугаар
                      </span>
                    </td>
                    <td>
                      <span className="textSaaral">
                        Сургуулийн холбоо барих мэдээлэл
                      </span>
                    </td>
                    <td>
                      <span className="textSaaral">
                        Диплом хамгаалсан сэдэв
                      </span>
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          borderColor: "transparent",
                          border: "none",
                          paddingLeft: "0px",
                          width: "90px",
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
                  {data?.Education?.map((value, index) => (
                    <tr>
                      <td>
                        <span className="textSaaral">{index + 1}</span>
                      </td>
                      <td>
                        <Edutype
                          personChild={data.Education[index]}
                          setPersonChild={setEduType}
                          index={index}
                          edit={edit}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "110px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.EDUCATION_COUNTRY}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].EDUCATION_COUNTRY = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "110px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.SCHOOL_NAME}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].SCHOOL_NAME = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          disabled={edit}
                          className="Borderless"
                          value={dateFormat(
                            data.Education[index].START_DATE,
                            "yyyy-mm-dd"
                          )}
                          onChange={(e) => {
                            let value = [...data?.Education];
                            value[index].START_DATE = e.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          disabled={edit}
                          className="Borderless"
                          value={dateFormat(
                            data.Education[index].END_DATE,
                            "yyyy-mm-dd"
                          )}
                          onChange={(e) => {
                            let value = [...data?.Education];
                            value[index].END_DATE = e.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "100px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.PROFESSION_NAME}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].PROFESSION_NAME = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "70px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.DIPLOM_NO}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].DIPLOM_NO = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "100px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.SCHOOL_CONTACT}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].SCHOOL_CONTACT = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "80px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.Education[index]?.DIPLOM_SUBJECT}
                          onChange={(text) => {
                            let value = [...data?.Education];
                            value[index].DIPLOM_SUBJECT = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadData({ Education: value });
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
          <div class="columns ">
            <div class="column is-12">
              <em className="has-text-link">
                3.2. Боловсролын болон шинжлэх ухааны докторын зэрэг
              </em>
            </div>
          </div>

          <div class="columns">
            <div class="column is-12">
              <table className="table is-bordered p-3">
                <thead>
                  <tr>
                    <td>
                      <span className="textSaaral">№</span>
                    </td>
                    <td style={{ width: "180px" }}>
                      <span className="textSaaral">Боловсролын зэрэг</span>
                    </td>
                    <td>
                      <span className="textSaaral">
                        Боловсрол эзэмшсэн газар
                      </span>
                    </td>
                    {/* <td>
                      <span style={{ color: "red" }}>*</span>
                      <span className="textSaaral">Сургуулийн нэр</span>
                    </td> */}
                    <td>
                      <span className="textSaaral">Орсон он,сар</span>
                    </td>
                    <td>
                      <span className="textSaaral">Төгссөн он,сар</span>
                    </td>
                    {/* <td>
                      <span className="textSaaral">Эзэмшсэн мэргэжил</span>
                    </td> */}
                    <td>
                      <span className="textSaaral">
                        Гэрчилгээ дипломын дугаар
                      </span>
                    </td>
                    {/* <td>
                      <span className="textSaaral">
                        Сургуулийн холбоо барих мэдээлэл
                      </span>
                    </td> */}
                    <td>
                      <span className="textSaaral">
                        Диплом хамгаалсан сэдэв
                      </span>
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          borderColor: "transparent",
                          border: "none",
                          paddingLeft: "0px",
                          width: "90px",
                        }}
                      >
                        <img
                          src={Add}
                          width="30px"
                          height="30px"
                          onClick={() => addRowSecond()}
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
                      </td>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {dataSecond?.Education?.map((value, index) => (
                    <tr>
                      <td>
                        <span className="textSaaral">{index + 1}</span>
                      </td>
                      <td>
                        <Edutype
                          personChild={dataSecond.Education[index]}
                          setPersonChild={setEduTypeSecond}
                          index={index}
                          edit={edit}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "100px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.EDUCATION_COUNTRY}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].EDUCATION_COUNTRY = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td>
                      {/* <td>
                        <input
                          style={{ width: "100px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.SCHOOL_NAME}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].SCHOOL_NAME = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td> */}
                      <td>
                        <input
                          type="date"
                          disabled={edit}
                          className="Borderless"
                          value={dateFormat(
                            dataSecond.Education[index].START_DATE,
                            "yyyy-mm-dd"
                          )}
                          onChange={(e) => {
                            let value = [...dataSecond?.Education];
                            value[index].START_DATE = e.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          disabled={edit}
                          className="Borderless"
                          value={dateFormat(
                            dataSecond.Education[index].END_DATE,
                            "yyyy-mm-dd"
                          )}
                          onChange={(e) => {
                            let value = [...dataSecond?.Education];
                            value[index].END_DATE = e.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td>
                      {/* <td>
                        <input
                          style={{ width: "100px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.PROFESSION_NAME}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].PROFESSION_NAME = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td> */}
                      <td>
                        <input
                          style={{ width: "80px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.DIPLOM_NO}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].DIPLOM_NO = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td>
                      {/* <td>
                        <input
                          style={{ width: "80px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.SCHOOL_CONTACT}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].SCHOOL_CONTACT = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
                          }}
                        />
                      </td> */}
                      <td>
                        <input
                          style={{ width: "90px" }}
                          disabled={edit}
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={dataSecond.Education[index]?.DIPLOM_SUBJECT}
                          onChange={(text) => {
                            let value = [...dataSecond?.Education];
                            value[index].DIPLOM_SUBJECT = text.target.value;
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            loadDataSecond({ Education: value });
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

export default Bolowsrol;
