import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Oathtype, Language, Languagetype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function UrChadvar(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://10.10.10.46:3002/api/v1/exam/" + props.person_id
    );
    if (listItems.data?.Exam !== undefined && listItems.data?.Exam.length > 0) {
      if (listItems.data?.Exam.length === 1) {
        loadData({
          Exam: listItems.data?.Exam.concat([
            {
              PERSON_ID: props.person_id,
              EXAM_TYPE_ID: 2,
              EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
              IS_EXAM: 1,
              EXAM_LOCATION: "",
              EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              EXAM_POINT: 100,
              DECISION_NO: "A/12",
              DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              DECISION_DESC: "tailbar",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
              IS_ACTIVE: "1",
            },
            {
              PERSON_ID: props.person_id,
              EXAM_TYPE_ID: 3,
              EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
              IS_EXAM: 1,
              EXAM_LOCATION: "",
              EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              EXAM_POINT: 100,
              DECISION_NO: "A/12",
              DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
              DECISION_DESC: "tailbar",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
              IS_ACTIVE: "1",
            },
          ]),
        });
      } else if (listItems.data?.Exam.length === 3) {
        loadData(listItems.data);
      } else {
        loadData({
          Exam: listItems.data?.Exam.push({
            PERSON_ID: props.person_id,
            EXAM_TYPE_ID: 3,
            EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
            IS_EXAM: 1,
            EXAM_LOCATION: "",
            EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXAM_POINT: 100,
            DECISION_NO: "A/12",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            DECISION_DESC: "tailbar",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            IS_ACTIVE: "1",
          }),
        });
      }
    } else {
      loadData({
        Exam: listItems.data?.Exam.concat([
          {
            PERSON_ID: props.person_id,
            EXAM_TYPE_ID: 1,
            EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
            IS_EXAM: 1,
            EXAM_LOCATION: "",
            EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXAM_POINT: 100,
            DECISION_NO: "A/12",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            DECISION_DESC: "tailbar",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            IS_ACTIVE: "1",
          },
          {
            PERSON_ID: props.person_id,
            EXAM_TYPE_ID: 2,
            EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
            IS_EXAM: 1,
            EXAM_LOCATION: "",
            EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXAM_POINT: 100,
            DECISION_NO: "A/12",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            DECISION_DESC: "tailbar",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            IS_ACTIVE: "1",
          },
          {
            PERSON_ID: props.person_id,
            EXAM_TYPE_ID: 3,
            EXAM_TYPE_NAME: "Ерөнхий шалгалт өгсөн эсэх",
            IS_EXAM: 1,
            EXAM_LOCATION: "",
            EXAM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXAM_POINT: 100,
            DECISION_NO: "A/12",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            DECISION_DESC: "tailbar",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            IS_ACTIVE: "1",
          },
        ]),
      });
    }
  }, [props]);
  function saveToDB() {
    let newRow = data.Exam.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data.Exam.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://10.10.10.46:3002/api/v1/exam/",
        method: "POST",
        data: { exam: newRow },
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
        url: "http://10.10.10.46:3002/api/v1/exam/",
        method: "PUT",
        data: { exam: oldRow },
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
          alert.show("алдаа");
        });
    }
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
              <span>1.Төрийн жинхэн албаны шалгалтын талаарх мэдээлэл</span>
            </div>
            <div className="column is -1">
              <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
                Засварлах
              </button>
            </div>
          </div>
          <div className="columns">
            <table className="table is-bordered">
              <thead>
                <tr>
                  <td>№</td>
                  <td>Мэдээллийн агуулга</td>
                  <td>Шалгалт өгсөн эсэх</td>
                  <td>шалгалт өгсөн байршил /Аймаг,хот/</td>
                  <td>Огноо</td>
                  <td>Шалгалтын оноо</td>
                  <td>Шийдэрийн дугаар</td>
                  <td>Шийдэрийн Огноо</td>
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
                      value={data?.Exam[0].EXAM_TYPE_ID}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].EXAM_TYPE_ID = text.target.value;
                        value[0].UPDATED_BY = userDetils?.USER_ID;
                        value[0].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    >
                      <option value={1}>Өгсөн</option>
                      <option value={""}>Өгөөгүй</option>
                    </select>
                  </td>
                  <td>
                    <input
                      disabled={edit}
                      className="Borderless"
                      value={data.Exam[0]?.EXAM_LOCATION}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[0].EXAM_LOCATION = text.target.value;
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
                    <input
                      type="date"
                      id="start"
                      disabled={edit}
                      className="Borderless"
                      value={dateFormat(
                        new Date(data.Exam[0].EXAM_DATE),
                        "yyyy-mm-dd"
                      )}
                      min="1930-01-01"
                      max="2021-12-31"
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[0].EXAM_DATE = dateFormat(
                          e.target.value,
                          "dd-mmm-yy"
                        );
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
                      style={{ width: "70px" }}
                      disabled={edit}
                      className="Borderless"
                      rows="1"
                      cols="10"
                      wrap="soft"
                      value={data.Exam[0]?.EXAM_POINT}
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
                        loadData({ Exam: value });
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
                        new Date(data.Exam[0].DECISION_DATE),
                        "yyyy-mm-dd"
                      )}
                      min="1930-01-01"
                      max="2021-12-31"
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[0].DECISION_DATE = dateFormat(
                          e.target.value,
                          "dd-mmm-yy"
                        );
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
                <tr>
                  <td>2</td>
                  <td>Нөөцөд байгаа эсэх</td>
                  <td>
                    <select
                      disabled={edit}
                      className="Borderless"
                      value={data.Exam[1].EXAM_TYPE_ID}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[1].EXAM_TYPE_ID = text.target.value;
                        value[1].UPDATED_BY = userDetils?.USER_ID;
                        value[1].UPDATED_DATE = dateFormat(
                          new Date(),
                          "dd-mmm-yy"
                        );
                        loadData({ Exam: value });
                      }}
                    >
                      <option value={2}>Өгсөн</option>
                      <option value={""}>Өгөөгүй</option>
                    </select>
                  </td>
                  <td>
                    <input
                      disabled={edit}
                      className="Borderless"
                      value={data.Exam[1]?.EXAM_LOCATION}
                      onChange={(text) => {
                        let value = [...data?.Exam];
                        value[1].EXAM_LOCATION = text.target.value;
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
                    <input
                      type="date"
                      id="start"
                      disabled={edit}
                      className="Borderless"
                      value={dateFormat(
                        new Date(data.Exam[1].EXAM_DATE),
                        "yyyy-mm-dd"
                      )}
                      min="1930-01-01"
                      max="2021-12-31"
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[1].EXAM_DATE = dateFormat(
                          e.target.value,
                          "dd-mmm-yy"
                        );
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
                      style={{ width: "70px" }}
                      disabled={edit}
                      className="Borderless"
                      rows="1"
                      cols="10"
                      wrap="soft"
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
                      id="start"
                      disabled={edit}
                      className="Borderless"
                      value={dateFormat(
                        new Date(data.Exam[1].DECISION_DATE),
                        "yyyy-mm-dd"
                      )}
                      min="1930-01-01"
                      max="2021-12-31"
                      onChange={(e) => {
                        let value = [...data?.Exam];
                        value[1].DECISION_DATE = dateFormat(
                          e.target.value,
                          "dd-mmm-yy"
                        );
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
                </tr>
                <td>3</td>
                <td>Тусгай шалгалт өгсөн хэсэх</td>
                <td>
                  <select
                    disabled={edit}
                    className="Borderless"
                    value={data.Exam[2].EXAM_TYPE_ID}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[2].EXAM_TYPE_ID = text.target.value;
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  >
                    <option value={3}>Өгсөн</option>
                    <option value={""}>Өгөөгүй</option>
                  </select>
                </td>
                <td>
                  <input
                    disabled={edit}
                    className="Borderless"
                    value={data.Exam[2]?.EXAM_LOCATION}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[2].EXAM_LOCATION = text.target.value;
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="date"
                    id="start"
                    disabled={edit}
                    className="Borderless"
                    value={dateFormat(
                      new Date(data.Exam[2].EXAM_DATE),
                      "yyyy-mm-dd"
                    )}
                    min="1930-01-01"
                    max="2021-12-31"
                    onChange={(e) => {
                      let value = [...data?.Exam];
                      value[2].EXAM_DATE = dateFormat(
                        e.target.value,
                        "dd-mmm-yy"
                      );
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
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
                    value={data.Exam[2]?.EXAM_POINT}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[2].EXAM_POINT = text.target.value;
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Exam: value });
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
                    value={data.Exam[2]?.DECISION_NO}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[2].DECISION_NO = text.target.value;
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
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
                    id="start"
                    disabled={edit}
                    className="Borderless"
                    value={dateFormat(
                      new Date(data.Exam[2].DECISION_DATE),
                      "yyyy-mm-dd"
                    )}
                    min="1930-01-01"
                    max="2021-12-31"
                    onChange={(e) => {
                      let value = [...data?.Exam];
                      value[2].DECISION_DATE = dateFormat(
                        e.target.value,
                        "dd-mmm-yy"
                      );
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
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
                    value={data.Exam[2]?.DECISION_DESC}
                    onChange={(text) => {
                      let value = [...data?.Exam];
                      value[2].DECISION_DESC = text.target.value;
                      value[2].UPDATED_BY = userDetils?.USER_ID;
                      value[2].UPDATED_DATE = dateFormat(
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
          <div class="columns">
            <div class="column is-11" />

            <div class="column is-1 ">
              {/* <button className="button is-info is-small is-focused ml-1">
                Хэвлэх
              </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        </div>
        <TangaragBurtgel person_id={props.person_id} />
        <GadaadKhel person_id={props.person_id} />
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function TangaragBurtgel(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://10.10.10.46:3002/api/v1/oath/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  function saveToDB() {
    let newRow = data?.Oath?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Oath?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://10.10.10.46:3002/api/v1/oath/",
        method: "POST",
        data: { oath: newRow },
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
        url: "http://10.10.10.46:3002/api/v1/oath/",
        method: "PUT",
        data: { oath: oldRow },
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
  function setOath(value) {
    let arr = data.Oath;
    arr[value.index] = value;
    loadData({ Oath: arr });
  }
  async function addRow() {
    let value = data.Oath;
    value.push({
      PERSON_ID: props.person_id,
      OATH_ID: 1,
      OATH_TYPE_ID: 1,
      OATH_TYPE_NAME: "",
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
            OATH_TYPE_NAME: "",
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
        url: "http://10.10.10.46:3002/api/v1/oathDelete",
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
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span>2.Тангарагын бүртгэл</span>
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
                    <span className="textSaaral">Тангарагын төрөл</span>
                  </td>
                  <td style={{ width: "250px" }}>
                    <span className="textSaaral">Тангараг өргөсөн огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Тангарагын шийдвэрийн дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Тангарагын шийдвэрийн огноо
                    </span>
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
                {data?.Oath?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <Oathtype
                        personChild={data.Oath[index]}
                        setPersonChild={setOath}
                        index={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Oath[index].OATH_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Oath];
                          value[index].OATH_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Oath[index].DECISION_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Oath];
                          value[index].DECISION_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Oath: value });
                        }}
                      />
                    </td>
                    <td
                      style={{ paddingLeft: "0px", borderColor: "transparent" }}
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

function GadaadKhel(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://10.10.10.46:3002/api/v1/language/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);
  function saveToDB() {
    let newRow = data?.Language?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Language?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://10.10.10.46:3002/api/v1/Language/",
        method: "POST",
        data: { language: newRow, PERSON_ID: props.person_id },
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
        url: "http://10.10.10.46:3002/api/v1/Language/",
        method: "PUT",
        data: { language: oldRow, PERSON_ID: props.person_id },
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
  function setLanguage(value) {
    let arr = data.Language;
    arr[value.index] = value;
    loadData({ Language: arr });
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
        url: "http://10.10.10.46:3002/api/v1/languageDelete",
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          new Date(data.Language[index].EXAM_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Language];
                          value[index].EXAM_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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

export default UrChadvar;
