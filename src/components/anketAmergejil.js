import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Subfametype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function MergeshliinOLd(props) {
  return (
    <div
      className="box"
      style={{
        marginTop: "80px",
        width: "98%",
        height: "40%",
        marginLeft: "15px",
      }}
    >
      <div class="columns">
        <div class="column is-11">
          <th>Дөрөв. Мэргэшлийн талаарх мэдээлэл</th>
        </div>
        <button className="button is-info is-small is-focused ml-5">
          Засварлах
        </button>
      </div>
      <div class="columns is-12">
        <div class="column is-0" />

        <em className="TABLE m-3 has-text-link	">
          4.1 МЭРГЭЖЛИЙН бэлтгэл (Мэргэжилээрээ болон бусад чиглэлээр нарийн
          мэргэшүүлэх багц сургалтад хамрагдсан байдлыг бичнэ)
        </em>
      </div>
      <div class="columns is-12">
        <div class="column is-0 " />

        <table className="table is-bordered p-3">
          <thead>
            <tr>
              <td>№</td>
              <td>Мэргэшүүлэх сургалтанд хамгаалсан газар</td>
              <td>Хаана. дотоод. гадаадын ямар байгууллагад</td>
              <td>Мэргэшүүлэх Сургуулын нэр</td>
              <td>Эхэлсэн он, сар, өдөр</td>
              <td>Дууссан он, сар, өдөр</td>
              <td>Хугацаа /хонохгоор/</td>
              <td>Ямар чиглэлээр</td>
              <td>Үнэмлэх, гэрчилгээний дугаар</td>
              <td>Үнэмлэх, гэрчилгээний он, сар, өдөр</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns is-12">
        <div class="column is-0" />

        <em className="TABLE m-3 has-text-link">
          4.2Эрдмийн цол/дэд профессор, академийн гишүүнийг оролцуулан/
        </em>
      </div>

      <div class="columns is-12">
        <div class="column is-0 " />

        <table className="table is-bordered ">
          <thead>
            <tr>
              <td>№</td>
              <td>Цолны төрөл</td>
              <td>Цол</td>
              <td>Цол олгосон байгуулага</td>
              <td>Огноо</td>
              <td>Гэрчилгээ дипломын дугаар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Mergeshliin(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/profession/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);
  function saveToDB() {
    let newRow = data?.Profession?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Profession?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/Profession/",
        method: "POST",
        data: { profession: newRow },
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
        url: "http://172.16.24.103:3002/api/v1/Profession/",
        method: "PUT",
        data: { profession: oldRow },
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
  function setProfession(value) {
    let arr = data.Profession;
    arr[value.index] = value;
    loadData({ Profession: arr });
  }
  async function addRow() {
    let value = data.Profession;
    value.push({
      PERSON_ID: props.person_id,
      PROFESSION_COUNTRY: "mongol",
      PROFESSION_ORG: "baiguullaga",
      PROFESSION_NAME: "surgalt ner",
      START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      DURATION_DAY: 5,
      PROFESSION_DIRECTION: "chiglel",
      DIPLOM_NO: "1",
      DIPLOM_DATE: dateFormat(new Date(), "yyyy-mm-dd"),

      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Profession: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/ProfessionDelete",
        method: "POST",
        data: {
          Profession: {
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
      Profession: data?.Profession.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Profession !== undefined) {
    listItems = (
      <div
        className=" box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span>4. Мэргэшлийн талаарх мэдээлэл</span>
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
          <div className="column is-12">
            <table className="table is-bordered ">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Мэргэшүүлэх сургалтанд хамгаалсан газар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Хаана. дотоод. гадаадын ямар байгууллагад
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Мэргэшүүлэх Сургуулын нэр
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">Эхэлсэн он, сар, өдөр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Дууссан он, сар, өдөр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Хугацаа /хоногоор/</span>
                  </td>
                  <td>
                    <span className="textSaaral">Ямар чиглэлээр</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Үнэмлэх, гэрчилгээний дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Үнэмлэх, гэрчилгээний он, сар, өдөр
                    </span>
                  </td>
                  <td
                    style={{
                      borderColor: "transparent",
                      border: "none",
                      paddingLeft: "0px",
                      width: "50px",
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
                {data?.Profession?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Profession[index]?.PROFESSION_COUNTRY}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].PROFESSION_COUNTRY = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Profession[index]?.PROFESSION_ORG}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].PROFESSION_ORG = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Profession[index]?.PROFESSION_NAME}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].PROFESSION_NAME = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Profession[index].START_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Profession];
                          value[index].START_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Profession[index].END_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Profession];
                          value[index].END_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "40px" }}
                        value={data.Profession[index]?.DURATION_DAY}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].DURATION_DAY = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        value={data.Profession[index]?.PROFESSION_DIRECTION}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].PROFESSION_DIRECTION = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "70px" }}
                        value={data.Profession[index]?.DIPLOM_NO}
                        onChange={(text) => {
                          let value = [...data?.Profession];
                          value[index].DIPLOM_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Profession[index].DIPLOM_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Profession];
                          value[index].DIPLOM_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Profession: value });
                        }}
                      />
                    </td>
                    <td
                      style={{
                        paddingLeft: "0px",
                        borderColor: "transparent",
                        width: "50px",
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

function ZeregTsol(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Fame/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Fame === undefined || data?.Fame === [])
      loadData({
        Fame: [
          {
            FAME_TYPE_NAME: "Шинжлэн ухааны цол",
            SUBFAME_ID: 1,
            SUBFAME_TYPE_NAME: "Судлаач доктор",
            FAME_ORG: "baiguullaga",
            FAME_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            FAME_NO: "ognoo",

            PERSON_ID: props.person_id,
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data]);
  function saveToDB() {
    let newRow = data?.Fame?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Fame?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/Fame/",
        method: "POST",
        data: { Fame: newRow },
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
        url: "http://172.16.24.103:3002/api/v1/Fame/",
        method: "PUT",
        data: { Fame: oldRow },
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
  function setFame(value) {
    let arr = data.Fame;
    arr[value.index] = value;
    loadData({ Fame: arr });
  }
  async function addRow() {
    let value = data.Fame;
    value.push({
      FAME_TYPE_NAME: "Шинжлэн ухааны цол",
      SUBFAME_ID: 1,
      SUBFAME_TYPE_NAME: "Судлаач доктор",
      FAME_ORG: "baiguullaga",
      FAME_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      FAME_NO: "ognoo",

      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Fame: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/FameDelete",
        method: "POST",
        data: {
          Fame: {
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
      Fame: data?.Fame.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Fame !== undefined) {
    listItems = (
      <div
        className=" box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span>
              {" "}
              4.2 Эрдмийн цол/дэд профессор, академийн гишүүнийг оролцуулан/
            </span>
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
          <div className="column is-12">
            <table className="table is-bordered ">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td>
                    <span className="textSaaral">Цолны төрөл</span>
                  </td>
                  <td>
                    <span className="textSaaral">Цол</span>
                  </td>
                  <td>
                    <span className="textSaaral">Цол олгосон байгуулага</span>
                  </td>
                  <td>
                    <span className="textSaaral">Огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Гэрчилгээ дипломын дугаар
                    </span>
                  </td>

                  <td
                    style={{
                      borderColor: "transparent",
                      border: "none",
                      paddingLeft: "0px",
                      width: "50px",
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
                {data?.Fame?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Fame[index]?.Fame_COUNTRY}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].Fame_COUNTRY = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Fame[index]?.Fame_ORG}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].Fame_ORG = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Fame[index]?.Fame_NAME}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].Fame_NAME = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Fame[index].START_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Fame];
                          value[index].START_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Fame[index].END_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Fame];
                          value[index].END_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "40px" }}
                        value={data.Fame[index]?.DURATION_DAY}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].DURATION_DAY = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        value={data.Fame[index]?.Fame_DIRECTION}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].Fame_DIRECTION = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "70px" }}
                        value={data.Fame[index]?.DIPLOM_NO}
                        onChange={(text) => {
                          let value = [...data?.Fame];
                          value[index].DIPLOM_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Fame[index].DIPLOM_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Fame];
                          value[index].DIPLOM_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Fame: value });
                        }}
                      />
                    </td>
                    <td
                      style={{
                        paddingLeft: "0px",
                        borderColor: "transparent",
                        width: "50px",
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

export default Mergeshliin;
