import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Eye, DocumentsB } from "../assets/images/zurag";
import { DataRequest } from "../functions/DataApi";
import hrUrl from "../hrUrl";

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
const Elders = (props) => {
  const [jagsaalt, setJagsaalt] = useState([]);
  const [searchType, setSearchType] = useState("FIRST_NAME");
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({ display: false, path: null });

  async function fetchData() {
    let listItems = await axios(hrUrl + "/elders/");
    if (listItems.data !== undefined && listItems.data.length > 0) {
      setJagsaalt([...listItems.data]);
      setSearch("");
    }
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
      selector: "DEPARTMENT_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Ажилтны овог",
      selector: "LAST_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Ажилтны нэр",
      selector: "FIRST_NAME",
      sortable: true,
      expandableRows: true,
    },

    // {
    //   name: "Алба, хэлтэс",
    //   selector: "",
    //   sortable: true,
    // },
    {
      name: "Утас",
      selector: "PHONE",
      sortable: true,
      expandableRows: true,
    },

    {
      name: "",
      right: true,
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
            src={DocumentsB}
            width="20px"
            height="20px"
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              marginBottom: "5px",
            }}
            onClick={() => hideElder(row)}
          />
        </div>
      ),
    },
  ];
  function hideElder(value) {
    if (window.confirm("Мэдээлэлийг нуухдаа итгэлтэй байна уу?")) {
      DataRequest({
        url: hrUrl + "/elders/",
        method: "POST",
        data: value,
      })
        .then(function (response) {
          console.log("elderScroll", response);
          if (response?.data?.message === "success") {
            fetchData();
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
  }

  function makeSearch(value) {
    setSearch(value);
    let found = jagsaalt?.filter((obj) => equalStr(obj[searchType], value));

    if (found !== undefined && found.length > 0) setFound(found);
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
      if ((searchType !== "START_DATE", searchType !== "REGISTER_DATE")) {
        if (
          (value1 !== null ? value1.toUpperCase() : "").includes(
            value2.toUpperCase()
          )
        )
          return true;
      } else if (value1.includes(value2)) return true;
    return false;
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
      <Header title="Ахмадын бүртгэл" />
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
          <div>
            {show.display ? (
              <Elder show={show} setShow={(value) => setShow(value)} />
            ) : null}
            <div style={{ display: "flex" }}>
              <div className="select is-small" style={{ marginRight: "10px" }}>
                <select
                  value={searchType}
                  onChange={(text) => setSearchType(text.target.value)}
                >
                  <option value={"FIRST_NAME"}>Ажилтны нэр</option>
                  <option value={"LAST_NAME"}>Ажилтны овог</option>
                  <option value={"DEPARTMENT_NAME"}>Газар нэгж</option>
                </select>
                {/* 
              <span class="icon is-small is-right">
                <img alt="" src={Filter} />
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
                <span class="icon is-small is-right" style={{ zIndex: 0 }}>
                  <img alt="" src={Search} />
                </span>
              </div>
            </div>
          </div>

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
function Elder(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: "60%",
        height: "auto",
        left: "25%",
        top: "10%",
        borderRadius: "6px",
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        zIndex: "1",
        padding: "15px 15px 35px 15px",
        overflow: "scroll",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={hrUrl + "/static/elders/" + props.show.path + ".svg"}
          alt=""
        />
        <div style={{ position: "absolute", top: "0.8rem", right: "1rem" }}>
          <span
            style={{
              fontWeight: "bold",
              cursor: "grab",
            }}
            onClick={() => props.setShow({ display: false, path: "" })}
          >
            X
          </span>
        </div>
      </div>
    </div>
  );
}
export default Elders;
