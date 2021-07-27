import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter, AddBlue, Excel } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import dateFormat from "dateformat";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const userDetils = JSON.parse(localStorage.getItem("userDetails"));
const axios = require("axios");

createTheme("solarized", {
  text: {
    primary: "gray",
    secondary: "black",
  },
  background: {
    default: "white",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "white",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "4px",
      fontWeight: "bold",
      fontSize: "15px",
      borderColor: "white",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
      webkitBoxShadow: "0px 0px 3px 1px rgb(255 0 0)",
      borderColor: "grey",
      borderBottom: "0.5px solid",
    },
  },
};

function Home(props) {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState();
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [buttonValue, setButtonValue] = useState(1);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2980b9;
    position: absolute;
    top: 35%;
    left: 50%;
  `;

  async function unActive() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/employees/0",
      method: "GET",
      data: {},
    });
    setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setButtonValue(2);
  }
  async function Active() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/employees/1",
      method: "GET",
      data: {},
    });
    setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setButtonValue(1);
  }
  async function newPeople() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/person/1/",
      method: "GET",
      data: {},
    });
    setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setButtonValue(3);
  }

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/employees/1",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      setLoading(false);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    localStorage.removeItem("personDetail");
    if (state?.selectedRows != undefined) {
      console.log("Selected Rows: ", state?.selectedRows[0]?.EMP_ID);

      localStorage.setItem(
        "personDetail",
        JSON.stringify({
          person_id:
            state?.selectedRows[0]?.EMP_PERSON_ID !== undefined &&
            state.selectedRows[0]?.EMP_PERSON_ID !== null
              ? state?.selectedRows[0]?.EMP_PERSON_ID
              : state?.selectedRows[0].PERSON_ID,
          emp_id: state?.selectedRows[0].EMP_ID,
          type: "employ",
        })
      );
      setData({ checked: true });
    } else {
      setData({ checked: false });
    }
  };

  async function anketA() {
    if (data?.checked === true) history.push("/web/anketA/1");
    else alert.show("Албан тушаалтан сонго");
  }
  async function anketB() {
    if (data?.checked === true) history.push("/web/anketB/1");
    else alert.show("Албан тушаалтан сонго");
  }

  async function anketANew() {
    localStorage.removeItem("person_id");
    localStorage.setItem(
      "personDetail",
      JSON.stringify({ person_id: "0", type: "newPerson" })
    );
    history.push("/web/anketA/1");
  }

  function makeSearch(value) {
    setSearch(value);

    let found = jagsaalt?.filter((obj) => equalStr(obj[searchType], value));
    console.log(found);
    if (found != undefined && found.length > 0) setFound(found);
    else setFound([]);
  }
  function equalStr(value1, value2) {
    if (
      value1 !== undefined &&
      value1 !== "" &&
      value2 !== undefined &&
      value2 !== "" &&
      value1 !== null &&
      value2 !== null
    )
      if (searchType !== "PERSON_PHONE") {
        if (
          (value1 !== null ? value1.toUpperCase() : "").includes(
            value2.toUpperCase()
          )
        )
          return true;
      } else if (value1.includes(value2)) return true;
    return false;
  }

  const columns = [
    {
      name: "№",
      selector: (row, index) => {
        return index + 1;
      },
      sortable: true,
      width: "40px",
    },
    {
      name: "Газар нэгж",
      selector: "EMP_DEPARTMENT_NAME",
      sortable: true,
      width: "200px",
    },
    {
      name: "Хэлтэс",
      selector: "EMP_SUBDEPARTMENT_NAME",
      sortable: true,
      width: "290px",
    },
    {
      name: "Албан тушаал",
      selector: "EMP_ROLE_NAME",
      sortable: true,
    },
    {
      name: "Ажилтны нэр",
      selector: "PERSON_FIRSTNAME",
      sortable: true,
    },
    {
      name: "Ажилтны овог",
      selector: "PERSON_LASTNAME",
      sortable: true,
    },
    {
      name: "Ажилтны төрөл",
      selector: "EMP_COMPARTMENT_NAME",
      sortable: true,
    },
    {
      name: "Утасны дугаар",
      selector: "PERSON_PHONE",
      sortable: true,
    },
    {
      name: "Имэйл",
      selector: "PERSON_EMAIL",
      sortable: true,
    },
    {
      name: "Анкет А",
      selector: "4",
      sortable: true,
      center: true,
    },
    {
      name: "Анкет Б",
      selector: "6",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="АЖИЛТНЫ БҮРТГЭЛИЙН ЖАГСААЛТ" />

      <div
        style={{
          backgroundColor: "white",
          width: "91%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            borderColor: "gray",
            borderBottom: "1px solid",
            width: "100%",
            padding: "0.5rem",
            marginRight: "-10px",
          }}
        >
          <button
            className="button is-focused"
            style={{
              backgroundColor: "#418ee6",
              color: "white",
              borderColor: "#418ee6",
              borderStyle: "solid",
              border: "2px",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
            }}
            onClick={() => Active()}
          >
            Идэвхтэй
          </button>
          <button
            className="button is-focused"
            style={{
              backgroundColor: "transparent",
              borderColor: "#418ee6",
              color: "black",
              borderStyle: "solid",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
            onClick={() => unActive()}
          >
            Идэвхгүй
          </button>
          <button
            className="button is-focused"
            style={{
              backgroundColor: "transparent",
              borderColor: "#418ee6",
              color: "black",
              borderStyle: "solid",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
            onClick={() => newPeople()}
          >
            Шинэ
          </button>
          <div style={{ position: "absolute", right: "3rem" }}>
            <button
              className="button is-focused"
              style={{
                backgroundColor: "#418ee6",
                color: "white",
                borderColor: "#418ee6",
                borderStyle: "solid",
                border: "2px",
                borderRadius: "5px",
                width: "12rem",
                height: "2.1rem",
                fontFamily: "RalewaySemiBold",
                fontSize: "1rem",
              }}
              onClick={anketA}
            >
              АНКЕТ А ХЭСЭГ
            </button>
            {buttonValue === 1 ? (
              <button
                className="button is-focused"
                style={{
                  backgroundColor: "#418ee6",
                  color: "white",
                  borderColor: "#418ee6",
                  borderStyle: "solid",
                  border: "2px",
                  borderRadius: "5px",
                  width: "12rem",
                  height: "2.1rem",
                  fontFamily: "RalewaySemiBold",
                  fontSize: "1rem",
                  marginLeft: "0.5rem",
                }}
                onClick={() => anketB()}
              >
                АНКЕТ Б ХЭСЭГ
              </button>
            ) : null}
          </div>
        </div>
        <div
          style={{
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <div className="select is-small" style={{ marginRight: "10px" }}>
              <select
                value={searchType}
                onChange={(text) => setSearchType(text.target.value)}
              >
                <option value={"EMP_DEPARTMENT_NAME"}>Газар нэгж</option>
                <option value={"EMP_SUBDEPARTMENT_NAME"}>Хэлтэс</option>
                <option value={"EMP_ROLE_NAME"}>Албан тушаал</option>
                <option value={"PERSON_FIRSTNAME"}>Ажилтны нэр</option>
                <option value={"PERSON_LASTNAME"}>Ажилтны овог</option>
                <option value={"EMP_COMPARTMENT_NAME"}>Ажилтны төрөл</option>
                <option value={"PERSON_PHONE"}>Утасны дугаар</option>
                <option value={"PERSON_EMAIL"}>Имэйл</option>
              </select>
              {/* 
              <span class="icon is-small is-right">
                <img src={Filter} />
              </span> */}
            </div>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-small is-gray"
                type="email"
                placeholder="хайлт хийх утгаа оруулна уу"
                value={search}
                onChange={(e) => makeSearch(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "18rem",
                }}
              />

              <span class="icon is-small is-right">
                <img src={Search} />
              </span>
              <span class="icon is-small is-right"></span>
            </div>

            <button
              class="text"
              style={{
                marginLeft: "1%",
                borderRadius: "5px",
                backgroundColor: "#b8e6f3",
                color: "#000",
                border: "0px",
              }}
              onClick={() => {
                anketANew();
              }}
            >
              {" "}
              <span style={{ display: "flex", paddingRight: "22px" }}>
                <img src={AddBlue} width="20px" height="20px "></img>Нэмэх
              </span>
            </button>

            <button
              class="text"
              style={{
                marginLeft: "1%",
                borderRadius: "5px",
                backgroundColor: "#1cc88a",
                color: "#fff",
                border: "double",
              }}
              onClick={() => document.getElementById("emergencyXLS").click()}
            >
              <span style={{ display: "flex", paddingRight: "22px" }}>
                <img src={Excel} width="20px" height="20px "></img>Excel
              </span>
            </button>
            <EmployExcel />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={search === "" ? jagsaalt : found}
          theme="solarized"
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={10}
          noDataComponent="мэдээлэл байхгүй байна"
          selectableRows // add for checkbox selection
          Clicked
          onSelectedRowsChange={handleChange}
          noHeader={true}
          fixedHeader={true}
          overflowY={true}
          overflowYOffset={"390px"}
          paginationComponentOptions={{
            rowsPerPageText: "Хуудас:",
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
        />
      </div>
      <div className="sweet-loading">
        <ScaleLoader
          loading={loading}
          size={30}
          css={override}
          color={"#2980b9"}
        />
      </div>
      <Footer />
    </div>
  );
}

function EmployExcel(props) {
  const [data, loadData] = useState(null);

  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/excelPerson/");
    console.log(listItems, "tailan");
    loadData(listItems?.data);
  }, [props]);

  let listItems;
  if (data !== undefined || data.length !== 0) {
    listItems = (
      <div style={{ width: "30px", height: "30px" }}>
        <img src={Excel} height="30px" width="30px" />
        <div style={{ display: "none" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="XLS"
          />
          <table id="table-to-xls">
            <tr>
              <th>Эцэг эхийн нэр</th>
              <th>Өөрийн нэр</th>
              <th>Регистерийн дугаар</th>
              <th>Иргэншил</th>
              <th>Ургийн овог</th>
              <th>Үндэс угсаа</th>
              <th>Хүйс</th>
              <th>Төрсөн он,сар,өдөр</th>
              <th>Төрсөн аймаг,хот</th>
              <th>Төрсөн сум, дүүрэг</th>
              <th>Төрсөн газар</th>
              <th>Гэрлэсэн эсэх</th>
              <th>Утас</th>
              <th>N-мэйл</th>
            </tr>
            {data?.map((value, index) => (
              <tr>
                <td>{value.PERSON_LASTNAME}</td>
                <td>{value.PERSON_FIRSTNAME}</td>
                <td>{value.PERSON_REGISTER_NO}</td>
                <td>{value.NATIONAL_NAME}</td>
                <td>{value.SURNAME}</td>
                <td>{value.DYNASTY_NAME}</td>
                <td>
                  {value.PERSON_GENDER === null
                    ? ""
                    : value.PERSON_GENDER === 1
                    ? "Эмэгтэй"
                    : "Эрэгтэй"}
                </td>
                <td>
                  {value.PERSON_BORNDATE !== null &&
                  value.PERSON_BORNDATE !== undefined
                    ? dateFormat(new Date(value.PERSON_BORNDATE), "yyyy-mm-dd")
                    : ""}
                </td>
                <td>{value.OFFICE_NAME}</td>
                <td>{value.SUB_OFFICE_NAME}</td>
                <td>{value.BIRTH_PLACE}</td>
                <td>
                  {value.IS_MARRIED === null
                    ? ""
                    : value.IS_MARRIED === 0
                    ? "Гэрлэсэн"
                    : "Гэрлээгүй"}
                </td>
                <td>{value.PERSON_PHONE}</td>
                <td>{value.PERSON_EMAIL}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
export default Home;
