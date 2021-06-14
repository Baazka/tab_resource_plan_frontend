import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Literaturetype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));
function ButeeliinOLD(props) {
  return (
    <div
      className="box"
      style={{
        marginTop: "80px",
        width: "98%",
        height: "31%",
        marginLeft: "15px",
      }}
    >
      <div class="columns">
        <div class="column is-11">
          <th>Найм. Бүтээлийн жагсаалт</th>
        </div>
        <button className="button is-info is-small is-focused ml-5">
          Засварлах
        </button>
      </div>
      <div class="columns is-12">
        <em className="TABLE m-3 has-text-link">
          "Тайлбар"хэсэгт гадаад хэлнээс орчуулсан болон хамтран зохиогчийн
          тухай тэмдэглэнэ.
        </em>
        <div class="column is-0" />
      </div>
      <div class="columns is-11 is-gapless">
        <table className="table  is-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <td>№</td>
              <td>Бүтээлийн нэр</td>
              <td>Бүтээлийн төрөл</td>
              <td>Бүтээл гаргасан огноо</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="column is-2 is-gapless" style={{ marginTop: "50px" }}>
          <img src={Add} width="30px" height="30px" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-9" />
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
  );
}

function Buteeliin(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Literature/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Literature === undefined || data?.Literature === [])
      loadData({
        Literature: [
          {
            LITERATURE_ID: 1,
            LITERATURE_NAME: "buteelin ner",
            LITERATURE_TYPE_ID: 1,
            LITERATURE_TYPE_NAME: "butelin turul",
            LITERATURE_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            LITERATURE_DESC: "tailbar",
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
    let newRow = data?.Literature?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Literature?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/Literature/",
        method: "POST",
        data: { Literature: newRow },
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
        url: "http://172.16.24.103:3002/api/v1/Literature/",
        method: "PUT",
        data: { Literature: oldRow },
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
  function setLiterature(value) {
    let arr = data.Literature;
    arr[value.index] = value;
    loadData({ Literature: arr });
  }
  async function addRow() {
    let value = data.Literature;
    value.push({
      LITERATURE_ID: 1,
      LITERATURE_NAME: "buteelin ner",
      LITERATURE_TYPE_ID: 1,
      LITERATURE_TYPE_NAME: "butelin turul",
      LITERATURE_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      LITERATURE_DESC: "tailbar",
      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Literature: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/LiteratureDelete",
        method: "POST",
        data: {
          Literature: {
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
      Literature: data?.Literature.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Literature !== undefined) {
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
            <span>8. Бүтээлийн жагсаалт</span>
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
          <em style={{ marginLeft: "10px", color: "#418ee6" }}>
            "Тайлбар" хэсэгт гадаад хэлнээс орчуулсан болон хамтран зохиогчийн
            тухай тэмдэглэнэ.
          </em>
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
                    <span className="textSaaral">Бүтээлийн нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Бүтээлийн төрөл</span>
                  </td>
                  <td>
                    <span className="textSaaral">Бүтээл гаргасан огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">Тайлбар</span>
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
                {data?.Literature?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Literature[index]?.LITERATURE_NAME}
                        onChange={(text) => {
                          let value = [...data?.Literature];
                          value[index].LITERATURE_NAME = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Literature: value });
                        }}
                      />
                    </td>

                    <td>
                      <Literaturetype
                        personChild={data.Literature[index]}
                        setPersonChild={setLiterature}
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
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Literature[index].LITERATURE_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Literature];
                          value[index].LITERATURE_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Literature: value });
                        }}
                      />
                    </td>
                    <td>
                      <textarea
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Literature[index]?.LITERATURE_DESC}
                        onChange={(text) => {
                          let value = [...data?.Literature];
                          value[index].LITERATURE_DESC = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Literature: value });
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

export default Buteeliin;
