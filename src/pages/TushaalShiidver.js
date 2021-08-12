import React, { useEffect, useState, useReducer } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { useAlert } from "react-alert";
import {
  Search,
  Filter,
  Add,
  Excel,
  AddBlue,
  M,
  Trush,
  Delete,
  Eye,
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import {
  DepartmentID,
  Subdepartment,
  Compartment,
  Positionlevel,
  Position,
  Decisiontype,
  Salarytype,
} from "../components/library";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

var dateFormat = require("dateformat");
const axios = require("axios");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));
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
const customStylesTable = {
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
    },
  },
};
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
const ButtonsColumn = ({ row, setJagsaalt, jagsaalt, setTushaalKharakh }) => {
  const alert = useAlert();
  function deleteDecision() {
    DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/decisionDelete/",
      method: "POST",
      data: {
        DECISION_ID: row?.DECISION_ID,
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
              (element, index) => element.DECISION_ID !== row?.DECISION_ID
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
  function tushaalKharuulakh() {
    setTushaalKharakh({
      tushaalKharakh: true,
      decision_ID: row.DECISION_ID,
    });
  }
  return (
    <div>
      <img
        src={Delete}
        width="30px"
        height="30px"
        onClick={deleteDecision}
        style={{ cursor: "pointer" }}
      />
      <img
        src={Eye}
        width="20px"
        height="20px"
        style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "5px" }}
        onClick={() => tushaalKharuulakh()}
      />
    </div>
  );
};

const Home = (props) => {
  const [jagsaalt, setJagsaalt] = useState();
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [NuutsiinBvrtgel, setNuutsiinBvrtgel] = useState({
    tsonkh: false,
    type: 0,
  });
  const [deleteList, setDeleteList] = useState();
  const [tushaalKharakh, setTushaalKharakh] = useState({
    tushaalKharakh: false,
    decision_ID: 0,
  });
  const alert = useAlert();

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
    console.log("Selected Rows: ", state.selectedRows);
    if (
      state.selectedRows !== undefined &&
      state.selectedRows !== null &&
      state.selectedRows?.length !== 0
    ) {
      setDeleteList(state.selectedRows[0]);
    }
  };

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
  function deleteDecision() {
    if (
      deleteList?.DECISION_ID !== undefined &&
      deleteList?.DECISION_ID !== "" &&
      deleteList?.DECISION_ID !== null
    ) {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/decisionDelete/",

        method: "POST",
        data: {
          DECISION_ID: deleteList?.DECISION_ID,
          IS_ACTIVE: 1,
          UPDATED_BY: userDetils?.USER_ID,
          UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            setJagsaalt(
              jagsaalt?.filter(
                (element, index) =>
                  element.DECISION_ID !== deleteList?.DECISION_ID
              )
            );
            forceRender();
            alert.show("амжилттай устлаа");
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    } else {
      alert.show("устгах өгөгдлөө сонгон уу?");
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
    {
      name: "",
      maxWidth: "600px",

      cell: (row) => (
        <ButtonsColumn
          row={row}
          setJagsaalt={setJagsaalt}
          jagsaalt={jagsaalt}
          tushaalKharakh={tushaalKharakh}
          setTushaalKharakh={setTushaalKharakh}
        />
      ),
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
      <Header title="ШИЙДВЭРИЙН ТУШААЛЫН БҮРТГЭЛ" />
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
                <option value={"START_DATE"}>Хэрэгжих огноо</option>
                <option value={"REGISTER_DATE"}>Бүртгэсэн огноо</option>
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
              <span class="icon is-small is-right" style={{ zIndex: 0 }}>
                <img src={Search} />
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
              onClick={() => setNuutsiinBvrtgel({ tsonkh: true, type: 1 })}
            >
              Томилох
            </button>
            <button
              class="button  ml-3"
              style={{
                borderRadius: "6px",
                backgroundColor: "#418ee6",
                color: "white",
                height: "2rem",
              }}
              onClick={() => setNuutsiinBvrtgel({ tsonkh: true, type: 2 })}
            >
              Чөлөөлөх
            </button>
          </div>
        </div>
        {NuutsiinBvrtgel?.tsonkh ? (
          <div>
            <TushaalAjiltan
              setNuutsiinBvrtgel={setNuutsiinBvrtgel}
              type={NuutsiinBvrtgel.type}
            />
          </div>
        ) : null}
        {tushaalKharakh?.tushaalKharakh ? (
          <TushaalKharakh
            tushaalKharakh={tushaalKharakh}
            setTushaalKharakh={setTushaalKharakh}
            edit={false}
          />
        ) : null}
        <DataTable
          columns={columns}
          data={search === "" ? jagsaalt : found}
          theme="solarized"
          customStyles={customStyles}
          noDataComponent="мэдээлэл байхгүй байна"
          pagination={false}
          selectableRows
          // add for checkbox selection
          Clicked
          selectableRowsSingle={true}
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
  const [jagsaalt, setJagsaalt] = useState();
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [tsonkhnuud, setTsonkhnuud] = useState(1);
  const [worker, setWorker] = useState();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/personall");

      setJagsaalt(listItems?.data);
    }
    fetchData();
  }, [props]);

  function makeSearch(value) {
    setSearch(value);

    let found = jagsaalt?.filter((obj) =>
      equalStr(obj.PERSON_FIRSTNAME, value)
    );
    // console.log(found, "found");
    // if (found === undefined || found.length === 0) {
    //   found = jagsaalt?.filter((obj) =>
    //     equalStr(obj.PERSON_REGISTER_NO, value)
    //   );
    // } else if (found === undefined || found.length === 0) {
    //   found = jagsaalt?.filter((obj) => equalStr(obj.PERSON_LASTNAME, value));
    // } else
    if (found !== undefined || found.length > 0) setFound(found);
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
      if (
        (value1 !== null ? value1.toUpperCase() : "").includes(
          value2.toUpperCase()
        )
      )
        return true;

    return false;
  }
  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
    setWorker(state.selectedRows[0]);
    setTsonkhnuud(2);
  };

  let listItems;
  if (jagsaalt !== undefined || jagsaalt?.length !== 0) {
    listItems = (
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span>ТУШААЛЫН БҮРТГЭЛ</span>
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
                cursor: " -webkit-grab",
                cursor: "grab",
              }}
              onClick={() => props.setNuutsiinBvrtgel(false)}
            >
              X
            </span>
          </div>
        </div>
        <div style={{ padding: "15px 15px 35px 15px" }}>
          {tsonkhnuud === 1 ? (
            <div>
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
                  onChange={(value) => makeSearch(value.target.value)}
                />
                <span class="icon is-small is-right">
                  <img src={Search} />
                </span>
                <span class="icon is-small is-right"></span>
              </div>
              <DataTable
                columns={bagana}
                data={search === "" ? jagsaalt : found}
                theme="solarized"
                customStyles={customStylesTable}
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
          ) : tsonkhnuud === 2 ? (
            <Khoyor
              worker={worker}
              type={props.type}
              close={props.setNuutsiinBvrtgel}
            />
          ) : null}
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
  const alert = useAlert();
  const [button, setbutton] = useState(1);
  const [EMPLOYEE_ID, setEMPLOYEE_ID] = useState();
  const [data, loadData] = useState({
    PERSON_ID: props.worker.PERSON_ID,
    DEPARTMENT_ID: 1,
    SUB_DEPARTMENT_ID: "null",
    COMPARTMENT_ID: "null",
    POSITION_ID: 1,
    IS_ACTIVE: 1,
    CREATED_BY: 1,
    CREATED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    DECISION_TYPE_ID: props.type,
    DECISION_NO: "",
    DECISION_DESC: "",
    START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    REGISTER_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    SHEET_NO: 0,
  });
  const [, forceRender] = useReducer((s) => s + 1, 0);
  useEffect(() => {
    forceRender();
  }, [data]);
  function saveToDB() {
    DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/decision",
      method: "POST",
      data: data,
    })
      .then(function (response) {
        console.log("tushaalResponse", response);
        if (response?.data?.message === "success") {
          setEMPLOYEE_ID(response?.data?.EMPLOYEE_ID);
          alert.show("амжилттай хадгаллаа");
          if (props.type !== 2) setbutton(2);
        } else {
          alert.show("амжилтгүй алдаа");
        }
        //history.push('/sample')
      })
      .catch(function (error) {
        //alert(error.response.data.error.message);
        console.log(error.response);
        alert.show("амжилтгүй алдаа");
      });
  }
  function salary() {
    if (
      EMPLOYEE_ID !== null &&
      EMPLOYEE_ID !== "" &&
      EMPLOYEE_ID !== undefined
    ) {
      setbutton(2);
    } else {
      alert.show("үндсэн мэдээлэл бөглөөд хадгалана уу");
    }
  }
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
          {props.type !== 2 ? (
            <button
              style={{
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#e8e8e8",
                color: "#418ee6",
                justifyContent: "center",
                marginLeft: "5px",
              }}
              onClick={() => salary()}
            >
              ЦАЛИН ХӨЛС
            </button>
          ) : null}
        </div>

        <div className="column is-6"></div>
        <div className="column is-2 has-text-right">
          {/* <button
            onClick={() => setTsalin(!tsalinKhuls)}
            className="buttonTsenkher"
          >
            Засварлах
          </button> */}
        </div>
      </div>
      {button === 1 ? (
        <div>
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input
                class="input  is-size-7"
                value={props.worker.PERSON_LASTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input
                class="input  is-size-7"
                value={props.worker.PERSON_FIRSTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-6">
              <h1>
                {" "}
                <span style={{ color: "red" }}>*</span>Тушаалын төрөл
              </h1>
              <input
                class="input  is-size-7"
                disabled
                value={data?.DECISION_TYPE_ID === 1 ? "Томилох" : "Чөлөөлөх"}
                onChange={(e) => {
                  loadData({
                    ...data,
                    ...{
                      DECISION_TYPE_ID: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Байгууллага нэр</h1>
                <DepartmentID personChild={data} setPersonChild={loadData} />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тушаалын дугаар
                </h1>
                <input
                  class="input  is-size-7"
                  value={data?.DECISION_NO}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        DECISION_NO: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Газар нэгж</h1>
                <Subdepartment personChild={data} setPersonChild={loadData} />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тайлбар
                </h1>
                <input
                  class="input  is-size-7"
                  value={data?.DECISION_DESC}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        DECISION_DESC: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Албан хэлтэс</h1>
                <Compartment personChild={data} setPersonChild={loadData} />
              </div>

              <div className="column is-3">
                <h1>Хэрэгжих огноо</h1>
                <input
                  type="date"
                  disabled={props.edit}
                  className="anketInput"
                  value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        START_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>

              <div className="column is-3">
                <h1>Бүртгэсэн огноо</h1>
                <input
                  type="date"
                  disabled={props.edit}
                  className="anketInput"
                  value={dateFormat(data?.REGISTER_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        REGISTER_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин{" "}
                </h1>
                <Positionlevel personChild={data} setPersonChild={loadData} />
              </div>
              {props.type === 2 ? (
                <div className="column is-3">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Тойрох хуудасны
                    дугаар
                  </h1>
                </div>
              ) : null}
              {props.type === 2 ? (
                <div className="column  is-2 ">
                  <input
                    class="input  is-size-7"
                    value={data?.SHEET_NO}
                    onChange={(e) => {
                      loadData({
                        ...data,
                        ...{
                          SHEET_NO: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              ) : null}

              {/* <div className="column  is-1">
                <h1>
                  <span style={{ color: "red" }}>*</span>Тушаал
                </h1>
              </div>
              <div className="column  is-1 ">
                <img src={M} width="20px" height="20px" />
                <img src={Trush} width="20px" height="20px" />
              </div> */}
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6  ">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаал
                </h1>
                <Position personChild={data} setPersonChild={loadData} />
              </div>
            </div>
          </div>
          {/* {tsalinKhuls ? ( */}
          <div className="columns">
            <div className="column is-8"> </div>
            <div className="column is-4 has-text-right">
              <button
                className="buttonTsenkher ml-1"
                onClick={() => {
                  saveToDB();
                }}
              >
                Хадгалах
              </button>
            </div>
          </div>
          {/* ) : null} */}
        </div>
      ) : (
        <div
          style={{
            padding: "15px 10px 25px 10px",
          }}
        >
          <Salary EMPLOYEE_ID={EMPLOYEE_ID} close={props.close} />
        </div>
      )}
    </div>
  );
}

function Salary(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/salary/" + props.EMPLOYEE_ID
      );
      console.log(listItems, "EMPLOYEE_ID");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    console.log("userSalary", userDetils);
    if (data?.salary === undefined || data?.salary.length === 0)
      loadData({
        salary: [
          {
            SALARY_TYPE_ID: 1,
            SALARY_SUPPLEMENT: "",
            SALARY_MOTIVE: "",
            SALARY_DESC: "",
            SALARY_AMOUNT: 0,
            TOTAL: 0,
            EMPLOYEE_ID: props.EMPLOYEE_ID,
            IS_ACTIVE: 1,
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data]);

  function saveToDB() {
    if (requiredField(data) === true) {
      let newRow = data?.salary?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.salary?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/salary/",
          method: "POST",
          data: { salary: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) {
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                props.close(false);
              }
            } else {
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/salary/",
          method: "PUT",
          data: { salary: oldRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) {
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                props.close(false);
              }
            } else {
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
          });
      }
    }
  }

  function requiredField() {
    for (let i = 0; i < data.salary.length; i++) {
      if (
        data.salary[i].POSITION_SALARY === null ||
        data.salary[i].POSITION_SALARY === ""
      ) {
        alert.show("албан тушаалын оруулан уу");
        return false;
      } else if (i === data.salary.length - 1) {
        return true;
      }
    }
  }

  async function addRow() {
    let value = data.salary;
    value.push({
      SALARY_TYPE_ID: 1,
      SALARY_SUPPLEMENT: "",
      SALARY_MOTIVE: "",
      SALARY_DESC: "",
      EMPLOYEE_ID: props.EMPLOYEE_ID,
      SALARY_AMOUNT: 0,
      TOTAL: 0,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ salary: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/salaryDelete",
        method: "POST",
        data: {
          salary: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      salary: data?.salary.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.salary !== undefined || data?.salary.length !== 0) {
    listItems = (
      <div>
        <div className="columns">
          <div className="column is-11">
            <span className="headerTextBold">Цалингийн мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              className="buttonTsenkher"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Засварлах
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12">
            <table className="table is-bordered ">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      №
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалингийн төрөл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалин хөлс нэмэгдлийн нэр
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалин хөлс өөрчилсөн үндэслэл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Дүн
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Тайлбар
                    </span>
                  </td>

                  {!edit ? (
                    <td
                      style={{
                        borderColor: "transparent",
                        border: "none",
                        paddingLeft: "0px",
                        width: "50px",
                      }}
                    >
                      <img
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.salary?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <Salarytype
                        personChild={data}
                        setPersonChild={loadData}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_SUPPLEMENT}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_SUPPLEMENT = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_MOTIVE}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_MOTIVE = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        type="number"
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_AMOUNT}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_AMOUNT = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_DESC}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_DESC = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                          width: "50px",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeRow(index, value)}
                        />
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="columns">
          <div className="column is-11"></div>

          {!edit ? (
            <div className="column is-1 ">
              {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function TushaalKharakh(props) {
  const [data, loadData] = useState();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://172.16.24.103:3002/api/v1/decision/" +
          props.tushaalKharakh?.decision_ID
      );

      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  let listItems;
  if (data != undefined || data != null) {
    listItems = (
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
        <div className="columns">
          <div className="column is-4">ҮНДСЭН МЭДЭЭЛЭЛ</div>

          <div className="column is-6"></div>
          <div className="column is-2 has-text-right">
            <span
              style={{
                fontWeight: "bold",
                cursor: " -webkit-grab",
                cursor: "grab",
              }}
              onClick={() => props.setTushaalKharakh({ tushaalKharakh: false })}
            >
              X
            </span>
          </div>
        </div>

        <div>
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input
                class="input  is-size-7"
                value={data?.PERSON_LASTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input
                class="input  is-size-7"
                value={data?.PERSON_FIRSTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-6">
              <h1>
                {" "}
                <span style={{ color: "red" }}>*</span>Тушаалын төрөл
              </h1>
              <input
                class="input  is-size-7"
                disabled
                value={data?.DECISION_TYPE_ID === 1 ? "Томилох" : "Чөлөөлөх"}
                onChange={(e) => {
                  loadData({
                    ...data,
                    ...{
                      DECISION_TYPE_ID: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Байгууллага нэр</h1>
                <DepartmentID
                  personChild={data}
                  setPersonChild={loadData}
                  edit={true}
                />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тушаалын дугаар
                </h1>
                <input
                  class="input  is-size-7"
                  disabled
                  value={data?.DECISION_NO}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        DECISION_NO: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Газар нэгж</h1>
                <Subdepartment
                  personChild={data}
                  setPersonChild={loadData}
                  edit={true}
                />
              </div>
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Тайлбар
                </h1>
                <input
                  class="input  is-size-7"
                  value={data?.DECISION_DESC}
                  disabled
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        DECISION_DESC: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="columns">
              <div className="column is-6">
                <h1>Албан хэлтэс</h1>
                <Compartment
                  personChild={data}
                  setPersonChild={loadData}
                  edit={true}
                />
              </div>

              <div className="column is-3">
                <h1>Хэрэгжих огноо</h1>
                <input
                  type="date"
                  disabled={props.edit}
                  className="anketInput"
                  value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        START_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>

              <div className="column is-3">
                <h1>Бүртгэсэн огноо</h1>
                <input
                  type="date"
                  disabled
                  className="anketInput"
                  value={dateFormat(data?.REGISTER_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        REGISTER_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин{" "}
                </h1>
                <Positionlevel
                  personChild={data}
                  setPersonChild={loadData}
                  edit={true}
                />
              </div>
              {data?.SHEET_NO ? (
                <div className="column is-3">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Тойрох хуудасны
                    дугаар
                  </h1>
                </div>
              ) : null}
              {data?.SHEET_NO ? (
                <div className="column  is-2 ">
                  <input
                    class="input  is-size-7"
                    disabled
                    value={data?.SHEET_NO}
                    onChange={(e) => {
                      loadData({
                        ...data,
                        ...{
                          SHEET_NO: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              ) : null}

              {/* <div className="column  is-1">
                <h1>
                  <span style={{ color: "red" }}>*</span>Тушаал
                </h1>
              </div>
              <div className="column  is-1 ">
                <img src={M} width="20px" height="20px" />
                <img src={Trush} width="20px" height="20px" />
              </div> */}
            </div>
          </div>
          <div>
            <div className="columns ">
              <div className="column is-6  ">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаал
                </h1>
                <Position
                  personChild={data}
                  setPersonChild={loadData}
                  edit={true}
                />
              </div>
            </div>
          </div>
        </div>
        <SalaryKaruulakh EMPLOYEE_ID={data.EMPLOYEE_ID} />
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}
function SalaryKaruulakh(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/salary/" + props.EMPLOYEE_ID
      );
      console.log(listItems, "EMPLOYEE_ID");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    console.log("userSalary", userDetils);
    if (data?.salary === undefined || data?.salary.length === 0)
      loadData({
        salary: [
          {
            SALARY_TYPE_ID: 1,
            SALARY_SUPPLEMENT: "",
            SALARY_MOTIVE: "",
            SALARY_DESC: "",
            SALARY_AMOUNT: 0,
            TOTAL: 0,
            EMPLOYEE_ID: props.EMPLOYEE_ID,
            IS_ACTIVE: 1,
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ],
      });
  }, [data]);

  function saveToDB() {
    if (requiredField(data) === true) {
      let newRow = data?.salary?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.salary?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/salary/",
          method: "POST",
          data: { salary: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) {
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                props.close(false);
              }
            } else {
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/salary/",
          method: "PUT",
          data: { salary: oldRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) {
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                props.close(false);
              }
            } else {
              alert.show("амжилтгүй алдаа");
              setEdit(!edit);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setEdit(!edit);
          });
      }
    }
  }

  function requiredField() {
    for (let i = 0; i < data.salary.length; i++) {
      if (
        data.salary[i].POSITION_SALARY === null ||
        data.salary[i].POSITION_SALARY === ""
      ) {
        alert.show("албан тушаалын оруулан уу");
        return false;
      } else if (i === data.salary.length - 1) {
        return true;
      }
    }
  }

  async function addRow() {
    let value = data.salary;
    value.push({
      SALARY_TYPE_ID: 1,
      SALARY_SUPPLEMENT: "",
      SALARY_MOTIVE: "",
      SALARY_DESC: "",
      EMPLOYEE_ID: props.EMPLOYEE_ID,
      SALARY_AMOUNT: 0,
      TOTAL: 0,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await loadData({ salary: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/salaryDelete",
        method: "POST",
        data: {
          salary: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      salary: data?.salary.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  let listItems;
  if (data?.salary !== undefined || data?.salary.length !== 0) {
    listItems = (
      <div>
        <div className="columns">
          <div className="column is-11">
            <span className="headerTextBold">Цалингийн мэдээлэл</span>
          </div>
          <div className="column is-1"></div>
        </div>
        <div className="columns">
          <div className="column is-12">
            <table className="table is-bordered ">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      №
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалингийн төрөл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалин хөлс нэмэгдлийн нэр
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Цалин хөлс өөрчилсөн үндэслэл
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Дүн
                    </span>
                  </td>
                  <td>
                    <span className="textSaaral" style={{ fontSize: "1rem" }}>
                      Тайлбар
                    </span>
                  </td>

                  {!edit ? (
                    <td
                      style={{
                        borderColor: "transparent",
                        border: "none",
                        paddingLeft: "0px",
                        width: "50px",
                      }}
                    >
                      <img
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.salary?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <Salarytype
                        personChild={data}
                        setPersonChild={loadData}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_SUPPLEMENT}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_SUPPLEMENT = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_MOTIVE}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_MOTIVE = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        disabled={edit}
                        type="number"
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_AMOUNT}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_AMOUNT = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    <td>
                      <input
                        disabled={edit}
                        className="Borderless"
                        placeholder="утгаа оруулна уу"
                        value={data.salary[index]?.SALARY_DESC}
                        onChange={(text) => {
                          let value = [...data?.salary];
                          value[index].SALARY_DESC = text.target.value;
                          value[index].UPDATED_BY = userDetils?.USER_ID;
                          value[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          loadData({ salary: value });
                        }}
                      />
                    </td>

                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                          width: "50px",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeRow(index, value)}
                        />
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="columns">
          <div className="column is-11"></div>

          {!edit ? (
            <div className="column is-1 ">
              {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
export default Home;
