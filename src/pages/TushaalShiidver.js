import React, { useEffect, useState, useReducer } from "react";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { useAlert } from "react-alert";
import { Search, Add, Harah, Ustgah } from "../assets/images/zurag";
import CurrencyInput from "react-currency-input-field";
import {
  DepartmentID,
  Subdepartment,
  Compartment,
  Positionlevel,
  Position,
  Salarytype,
  Reasonsdecision,
} from "../components/library";
import hrUrl from "../hrUrl";

var dateFormat = require("dateformat");
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
const ButtonsColumn = ({
  row,
  setJagsaalt,
  jagsaalt,
  setTushaal,
  buttonValue,
}) => {
  // const alert = useAlert();
  // const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  // function deleteDecision() {
  //   DataRequest({
  //     url: hrUrl + "/decisionDelete/",
  //     method: "POST",
  //     data: {
  //       DECISION_ID: row?.DECISION_ID,
  //       REASON_ID: 1,
  //       REASON_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  //       REASON_DESC: "",
  //       UPDATED_BY: userDetils?.USER_ID,
  //       UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  //     },
  //   })
  //     .then(function (response) {
  //       console.log("UpdateResponse", response);

  //       if (response?.data?.message === "success") {
  //         setJagsaalt(
  //           jagsaalt?.filter(
  //             (element, index) => element.DECISION_ID !== row?.DECISION_ID
  //           )
  //         );

  //         alert.show("амжилттай устлаа");
  //       }
  //     })
  //     .catch(function (error) {
  //       //alert(error.response.data.error.message);
  //       console.log(error.response);
  //       alert.show("aldaa");
  //     });
  // }
  function tushaalUstgakh() {
    setTushaal({
      tushaalKharakh: false,
      decision_ID: row.DECISION_ID,
      tushaalUstgakh: true,
    });
  }
  function tushaalKharuulakh() {
    setTushaal({
      tushaalKharakh: true,
      decision_ID: row.DECISION_ID,
    });
  }
  return (
    <div>
      <img
        alt=""
        src={Harah}
        width="20px"
        height="20px"
        style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "5px" }}
        onClick={() => tushaalKharuulakh()}
      />
      {buttonValue === 1 ? (
        <img
          alt=""
          src={Ustgah}
          width="20px"
          height="20px"
          onClick={() => tushaalUstgakh()}
          style={{ marginLeft: "10px", cursor: "pointer"}}
        />
      ) : null}
      
    </div>
  );
};

const Home = (props) => {
  const [jagsaalt, setJagsaalt] = useState([]);
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");

  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [NuutsiinBvrtgel, setNuutsiinBvrtgel] = useState({
    tsonkh: false,
    type: 0,
  });
  const [deleteList, setDeleteList] = useState();
  const [tushaal, setTushaal] = useState({
    tushaalKharakh: false,
    decision_ID: 0,
    tushaalUstgakh: false,
  });
  const [buttonValue, setButtonValue] = useState(1);
  const [lib, setLib] = useState([]);

  async function fetchData() {
    setSearch("");
    let jagsaalts = await DataRequest({
      url:
        hrUrl +
        "/decision/1/" +
        userDetils?.USER_DEPARTMENT_ID +
        "/" +
        userDetils?.USER_TYPE_NAME.toUpperCase(),
      method: "GET",
      data: {},
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts?.data);
    let lib = await DataRequest({
      url: hrUrl + "/library/decisiontype",
      method: "GET",
      data: {},
    });
    if (lib.data !== undefined) setLib(lib?.data);
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  async function unActive() {
    setSearch("");
    let jagsaalts = await DataRequest({
      url:
        hrUrl +
        "/decision/0/" +
        userDetils?.USER_DEPARTMENT_ID +
        "/" +
        userDetils?.USER_TYPE_NAME.toUpperCase(),
      method: "GET",
      data: {},
    });
    setJagsaalt(jagsaalts?.data);
    setButtonValue(2);
  }
  async function Active() {
    let jagsaalts = await DataRequest({
      url:
        hrUrl +
        "/decision/1/" +
        userDetils?.USER_DEPARTMENT_ID +
        "/" +
        userDetils?.USER_TYPE_NAME.toUpperCase(),
      method: "GET",
      data: {},
    });
    setJagsaalt(jagsaalts?.data);
    setButtonValue(1);
  }

  const handleChange = (state) => {
    //console.log("Selected Rows: ", state.selectedRows);
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
    //console.log(found);
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
  // function deleteDecision() {
  //   if (
  //     deleteList?.DECISION_ID !== undefined &&
  //     deleteList?.DECISION_ID !== "" &&
  //     deleteList?.DECISION_ID !== null
  //   ) {
  //     DataRequest({
  //       url: hrUrl + "/decisionDelete/",

  //       method: "POST",
  //       data: {
  //         DECISION_ID: deleteList?.DECISION_ID,
  //         IS_ACTIVE: 1,
  //         UPDATED_BY: userDetils?.USER_ID,
  //         UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  //       },
  //     })
  //       .then(function (response) {
  //         console.log("UpdateResponse", response);
  //         //history.push('/sample')
  //         if (response?.data?.message === "success") {
  //           setJagsaalt(
  //             jagsaalt?.filter(
  //               (element, index) =>
  //                 element.DECISION_ID !== deleteList?.DECISION_ID
  //             )
  //           );
  //           forceRender();
  //           alert.show("амжилттай устлаа");
  //         }
  //       })
  //       .catch(function (error) {
  //         //alert(error.response.data.error.message);
  //         console.log(error.response);
  //         alert.show("aldaa");
  //       });
  //   } else {
  //     alert.show("устгах өгөгдлөө сонгон уу?");
  //   }
  // }
  const columns =
    buttonValue === 1
      ? [
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
            expandableRows: true,
          },
          {
            name: "Ажилтны овог",
            selector: "PERSON_LASTNAME",
            sortable: true,
            expandableRows: true,
          },
          {
            name: "Газар нэгж",
            selector: "DEPARTMENT_NAME",
            sortable: true,
            expandableRows: true,
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
            expandableRows: true,
          },
          {
            name: "Тушаалын төрөл",
            selector: "DECISION_TYPE_NAME",
            sortable: true,
            center: true,
          },
          {
            name: "Тушаалын дугаар",
            selector: "DECISION_NO",
            sortable: true,
            center: true,
          },

          {
            name: "Хэрэгжих огноо",
            center: true,
            selector: (row, index) => {
              return dateFormat(row.START_DATE, "yyyy-mm-dd");
            },
            sortable: true,
          },
          {
            name: "Бүртгэсэн огноо",
            center: true,
            width: "100px",
            selector: (row, index) => {
              return dateFormat(row.REGISTER_DATE, "yyyy-mm-dd");
            },
            sortable: true,
          },
          {
            name: "",

            right: true,
            cell: (row) => (
              <ButtonsColumn
                row={row}
                setJagsaalt={setJagsaalt}
                jagsaalt={jagsaalt}
                tushaal={tushaal}
                setTushaal={setTushaal}
                buttonValue={buttonValue}
              />
            ),
          },
        ]
      : [
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
            center: true,
          },
          {
            name: "Тушаалын дугаар",
            selector: "DECISION_NO",
            sortable: true,
            center: true,
          },

          {
            name: "Шалтгаан",
            center: true,
            selector: "REASONS_DECISION_CHANGE_NAME",
            sortable: true,
          },
          {
            name: "Устгасан огноо",
            center: true,
            width: "100px",
            selector: (row, index) => {
              return dateFormat(row.REASON_DATE, "yyyy-mm-dd");
            },
            sortable: true,
          },
          {
            name: "Тайлбар",
            center: true,
            width: "100px",
            selector: "REASON_DESC",
            sortable: true,
          },
          {
            name: "",
            right: true,
            cell: (row) => (
              <ButtonsColumn
                row={row}
                setJagsaalt={setJagsaalt}
                jagsaalt={jagsaalt}
                tushaal={tushaal}
                setTushaal={setTushaal}
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
      {/*<Header  title="ШИЙДВЭР, ТУШААЛЫН БҮРТГЭЛ" /> */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          left: "7%",
          zIndex: 1,
          top: "20px",
        }}
      >
        <span
          style={{
            color: "#418ee6",
            fontSize: 25,
            fontFamily: "RalewayRegular",
          }}
        >
          ШИЙДВЭР, ТУШААЛЫН БҮРТГЭЛ
        </span>
      </div>
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
              backgroundColor: buttonValue === 1 ? "#418ee6" : "white",
              color: buttonValue === 1 ? "white" : "black",
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
              backgroundColor: buttonValue === 2 ? "#418ee6" : "white",
              color: buttonValue === 2 ? "white" : "black",
              borderColor: "#418ee6",
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
              Үүсгэх
            </button>
            {/* <button
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
            </button> */}
          </div>
        </div>
        {NuutsiinBvrtgel?.tsonkh ? (
          <div>
            <TushaalAjiltan
              lib={lib}
              setNuutsiinBvrtgel={setNuutsiinBvrtgel}
              type={NuutsiinBvrtgel.type}
            />
          </div>
        ) : null}
        {tushaal?.tushaalKharakh ? (
          <TushaalKharakh
            tushaal={tushaal}
            lib={lib}
            setTushaal={setTushaal}
            edit={false}
            buttonValue={buttonValue === 1 ? 1 : 0}
            fetchData={fetchData}
          />
        ) : null}
        {tushaal?.tushaalUstgakh ? (
          <UstgakhTsonkh
            tushaal={tushaal}
            fetchData={fetchData}
            setTushaal={setTushaal}
            jagsaalt={jagsaalt}
            setJagsaalt={setJagsaalt}
            edit={false}
          />
        ) : null}
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
    name: "Регистрийн дугаар",
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
  async function fetchData() {
    let listItems = await axios(hrUrl + "/personall");

    setJagsaalt(listItems?.data);
  }
  useEffect(() => {
    fetchData();
  }, [props]);

  function makeSearch(value) {
    setSearch(value);

    let found = jagsaalt?.filter((obj) =>
      equalStr(obj.PERSON_FIRSTNAME, value)
    );

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
                  <img alt="" src={Search} />
                </span>
                <span class="icon is-small is-right"></span>
              </div>
              <DataTable
                columns={bagana}
                data={search === "" ? jagsaalt : found}
                theme="solarized"
                customStyles={customStylesTable}
                noDataComponent="мэдээлэл байхгүй байна"
                selectableRows // add for checkbox selection
                Clicked
                onSelectedRowsChange={handleChange}
                noHeader={true}
                fixedHeader={true}
                overflowY={true}
                overflowYOffset={"390px"}
                pagination={true}
                paginationPerPage={10}
                paginationComponentOptions={{
                  rowsPerPageText: "Хуудас:",
                  rangeSeparatorText: "нийт:",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                  selectAllRowsItemText: "All",
                }}
              />
            </div>
          ) : tsonkhnuud === 2 ? (
            <Khoyor
              worker={worker}
              lib={props.lib}
              type={props.type}
              fetchData={fetchData}
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
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [file, setFiles] = useState(new FormData());
  const [fileName, setFileName] = useState("");
  const alert = useAlert();
  const [button, setbutton] = useState(1);
  const [EMPLOYEE_ID, setEMPLOYEE_ID] = useState();

  const [data, loadData] = useState({
    DECISION_ID: null,
    PERSON_ID: props.worker.PERSON_ID,
    EMPLOYEE_ID: props.worker.EMPLOYEE_ID,
    DEPARTMENT_ID:
      props.worker.DEPARTMENT_ID === null
        ? userDetils.USER_DEPARTMENT_ID
        : props.worker.DEPARTMENT_ID,
    SUB_DEPARTMENT_ID:
      props.worker.SUB_DEPARTMENT_ID === null
        ? "null"
        : props.worker.SUB_DEPARTMENT_ID,
    COMPARTMENT_ID:
      props.worker.COMPARTMENT_ID === null
        ? "null"
        : props.worker.COMPARTMENT_ID,
    POSITION_ID:
      props.worker.POSITION_ID === null ? "null" : props.worker.POSITION_ID,
    POSITION_LEVEL_ID:
      props.worker.POSITION_LEVEL_ID === null
        ? "null"
        : props.worker.POSITION_LEVEL_ID,
    IS_ACTIVE: 1,
    CREATED_BY: 1,
    CREATED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    DECISION_TYPE_ID: props.type,
    DECISION_NO: "",
    DECISION_DESC: "",
    START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    REGISTER_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    SHEET_NO: 0,
    COMMAND_TYPE_ID: 999,
    IS_SALARY: false,
  });
  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    forceRender();
  }, [data]);

  function requiredField() {
    if (data.COMMAND_TYPE_ID === 999 || data.COMMAND_TYPE_ID === "999") {
      alert.show("Тушаалын төрөл сонгоно уу!!!");
      return false;
    } else {
      return true;
    }
  }

  function saveToDB() {
    if (file.get("files") !== undefined && file.get("files") !== null) {
      console.log("files", file.get("files"));
      let formDataTemp = file;
      formDataTemp.delete("Decision");
      formDataTemp.append("Decision", JSON.stringify(data));
      DataRequest({
        url: hrUrl + "/" + "fileUpload",
        method: "POST",
        data: formDataTemp,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        if (response?.data?.message === "success") {
          setEMPLOYEE_ID(response?.data?.EMPLOYEE_ID);
          alert.show("амжилттай хадгаллаа");
          if (props.type !== 2 && data.IS_SALARY === true) setbutton(2);
          else {
            props.close(false);
            props.fetchData();
          }
        } else {
          alert.show("Системийн алдаа");
        }
        //history.push('/sample')
      });
    } else {
      console.log("datatatata", data);
      DataRequest({
        url: hrUrl + "/decision",
        method: "POST",
        data: data,
      })
        .then(function (response) {
          console.log("tushaalResponse", response);
          if (response?.data?.message === "success") {
            setEMPLOYEE_ID(response?.data?.EMPLOYEE_ID);
            alert.show("амжилттай хадгаллаа");
            if (props.type !== 2 && data.IS_SALARY === true) setbutton(2);
            else {
              props.close(false);
              props.fetchData();
            }
          } else {
            alert.show("Системийн алдаа");
          }
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("Системийн алдаа");
        });
    }
  }
  async function saveFILE(file) {
    if (file.target.files[0].name.split(".").pop().toLowerCase() !== "pdf") {
      alert("Зөвхөн pdf файл оруулна уу!");
    } else {
      const formData = new FormData();
      setFileName(file.target.files[0].name);
      formData.append(
        "data",
        JSON.stringify({
          type: "decision",
        })
      );

      formData.append("files", file.target.files[0]);
      setFiles(formData);
    }
  }
  function salary() {
    if (
      EMPLOYEE_ID !== null &&
      EMPLOYEE_ID !== "" &&
      EMPLOYEE_ID !== undefined
    ) {
      setbutton(2);
    } else {
      alert.show("үндсэн мэдээлэл бөглөөд хадгална уу");
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
        <div className="column is-2 has-text-right"></div>
      </div>
      {button === 1 ? (
        <div>
          <div className="columns">
            <div className="column column is-8">
              <select
                className="Borderless"
                value={data.DECISION_TYPE_ID}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      DECISION_TYPE_ID: text.target.value,
                    },
                  });
                }}
              >
                <option key={999} value={999}>
                  Тушаалын төрөл сонгоно уу
                </option>
                {props.lib?.map((nation, index) => (
                  <option key={index} value={nation.DECISION_TYPE_ID}>
                    {nation.DECISION_TYPE_NAME}
                  </option>
                ))}
              </select>
            </div>
            <div className="column is-4" style={{ marginLeft: "2rem" }}>
              <label htmlFor="salary">Цалин хөлс тооцох эсэх</label>
              <input
                id="salary"
                type="checkbox"
                style={{ marginLeft: "20px" }}
                checked={data.IS_SALARY}
                onChange={() => {
                  let temp = data;
                  if (document.getElementById("salary").checked) {
                    temp.IS_SALARY = true;
                  } else {
                    temp.IS_SALARY = false;
                  }
                  loadData({ ...temp });
                }}
              />
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input
                class="input  is-size-7"
                value={props.worker.PERSON_FIRSTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input
                class="input  is-size-7"
                value={props.worker.PERSON_LASTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-6">
              {/* <h1>
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
              /> */}
            </div>
          </div>

          <div>
            <div className="columns">
              {props.type === 1 ? (
                <div className="column is-6">
                  <h1>Байгууллага нэр</h1>
                  <DepartmentID personChild={data} setPersonChild={loadData} />
                </div>
              ) : null}
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
              {props.type === 1 ? (
                <div className="column is-6">
                  <h1>Газар нэгж</h1>
                  <Subdepartment personChild={data} setPersonChild={loadData} />
                </div>
              ) : null}
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
              {props.type === 1 ? (
                <div className="column is-6">
                  <h1>Алба хэлтэс</h1>
                  <Compartment personChild={data} setPersonChild={loadData} />
                </div>
              ) : null}

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
              {/* {props.type === 1 ? (
                <div className="column is-6">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин{" "}
                  </h1>
                  <Positionlevel personChild={data} setPersonChild={loadData} />
                </div>
              ) : null} */}
              {data?.COMMAND_TYPE_ID === 2 ? (
                <div className="column is-3">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Тойрох хуудасны
                    дугаар
                  </h1>
                </div>
              ) : null}
              {data?.COMMAND_TYPE_ID === 2 ? (
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
            </div>
          </div>
          <div>
            <div className="columns ">
              {props.type === 1 ? (
                <div className="column is-6  ">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Албан тушаал
                  </h1>
                  <Position personChild={data} setPersonChild={loadData} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">
              <form className="uploadButton mr-3">
                <label
                  htmlFor="file-upload"
                  className="custom-file-upload text-white"
                  style={{
                    backgroundColor: "#418ee6",
                    borderRadius: "5px",
                    padding: "4px",
                    color: "white",
                  }}
                >
                  <i class="fa fa-cloud-upload"></i> Хавсралт оруулах
                </label>
                <input
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={(file) => saveFILE(file)}
                />
                {fileName !== "" ? (
                  <span style={{ paddingLeft: "1rem" }}>{fileName}</span>
                ) : null}
              </form>

              {file.FILE_PATH !== undefined ? (
                <a
                  href={
                    hrUrl.replace("api/v1", "") +
                    "static" +
                    file?.FILE_PATH.replace("uploads", "")
                  }
                  without
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button
                    className="inline-flex items-center rounded"
                    style={{
                      border: "1.5px solid #2684fe",
                    }}
                  >
                    <div className="bg-white">
                      <svg
                        width="20px"
                        height="20px "
                        xmlns="http://www.w3.org/2000/svg"
                        class="mx-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        color="#2684fe"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        backgroundColor: "white",
                        paddingBottom: "0.01rem",
                      }}
                      className="px-2"
                    >
                      <p>Хавсралт харах</p>
                    </div>
                  </button>
                </a>
              ) : null}
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
          // style={{
          //   padding: "15px 10px 25px 10px",
          // }}
          className="p-6"
        >
          <Salary
            EMPLOYEE_ID={EMPLOYEE_ID}
            close={props.close}
            fetchData={() => props.fetchData()}
          />
        </div>
      )}
    </div>
  );
}

function Salary(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(hrUrl + "/salary/" + props?.EMPLOYEE_ID);
      console.log(listItems, "EMPLOYEE_ID");
      if (listItems.data !== undefined && listItems.data.length > 0) {
        loadData(listItems?.data);
      } else {
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
      }
    }
    fetchData();
  }, [props]);

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
          url: hrUrl + "/salary/",
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
                props.fetchData();
              }
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: hrUrl + "/salary/",
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
              alert.show("Системийн алдаа");
              setEdit(!edit);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
          });
      }
    }
  }

  function requiredField() {
    for (let i = 0; i < data.salary.length; i++) {
      if (
        data.salary[i].SALARY_MOTIVE === null ||
        data.salary[i].SALARY_MOTIVE === ""
      ) {
        alert.show("Цалин хөлс өөрчилсөн үндэслэл");
        return false;
      } else if (
        data.salary[i].SALARY_SUPPLEMENT === null ||
        data.salary[i].SALARY_SUPPLEMENT === ""
      ) {
        alert.show("Цалин хөлс нэмэгдлийн нэр оруулна уу");
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
        url: hrUrl + "/salaryDelete",
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
  function salaryType(Pvalue) {
    let value = [...data?.salary];
    value[Pvalue.index].SALARY_TYPE_ID = Pvalue.SALARY_TYPE_ID;
    value[Pvalue.index].UPDATED_BY = userDetils?.USER_ID;
    value[Pvalue.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ salary: value });
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
            {/* {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : ( */}
            <button
              className="buttonTsenkher"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Засварлах
            </button>
            {/* )} */}
          </div>
        </div>
        <div className="table-container">
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
                          paddingLeft: 0,
                        }}
                      >
                        <img
                          alt=""
                          src={Add}
                          width="30px"
                          height="30px"
                          onClick={() => addRow()}
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
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
                          personChild={value}
                          setPersonChild={salaryType}
                          index={index}
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
                        {/* <input
                          disabled={edit}
                          type="number"
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.salary[index]?.SALARY_AMOUNT}
                          onChange={(text) => {}}
                        /> */}
                        <CurrencyInput
                          disabled={edit}
                          decimalScale="2"
                          name="input-name"
                          placeholder="0"
                          value={data.salary[index]?.SALARY_AMOUNT}
                          onValueChange={(numbert, name) => {
                            let value = [...data?.salary];
                            if (numbert !== null && numbert.includes(".")) {
                              value[index].SALARY_AMOUNT = numbert;
                            } else {
                              value[index].SALARY_AMOUNT = numbert + ".00";
                            }
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );

                            loadData({ salary: value });
                          }}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            textAlign: "right",
                            width: "100%",
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
                          }}
                        >
                          <img
                            alt=""
                            src={Ustgah}
                            width="20px"
                            height="20px"
                            onClick={() => removeRow(index, value)}
                          />
                          <input
                            style={{ width: "30px", visibility: "hidden" }}
                          ></input>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState({});
  const [file, setFiles] = useState(new FormData());
  const [fileName, setFileName] = useState("");
  const alert = useAlert();

  async function saveFILE(file) {
    if (file.target.files[0].name.split(".").pop().toLowerCase() !== "pdf") {
      alert("Зөвхөн pdf файл оруулна уу!");
    } else {
      const formData = new FormData();
      setFileName(file.target.files[0].name);
      formData.append(
        "data",
        JSON.stringify({
          type: "decision",
        })
      );

      formData.append("files", file.target.files[0]);
      setFiles(formData);
    }
  }
  async function saveToDBDecition() {
    //console.log(data, "sendDecision");
    if (file.get("files") !== undefined && file.get("files") !== null) {
      //console.log("files", file.get("files"));
      let formDataTemp = file;
      formDataTemp.delete("Decision");

      formDataTemp.append("Decision", JSON.stringify(data));
      if (data?.FILE_PATH !== undefined && data?.FILE_PATH !== null)
        formDataTemp.append("oldFile", data.FILE_PATH);
      DataRequest({
        url: hrUrl + "/fileUpload",
        method: "POST",
        data: formDataTemp,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        if (response?.data?.message === "success") {
          alert.show("амжилттай хадгаллаа");

          props.setTushaal({ tushaalKharakh: false });
          props.fetchData();
        } else {
          alert.show("Системийн алдаа");
        }
        //history.push('/sample')
      });
    } else {
      console.log("datatatata", data);
      DataRequest({
        url: hrUrl + "/decision",
        method: "POST",
        data: data,
      })
        .then(function (response) {
          console.log("tushaalResponse", response);
          if (response?.data?.message === "success") {
            alert.show("амжилттай хадгаллаа");

            props.setTushaal({ tushaalKharakh: false });
            props.fetchData();
          } else {
            alert.show("Системийн алдаа");
          }
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("Системийн алдаа");
        });
    }
  }

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        hrUrl +
          "/decision/" +
          props.buttonValue +
          "/" +
          userDetils?.USER_DEPARTMENT_ID +
          "/" +
          userDetils?.USER_TYPE_NAME.toUpperCase() +
          "/" +
          props.tushaal?.decision_ID
      );
      console.log("TushaalKharakh", listItems);
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems?.data[0]);
    }
    fetchData();
  }, [props]);

  let listItems;
  if (data !== undefined || data !== null) {
    listItems = (
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "85%",
          left: "25%",
          top: "6%",
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
                cursor: "grab",
              }}
              onClick={() => props.setTushaal({ tushaalKharakh: false })}
            >
              X
            </span>
          </div>
        </div>

        <div>
          {/* {data.COMMAND_TYPE_NAME !== undefined &&
          data.COMMAND_TYPE_NAME !== null ? (
            <div className="columns">
              <div className="column is-7">
                <input
                  class="input  is-size-7"
                  disabled
                  value={data?.COMMAND_TYPE_NAME}
                ></input>
              </div>
            </div>
          ) : null} */}
          <div className="columns  ">
            <div className="column is-3">
              <h1>Ажилтны нэр</h1>
              <input
                class="input  is-size-7"
                value={data?.PERSON_FIRSTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-3">
              <h1>Ажилтны овог</h1>
              <input
                class="input  is-size-7"
                value={data?.PERSON_LASTNAME}
                disabled={true}
              />
            </div>
            <div className="column is-6">
              <h1>
                {" "}
                <span style={{ color: "red" }}>*</span>Тушаалын төрөл
              </h1>
              <select
                className="Borderless"
                value={data.DECISION_TYPE_ID}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      DECISION_TYPE_ID: text.target.value,
                    },
                  });
                }}
              >
                <option key={999} value={999}>
                  Тушаалын төрөл сонгоно уу
                </option>
                {props.lib?.map((nation, index) => (
                  <option key={index} value={nation.DECISION_TYPE_ID}>
                    {nation.DECISION_TYPE_NAME}
                  </option>
                ))}
              </select>
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
              {/* <div className="column is-6">
                <h1>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин{" "}
                </h1>
                <Positionlevel personChild={data} setPersonChild={loadData} />
              </div> */}
              {data?.COMMAND_TYPE_ID === 2 ? (
                <div className="column is-3">
                  <h1>
                    {" "}
                    <span style={{ color: "red" }}>*</span>Тойрох хуудасны
                    дугаар
                  </h1>
                </div>
              ) : null}
              {data?.COMMAND_TYPE_ID === 2 ? (
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
                <img alt="" src={M} width="20px" height="20px" />
                <img alt="" src={Trush} width="20px" height="20px" />
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
        </div>
        <SalaryKaruulakh
          PERSON_ID={data.PERSON_ID}
          EMPLOYEE_ID={data.EMPLOYEE_ID}
          saveToDBDecition={saveToDBDecition}
        />
        <div className="columns">
          <div className="column is-7">
            <form className="uploadButton mr-3">
              <label
                htmlFor="file-upload"
                className="custom-file-upload text-white"
                style={{
                  backgroundColor: "#418ee6",
                  borderRadius: "5px",
                  padding: "4px",
                  color: "white",
                }}
              >
                <i class="fa fa-cloud-upload"></i> Хавсралт оруулах
              </label>
              <input
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={(file) => saveFILE(file)}
              />
              {fileName !== "" ? (
                <span style={{ paddingLeft: "1rem" }}>{fileName}</span>
              ) : null}
            </form>
            {data?.FILE_PATH !== undefined && data?.FILE_PATH !== null ? (
              <a
                href={
                  hrUrl.replace("api/v1", "") +
                  "static" +
                  data?.FILE_PATH.replace("uploads", "")
                }
                w
                without
                rel="noopener noreferrer"
                target="_blank"
              >
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    border: "1.5px solid #2684fe",
                    marginTop: "1rem",
                  }}
                >
                  <div className="bg-white">
                    <svg
                      width="20px"
                      height="20px "
                      xmlns="http://www.w3.org/2000/svg"
                      class="mx-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      color="#2684fe"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      paddingBottom: "0.01rem",
                    }}
                    className="px-2"
                  >
                    <p>Хавсралт харах</p>
                  </div>
                </button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}
function SalaryKaruulakh(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState(null);

  const alert = useAlert();
  useEffect(() => {
    async function fetchData() {
      console.log("salaryKharakh", props.PERSON_ID);
      let listItems = await axios(hrUrl + "/salary/" + props.PERSON_ID);
      console.log(listItems, "SalaryKaruulakh");
      loadData(listItems?.data);
    }
    fetchData();
  }, [props]);

  function saveToDB() {
    if (requiredField(data) === true) {
      props.saveToDBDecition();
      let newRow = data?.salary?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.salary?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: hrUrl + "/salary/",
          method: "POST",
          data: { salary: newRow, UPDATED_BY: userDetils.USER_ID },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) {
                props.close(false);
                props.fetchData();
              }
            } else {
              //alert.show("Системийн алдаа");
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            //      alert.show("Системийн алдаа");
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: hrUrl + "/salary/",
          method: "PUT",
          data: { salary: oldRow, UPDATED_BY: userDetils.USER_ID },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;

              if (message !== 1) {
                //  alert.show("амжилттай хадгаллаа");

                props.close(false);
              }
            } else {
              // alert.show("Системийн алдаа");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            // alert.show("Системийн алдаа");
          });
      }
    }
  }

  function requiredField() {
    for (let i = 0; i < data.salary.length; i++) {
      if (
        data.salary[i].SALARY_MOTIVE === null ||
        data.salary[i].SALARY_MOTIVE === ""
      ) {
        alert.show("Цалин хөлс өөрчилсөн үндэслэл");
        return false;
      } else if (
        data.salary[i].SALARY_SUPPLEMENT === null ||
        data.salary[i].SALARY_SUPPLEMENT === ""
      ) {
        alert.show("Цалин хөлс нэмэгдлийн нэр оруулна уу");
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
      EMPLOYEE_ID: props.EMPLOYEE_ID,
    });

    await loadData({ salary: value });
  }
  function removeRow(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: hrUrl + "/salaryDelete",
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
  function salaryType(Pvalue) {
    let value = [...data?.salary];
    value[Pvalue.index].SALARY_TYPE_ID = Pvalue.SALARY_TYPE_ID;
    value[Pvalue.index].UPDATED_BY = userDetils?.USER_ID;
    value[Pvalue.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    loadData({ salary: value });
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
            {/* {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : ( */}

            {/* )} */}
          </div>
        </div>
        <div className="table-container">
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

                    <td
                      style={{
                        borderColor: "transparent",
                        border: "none",
                        paddingLeft: 0,
                      }}
                    >
                      <img
                        alt=""
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRow()}
                      />
                      <input
                        style={{ width: "30px", visibility: "hidden" }}
                      ></input>
                    </td>
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
                          personChild={value}
                          setPersonChild={salaryType}
                          index={index}
                        />
                      </td>

                      <td>
                        <input
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
                        {/* <input
                          disabled={edit}
                          type="number"
                          className="Borderless"
                          placeholder="утгаа оруулна уу"
                          value={data.salary[index]?.SALARY_AMOUNT}
                          onChange={(text) => {}}
                        /> */}
                        <CurrencyInput
                          decimalScale="2"
                          name="input-name"
                          placeholder="0"
                          value={data.salary[index]?.SALARY_AMOUNT}
                          onValueChange={(numbert, name) => {
                            let value = [...data?.salary];
                            if (numbert !== null && numbert.includes(".")) {
                              value[index].SALARY_AMOUNT = numbert;
                            } else {
                              value[index].SALARY_AMOUNT = numbert + ".00";
                            }
                            value[index].UPDATED_BY = userDetils?.USER_ID;
                            value[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );

                            loadData({ salary: value });
                          }}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            textAlign: "right",
                            width: "100%",
                          }}
                        />
                      </td>

                      <td>
                        <input
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

                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                        }}
                      >
                        <img
                          alt=""
                          src={Ustgah}
                          width="20px"
                          height="20px"
                          onClick={() => removeRow(index, value)}
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-11"></div>

          <div className="column is-1 ">
            {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
            <button className="buttonTsenkher" onClick={() => saveToDB()}>
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

// function TushaalKharakh(props) {
//   const userDetils = JSON.parse(localStorage.getItem("userDetails"));
//   const [data, loadData] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       let listItems = await axios(
//         hrUrl + "/decision/" +
//           props.buttonValue +
//           "/" +
//           userDetils?.USER_DEPARTMENT_ID +
//           "/" +
//           userDetils?.USER_TYPE_NAME.toUpperCase() +
//           "/" +
//           props.tushaal?.decision_ID
//       );
//       console.log("TushaalKharakh", listItems);
//       loadData(listItems?.data);
//     }
//     fetchData();
//   }, [props]);

//   let listItems;
//   if (data !== undefined || data !== null) {
//     listItems = (
//       <div
//         style={{
//           position: "absolute",
//           width: "60%",
//           height: "85%",
//           left: "25%",
//           top: "6%",
//           borderRadius: "6px",
//           backgroundColor: "white",
//           boxShadow:
//             "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//           zIndex: "1",
//           padding: "15px 15px 35px 15px",
//           overflow: "scroll",
//         }}
//       >
//         <div className="columns">
//           <div className="column is-4">ҮНДСЭН МЭДЭЭЛЭЛ</div>

//           <div className="column is-6"></div>
//           <div className="column is-2 has-text-right">
//             <span
//               style={{
//                 fontWeight: "bold",
//                 cursor: "grab",
//               }}
//               onClick={() => props.setTushaal({ tushaalKharakh: false })}
//             >
//               X
//             </span>
//           </div>
//         </div>

//         <div>
//           {/* {data.COMMAND_TYPE_NAME !== undefined &&
//           data.COMMAND_TYPE_NAME !== null ? (
//             <div className="columns">
//               <div className="column is-7">
//                 <input
//                   class="input  is-size-7"
//                   disabled
//                   value={data?.COMMAND_TYPE_NAME}
//                 ></input>
//               </div>
//             </div>
//           ) : null} */}
//           <div className="columns  ">
//             <div className="column is-3">
//               <h1>Ажилтны нэр</h1>
//               <input
//                 class="input  is-size-7"
//                 value={data?.PERSON_FIRSTNAME}
//                 disabled={true}
//               />
//             </div>
//             <div className="column is-3">
//               <h1>Ажилтны овог</h1>
//               <input
//                 class="input  is-size-7"
//                 value={data?.PERSON_LASTNAME}
//                 disabled={true}
//               />
//             </div>
//             <div className="column is-6">
//               <h1>
//                 {" "}
//                 <span style={{ color: "red" }}>*</span>Тушаалын төрөл
//               </h1>
//               <select
//                 className="Borderless"
//                 value={data.COMMAND_TYPE_ID}
//                 onChange={(text) => {
//                   loadData({
//                     ...data,
//                     ...{
//                       COMMAND_TYPE_ID: text.target.value,
//                     },
//                   });
//                 }}
//               >
//                 <option key={999} value={999}>
//                   Тушаалын төрөл сонгоно уу
//                 </option>
//                 {props.lib?.map((nation, index) => (
//                   <option key={index} value={nation.COMMAND_TYPE_ID}>
//                     {nation.COMMAND_TYPE_NAME}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <div className="columns">
//               <div className="column is-6">
//                 <h1>Байгууллага нэр</h1>
//                 <DepartmentID personChild={data} setPersonChild={loadData} />
//               </div>
//               <div className="column is-6">
//                 <h1>
//                   {" "}
//                   <span style={{ color: "red" }}>*</span>Тушаалын дугаар
//                 </h1>
//                 <input
//                   class="input  is-size-7"
//                   value={data?.DECISION_NO}
//                   onChange={(e) => {
//                     loadData({
//                       ...data,
//                       ...{
//                         DECISION_NO: e.target.value,
//                       },
//                     });
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="columns">
//               <div className="column is-6">
//                 <h1>Газар нэгж</h1>
//                 <Subdepartment personChild={data} setPersonChild={loadData} />
//               </div>
//               <div className="column is-6">
//                 <h1>
//                   {" "}
//                   <span style={{ color: "red" }}>*</span>Тайлбар
//                 </h1>
//                 <input
//                   class="input  is-size-7"
//                   value={data?.DECISION_DESC}
//                   onChange={(e) => {
//                     loadData({
//                       ...data,
//                       ...{
//                         DECISION_DESC: e.target.value,
//                       },
//                     });
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="columns">
//               <div className="column is-6">
//                 <h1>Албан хэлтэс</h1>
//                 <Compartment personChild={data} setPersonChild={loadData} />
//               </div>

//               <div className="column is-3">
//                 <h1>Хэрэгжих огноо</h1>
//                 <input
//                   type="date"
//                   disabled={props.edit}
//                   className="anketInput"
//                   value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
//                   onChange={(e) => {
//                     loadData({
//                       ...data,
//                       ...{
//                         START_DATE: e.target.value,
//                       },
//                     });
//                   }}
//                 ></input>
//               </div>

//               <div className="column is-3">
//                 <h1>Бүртгэсэн огноо</h1>
//                 <input
//                   type="date"
//                   className="anketInput"
//                   value={dateFormat(data?.REGISTER_DATE, "yyyy-mm-dd")}
//                   onChange={(e) => {
//                     loadData({
//                       ...data,
//                       ...{
//                         REGISTER_DATE: e.target.value,
//                       },
//                     });
//                   }}
//                 ></input>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="columns ">
//               <div className="column is-6">
//                 <h1>
//                   {" "}
//                   <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин{" "}
//                 </h1>
//                 <Positionlevel personChild={data} setPersonChild={loadData} />
//               </div>
//               {data?.SHEET_NO ? (
//                 <div className="column is-3">
//                   <h1>
//                     {" "}
//                     <span style={{ color: "red" }}>*</span>Тойрох хуудасны
//                     дугаар
//                   </h1>
//                 </div>
//               ) : null}
//               {data?.SHEET_NO ? (
//                 <div className="column  is-2 ">
//                   <input
//                     class="input  is-size-7"
//                     disabled
//                     value={data?.SHEET_NO}
//                     onChange={(e) => {
//                       loadData({
//                         ...data,
//                         ...{
//                           SHEET_NO: e.target.value,
//                         },
//                       });
//                     }}
//                   />
//                 </div>
//               ) : null}

//               {/* <div className="column  is-1">
//                 <h1>
//                   <span style={{ color: "red" }}>*</span>Тушаал
//                 </h1>
//               </div>
//               <div className="column  is-1 ">
//                 <img alt="" src={M} width="20px" height="20px" />
//                 <img alt="" src={Trush} width="20px" height="20px" />
//               </div> */}
//             </div>
//           </div>
//           <div>
//             <div className="columns ">
//               <div className="column is-6  ">
//                 <h1>
//                   {" "}
//                   <span style={{ color: "red" }}>*</span>Албан тушаал
//                 </h1>
//                 <Position personChild={data} setPersonChild={loadData} />
//               </div>
//             </div>
//           </div>
//         </div>
//         <SalaryKaruulakh EMPLOYEE_ID={data.EMPLOYEE_ID} />
//         <div className="columns">
//           <div className="column is-7">
//             {data?.FILE_PATH !== undefined && data?.FILE_PATH !== null ? (
//               <a
//                 href={
//                   hrUrl + "/".replace("api/v1/", "") +
//                   "static" +
//                   data?.FILE_PATH.replace("uploads", "")
//                 }
//                 w
//                 without
//                 rel="noopener noreferrer"
//                 target="_blank"
//               >
//                 <button
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     borderRadius: "6px",
//                     border: "1.5px solid #2684fe",
//                   }}
//                 >
//                   <div className="bg-white">
//                     <svg
//                       width="20px"
//                       height="20px "
//                       xmlns="http://www.w3.org/2000/svg"
//                       class="mx-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       color="#2684fe"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                       />
//                     </svg>
//                   </div>
//                   <div
//                     style={{
//                       backgroundColor: "white",
//                       paddingBottom: "0.01rem",
//                     }}
//                     className="px-2"
//                   >
//                     <p>Хавсралт харах</p>
//                   </div>
//                 </button>
//               </a>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     listItems = <p>ачаалж байна...</p>;
//   }

//   return listItems;
// }

function UstgakhTsonkh(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState({
    DECISION_ID: 0,
    REASONS_DECISION_CHANGE_ID: 1,
    REASON_DATE: dateFormat(new Date(), "dd-mmm-yy"),
    REASON_DESC: "",
    UPDATED_BY: userDetils?.USER_ID,
    UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  });
  const alert = useAlert();
  function deleteDecision() {
    console.log("alert", {
      DECISION_ID: props.tushaal?.decision_ID,
      REASONS_DECISION_CHANGE_ID: data.REASONS_DECISION_CHANGE_ID,
      REASON_DATE: data.REASON_DATE,
      REASON_DESC: data.REASON_DESC,
      UPDATED_BY: userDetils?.USER_ID,
      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
    });
    DataRequest({
      url: hrUrl + "/decisionDelete/",
      method: "POST",
      data: {
        DECISION_ID: props.tushaal?.decision_ID,
        REASONS_DECISION_CHANGE_ID: data.REASONS_DECISION_CHANGE_ID,
        REASON_DATE: data.REASON_DATE,
        REASON_DESC: data.REASON_DESC,
        UPDATED_BY: userDetils?.USER_ID,
        UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      },
    })
      .then(function (response) {
        //console.log("gegewgwegwegw", response);

        if (response?.data?.message === "success") {
          props.setJagsaalt(
            props.jagsaalt?.filter(
              (element, index) =>
                element.DECISION_ID !== parseInt(props.tushaal?.decision_ID)
            )
          );
          props.setTushaal({ tushaalKharakh: false, tushaalUstgakh: false });
          props.fetchData();
          alert.show("амжилттай устлаа");
        }
      })
      .catch(function (error) {
        //alert(error.response.data.error.message);
        console.log(error.response);
        alert.show("aldaa");
      });
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     let listItems = await axios(
  //       hrUrl + "/decision/" +
  //         props.tushaalKharakh?.decision_ID
  //     );

  //     loadData(listItems?.data);
  //   }
  //   fetchData();
  // }, [props]);

  let listItems;

  listItems = (
    <div
      style={{
        position: "absolute",
        width: "35%",
        height: "auto",
        left: "35%",
        top: "10%",
        borderRadius: "6px",
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        zIndex: "1",
        padding: "15px 15px 35px 15px",
      }}
    >
      <div className="columns">
        <div className="column is-4">Тушаал устгах уу?</div>

        <div className="column is-6"></div>
        <div className="column is-2 has-text-right">
          <span
            style={{
              fontWeight: "bold",
              cursor: "grab",
            }}
            onClick={() =>
              props.setTushaal({ tushaalKharakh: false, tushaalUstgakh: false })
            }
          >
            X
          </span>
        </div>
      </div>

      <div>
        <div className="columns  ">
          <div className="column is-1"></div>
          <div className="column is-5">
            <h1>Шалтгаан</h1>
            {/* <select
      className="anketInput"
      value={data.REASON_ID}
      onChange={(text) =>
        loadData({
          ...data,
          ...{ REASON_ID: text.target.value },
        })
      }
    >
      <option value={1}>"алдаатай шивсэн"</option>
      <option value={2}>"хугацаа дууссан"</option>
    </select> */}
            <Reasonsdecision personChild={data} setPersonChild={loadData} />
          </div>

          <div className="column is-5">
            <h1> Огноо</h1>
            <input
              class="input  is-size-7"
              type="date"
              disabled
              value={dateFormat(data?.REASON_DATE, "yyyy-mm-dd")}
              onChange={(e) => {
                loadData({
                  ...data,
                  ...{
                    REASON_DATE: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>

        <div>
          <div className="columns">
            <div className="column is-1"></div>
            <div className="column is-6">
              <h1> Тайлбар</h1>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  placeholder="Тайлбар"
                  value={data?.REASON_DESC}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        REASON_DESC: e.target.value,
                      },
                    });
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column is-1 ">
            {/* <button
      className="buttonTsenkher"
      style={{ marginRight: "0.4rem" }}
    >
      Хэвлэх
    </button> */}
            <button className="buttonTsenkher" onClick={() => deleteDecision()}>
              Тийм
            </button>
          </div>
          <div className="column is-2">
            <button
              className="buttonTsenkher"
              onClick={() =>
                props.setTushaal({
                  tushaalKharakh: false,
                  tushaalUstgakh: false,
                })
              }
            >
              Үгүй
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return listItems;
}
export default Home;
