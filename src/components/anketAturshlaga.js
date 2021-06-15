import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Edutype } from "./library";
import { Add, Delete } from "../assets/images/zurag";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

// function Turshlgin(props) {
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
//           <th>Долоо. Туршлагын талаарх мэдээлэл</th>
//         </div>
//         <button className="button is-info is-small is-focused ml-5">
//           Засварлах
//         </button>
//       </div>
//       <div class="columns is-10">
//         <em className="TABLE m-3 has-text-link	">
//           7.1 Ажилласан байдаг/ төрийн улс төрийн алба/
//         </em>
//         <div class="column is-2" />
//         <div class="columns is-9" />
//         <em className="TABLE m-3 has-text-link	">
//           (<span style={{ color: "red" }}>*</span>Байгуулагын нэрийг бүтнээр
//           бичнэ)
//         </em>
//         <div class="column is-3" />
//       </div>
//       <div class="columns is-12">
//         <div class="column is-0 " />

//         <table className="table is-bordered p-3">
//           <thead>
//             <tr>
//               <td>№</td>
//               <td>Ажилласан аймаг, хот</td>
//               <td>Ажилласан сум, дүүрэг</td>
//               <td>газар хэлтэс, Алба</td>
//               <td>Ажилласан Байгуулагын Нэр</td>
//               <td>Эрхэлсэн албан тушаал</td>
//               <td>Албан тушаалын төрөл</td>
//               <td>Ажилд орсон он, сар, өдөр</td>
//               <td>Ажилд томилогдсон тушаалын дугаар</td>
//               <td>Ажлаас чөлөөлөгдсөн он, сар</td>
//               <td>Ажилаас чөлөөлөгдсөн тушаалын дугаар</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

function Turshlgin(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://10.10.10.46:3002/api/v1/Experience/" + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Experience === undefined || data?.Experience.length === 0)
      loadData({
        Experience: [
          {
            EXPERIENCE_OFFICE: "aimag hot",
            EXPERIENCE_SUBOFFICE: "sun duureg",
            EXPERIENCE_DEPARTMENT: "gazar ",
            EXPERIENCE_ORG: "baiguullaga ner",
            EXPERIENCE_POSITION: "alban tushaal",
            EXPERIENCE_POSITION_TYPE: null,
            ENTERED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            ENTERED_NO: "tushaal dugaar",
            EXPIRED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            EXPIRED_NO: "tushaal dugaar",
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
    let newRow = data?.Experience?.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = data?.Experience?.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://10.10.10.46:3002/api/v1/experience/",
        method: "POST",
        data: { experience: newRow },
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
        url: "http://10.10.10.46:3002/api/v1/experience/",
        method: "PUT",
        data: { experience: oldRow },
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
  function setExperience(value) {
    let arr = data.Experience;
    arr[value.index] = value;
    loadData({ Experience: arr });
  }
  async function addRow() {
    let value = data.Experience;
    value.push({
      EXPERIENCE_OFFICE: "aimag hot",
      EXPERIENCE_SUBOFFICE: "sun duureg",
      EXPERIENCE_DEPARTMENT: "gazar ",
      EXPERIENCE_ORG: "baiguullaga ner",
      EXPERIENCE_POSITION: "alban tushaal",
      EXPERIENCE_POSITION_TYPE: null,
      ENTERED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      ENTERED_NO: "tushaal dugaar",
      EXPIRED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      EXPIRED_NO: "tushaal dugaar",
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
        url: "http://10.10.10.46:3002/api/v1/experienceDelete",
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
      Experience: data?.Experience.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
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
            <span>7. Туршлагын талаарх мэдээлэл</span>
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
                  <td>
                    <span className="textSaaral">Ажилласан сум, дүүрэг</span>
                  </td>
                  <td>
                    <span className="textSaaral">Газар хэлтэс, алба</span>
                  </td>
                  <td>
                    <span className="textSaaral">
                      Ажилласан Байгуулагын Нэр
                    </span>
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
                      Ажилаас чөлөөлөгдсөн тушаалын дугаар
                    </span>
                  </td>

                  <td
                    style={{
                      border: "none",
                      paddingLeft: "0px",
                      width: "100px",
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
                {data?.Experience?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_OFFICE}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_OFFICE = text.target.value;
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
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_SUBOFFICE}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_SUBOFFICE = text.target.value;
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
                      <input
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "100px" }}
                        value={data.Experience[index]?.EXPERIENCE_POSITION_TYPE}
                        onChange={(text) => {
                          let value = [...data?.Experience];
                          value[index].EXPERIENCE_POSITION_TYPE =
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
                        type="date"
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Experience[index].ENTERED_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Experience];
                          value[index].ENTERED_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        id="start"
                        disabled={edit}
                        className="Borderless"
                        style={{ width: "118px" }}
                        value={dateFormat(
                          new Date(data.Experience[index].EXPIRED_DATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          let value = [...data?.Experience];
                          value[index].EXPIRED_DATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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

                    <td
                      style={{
                        paddingLeft: "0px",
                        borderColor: "transparent",
                        width: "70px",
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
export default Turshlgin;
