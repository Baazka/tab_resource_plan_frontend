import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";

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

const Home = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://10.10.10.46:3002/api/v1/employees",
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
  function anketA() {
    history.push("/anketA/1");
  }

  const columns = [
    {
      name: "№",
      selector: (row, index) => {
        return index + 1;
      },
      sortable: true,
    },
    {
      name: "Газар нэгж",
      selector: "EMP_DEPARTMENT_NAME",
      sortable: true,
    },
    {
      name: "Хэлтэс",
      selector: "EMP_SUBDEPARTMENT_NAME",
      sortable: true,
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
      <SideBar />
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
          >
            Идэвхгүй
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
            >
              АНКЕТ Б ХЭСЭГ
            </button>
          </div>
        </div>
        <div
          style={{
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-small is-gray"
                type="email"
                placeholder="хайлт  хийх утгаа оруулна уу"
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
            <span style={{ width: "40", height: "40" }}>
              <img src={Filter} width="35" height="40" />
            </span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={jagsaalt}
          theme="solarized"
          customStyles={customStyles}
          pagination={true}
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

export default Home;
