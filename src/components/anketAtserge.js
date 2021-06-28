import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Edutype } from "./library";
import { Add, Delete } from "../assets/images/zurag";

const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function TsergiinAlba(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/force/" + props.person_id
    );
    console.log(listItems, "force");
    loadData(listItems?.data);
  }, [props]);
  useEffect(() => {
    if (data?.Force === undefined || data.Force.length === 0) {
      loadData({
        Force: [
          {
            FORCE_TYPE_ID: 1,
            FORCE_TYPE_NAME: "",
            FORCE_NO: "",
            FORCE_LOCATION: "",
            FORCE_DESC: "",
            IS_ACTIVE: "1",
            PERSON_ID: props.person_id,
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
    }
  }, [data]);
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/forceDelete",
        method: "POST",
        data: {
          award: {
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
      Award: data?.Award.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    if (data.Force[0].ROWTYPE === "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/force/",
        method: "POST",
        data: { force: data.Force[0] },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success");
          alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    } else {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/force/",
        method: "PUT",
        data: { force: data.Force[0] },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success");
          alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
  }

  let listItems;
  if (data?.Force !== undefined && data?.Force.length !== 0) {
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
            <span className="headerTextBold">
              5. Цэргийн Алба хаасан хэсэх{" "}
              <input
                type="checkbox"
                value={edit}
                onChange={() => setEdit(!edit)}
              />
            </span>
          </div>
          <div className="column is-1">
            {/* <button
              className="buttonTsenkher"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Засварлах
            </button> */}
          </div>
        </div>
        {!edit ? (
          <div>
            <div className="columns">
              <div className="column is-6  has-text-right">
                Цэргийн үүрэгтний үнэмлэхийн дугаар
              </div>
              <div className="column ml-1">
                {" "}
                <input
                  disabled={edit}
                  className="Borderless"
                  value={data.Force[0]?.FORCE_NO}
                  onChange={(text) => {
                    let value = [...data?.Force];
                    value[0].FORCE_NO = text.target.value;
                    value[0].UPDATED_BY = userDetils?.USER_ID;
                    value[0].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
                    loadData({ Force: value });
                  }}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-6  has-text-right">
                Цэргийн алба хаасан байдал
              </div>
              <div className="column ml-1">
                <select
                  disabled={edit}
                  className="Borderless"
                  value={data?.Force[0].FORCE_TYPE_ID}
                  onChange={(text) => {
                    let value = [...data?.Force];
                    value[0].FORCE_TYPE_ID = text.target.value;
                    value[0].UPDATED_BY = userDetils?.USER_ID;
                    value[0].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
                    loadData({ Force: value });
                  }}
                >
                  <option value={1}>хаасан</option>
                  <option value={2}>хаагаагүй</option>
                </select>
              </div>
            </div>
            <div className="columns">
              <div className="column is-6 has-text-right">Хаана</div>
              <div className="column ml-1">
                {" "}
                <input
                  disabled={edit}
                  className="Borderless"
                  value={data.Force[0]?.FORCE_LOCATION}
                  onChange={(text) => {
                    let value = [...data?.Force];
                    value[0].FORCE_LOCATION = text.target.value;
                    value[0].UPDATED_BY = userDetils?.USER_ID;
                    value[0].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
                    loadData({ Force: value });
                  }}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-6 has-text-right">Тайлбар</div>
              <div className="column ml-1">
                <input
                  disabled={edit}
                  className="Borderless"
                  value={data.Force[0]?.FORCE_DESC}
                  onChange={(text) => {
                    let value = [...data?.Force];
                    value[0].FORCE_DESC = text.target.value;
                    value[0].UPDATED_BY = userDetils?.USER_ID;
                    value[0].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
                    loadData({ Force: value });
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
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

export default TsergiinAlba;
