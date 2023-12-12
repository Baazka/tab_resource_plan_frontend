import React, { useState, useEffect } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Add, Delete } from "../assets/images/zurag";
import hrUrl from "../hrUrl";
const axios = require("axios");
var dateFormat = require("dateformat");

function Buteeliin(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(hrUrl + "/Literature/" + props.person_id);
      console.log(listItems, "Tangarag");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (data?.Literature === undefined || data?.Literature.length === 0)
      loadData({
        Literature: [
          {
            LITERATURE_ID: 1,
            LITERATURE_NAME: "",
            LITERATURE_TYPE: "",
            LITERATURE_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            LITERATURE_DESC: "",
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
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Literature?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Literature?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;
      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: hrUrl + "/literature/",
          method: "POST",
          data: { literature: newRow },
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
          url: hrUrl + "/literature/",
          method: "PUT",
          data: { literature: oldRow },
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

  function setLiterature(value) {
    let arr = data.Literature;
    arr[value.index] = value;
    loadData({ Literature: arr });
  }

  function requiredField() {
    for (let i = 0; i < data.Literature.length; i++) {
      if (
        data.Literature[i].LITERATURE_NAME === null ||
        data.Literature[i].LITERATURE_NAME === ""
      ) {
        alert.show("Бүтээлийн нэр оруулна уу");
        return false;
      } else if (
        data.Literature[i].LITERATURE_TYPE === null ||
        data.Literature[i].LITERATURE_TYPE === ""
      ) {
        alert.show("Бүтээлийн төрөл оруулна уу");
        return false;
      } else if (i === data.Literature.length - 1) {
        return true;
      }
    }
  }

  async function addRow() {
    let value = data.Literature;
    value.push({
      LITERATURE_ID: 1,
      LITERATURE_NAME: "",
      LITERATURE_TYPE: "",
      LITERATURE_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      LITERATURE_DESC: "",
      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Literature: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: hrUrl + "/literatureDelete",
        method: "POST",
        data: {
          literature: {
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
      Literature: data?.Literature.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Literature !== undefined || data?.Literature.length !== 0) {
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
            <span className="headerTextBold">8. Бүтээлийн жагсаалт</span>
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
                  {!edit ? (
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
                        alt=""
                      />
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.Literature?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <textarea
                        textarea={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.Literature[index]?.LITERATURE_NAME}
                        style={{ width: "100%" }}
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
                      <textarea
                        disabled={edit}
                        style={{ width: "100%" }}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.Literature[index]?.LITERATURE_TYPE}
                        onChange={(text) => {
                          let value = [...data?.Literature];
                          value[index].LITERATURE_TYPE = text.target.value;
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
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Literature[index].LITERATURE_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Literature];
                          value[index].LITERATURE_DATE = e.target.value;
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
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
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
                    {!edit ? (
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
                          alt=""
                        />
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

export default Buteeliin;
