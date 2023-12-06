import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DataTable, { createTheme } from "react-data-table-component";
import {Eye, Delete } from "../assets/images/zurag";
import { DataRequest } from "../functions/DataApi";
import hrUrl from "../hrUrl";

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
const AHE = (props) => {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [jagsaalt, setJagsaalt] = useState([]);
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({ display: false, path: null });
  const [data, loadData] = useState([]);

  async function fetchData() {
    let listItems  = await DataRequest({
      url: hrUrl + "/compList",
      method: "POST",
      data: data,
    });
    if (listItems.data !== undefined && listItems.data.length > 0) {
          setJagsaalt([...listItems.data]);
          setSearch("");
        }
  }

  useEffect(() => {
    fetchData();
  }, [props]);

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
    //   name: "ID",
    //   selector: "COMP_ID",
    //   sortable: true,
    //   expandableRows: true,
    // },
    {
      name: "АХЭ регистер",
      selector: "COMP_REGNO",
      sortable: true,
      expandableRows: true,
      width: "150px",
    },
    {
      name: "Region",
      selector: "COMP_REGION",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Нэр",
      selector: "COMP_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Утас",
      selector: "COMP_PHONE",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "И-Мэйл",
      selector: "COMP_EMAIL",
      sortable: true,
      expandableRows: true,
    },
    {
        name: "Веб",
        selector: "COMP_WEB",
        sortable: true,
        expandableRows: true,
    },
    {
        name: "Хаяг",
        selector: "COMP_ADDRESS",
        sortable: true,
        expandableRows: true,
    },
    {
      name: "",
      right: true,
      width: "80px",
      cell: (row) => (
        <div>
          <img
            alt=""
            src={Eye}
            width="20px"
            height="20px"
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              marginBottom: "5px",
            }}
            onClick={() => setShow({ display: true, path: row.IMG_PATH })}
          />
          <img
            alt=""
            src={Delete}
            width="30px"
            height="30px"
            style={{
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => removeRow(row)}
          />
        </div>
      ),
    },
  ];
  
  function removeRow(value) {
    if (window.confirm("Мэдээллийг устгахдаа итгэлтэй байна уу?")) {
      DataRequest({
        url: hrUrl + "/compDelete",
        method: "POST",
        data: {
          COMP_ID: value?.COMP_ID,
          CREATED_BY: userDetils?.USER_ID,
        },
      })
        .then(function (response) {
          console.log("res", response);
          if (response?.data?.message === "success") {
            fetchData();
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
        overflow: "scroll",
      }}
    >
      <Header title="АХЭ бүртгэл" />
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: " auto",
          marginBottom: "3%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "95%",
            marginTop: "80px",
            marginLeft: "1.5rem",
            overflow: "hidden",
          }}
        >
          <DataTable
            columns={columns}
            data={search === "" ? jagsaalt : found}
            theme="solarized"
            customStyles={customStyles}
            noDataComponent="мэдээлэл байхгүй байна"
            pagination={true}
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: "Хуудас:",
              rangeSeparatorText: "нийт:",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
            selectableRows
            // add for checkbox selection
            Clicked
            pointerOnHover={true}
            selectableRowsSingle={false}
            noHeader={true}
            fixedHeader={true}
            overflowY={true}
            overflowYOffset={"390px"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AHE;
