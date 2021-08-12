import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import dateFormat from "dateformat";
import { Search, Filter, Add, AddBlue, Excel } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
var rowNumber = 1;
const axios = require("axios");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

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

const AlbanTushaal = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const [searchType, setSearchType] = useState("DEPARTMENT_NAME");
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const alert = useAlert();

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/position",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      console.log(jagsaalts);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    if (
      state?.selectedRows !== undefined &&
      state?.selectedRows?.length !== 0
    ) {
      setData(state?.selectedRows[0]);
    }
  };
  async function AlbanTushaal() {
    console.log("data?.POSITION_ID", data?.POSITION_ID);
    history.push("/web/AlbanTushaalBurtgel/" + data?.POSITION_ID.toString());
  }
  function deleteAlbanTushaal() {
    DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/positionDelete/",
      method: "POST",
      data: {
        POSITION_ID: data?.POSITION_ID,
        REASON_ID: 1,
        REASON_DATE: dateFormat(new Date(), "dd-mmm-yy"),
        REASON_DESC: "",
        UPDATED_BY: userDetils?.USER_ID,
        UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      },
    })
      .then(function (response) {
        console.log("UpdateResponse", response);

        if (response?.data?.message === "success") {
          setJagsaalt(
            jagsaalt?.filter(
              (element, index) => element.POSITION_ID !== data?.POSITION_ID
            )
          );
          alert.show("амжилттай устлаа");
        }
      })
      .catch(function (error) {
        //alert(error.response.data.error.message);
        console.log(error.response);
        alert.show("aldaa");
      });
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
    // {
    //   name: "Код",
    //   selector: "DEPARTMENT_ID",
    //   sortable: true,
    //   width: "40px",
    // },
    {
      name: "Төрийн аудиты байгууллага",
      selector: "DEPARTMENT_NAME",
    },
    {
      name: "Харъяа газар",
      selector: "SUB_DEPARTMENT_NAME",
    },
    {
      name: "Дотооод бүтцийн нэгж",
      selector: "COMPARTMENT_NAME",
    },
    {
      name: "Албан тушаалын түвшин",
      selector: "POSITION_LEVEL_NAME",
      sortable: true,
    },
    {
      name: "Албан тушаалын нэр",
      selector: "POSITION_NAME",
      sortable: true,
    },
    {
      name: "Албан тушаалын төрөл",
      selector: "",
      sortable: true,
    },
    {
      name: "Албан тушаалын ангилал",
      selector: "",
      sortable: true,
    },
    {
      name: "Албан тушаалын зэрэглэл",
      selector: "",
      sortable: true,
    },
    {
      name: "Батлагдсан орон тоо",
      selector: "CONFIRMED_COUNT",
      sortable: true,
    },
    {
      name: "Ажилтны тоо",
      selector: "",
      sortable: true,
    },
    {
      name: "Эзгүй орон тоо",
      selector: "",
      sortable: true,
    },
    {
      name: "Сул орон тоо",
      selector: "",
      sortable: true,
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
      <Header title="АЛБАН ТУШААЛЫН БҮРТГЭЛ" />
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
        ></div>
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
                <option value={"DEPARTMENT_NAME"}>
                  Төрийн аудиты байгууллага
                </option>
                <option value={"SUB_DEPARTMENT_NAME"}>Харъяа газар</option>
                <option value={"COMPARTMENT_NAME"}>Дотооод бүтцийн нэгж</option>
                <option value={"POSITION_LEVEL_NAME"}>
                  Албан тушаалын түвшин
                </option>
                <option value={"POSITION_NAME"}>Албан тушаалын нэр</option>
                {/* <option value={"EMP_COMPARTMENT_NAME"}>
                  Албан тушаалын төрөл
                </option>
                <option value={"PERSON_PHONE"}>Албан тушаалын ангилал</option>
                <option value={"PERSON_EMAIL"}>Албан тушаалын зэрэглэл</option>
                <option value={"CONFIRMED_COUNT"}>Батлагдсан орон тоо</option>
                <option value={"CONFIRMED_COUNT"}>Ажилтны тоо</option>
                <option value={"CONFIRMED_COUNT"}>Эзгүй орон тоо</option>
                <option value={"CONFIRMED_COUNT"}>Сул орон тоо</option> */}
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
                placeholder="хайлт  хийх утгаа оруулна уу"
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
              onClick={() => AlbanTushaal()}
            >
              {" "}
              <span style={{ display: "flex", paddingRight: "22px" }}>
                <img src={AddBlue} width="20px" height="20px "></img>
                Нэмэх
              </span>
            </button>

            {/* <button
              class="text"
              style={{
                marginLeft: "1%",
                borderRadius: "5px",
                backgroundColor: "#1cc88a",
                color: "#fff",
                border: "double",
              }}
              // onClick={() => document.getElementById("emergencyXLS").click()}
            >
              <span style={{ display: "flex", paddingRight: "22px" }}>
                <img src={Excel} width="20px" height="20px "></img>Excel
              </span>
            </button> */}
            <button
              class="text"
              style={{
                marginLeft: "1%",
                borderRadius: "5px",
                backgroundColor: "#418ee6",
                color: "#fff",
                border: "double",
                padding: "0 10px",
              }}
              onClick={() => AlbanTushaal()}
            >
              Засах
            </button>
            <button
              class="text"
              style={{
                marginLeft: "1%",
                borderRadius: "5px",

                color: "red",
                border: "1px solid",
                padding: "0 10px",
              }}
              onClick={() => deleteAlbanTushaal()}
            >
              Устгах
            </button>
            <EmployExcel />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={search === "" ? jagsaalt : found}
          theme="solarized"
          customStyles={customStyles}
          noDataComponent="мэдээлэл байхгүй байна"
          pagination={false}
          paginationPerPage={10}
          selectableRows // add for checkbox selection
          Clicked
          onSelectedRowsChange={handleChange}
          noHeader={true}
          fixedHeader={true}
          overflowY={true}
          overflowYOffset={"390px"}
        />
      </div>
      <Footer />
    </div>
  );
};
function EmployExcel(props) {
  const [data, loadData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/excelPerson/");
      console.log(listItems, "tailan");
      loadData(listItems?.data);
    }
    fetchData();
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
export default AlbanTushaal;
