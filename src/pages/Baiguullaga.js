import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import dateFormat from "dateformat";
import { Search, Filter, Add, Excel, AddBlue } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";

const axios = require("axios");

var rowNumber = 1;
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

const Baiguullaga = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const [searchType, setSearchType] = useState("DEPARTMENT_NAME");
  const [search, setSearch] = useState("");
  const [found, setFound] = useState();

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/organization",
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
  };

  function makeSearch(value) {
    setSearch(value);
    console.log("khailtttttttttttttt", searchType);
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
      if (value1.includes(value2)) return true;
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

    //   width: "50px",
    // },
    {
      name: "Төрийн аудитын байгууллага",
      selector: "DEPARTMENT_NAME",
    },
    {
      name: "Харъяа газар",
      selector: "SUB_DEPARTMENT_NAME",
    },
    {
      name: "Дотоод бүтцийн нэгж",
      selector: "COMPARTMENT_NAME",
    },
    {
      name: "Албан тушаалын код",
      selector: "",
      sortable: true,
    },
    {
      name: "Албан тушаалын нэр",
      selector: "",
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
    // {
    //   name: "Батлагдсан орон тоо",
    //   selector: "CONFIRMED_COUNT",
    //   sortable: true,
    // },
    // {
    //   name: "Ажилтны тоо",
    //   selector: "",
    //   sortable: true,
    // },
    // {
    //   name: "Эзгүй орон тоо",
    //   selector: "",
    //   sortable: true,
    // },
    // {
    //   name: "Сул орон тоо",
    //   selector: "",
    //   sortable: true,
    // },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="БАЙГУУЛЛАГЫН БҮТЦИЙН БҮРТГЭЛ" />
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
                {/* <option value={"PERSON_FIRSTNAME"}>Албан тушаалын код</option>
                <option value={"PERSON_LASTNAME"}>Албан тушаалын нэр</option>
                <option value={"EMP_COMPARTMENT_NAME"}>
                  Албан тушаалын төрөл
                </option>
                <option value={"PERSON_PHONE"}>Албан тушаалын ангилал</option>
                <option value={"PERSON_EMAIL"}>Албан тушаалын зэрэглэл</option> */}
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
          </div>
        </div>
        <DataTable
          columns={columns}
          data={search === "" ? jagsaalt : found}
          theme="solarized"
          customStyles={customStyles}
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

export default Baiguullaga;
