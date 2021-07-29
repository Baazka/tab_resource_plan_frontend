import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import {
  Search,
  Filter,
  Add,
  Excel,
  AddBlue,
  M,
  Trush,
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

var dateFormat = require("dateformat");
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

const Home = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [NuutsiinBvrtgel, setNuutsiinBvrtgel] = useState(1);

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/decision",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      console.log(jagsaalts, "jagsaalts");
    }
    test();
  }, [props]);

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
  };

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
      name: "Газар нэгж",
      selector: "DEPARTMENT_NAME",
      sortable: true,
    },
    // {
    //   name: "Алба, хэлтэс",
    //   selector: "",
    //   sortable: true,
    // },
    {
      name: "Албан тушаал",
      selector: "POSITION_NAME",
      sortable: true,
    },
    {
      name: "Тушаалын төрөл",
      selector: "DECISION_TYPE_NAME",
      sortable: true,
    },
    {
      name: "Тушаалын дугаар",
      selector: "DECISION_NO",
      sortable: true,
    },
    {
      name: "Хэрэгжих огноо",

      selector: (row, index) => {
        return dateFormat(row.START_DATE, "yyyy-mm-dd");
      },
      sortable: true,
    },
    {
      name: "Бүртгэсэн огноо",

      selector: (row, index) => {
        return dateFormat(row.REGISTER_DATE, "yyyy-mm-dd");
      },
      sortable: true,
    },
    // {
    //   name: "Бүртгэсэн хэрэглэгч",
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
                <option value={"PERSON_FIRSTNAME"}>Ажилтны нэр</option>
                <option value={"PERSON_LASTNAME"}>Ажилтны овог</option>
                <option value={"DEPARTMENT_NAME"}>Газар нэгж</option>
                <option value={"POSITION_NAME"}>Албан тушаал</option>
                <option value={"DECISION_TYPE_NAME"}>Тушаалын төрөл</option>
                <option value={"DECISION_NO"}>Тушаалын дугаар</option>
                <option value={"date"}>Хэрэгжих огноо</option>
                <option value={"date"}>Бүртгэсэн огноо</option>
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
              <button
                class="input  is-size-7"
                style={{
                  borderRadius: "6px",
                  width: "8rem",
                  backgroundColor: "#418ee6",
                  color: "white",
                  justifyContent: "center",
                  paddingRight: "0px",
                  paddingLeft: "0px",
                }}
                onClick={() => setNuutsiinBvrtgel(!NuutsiinBvrtgel)}
              >
                Нөөцийн бүртгэл
              </button>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={jagsaalt}
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
const bagana = [
  {
    name: "№",
    selector: (row, index) => {
      return index + 1;
    },
    sortable: true,
    width: "40px",
  },
  {
    name: "Ажилтны овог",
    selector: "PERSON_LASTNAME",
    sortable: true,
  },
  {
    name: "Ажилтны нэр",
    selector: "PERSON_FIRSTNAME",
    sortable: true,
  },

  {
    name: "регистрийн дугаар",
    selector: "PERSON_REGISTER_NO",
    sortable: true,
    center: true,
  },
];

function TushaalAjiltan(props) {
  const [tsalinKhuls, setTsalin] = useState(false);
  const [button, setbutton] = useState(1);
  const [jagsaalt, setJagsaalt] = useState();
  useEffect(async () => {
    let listItems = await axios("http://172.16.24.103:3002/api/v1/personall");
    console.log(listItems, "Tangarag");
    setJagsaalt(listItems?.data);
  }, [props]);
  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
  };
  let listItems;
  if (jagsaalt !== undefined || jagsaalt?.length !== 0) {
    listItems = (
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "auto",
          left: "30%",
          top: "15%",
          borderRadius: "6px",
          backgroundColor: "white",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          zIndex: "1",
        }}
      >
        <div
          style={{
            height: "auto",
            backgroundColor: "#418ee6",
            padding: "18px 10px 18px 10px",
            color: "white",
            marginBottom: "10px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
        >
          <span>ТУШААЛЫН БҮРТГЭЛ</span>
        </div>
        <div style={{ padding: "15px 15px 35px 15px" }}>
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
              }}
            />
            <span class="icon is-small is-right">
              <img src={Search} />
            </span>
            <span class="icon is-small is-right"></span>
          </div>
          <DataTable
            columns={bagana}
            data={jagsaalt}
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
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}

function Khoyor(props) {
  const [tsalinKhuls, setTsalin] = useState(false);
  const [button, setbutton] = useState(1);
  return (
    <div>
      <div className="columns">
        <div className="column is-4">
          <button
            style={{
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#418ee6",
              color: "white",
              justifyContent: "center",
            }}
            onClick={() => setbutton(1)}
          >
            ҮНДСЭН МЭДЭЭЛЭЛ
          </button>

          <button
            style={{
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#e8e8e8",
              color: "#418ee6",
              justifyContent: "center",
              marginLeft: "5px",
            }}
            onClick={() => setbutton(2)}
          >
            ЦАЛИН ХӨЛС
          </button>
        </div>

        <div className="column is-6"></div>
        <div className="column is-2 has-text-right">
          <button
            onClick={() => setTsalin(!tsalinKhuls)}
            className="buttonTsenkher"
          >
            Засварлах
          </button>
        </div>
      </div>
      {button === 1 ? (
        <div>
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input class="input  is-size-7" />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input class="input  is-size-7" />
            </div>
            <div className="column is-6">
              <h1>
                {" "}
                <span style={{ color: "red" }}>*</span>Тушаалын төрөл
              </h1>
              <input class="input  is-size-7" />
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>байгууллага</h1>
                <input class="input  is-size-7" />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тушаалын дугаар
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Газар нэгж</h1>
                <input class="input  is-size-7" />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тайлбар
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Албан хэлтэс</h1>
                <input class="input  is-size-7" />
              </div>

              <div className="column is-3">
                <h1>Хэрэгжих огноо</h1>
                <input class="input  is-size-7" />
              </div>

              <div className="column is-3">
                <h1>Бүртгэсэн огноо</h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <h1>
              {" "}
              <span style={{ color: "red" }}>*</span>Албан тушаалын код{" "}
            </h1>
            <div className="columns ">
              <div className="column is-6">
                <input class="input  is-size-7" />
              </div>
              <div className="column  is-1">
                <h1>
                  <span style={{ color: "red" }}>*</span>Тушаал
                </h1>
              </div>
              <div className="column  is-1 ">
                <img src={M} width="20px" height="20px" />
                <img src={Trush} width="20px" height="20px" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6  ">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаал
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          {tsalinKhuls ? (
            <div className="columns">
              <div className="column is-8"> </div>
              <div className="column is-4 has-text-right">
                <button className="buttonTsenkher ">Хэвлэх</button>
                <button className="buttonTsenkher ml-1">Хадгалах</button>
                <button className="buttonTsenkher ml-1">Хадгалаад харах</button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          style={{
            padding: "15px 10px 25px 10px",
            backgroundColor: "#c0c0c05c",
          }}
        >
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input class="input  is-size-7" />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input class="input  is-size-7" />
            </div>
            <div className="column is-6">
              <h1>
                {" "}
                <span style={{ color: "red" }}>*</span>Тушаалын төрөл
              </h1>
              <input class="input  is-size-7" />
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>байгууллага</h1>
                <input class="input  is-size-7" />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тушаалын дугаар
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Газар нэгж</h1>
                <input class="input  is-size-7" />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тайлбар
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Албан хэлтэс</h1>
                <input class="input  is-size-7" />
              </div>

              <div className="column is-3">
                <h1>Хэрэгжих огноо</h1>
                <input class="input  is-size-7" />
              </div>

              <div className="column is-3">
                <h1>Бүртгэсэн огноо</h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          <div>
            <h1>
              {" "}
              <span style={{ color: "red" }}>*</span>Албан тушаалын код{" "}
            </h1>
            <div className="columns ">
              <div className="column is-6">
                <input class="input  is-size-7" />
              </div>
              <div className="column  is-1">
                <h1>
                  <span style={{ color: "red" }}>*</span>Тушаал
                </h1>
              </div>
              <div className="column  is-1 ">
                <img src={M} width="20px" height="20px" />
                <img src={Trush} width="20px" height="20px" />
              </div>
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6  ">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаал
                </h1>
                <input class="input  is-size-7" />
              </div>
            </div>
          </div>
          {tsalinKhuls ? (
            <div className="columns">
              <div className="column is-8"> </div>
              <div className="column is-4 has-text-right">
                <button className="buttonTsenkher ">Хэвлэх</button>
                <button className="buttonTsenkher ml-1">Хадгалах</button>
                <button className="buttonTsenkher ml-1">Хадгалаад харах</button>
              </div>
            </div>
          ) : null}
          {button === 1 ? 2 : null}
        </div>
      )}
    </div>
  );
}
export default Home;
