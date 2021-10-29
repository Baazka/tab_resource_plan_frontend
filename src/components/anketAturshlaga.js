import React, { useState, useEffect } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Add, Delete } from "../assets/images/zurag";
import { Office, Positioncategorytype } from "./library";

const axios = require("axios");
var dateFormat = require("dateformat");

function Turshlgin(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Experience/" + props.person_id
      );
      console.log(listItems, "turshlaga");
      loadData({
        Experience: listItems?.data?.Experience.sort(function sortFunction(
          a,
          b
        ) {
          var dateA = new Date(a.ENTERED_DATE).getTime();
          var dateB = new Date(b.ENTERED_DATE).getTime();
          return dateA > dateB ? 1 : -1;
        }),
      });
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (data?.Experience === undefined || data?.Experience.length === 0)
      loadData({
        Experience: [
          {
            OFFICE_ID: 1,
            SUB_OFFICE_ID: 1,
            EXPERIENCE_DEPARTMENT: "",
            EXPERIENCE_ORG: "",
            EXPERIENCE_POSITION: "",
            POSITION_CATEGORY_TYPE_ID: 1,
            ENTERED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            ENTERED_NO: "",
            EXPIRED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXPIRED_NO: "",
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
      let newRow = data?.Experience?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Experience?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/experience/",
          method: "POST",
          data: { experience: newRow },
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
          url: "http://hr.audit.mn/hr/api/v1/experience/",
          method: "PUT",
          data: { experience: oldRow },
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
  function setExperience(value) {
    let arr = data.Experience;
    arr[value.index] = value;
    loadData({ Experience: arr });
  }
  function requiredField() {
    for (let i = 0; i < data.Experience.length; i++) {
      if (
        data.Experience[i].EXPERIENCE_DEPARTMENT === null ||
        data.Experience[i].EXPERIENCE_DEPARTMENT === ""
      ) {
        alert.show("Газар хэлтэс, алба оруулан уу");
        return false;
      } else if (
        data.Experience[i].EXPERIENCE_ORG === null ||
        data.Experience[i].EXPERIENCE_ORG === ""
      ) {
        alert.show("Ажилласан байгууллагынНэр оруулан уу");
        return false;
      } else if (
        data.Experience[i].EXPERIENCE_POSITION === null ||
        data.Experience[i].EXPERIENCE_POSITION === ""
      ) {
        alert.show("Эрхэлсэн албан тушаал оруулан уу");
        return false;
      } else if (
        data.Experience[i].POSITION_CATEGORY_TYPE_ID === null ||
        data.Experience[i].POSITION_CATEGORY_TYPE_ID === ""
      ) {
        alert.show("Албан тушаалын төрөл оруулан уу");
        return false;
      } else if (i === data.Experience.length - 1) {
        return true;
      }
    }
  }
  async function addRow() {
    let value = data.Experience;
    value.push({
      OFFICE_ID: 1,
      SUB_OFFICE_ID: 1,
      EXPERIENCE_DEPARTMENT: "",
      EXPERIENCE_ORG: "",
      EXPERIENCE_POSITION: "",
      POSITION_CATEGORY_TYPE_ID: 1,
      ENTERED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      ENTERED_NO: "",
      EXPIRED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      EXPIRED_NO: "",
      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Experience: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/experienceDelete",
        method: "POST",
        data: {
          experience: {
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
          console.log("deleteResponse", response);
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
      Experience: data?.Experience.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }
  function setOfficeId(value) {
    let temp = [...data?.Experience];
    temp[value.index].OFFICE_ID = value.OFFICE_ID;
    temp[value.index].UPDATED_BY = userDetils?.USER_ID;
    temp[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ Experience: temp });
  }
  function setSubOfficeId(value) {
    let temp = [...data?.Experience];
    temp[value.index].SUB_OFFICE_ID = value.SUB_OFFICE_ID;
    temp[value.index].UPDATED_BY = userDetils?.USER_ID;
    temp[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ Experience: temp });
  }
  function setPositioncategorytype(value) {
    let temp = [...data?.Experience];
    temp[value.index].POSITION_CATEGORY_TYPE_ID =
      value.POSITION_CATEGORY_TYPE_ID;
    temp[value.index].UPDATED_BY = userDetils?.USER_ID;
    temp[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ Experience: temp });
  }

  let listItems;
  if (data?.Experience !== undefined && data?.Experience.length !== 0) {
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
              7. Туршлагын талаарх мэдээлэл
            </span>
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
        <div class="columns">
          <div class="column">
            <em className="has-text-link">
              7.1. Ажилласан байдал (*Байгууллагын нэрийг бүтнээр бичнэ)
            </em>
          </div>
        </div>
        <div className="columns">
          <div class="table-container">
            <table className="table is-bordered ">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td>
                    <span className="textSaaral">Ажилласан аймаг, хот</span>
                  </td>
                  {/* <td>
                    <span className="textSaaral">Ажилласан сум, дүүрэг</span>
                  </td> */}
                  <td>
                    <span className="textSaaral">
                      Ажилласан байгууллагын нэр
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">Газар хэлтэс, алба</span>
                  </td>
                  <td>
                    <span className="textSaaral">Эрхэлсэн албан тушаал</span>
                  </td>
                  <td>
                    <span className="textSaaral">Албан тушаалын төрөл</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Ажилд орсон он, сар, өдөр
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Ажилд томилогдсон тушаалын дугаар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Ажлаас чөлөөлөгдсөн он, сар
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Ажлаас чөлөөлөгдсөн тушаалын дугаар
                    </span>
                  </td>
                  {!edit ? (
                    <td
                      style={{
                        border: "none",
                        paddingLeft: "0px",
                      }}
                    >
                      <span style={{ visibility: "hidden" }}>testeee</span>
                      <img
                        alt=""
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.Experience?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <Office
                        personChild={data.Experience[index]}
                        setPersonChild={setOfficeId}
                        fullWidth={true}
                        index={index}
                        edit={edit}
                      />
                    </td>
                    {/* <td>
                      <Suboffice
                        personChild={data.Experience[index]}
                        setPersonChild={setSubOfficeId}
                        fullWidth={true}
                        index={index}
                        edit={edit}
                      />
                    </td> */}
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_ORG}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_ORG = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_DEPARTMENT}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_DEPARTMENT =
                            text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_POSITION}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_POSITION = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>

                    <td>
                      <Positioncategorytype
                        personChild={data.Experience[index]}
                        setPersonChild={setPositioncategorytype}
                        fullWidth={true}
                        index={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "120px" }}
                        value={dateFormat(
                          data.Experience[index].ENTERED_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Experience];
                          value[index].ENTERED_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.ENTERED_NO}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].ENTERED_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "120px" }}
                        value={dateFormat(
                          data.Experience[index].EXPIRED_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Experience];
                          value[index].EXPIRED_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPIRED_NO}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPIRED_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Experience: value });
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
                          alt=""
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeRow(index, value)}
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
export default Turshlgin;
