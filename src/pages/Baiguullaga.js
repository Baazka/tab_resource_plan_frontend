import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter, Add } from "../assets/images/zurag";
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

const Baiguullaga = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
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
  function anketA() {
    history.push("/web/anketA/1");
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
      name: "Код",
      selector: "DEPARTMENT_ID",
      sortable: true,
      width: "50px",
    },
    {
      name: "Байгууллагын нэр",
      selector: "EMP_DEPARTMENT_NAME",
      sortable: true,
      width: "150px",
    },
    {
      name: "Газар, нэгжийн нэр",
      selector: "EMP_COMPARTMENT_NAME",
      sortable: true,
      width: "200px",
    },
    {
      name: "Алба, хэлтсийн нэр",
      selector: "EMP_COMPARTMENT_NAME",
      sortable: true,
    },
    {
      name: "Албан тушаалын код",
      selector: "EMP_SUBDEPARTMENT_NAME",
      sortable: true,
    },
    {
      name: "Албан тушаалын нэр",
      selector: "",
      sortable: true,
    },
    {
      name: "Албан тушаалын төрөл",
      selector: "EMP_SUBDEPARTMENT_NAME",
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
                <img src={Add} />
              </span>
              <span class="icon is-small is-right"></span>
            </div>
            <div
              class="control has-icons-left has-icons-right"
              style={{ marginLeft: "10px" }}
            >
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
