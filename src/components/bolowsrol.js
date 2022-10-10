import React, { useEffect, useState } from "react";
import { Excel } from "../assets/images/zurag";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Header from "../components/header";

import { useHistory } from "react-router-dom";
import hrUrl from "../hrUrl";
const axios = require("axios");

function Bolowsrol1(props) {
  const history = useHistory();
  function butsakh() {
    history.goBack();
  }
  const [data, loadData] = useState([]);
  let too = 0;

  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(hrUrl + "/reportEmpEducation");
      let temp = "";
      let arr = [];
      listItems?.data.map((value, index) => {
        let tempV = value;
        if (temp !== value.PERSON_FNAME) {
          tempV.isGroup = true;
          arr.push(tempV);
          temp = value.PERSON_FNAME;
        } else {
          tempV.isGroup = false;
          arr.push(tempV);
        }
      });
      loadData(arr);
    }
    fetchdata();
  }, [props]);
  let listItems;

  if (data.length > 0) {
    listItems = (
      <div>
        <Header title="Судалгаа" back={true} butsakh={butsakh}></Header>
        <div
          style={{
            backgroundColor: "white",
            width: "93%",
            height: "99vh",
            marginLeft: "7.5rem",
            marginBottom: "1%",
            display: "flex",
            overflow: "scroll",
          }}
        >
          {" "}
          {/* <div
            style={{ marginTop: "5%", overflow: "scroll", marginRight: "7%" }}
          > */}
          <div style={{ marginTop: "5%" }}>
            <div className="columns ">
              <div className="column is-4 ">
                <span
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "8rem",
                  }}
                >
                  Албан хаагчдын боловсролын судалгаа
                </span>
              </div>
              <div className="column is-7 "></div>
              <div className="column is-1 ml-6 ">
                <div style={{ display: "none" }}>
                  <ReactHTMLTableToExcel
                    id="Bolowsrol1XLS"
                    className="download-table-xls-button"
                    table="reportEmpAward"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="XLS"
                  />
                </div>

                <button
                  class="text"
                  style={{
                    marginLeft: "7%",
                    borderRadius: "5px",
                    backgroundColor: "#1cc88a",
                    color: "#fff",
                    border: "double",
                  }}
                  onClick={() =>
                    document.getElementById("Bolowsrol1XLS").click()
                  }
                >
                  <span style={{ display: "flex" }}>
                    <img alt="" src={Excel} width="20px" height="20px "></img>
                    Excel
                  </span>
                </button>
              </div>
            </div>
            <table id="reportEmpAward" className="table is-bordered ">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Овог нэр</th>
                  <th>Албан тушаал</th>
                  <th></th>
                  <th>Зэрэг</th>
                  <th>Мэргэжил</th>
                  <th>Огноо</th>
                  <th>Сургууль</th>
                </tr>
              </thead>
              {data.map((value, index) =>
                value.isGroup === true ? (
                  <tr>
                    <td
                      style={{
                        borderTop: "1.1px solid #f1f1f1",
                        borderBottom: "1px solid transparent",
                      }}
                    >
                      {value.isGroup === true ? (too = too + 1) : too}
                    </td>
                    <td
                      style={{
                        borderTop: "1.1px solid #f1f1f1",
                        borderBottom: "1px solid transparent",
                      }}
                    >
                      {value.PERSON_FNAME}
                    </td>
                    <td>{value.POSITION_NAME}</td>
                    <td>{value.PE_NO}</td>
                    <td>{value.EDUCATION_TYPE_SHORT_NAME}</td>
                    <td>{value.PROFESSION_NAME}</td>
                    <td>{value.PE_DATE}</td>
                    <td>{value.SCHOOL_NAME}</td>
                  </tr>
                ) : (
                  <tr>
                    <td style={{ borderBottom: "1px solid transparent" }}></td>
                    <td style={{ borderBottom: "1px solid transparent" }}></td>
                    <td>{value.POSITION_NAME}</td>
                    <td>{value.PE_NO}</td>
                    <td>{value.EDUCATION_TYPE_SHORT_NAME}</td>
                    <td>{value.PROFESSION_NAME}</td>
                    <td>{value.PE_DATE}</td>
                    <td>{value.SCHOOL_NAME}</td>
                  </tr>
                )
              )}
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = (
      <div>
        <div style={{ marginTop: "10%" }}>
          <div
            style={{ marginTop: "5%", overflow: "scroll", marginRight: "7%" }}
          >
            <div>
              <table className="table is-bordered ">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Овог Нэр</th>
                    <th>Албан тушаал</th>
                    <th>№</th>
                    <th>Мэргэжил</th>
                    <th>Огноо</th>
                    <th>Сургууль</th>
                  </tr>
                  <tr>
                    <th colSpan="7" style={{ textAlignLast: " center" }}>
                      Удирдлага
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="3">1</td>
                    <td rowSpan="3">Д.Зандбат</td>
                    <td></td>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return listItems;
}

export default Bolowsrol1;
