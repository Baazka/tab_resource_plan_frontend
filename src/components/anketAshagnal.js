import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Edutype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

// function ShagnaliinOld(props) {
//   return (
//     <div
//       className="box"
//       style={{
//         marginTop: "80px",
//         width: "98%",
//         height: "31%",
//         marginLeft: "15px",
//       }}
//     >
//       <div class="columns">
//         <div class="column is-11">
//           <th>Зургаа. Шагналын талаарх мэдээлэл</th>
//         </div>
//         <button className="button is-info is-small is-focused ml-5">
//           Засварлах
//         </button>
//       </div>
//       <div class="columns is-9">
//         <em className="TABLE m-3 has-text-link	">
//           (Төрийн дээд шагнал, Засгийн газрын шагнал болон салбарын бусад
//           шагналыг бичнэ)
//         </em>
//         <div class="column is-3" />
//       </div>

//       <div class="columns is-11">
//         <table className="table is-bordered p-3">
//           <thead>
//             <tr>
//               <td>№</td>
//               <td>Шагнагдсан огноо</td>
//               <td>Шагналын нэр</td>
//               <td>Шийдэрийн нэр, дугаар</td>
//               <td>Огноо</td>
//               <td>Шагнуулсан</td>
//               <td>Шагнуулсан үндэслэл</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th></th>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//         <div class="column is-1 " />
//       </div>
//       <div class="columns">
//         <div class="column is-5" />

//         <em className="TABLE m-3"></em>
//       </div>
//       <div class="columns">
//         <div class="column is-9" />

//         <button className="button is-info is-small is-focused ml-4">
//           Хэвлэх
//         </button>
//         <button className="button is-info is-small is-focused ml-3">
//           Хадгалах
//         </button>
//         <button className="button is-info is-small is-focused ml-3">
//           Хадгалаад харах
//         </button>
//         <div class="column is-3"></div>
//       </div>
//     </div>
//   );
// }

function Shagnaliin(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Award/" + props.person_id
      );
      console.log(listItems, "Tangarag");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (data?.Award === undefined || data?.Award.length === 0)
      loadData({
        Award: [
          {
            AWARD_ID: 1,
            AWARD_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            AWARD_NAME: "",
            DECISION_NO: "",
            DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            AWARD_DESC: "",
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
      let newRow = data?.Award?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Award?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/Award/",
          method: "POST",
          data: { award: newRow },
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
          url: "http://hr.audit.mn/hr/api/v1/Award/",
          method: "PUT",
          data: { award: oldRow },
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
  function setAward(value) {
    let arr = data.Award;
    arr[value.index] = value;
    loadData({ Award: arr });
  }
  function requiredField() {
    // emergency.forEach((a, index) => {
    for (let i = 0; i < data.Award.length; i++) {
      if (
        data.Award[i].AWARD_NAME === null ||
        data.Award[i].AWARD_NAME === ""
      ) {
        alert.show("Шагналын нэр оруулан уу");
        return false;
      } else if (i === data.Award.length - 1) {
        return true;
      }
    }
  }

  async function addRow() {
    let value = data.Award;
    value.push({
      AWARD_ID: 1,
      AWARD_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      AWARD_NAME: "",
      DECISION_NO: "",
      DECISION_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      AWARD_DESC: "",
      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ Award: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/awardDelete",
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
      Award: data?.Award.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.Award !== undefined) {
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
            <span className="headerTextBold">6. Шагналын талаарх мэдээлэл</span>
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
            (Төрийн дээд шагнал,Засгийн газрын шагнал болон салбарын бусад
            шагналыг бичнэ.)
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
                    <span className="textSaaral">Шагнагдсан огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">Шагналын нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Шийдэрийн нэр, дугаар</span>
                  </td>
                  <td>
                    <span className="textSaaral">Огноо</span>
                  </td>
                  <td>
                    <span className="textSaaral">Шагнуулсан үндэслэл</span>
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
                      />
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.Award?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Award[index].AWARD_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Award];
                          value[index].AWARD_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Award: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        placeholder="утгаа оруулна уу"
                        className="Borderless"
                        value={data.Award[index]?.AWARD_NAME}
                        onChange={(text) => {
                          let value = [...data?.Award];
                          value[index].AWARD_NAME = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Award: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        placeholder="утгаа оруулна уу"
                        className="Borderless"
                        value={data.Award[index]?.DECISION_NO}
                        onChange={(text) => {
                          let value = [...data?.Award];
                          value[index].DECISION_NO = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Award: value });
                        }}
                      />
                    </td>

                    <td>
                      <input
                        type="date"
                        disabled={edit}
                        className="Borderless"
                        value={dateFormat(
                          data.Award[index].DECISION_DATE,
                          "yyyy-mm-dd"
                        )}
                        onChange={(e) => {
                          let value = [...data?.Award];
                          value[index].DECISION_DATE = e.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Award: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        placeholder="утгаа оруулна уу"
                        className="Borderless"
                        value={data.Award[index]?.AWARD_DESC}
                        onChange={(text) => {
                          let value = [...data?.Award];
                          value[index].AWARD_DESC = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ Award: value });
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
export default Shagnaliin;
