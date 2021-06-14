import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Edutype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function Bolowsrol(props) {
  const [data, loadData] = useState(null);
  const [dataSecond, loadDataSecond] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/education/" + props.person_id
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
  }, [props]);

  useEffect(() => {
    if (data?.Education === undefined || data?.Education === [])
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
    if (dataSecond?.Education === undefined || dataSecond?.Education === [])
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
    let newRow = data?.Education?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Education?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/education/",
        method: "POST",
        data: { education: newRow, PERSON_ID: props.person_id },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 1;
          if (message !== 2) alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
    if (oldRow?.length > 0) {
      console.log("update", JSON.stringify(oldRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/education/",
        method: "PUT",
        data: { education: oldRow, PERSON_ID: props.person_id },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 2;
          //history.push('/sample')
          if (message !== 1) alert.show("амжилттай хадгаллаа");
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
  }
  function setEduType(value) {
    let arr = data.Education;
    arr[value.index] = value;
    loadData({ Education: arr });
  }
  function setEduTypeSecond(value) {
    let arr = data.Education;
    arr[value.index] = value;
    loadDataSecond({ Education: arr });
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
        url: "http://172.16.24.103:3002/api/v1/EducationDelete",
        method: "POST",
        data: {
          Education: {
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
          if (response?.data?.message === "success")
            alert.show("амжилттай устлаа");
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
            <span>3.Боловсролын талаарх мэдээлэл</span>
          </div>
          <button
            className="buttonTsenkher"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Засварлах
          </button>
        </div>
        <div class="columns">
          <div class="column is-12">
            <em className="TABLE m-3 has-text-link	">
              3.1.Боловсрол (суурь Боловсрол. дипломын дээд
              боловсрол,бакалавр,магистрын зэргийг оролуулан)
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
                  <td style={{ width: "300px" }}>
                    <span className="textSaaral">Боловсролын зэрэг</span>
                  </td>
                  <td>
                    <span className="textSaaral">Боловсрол эзэмшсэн газар</span>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>*</span>
                    <span className="textSaaral">Сургуулийн нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Орсон он,сар</span>
                  </td>
                  <td>
                    <span className="textSaaral">Төгссөн он,сар</span>
                  </td>
                  <td>
                    <span className="textSaaral">Эзэмшсэн мэргэжил</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Гэрчилгээ дипломын дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Сургуулийн холбоо барих мэдээлэл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">Диплом хамгаалсан сэдэв</span>
                  </td>
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
                  </td>
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Education[index]?.EDUCATION_COUNTRY}
                        onChange={(text) => {
                          let value = [...data?.EDUCATION_COUNTRY];
                          value[index].EXAM_NAME = text.target.value;
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
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Education[index]?.SCHOOL_NAME}
                        onChange={(text) => {
                          let value = [...data?.SCHOOL_NAME];
                          value[index].EXAM_NAME = text.target.value;
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Education[index].START_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Education];
                          value[index].START_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Education[index].END_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Education];
                          value[index].END_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="columns ">
          <div class="column is-12">
            <em className="TABLE m-3 has-text-link">
              3.2. Боловсрол (суурь Боловсрол, дипломын дээд Боловсрол,
              бакалавр, магистрын зэргийг оролцуулсан)
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
                  <td style={{ width: "300px" }}>
                    <span className="textSaaral">Боловсролын зэрэг</span>
                  </td>
                  <td>
                    <span className="textSaaral">Боловсрол эзэмшсэн газар</span>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>*</span>
                    <span className="textSaaral">Сургуулийн нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Орсон он,сар</span>
                  </td>
                  <td>
                    <span className="textSaaral">Төгссөн он,сар</span>
                  </td>
                  <td>
                    <span className="textSaaral">Эзэмшсэн мэргэжил</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Гэрчилгээ дипломын дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Сургуулийн холбоо барих мэдээлэл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">Диплом хамгаалсан сэдэв</span>
                  </td>
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
                      onClick={() => addRowSecond()}
                    />
                  </td>
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={dataSecond.Education[index]?.EDUCATION_COUNTRY}
                        onChange={(text) => {
                          let value = [...dataSecond?.EDUCATION_COUNTRY];
                          value[index].EXAM_NAME = text.target.value;
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={dataSecond.Education[index]?.SCHOOL_NAME}
                        onChange={(text) => {
                          let value = [...dataSecond?.SCHOOL_NAME];
                          value[index].EXAM_NAME = text.target.value;
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(dataSecond.Education[index].START_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...dataSecond?.Education];
                          value[index].START_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(dataSecond.Education[index].END_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...dataSecond?.Education];
                          value[index].END_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                    </td>
                    <td>
                      <input
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                    <td>
                      <input
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                    </td>
                    <td>
                      <input
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="columns">
          <div class="column is-9" />

          <div class="column is-3">
            <button className="button is-info is-small is-focused ml-6">
              Хэвлэх
            </button>
            <button className="button is-info is-small is-focused ml-1">
              Хадгалах
            </button>
            <button className="button is-info is-small is-focused ml-1">
              Хадгалаад харах
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}

function GadaadKhel(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Education/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);
  function saveToDB() {
    let newRow = data?.Education?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Education?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/Education/",
        method: "POST",
        data: { Education: newRow, PERSON_ID: props.person_id },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 1;
          if (message !== 2) alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
    if (oldRow?.length > 0) {
      console.log("update", JSON.stringify(oldRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/Education/",
        method: "PUT",
        data: { Education: oldRow, PERSON_ID: props.person_id },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 2;
          //history.push('/sample')
          if (message !== 1) alert.show("амжилттай хадгаллаа");
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
  }
  function setEducation(value) {
    let arr = data.Education;
    arr[value.index] = value;
    loadData({ Education: arr });
  }
  async function addRow() {
    let value = data.Education;
    value.push({
      PERSON_ID: props.person_id,
      Education_ID: 1,
      Education_NAME: "",
      Education_READ: 1,
      Education_WRITE: 1,
      Education_LISTEN: 1,
      Education_SPEAK: 1,
      EXAM_NAME: "",
      EXAM_POINT: 0,
      EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      CONFIRMATION_NO: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Education: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/EducationDelete",
        method: "POST",
        data: {
          Education: {
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
          if (response?.data?.message === "success")
            alert.show("амжилттай устлаа");
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
        className=" box"
        style={{
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span>3.Гадаад хэлний мэдлэг</span>
          </div>
          <div className="column is-1">
            <button
              className="buttonTsenkher"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Засварлах
            </button>
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
                    <span className="textSaaral">Шалгалтын Нэр</span>
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
                  </td>
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
                        setPersonChild={setEducation}
                        index={index}
                        edit={edit}
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Education[index]?.EXAM_NAME}
                        onChange={(text) => {
                          let value = [...data?.Education];
                          value[index].EXAM_NAME = text.target.value;
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
                      {/* <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Education[index].START_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Education];
                          value[index].START_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Education: value });
                        }}
                      /> */}
                    </td>
                    <td>
                      {/* <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Education[index].END_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Education];
                          value[index].END_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Education: value });
                        }}
                      /> */}
                    </td>
                    <td>
                      <input
                        style={{ width: "70px" }}
                        disabled={edit}
                        className="Borderless"
                        rows="1"
                        cols="10"
                        wrap="soft"
                        value={data.Education[index]?.CONFIRMATION_NO}
                        onChange={(text) => {
                          let value = [...data?.Education];
                          value[index].CONFIRMATION_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Education: value });
                        }}
                      />
                    </td>

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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="columns">
          <div className="column is-9"></div>
          <div className="column is-3 has-text-right">
            {/* <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button> */}
            <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
              onClick={saveToDB}
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

export default Bolowsrol;
