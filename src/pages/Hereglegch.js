import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Eye, DocumentsB } from "../assets/images/zurag";
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
const Hereglegch = (props) => {
  const [jagsaalt, setJagsaalt] = useState([]);
  const [searchType, setSearchType] = useState("FIRST_NAME");
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({ display: false, path: null });
  const [data, loadData] = useState([]);

  async function fetchData() {
    let listItems  = await DataRequest({
      url: hrUrl + "/compPersonList",
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
    {
      name: "АХЭ нэр",
      selector: "COMP_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "АХЭ регистер",
      selector: "COMP_REGNO",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "АХЭ ID",
      selector: "COMP_ID",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн нэр",
      selector: "USER_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн регистер",
      selector: "PERSON_REGISTER_NO",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн ID",
      selector: "PERSON_ID",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Код",
      selector: "USER_CODE",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Пасс",
      selector: "USER_PASSWORD",
      sortable: true,
      expandableRows: true,
    },
      {
        name: "Утас",
        selector: "PERSON_PHONE",
        sortable: true,
        expandableRows: true,
      },
      {
        name: "И-Мэйл",
        selector: "PERSON_EMAIL",
        sortable: true,
        expandableRows: true,
      },
      {
        name: "Хаяг",
        selector: "PERSON_ADDRESS",
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
            src={DocumentsB}
            width="20px"
            height="20px"
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              marginBottom: "5px",
            }}
            onClick={() => deleteRow(row)}
          />
        </div>
      ),
    },
  ];
  
  function deleteRow(value) {
    if (window.confirm("Мэдээлэлийг нуухдаа итгэлтэй байна уу?")) {
      DataRequest({
        url: hrUrl + "/compPersonDelete",
        method: "POST",
        data: value,
      })
        .then(function (response) {
          console.log("res", response);
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
      <Header title="Хэрэглэгч" />
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
                  <option value={"COMP_ID"}>АХЭ ID</option>
                  <option value={"PERSON_REGISTER_NO"}>Хэрэглэгчийн регистер</option>
                </select>
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
              <button
              class="button  ml-3"
              style={{
                borderRadius: "6px",
                backgroundColor: "#418ee6",
                color: "white",
                height: "2rem",
              }}
            //   onClick={() => setNuutsiinBvrtgel({ tsonkh: true, type: 1 })}
            >
              Үүсгэх
            </button>
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

export default Hereglegch;
