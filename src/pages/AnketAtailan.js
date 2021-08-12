import Header from "../components/header";
import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Excel } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { DepartmentID } from "../components/library";
import { useAlert } from "react-alert";
var dateFormat = require("dateformat");

const axios = require("axios");

function AnketAtailan(props) {
  const history = useHistory();
  function butsakh() {
    history.goBack();
  }

  return (
    <div
      style={{
        display: "flow",
        height: "100vh",
        width: "100%",
        overflow: "scroll",
        backgroundColor: "#f1f1f1",
      }}
    >
      <Header title="Тайлан" back={true} butsakh={butsakh}></Header>
      <div style={{ marginTop: "5%" }}>
        {props.match.params.turul === "emergency" ? <Emergency /> : null}
        {props.match.params.turul === "gerBvl" ? <GerBvl /> : null}
        {props.match.params.turul === "sadan" ? <Sadan /> : null}
        {props.match.params.turul === "ShalgaltiinTalaarkhMedeelel" ? (
          <ShalgaltiinTalaarkhMedeelel />
        ) : null}
        {props.match.params.turul === "TangaragiinBvrtgel" ? (
          <TangaragiinBvrtgel />
        ) : null}
        {props.match.params.turul === "GadaadHelniiMedleg" ? (
          <GadaadHelniiMedleg />
        ) : null}
        {props.match.params.turul === "Bolowsrol" ? <Bolowsrol /> : null}
        {props.match.params.turul === "BolowsrolDoktor" ? (
          <BolowsrolDoktor />
        ) : null}
        {props.match.params.turul === "MergeshliinBeltgel" ? (
          <MergeshliinBeltgel />
        ) : null}
        {props.match.params.turul === "ErdmiinTsol" ? <ErdmiinTsol /> : null}
        {props.match.params.turul === "TsergiinAlba" ? <TsergiinAlba /> : null}
        {props.match.params.turul === "ShagnaliinTalaarhMedeelel" ? (
          <ShagnaliinTalaarhMedeelel />
        ) : null}
        {props.match.params.turul === "TurshlagiinTalaarhMedeelel" ? (
          <TurshlagiinTalaarhMedeelel />
        ) : null}
        {props.match.params.turul === "BvteeliinJagsaalt" ? (
          <BvteeliinJagsaalt />
        ) : null}
      </div>
    </div>
  );
}
function Emergency(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  const [register, setRegister] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportEmergency/"
      );

      if (listItems.data !== undefined && listItems.data.length === 0)
        alert.show("өгөгдөл байхгүй байна");
      else loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportEmergency/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 19% 10px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Зайлшгүй шаардлагатай үед холбоо барих хүн
          </span>
          <div className="columns mt-1">
            <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>

              <label
                class="checkbox"
                style={{ marginLeft: "10px", marginTop: "5px" }}
              >
                <input
                  type="checkbox"
                  value={register}
                  onChange={() => setRegister(!register)}
                />
                <span style={{ marginLeft: "2px" }}>
                  Регистерийн дугаар харах эсэх
                </span>
              </label>
            </div>
            <div className="column is-2 ml-6"></div>
            <div className="column is-1 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="emergencyXLS"
                  className="download-table-xls-button"
                  table="emergencyXls"
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
                onClick={() => document.getElementById("emergencyXLS").click()}
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>
          <div class="columns ">
            <div
              class="column is-8 ml-6"
              style={{ display: "grid", textAlignLast: "center" }}
            >
              <table id={"emergencyXls"} className="table is-bordered">
                <thead style={{ backgroundColor: "#f1f1f1" }}>
                  <tr>
                    <td>№</td>
                    <td>Ажилтны нэр</td>
                    {register === false ? <td>Регистерийн дугаар</td> : null}
                    <td>Овог</td>
                    <td>Нэр</td>
                    <td>Таны юу болох</td>
                    <td>Утасны дугаар</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value, index) => (
                    <tr>
                      <td style={{ width: "2rem" }}>{index + 1}</td>
                      <td style={{ width: "10rem" }}>{value.PERSON_NAME}</td>
                      {register === false ? (
                        <td style={{ width: "20rem" }}>
                          {value.PERSON_REGISTER_NO}
                        </td>
                      ) : null}
                      <td style={{ width: "10rem" }}>
                        {value.EMERGENCY_LASTNAME}
                      </td>
                      <td style={{ width: "10rem" }}>
                        {value.EMERGENCY_FIRSTNAME}
                      </td>
                      <td style={{ width: "10rem" }}>{value.FAMILY_NAME}</td>
                      <td style={{ width: "20rem" }}>
                        {value.EMERGENCY_PHONE}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function GerBvl(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  const [register, setRegister] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportFamily/1/"
      );
      console.log("amjilttai", listItems.data);
      if (listItems.data !== undefined && listItems.data.length === 0)
        alert.show("өгөгдөл байхгүй байна");
      else loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportFamily/1/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 27% 10px" }}
        >
          <div>
            <span
              style={{
                fontSize: "2rem",
                marginLeft: "3rem",
                marginBottom: "3rem",
              }}
            >
              Гэр бүлийн байдал
            </span>
            <div className="columns">
              <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
                <div class="select">
                  <DepartmentID
                    personChild={department}
                    setPersonChild={setDepartment}
                  />
                </div>

                <label
                  class="checkbox"
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                >
                  <input
                    type="checkbox"
                    value={register}
                    onChange={() => setRegister(!register)}
                  />
                  <span style={{ marginLeft: "2px" }}>
                    Регистерийн дугаар харах эсэх
                  </span>
                </label>
              </div>
              <div className="column is-4 ml-6"></div>
              <div className="column is-2 ">
                <div style={{ display: "none" }}>
                  <ReactHTMLTableToExcel
                    id="GerBvlXLS"
                    className="download-table-xls-button"
                    table="GerBvlXls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="XLS"
                  />
                </div>
                <button
                  class="text"
                  style={{
                    marginLeft: "12%",
                    borderRadius: "1px",
                    backgroundColor: "#1cc88a",
                    color: "#fff",
                    border: "double",
                  }}
                  onClick={() => document.getElementById("GerBvlXLS").click()}
                >
                  <span style={{ display: "flex" }}>
                    <img src={Excel} width="20px" height="20px "></img>Excel
                  </span>
                </button>
              </div>
            </div>

            <div className="columns">
              <div className="column is-11 ml-6">
                <div className="table-container">
                  <table
                    id={"GerBvlXls"}
                    className="table is-bordered is-flex-wrap-wrap"
                  >
                    <tbody>
                      <tr>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>№</span>
                        </td>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Ажилтны нэр</span>
                        </td>
                        {register === false ? (
                          <td
                            rowspan="2"
                            style={{ backgroundColor: "#f1f1f1" }}
                          >
                            Регистерийн дугаар
                          </td>
                        ) : null}
                        {/* <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Овог</span>
                        </td> */}

                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Таны юу болох</span>
                        </td>

                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          {" "}
                          <span>Гэр бүлийн гишүүний эцэг,эхийн нэр</span>
                        </td>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Гэр бүлийн гишүүний нэр</span>
                        </td>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Төрсөн он, сар, өдөр</span>
                        </td>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Төрсөн аймаг, хот</span>
                        </td>
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Төрсөн сум, дүүрэг</span>
                        </td>
                        <td colspan="3" style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Одоо эрхэлэж буй ажил</span>
                        </td>
                        <td
                          rowspan="2"
                          style={{ border: "none", width: "60px" }}
                        ></td>
                      </tr>

                      <tr>
                        <td style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Байгуулагын Нэр</span>
                        </td>
                        <td style={{ backgroundColor: "#f1f1f1" }}>
                          <span>Албан тушаал</span>
                        </td>
                      </tr>
                      {data?.map((value, index) => (
                        <tr>
                          <td>
                            {" "}
                            <span>{index + 1}</span>
                          </td>

                          <td>{value.PERSON_NAME}</td>

                          {/* <td>{value.PERSON_LASTNAME}</td>

                          <td>{value.PERSON_FIRSTNAME}</td> */}
                          {register === false ? (
                            <td style={{ width: "20rem" }}>
                              {value.PERSON_REGISTER_NO}
                            </td>
                          ) : null}
                          <td>{value.FAMILY_NAME}</td>
                          <td>{value.MEMBER_LASTNAME}</td>
                          <td>{value.MEMBER_FIRSTNAME}</td>
                          <td>
                            {dateFormat(
                              value.MEMBER_BIRTHDATE === null ||
                                value.MEMBER_BIRTHDATE === undefined
                                ? new Date()
                                : value.MEMBER_BIRTHDATE,
                              "yyyy-mm-dd"
                            )}
                          </td>
                          <td>{value.OFFICE_NAME}</td>
                          <td>{value.SUB_OFFICE_NAME}</td>
                          <td>{value.MEMBER_ORG}</td>
                          <td>{value.MEMBER_POSITION}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function Sadan(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  const [register, setRegister] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportFamily/2/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportFamily/2/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 32% 10px" }}
        >
          <div>
            <span
              style={{
                fontSize: "2rem",
                marginLeft: "3rem",
                marginBottom: "3rem",
              }}
            >
              Садан төрлийн байдал
            </span>
            <div className="columns">
              <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
                <div class="select">
                  <DepartmentID
                    personChild={department}
                    setPersonChild={setDepartment}
                  />
                </div>
                <label
                  class="checkbox"
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                >
                  <input
                    type="checkbox"
                    value={register}
                    onChange={() => setRegister(!register)}
                  />
                  <span style={{ marginLeft: "2px" }}>
                    Регистерийн дугаар харах эсэх
                  </span>
                </label>
              </div>

              <div className="column is-4 ml-6"></div>
              <div className="column is-2 ">
                <div style={{ display: "none" }}>
                  <ReactHTMLTableToExcel
                    id="sadanXLS"
                    className="download-table-xls-button"
                    table="sadanXls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="XLS"
                  />
                </div>
                <button
                  class="text"
                  style={{
                    marginLeft: "12%",
                    borderRadius: "1px",
                    backgroundColor: "#1cc88a",
                    color: "#fff",
                    border: "double",
                  }}
                  onClick={() => document.getElementById("sadanXLS").click()}
                >
                  <span style={{ display: "flex" }}>
                    <img src={Excel} width="20px" height="20px "></img>Excel
                  </span>
                </button>
              </div>
            </div>

            <div className="columns">
              <div className="column is-12 ml-6">
                <table
                  id={"sadanXls"}
                  className="table is-bordered is-flex-wrap-wrap"
                >
                  <tbody>
                    <tr>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>№</span>
                      </td>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span> Ажилтны нэр</span>
                      </td>
                      {register === false ? (
                        <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                          Регистерийн дугаар
                        </td>
                      ) : null}
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        {" "}
                        <span>Гэр бүлийн гишүүний эцэг,эхийн нэр</span>
                      </td>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Гэр бүлийн гишүүний нэр</span>
                      </td>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Төрсөн он, сар, өдөр</span>
                      </td>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Төрсөн аймаг, хот</span>
                      </td>
                      <td rowspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Төрсөн сум, дүүрэг</span>
                      </td>
                      <td colspan="2" style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Одоо эрхэлэж буй ажил</span>
                      </td>
                      <td
                        rowspan="2"
                        style={{ border: "none", width: "60px" }}
                      ></td>
                    </tr>

                    <tr>
                      <td style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Байгуулагын Нэр</span>
                      </td>
                      <td style={{ backgroundColor: "#f1f1f1" }}>
                        <span>Албан тушаал</span>
                      </td>
                    </tr>
                    {data?.map((value, index) => (
                      <tr>
                        <td>
                          {" "}
                          <span>{index + 1}</span>
                        </td>
                        <td>{value.PERSON_NAME}</td>
                        {register === false ? (
                          <td style={{ width: "20rem" }}>
                            {value.PERSON_REGISTER_NO}
                          </td>
                        ) : null}
                        <td>{value.MEMBER_LASTNAME}</td>
                        <td>{value.MEMBER_FIRSTNAME}</td>

                        <td>
                          {dateFormat(
                            value.MEMBER_BIRTHDATE === null ||
                              value.MEMBER_BIRTHDATE === undefined
                              ? new Date()
                              : value.MEMBER_BIRTHDATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.OFFICE_NAME}</td>
                        <td>{value.SUB_OFFICE_NAME}</td>
                        <td>{value.MEMBER_ORG}</td>
                        <td>{value.MEMBER_POSITION}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function ShalgaltiinTalaarkhMedeelel(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/reportExam/");
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportExam/" + department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 6px 19% 20px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл
          </span>
          <div className="columns">
            <div className="column is-4 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-6 ml-1"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="shalgaltiinTalaarkhMedeelelXLS"
                  className="download-table-xls-button"
                  table="shalgaltiinTalaarkhMedeelelXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "0%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document
                    .getElementById("shalgaltiinTalaarkhMedeelelXLS")
                    .click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div className="columns">
            <div className="column is-11 ml-6">
              <div className="table-container">
                <table
                  id={"shalgaltiinTalaarkhMedeelelXls"}
                  className="table is-bordered is-flex-wrap-wrap"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны Нэр</td>
                      <td>Мэдээллийн агуулга</td>
                      <td>Шалгалт өгсөн эсэх</td>
                      <td>Шалгалт өгсөн байршил /Аймаг,хот/</td>
                      <td>Огноо</td>
                      <td>Шалгалтын оноо</td>
                      <td>Шийдэрийн дугаар</td>
                      <td>Шийдэрийн Огноо</td>
                      <td>Тайлбар</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.EXAM_TYPE_NAME}</td>
                        <td>{value.IS_EXAM}</td>
                        <td>{value.OFFICE_NAME}</td>

                        <td>
                          {dateFormat(
                            value.EXAM_DATE === null ||
                              value.EXAM_DATE === undefined
                              ? new Date()
                              : value.EXAM_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.EXAM_POINT}</td>

                        <td>{value.DECISION_NO}</td>

                        <td>
                          {dateFormat(
                            value.DECISION_DATE === null ||
                              value.DECISION_DATE === undefined
                              ? new Date()
                              : value.DECISION_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.DECISION_DESC}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function TangaragiinBvrtgel(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/reportOath/");
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportOath/" + department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 27px 27% 20px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Тангарагын бүртгэл
          </span>
          <div className="columns">
            <div className="column is-3 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-3 ml-6"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="tangaragiinBvrtgelXLS"
                  className="download-table-xls-button"
                  table="tangaragiinBvrtgelXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "30%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("tangaragiinBvrtgelXLS").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>
          <div className="columns">
            <div className="column is-12 ml-6">
              <div className="table-container">
                <table
                  id={"tangaragiinBvrtgelXls"}
                  className="table is-bordered is-flex-wrap-wrap"
                  id="table-to-xls"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Тангарагын төрөл</td>
                      <td>Тангараг өргөсөн огноо</td>
                      <td>Тангарагын шийдвэрийн дугаар</td>
                      <td>Тангарагын шийдвэрийн огноо</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.OATH_TYPE}</td>

                        <td>
                          {dateFormat(
                            value.OATH_DATE === null ||
                              value.OATH_DATE === undefined
                              ? new Date()
                              : value.OATH_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.DECISION_NO}</td>

                        <td>
                          {dateFormat(
                            value.DECISION_DATE === null ||
                              value.DECISION_DATE === undefined
                              ? new Date()
                              : value.DECISION_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function GadaadHelniiMedleg(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportLanguage/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportLanguage/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 30px 30% 20px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Гадаад хэлний мэдлэг
          </span>
          <div className="columns">
            <div className="column is-4 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-4 ml-6"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="gadaadHelniiMedlegXLS"
                  className="download-table-xls-button"
                  table="gadaadHelniiMedlegXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "23%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("gadaadHelniiMedlegXLS").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div className="columns">
            <div className="column is-12 ml-6">
              <div className="table-container">
                <table
                  id={"gadaadHelniiMedlegXls"}
                  className="table is-bordered is-flex-wrap-wrap"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Гадаад хэлний нэр</td>
                      <td>Ярих</td>
                      <td>Сонсож ойлгох</td>
                      <td>Унших</td>
                      <td>Бичих</td>
                      <td>Шалгалтын нэр</td>
                      <td>Дүнгийн мэдээлэл</td>
                      <td>Шалгалт өгсөн огноо</td>
                      <td>Батламжийн дугаар</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.LANGUAGE_NAME}</td>
                        <td>{value.LANGUAGE_READ}</td>
                        <td>{value.LANGUAGE_WRITE}</td>
                        <td>{value.LANGUAGE_LISTEN}</td>
                        <td>{value.LANGUAGE_SPEAK}</td>
                        <td>{value.EXAM_NAME}</td>
                        <td>{value.EXAM_POINT}</td>

                        <td>
                          {dateFormat(
                            value.EXAM_DATE === null ||
                              value.EXAM_DATE === undefined
                              ? new Date()
                              : value.EXAM_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.CONFIRMATION_NO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function Bolowsrol(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportEducation/1/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportEducation/1/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 15px 15% 20px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Боловсрол
          </span>
          <div className="columns">
            <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-5 ml-5"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="bolowsrolXLS"
                  className="download-table-xls-button"
                  table="bolowsrolXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "11%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() => document.getElementById("bolowsrolXLS").click()}
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div className="columns">
            <div className="column is-11 ml-6">
              <div className="table-container">
                <table
                  id={"bolowsrolXls"}
                  className="table is-bordered is-flex-wrap-wrap"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Боловсролын төрөл</td>
                      <td>Боловсролын төрлийн нэр</td>
                      <td>Боловсролын зэрэг</td>
                      <td>Боловсрол эзэмшсэн газар</td>
                      <td>Сургуулийн нэр</td>
                      <td>Орсон он,сар</td>
                      <td>Төгссөн он,сар</td>
                      <td>Эзэмшсэн мэргэжил</td>
                      <td>Гэрчилгээ дипломын дугаар</td>
                      <td>Сургуулийн холбоо барих мэдээлэл</td>
                      <td>Диплом хамгаалсан сэдэв</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.EDUCATION_TYPE_ID}</td>
                        <td>{value.EDUCATION_TYPE_NAME}</td>
                        <td>{value.EDUCATION_LEVEL}</td>
                        <td>{value.EDUCATION_COUNTRY}</td>
                        <td>{value.SCHOOL_NAME}</td>

                        <td>
                          {dateFormat(
                            value.START_DATE === null ||
                              value.START_DATE === undefined
                              ? new Date()
                              : value.START_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>

                        <td>
                          {dateFormat(
                            value.END_DATE === null ||
                              value.END_DATE === undefined
                              ? new Date()
                              : value.END_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.PROFESSION_NAME}</td>
                        <td>{value.DIPLOM_NO}</td>
                        <td>{value.SCHOOL_CONTACT}</td>
                        <td>{value.DIPLOM_SUBJECT}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function BolowsrolDoktor(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportEducation/2/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportEducation/2/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "15px 30px 24% 30px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Боловсрол-доктор
          </span>
          <div className="columns">
            <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-5 ml-4"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="bolowsrolDoktorXLS"
                  className="download-table-xls-button"
                  table="bolowsrolDoktorXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "14%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("bolowsrolDoktorXLS").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-11 ml-6  ">
                <table id={"bolowsrolDoktorXls"} className="table is-bordered">
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Боловсролын зэрэг</td>
                      <td>Боловсрол эзэмшсэн газар</td>
                      <td>Сургуулийн нэр</td>
                      <td>Орсон он,сар</td>
                      <td>Төгссөн он,сар</td>
                      <td> Эзэмшсэн мэргэжил</td>
                      <td>Гэрчилгээ дипломын дугаар</td>
                      <td>Сургуулийн холбоо барих мэдээлэл</td>
                      <td>Диплом хамгаалсан сэдэв</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.EDUCATION_TYPE_ID}</td>
                        <td>{value.EDUCATION_TYPE_NAME}</td>
                        <td>{value.EDUCATION_LEVEL}</td>

                        <td>
                          {dateFormat(
                            value.START_DATE === null ||
                              value.START_DATE === undefined
                              ? new Date()
                              : value.START_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>

                        <td>
                          {dateFormat(
                            value.END_DATE === null ||
                              value.END_DATE === undefined
                              ? new Date()
                              : value.END_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.PROFESSION_NAME}</td>
                        <td>{value.DIPLOM_NO}</td>
                        <td>{value.SCHOOL_CONTACT}</td>
                        <td>{value.DIPLOM_SUBJECT}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function MergeshliinBeltgel(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportProfession/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportProfession/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "15px 30px 25% 30px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Мэргэшлийн бэлтгэл
          </span>
          <div className="columns">
            <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-4 ml-4"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="mergeshliinBeltgelXls"
                  className="download-table-xls-button"
                  table="mergeshliinBeltgelXLS"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "14%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("mergeshliinBeltgelXls").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div className="columns">
            <div className="column is-10 ml-6  ">
              <table
                id={"mergeshliinBeltgelXLS"}
                className="table is-bordered "
              >
                <thead style={{ backgroundColor: "#f1f1f1" }}>
                  <tr>
                    <td>№</td>
                    <td>Ажилтны Нэр</td>
                    <td>Мэргэшүүлэх сургалтанд хамгаалсан газар</td>
                    <td>Хаана. дотоод. гадаадын ямар байгууллагад</td>
                    <td>Мэргэшүүлэх Сургуулын нэр</td>
                    <td>Эхэлсэн он, сар, өдөр</td>
                    <td>Дууссан он,сар,өдөр</td>
                    <td> Хугацаа /хоногоор/</td>
                    <td>Ямар чиглэлээр</td>
                    <td>Үнэмлэх, гэрчилгээний дугаар</td>
                    <td>Үнэмлэх, гэрчилгээний он, сар, өдөр</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.PERSON_NAME}</td>
                      <td>{value.PROFESSION_COUNTRY}</td>
                      <td>{value.PROFESSION_ORG}</td>
                      <td>{value.PROFESSION_NAME}</td>

                      <td>
                        {dateFormat(
                          value.START_DATE === null ||
                            value.START_DATE === undefined
                            ? new Date()
                            : value.START_DATE,
                          "yyyy-mm-dd"
                        )}
                      </td>

                      <td>
                        {dateFormat(
                          value.END_DATE === null ||
                            value.END_DATE === undefined
                            ? new Date()
                            : value.END_DATE,
                          "yyyy-mm-dd"
                        )}
                      </td>
                      <td>{value.DURATION_DAY}</td>
                      <td>{value.PROFESSION_DIRECTION}</td>
                      <td>{value.DIPLOM_NO}</td>

                      <td>
                        {dateFormat(
                          value.DIPLOM_DATE === null ||
                            value.DIPLOM_DATE === undefined
                            ? new Date()
                            : value.DIPLOM_DATE,
                          "yyyy-mm-dd"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function ErdmiinTsol(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/reportFame/");
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportFame/" + department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 30% 10px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Эрдмийн цол
          </span>
          <div className="columns">
            <div className="column is-3 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-3 ml-6"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="erdmiinTsolXLS"
                  className="download-table-xls-button"
                  table="erdmiinTsolXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "20%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("erdmiinTsolXLS").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-9 ml-6  ">
                <table id={"erdmiinTsolXls"} className="table is-bordered ">
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны Нэр</td>
                      <td>Цолны төрөл</td>
                      <td>Цол</td>
                      <td>Цол олгосон байгуулага</td>
                      <td>Огноо</td>
                      <td>Гэрчилгээ дипломын дугаар</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.FAME_TYPE_NAME}</td>
                        <td>{value.SUBFAME_TYPE_NAME}</td>
                        <td>{value.FAME_ORG}</td>
                        <td>
                          {dateFormat(
                            value.FAME_DATE === null ||
                              value.FAME_DATE === undefined
                              ? new Date()
                              : value.FAME_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.FAME_NO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function TsergiinAlba(props) {
  const [data, loadData] = useState();

  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/reportForce/");
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportForce/" + department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;

  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 30% 10px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Цэргийн алба
          </span>
          <div className="columns">
            <div className="column is-3 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-2 ml-3"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="erdmiinTsolXLS"
                  className="download-table-xls-button"
                  table="erdmiinTsolXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "20%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("erdmiinTsolXLS").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-9 ml-6  ">
                <table
                  id={"erdmiinTsolXls"}
                  className="table is-bordered has-text-right "
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Цэргийн алба хаасан байдал</td>
                      <td>Цэргийн үүрэгтний үнэмлэхийн дугаар</td>
                      <td>Хаана</td>
                      <td>Тайлбар</td>
                    </tr>
                  </thead>
                  {data?.map((value, index) => (
                    <tbody>
                      <td>{index + 1}</td>
                      <td className="table has-text-left">
                        {value.PERSON_NAME}
                      </td>
                      <td className="table has-text-left">
                        {value.FORCE_TYPE_NAME}
                      </td>
                      <td className="table has-text-left">{value.FORCE_NO}</td>
                      <td className="table has-text-left">
                        {value.FORCE_LOCATION}
                      </td>
                      <td className="table has-text-left">
                        {value.FORCE_DESC}
                      </td>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function ShagnaliinTalaarhMedeelel(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/reportAward/");
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportAward/" + department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 21% 10px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Шагналын талаарх мэдээлэл
          </span>
          <div className="columns">
            <div className="column is-3 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-3 ml-1"></div>
            <div className="column is-1 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="shagnalButtonXSL"
                  className="download-table-xls-button"
                  table="shagnalTableXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "1%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("shagnalButtonXSL").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div>
              <div class="columns is-12 is-gapless">
                <div class="column is-0 " />

                <table
                  id={"shagnalTableXls"}
                  className="table is-bordered ml-6"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны нэр</td>
                      <td>Шагнагдсан огноо</td>
                      <td>Шагналын нэр</td>
                      <td>Шийдэрийн нэр, дугаар</td>
                      <td>Огноо</td>
                      <td>Шагнуулсан үндэслэл</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.PERSON_NAME}</td>
                        <td>
                          {dateFormat(
                            value.AWARD_DATE === null ||
                              value.AWARD_DATE === undefined
                              ? new Date()
                              : value.AWARD_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.AWARD_NAME}</td>
                        <td>{value.DECISION_NO}</td>
                        <td>
                          {dateFormat(
                            value.DECISION_DATE === null ||
                              value.DECISION_DATE === undefined
                              ? new Date()
                              : value.DECISION_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.AWARD_DESC}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function TurshlagiinTalaarhMedeelel(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportExperience/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportExperience/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);

  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 30px 7% 30px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Туршлагын талаарх мэдээлэл
          </span>
          <div className="columns">
            <div className="column is-5 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-5 ml-6"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="turshlagiinTalaarhMedeelelXls"
                  className="download-table-xls-button"
                  table="turshlagiinTalaarhMedeelelXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "38%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document
                    .getElementById("turshlagiinTalaarhMedeelelXls")
                    .click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div>
              <div class="columns is-12 ml-6 is-gapless">
                <div class="column is-0 " />

                <table
                  id={"turshlagiinTalaarhMedeelelXLS"}
                  className="table is-bordered p-3"
                >
                  <thead style={{ backgroundColor: "#f1f1f1" }}>
                    <tr>
                      <td>№</td>
                      <td>Ажилтны Нэр</td>
                      <td>Ажилласан аймаг, хот</td>
                      <td>Ажилласан сум, дүүрэг</td>
                      <td>Газар хэлтэс, алба</td>
                      <td>Ажилласан Байгуулагын Нэр</td>
                      <td>Эрхэлсэн албан тушаал</td>
                      <td>Албан тушаалын төрөл</td>
                      <td>Ажилд орсон он, сар, өдөр</td>
                      <td>Ажилд томилогдсон тушаалын дугаар</td>
                      <td>Ажлаас чөлөөлөгдсөн он, сар</td>
                      <td>Ажилаас чөлөөлөгдсөн тушаалын дугаар</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.PERSON_NAME}</td>
                        <td>{value.OFFICE_NAME}</td>
                        <td>{value.SUB_OFFICE_NAME}</td>
                        <td>{value.EXPERIENCE_DEPARTMENT}</td>
                        <td>{value.EXPERIENCE_ORG}</td>
                        <td>{value.EXPERIENCE_POSITION}</td>
                        <td>{value.EXPERIENCE_POSITION_TYPE}</td>

                        <td>
                          {dateFormat(
                            value.ENTERED_DATE === null ||
                              value.ENTERED_DATE === undefined
                              ? new Date()
                              : value.ENTERED_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.ENTERED_NO}</td>

                        <td>
                          {dateFormat(
                            value.EXPIRED_DATE === null ||
                              value.EXPIRED_DATE === undefined
                              ? new Date()
                              : value.EXPIRED_DATE,
                            "yyyy-mm-dd"
                          )}
                        </td>
                        <td>{value.EXPIRED_NO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
function BvteeliinJagsaalt(props) {
  const [data, loadData] = useState();
  const [department, setDepartment] = useState({
    DEPARTMENT_ID: 1,
    check: true,
  });
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/reportLiterature/"
      );
      console.log("amjilttai", listItems.data);
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    async function fetchData() {
      if (department.check !== true) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/reportLiterature/" +
            department.DEPARTMENT_ID
        );
        if (listItems.data !== undefined && listItems.data.length === 0)
          alert.show("өгөгдөл байхгүй байна");
        else loadData(listItems?.data);
      }
    }
    fetchData();
  }, [department]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <div
        style={{
          width: "99%",
        }}
      >
        <div
          className="box"
          style={{ marginLeft: "7%", padding: "20px 2px 35% 10px" }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginLeft: "3rem",
              marginBottom: "3rem",
            }}
          >
            Бүтээлийн жагсаалт
          </span>
          <div className="columns">
            <div className="column is-3 ml-6" style={{ fontSize: "0.7rem" }}>
              <div class="select">
                <DepartmentID
                  personChild={department}
                  setPersonChild={setDepartment}
                />
              </div>
            </div>
            <div className="column is-1 ml-6"></div>
            <div className="column is-2 ">
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="bvteeliinJagsaaltXSL"
                  className="download-table-xls-button"
                  table="bvteeliinJagsaaltXls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="XLS"
                />
              </div>
              <button
                class="text"
                style={{
                  marginLeft: "23%",
                  borderRadius: "1px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() =>
                  document.getElementById("bvteeliinJagsaaltXSL").click()
                }
              >
                <span style={{ display: "flex" }}>
                  <img src={Excel} width="20px" height="20px "></img>Excel
                </span>
              </button>
            </div>
          </div>

          <div>
            <div class="columns  is-gapless">
              <div class="column is-0 " />

              <table
                id={"bvteeliinJagsaaltXls"}
                className="table is-bordered ml-6"
              >
                <thead style={{ backgroundColor: "#f1f1f1" }}>
                  <tr>
                    <td>№</td>
                    <td>Ажилтны Нэр</td>
                    <td>Бүтээлийн нэр</td>
                    <td>Бүтээлийн төрөл</td>
                    <td>Бүтээл гаргасан огноо</td>
                    <td>Тайлбар</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.PERSON_NAME}</td>
                      <td>{value.LITERATURE_NAME}</td>
                      <td>{value.LITERATURE_TYPE}</td>

                      <td>
                        {dateFormat(
                          value.LITERATURE_DATE === null ||
                            value.LITERATURE_DATE === undefined
                            ? new Date()
                            : value.LITERATURE_DATE,
                          "yyyy-mm-dd"
                        )}
                      </td>
                      <td>
                        {dateFormat(
                          value.LITERATURE_DATE === null ||
                            value.LITERATURE_DATE === undefined
                            ? new Date()
                            : value.LITERATURE_DATE,
                          "yyyy-mm-dd"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна.......</p>;
  }

  return listItems;
}
export default AnketAtailan;
