import React, { useEffect, useState, useRef, useReducer } from "react";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";

import { FiCreditCard, FiMail, FiPhone } from "react-icons/fi";
import {
  Search,
  AddBlue,
  Excel,
  Print,
  fourbox,
  list,
  male,
  female,
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import AnketAPrint from "./AnketAPrint";
import { DepartmentID, Subdepartment } from "../components/library";

import { useReactToPrint } from "react-to-print";
import hrUrl from "../hrUrl";

class ComponentToPrint extends React.PureComponent {
  render() {
    return <AnketAPrint print={this.props.print} render={this.test} />;
  }
}
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

function Home(props) {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState([]);
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState([]);
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [buttonValue, setButtonValue] = useState(1);
  const componentRef = useRef(null);
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [print, setPrint] = useState({
    print: 0,
    person_ID: null,
    emp_ID: null,
    buttonValue: 1,
  });
  const [view, setView] = useState(false);
  const [checkBox, setCheckBox] = useState({ index: "", value: false });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [departmentID, setDepartmentID] = useState({
    DEPARTMENT_ID: 0,
  });
  const [subdepartment, setSubdepartment] = useState({
    SUB_DEPARTMENT_ID: "null",
  });
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2980b9;
    position: absolute;
    top: 35%;
    left: 50%;
  `;

  async function unActive() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: hrUrl + "/employees",
      // /0/" +
      // userDetils?.USER_DEPARTMENT_ID +
      // "/" +
      // userDetils?.USER_TYPE_NAME.toUpperCase(),
      method: "POST",
      data: {
        IS_ACTIVE: 0,
        USER_DEPARTMENT_ID: userDetils?.USER_DEPARTMENT_ID,
        USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
        SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
      },
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts.data);
    setLoading(false);
    setButtonValue(2);
    setDepartmentID({ DEPARTMENT_ID: 0 });
    setSearch("");
  }
  async function Active() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: hrUrl + "/employees",
      method: "POST",
      data: {
        IS_ACTIVE: 1,
        USER_DEPARTMENT_ID: userDetils?.USER_DEPARTMENT_ID,
        USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
        SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
      },
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setButtonValue(1);
    setDepartmentID({ DEPARTMENT_ID: 0 });
    setSearch("");
  }
  async function newPeople() {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: hrUrl + "/newPersonList/",
      method: "GET",
      data: {},
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setButtonValue(3);
    setSearch("");
  }
  async function fetchData() {
    if (
      props.match?.params !== undefined &&
      JSON.parse(props.match?.params?.search)?.buttonValue === 2
    ) {
      let jagsaalts = await DataRequest({
        url: hrUrl + "/employees",

        method: "POST",
        data: {
          IS_ACTIVE: 0,
          USER_DEPARTMENT_ID: userDetils?.USER_DEPARTMENT_ID,
          USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
          SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
        },
      });
      if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
        setJagsaalt(jagsaalts?.data);
      setLoading(false);
      setButtonValue(2);
      if (
        props.match.params.search !== undefined &&
        props.match.params.search !== "null"
      ) {
        let ob = JSON.parse(props.match.params.search);

        setSearchType(ob.searchType);
        makeSearch(ob.search, jagsaalts?.data, ob.searchType);
      }
      console.log(jagsaalts);
    } else if (
      props.match?.params !== undefined &&
      JSON.parse(props.match?.params?.search)?.buttonValue === 3
    ) {
      let jagsaalts = await DataRequest({
        url: hrUrl + "/newPersonList/",
        method: "GET",
        data: {},
      });
      if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
        setJagsaalt(jagsaalts?.data);
      setLoading(false);
      setButtonValue(3);
      if (
        props.match.params.search !== undefined &&
        props.match.params.search !== "null"
      ) {
        let ob = JSON.parse(props.match?.params.search);

        setSearchType(ob.searchType);
        makeSearch(ob.search, jagsaalts?.data, ob.searchType);
      }
      console.log(jagsaalts);
    } else {
      let jagsaalts = await DataRequest({
        url: hrUrl + "/employees",
        method: "POST",
        data: {
          IS_ACTIVE: 1,
          USER_DEPARTMENT_ID: userDetils?.USER_DEPARTMENT_ID,
          USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
          SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
        },
      });
      setLoading(false);
      if (jagsaalts.data !== undefined && jagsaalts.data.length > 0) {
        setJagsaalt(jagsaalts?.data);

        if (
          props.match?.params.search !== undefined &&
          props.match?.params.search !== "null"
        ) {
          let ob = JSON.parse(props.match.params.search);

          setSearchType(ob.searchType);
          makeSearch(ob.search, jagsaalts?.data, ob.searchType);
        }
      }
    }
  }
  useEffect(() => {
    fetchData();
    setDepartmentID({ DEPARTMENT_ID: userDetils?.USER_DEPARTMENT_ID });
  }, [props]);

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    localStorage.removeItem("personDetail");
    if (
      state?.selectedRows !== undefined &&
      state?.selectedRows?.length !== 0
    ) {
      console.log("state?.selectRows?.length", state.selectedRows);
      console.log("Selected Rows: ", state?.selectedRows[0]?.EMP_ID);
      localStorage.setItem(
        "personDetail",
        JSON.stringify({
          person_id:
            state?.selectedRows[0]?.EMP_PERSON_ID !== undefined &&
            state.selectedRows[0]?.EMP_PERSON_ID !== null
              ? state?.selectedRows[0]?.EMP_PERSON_ID
              : state?.selectedRows[0].PERSON_ID,
          emp_id: state?.selectedRows[0].EMP_ID,
          type: "employ",
          PERSON_FIRSTNAME: state?.selectedRows[0].PERSON_FIRSTNAME,
          PERSON_LASTNAME: state?.selectedRows[0].PERSON_LASTNAME,
        })
      );

      setData({ checked: true });
    } else {
      setData({ checked: false });
    }
  };
  useEffect(() => {
    if (subdepartment.SUB_DEPARTMENT_ID !== "null")
      subDepartmentSearch({ DEPARTMENT_ID: 101 });
    else fetchData();
  }, [subdepartment]);

  async function subDepartmentSearch(value) {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: hrUrl + "/employees",
      method: "POST",
      data: {
        IS_ACTIVE: buttonValue === 1 ? 1 : 0,
        DEPARTMENT_ID: value.DEPARTMENT_ID,
        USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
        SUB_DEPARTMENT_ID: subdepartment.SUB_DEPARTMENT_ID,
        USER_DEPARTMENT_ID: userDetils.USER_DEPARTMENT_ID,
      },
    });
    console.log("departmentSearch", {
      IS_ACTIVE: buttonValue === 1 ? 1 : 0,
      DEPARTMENT_ID: value.DEPARTMENT_ID,
      USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
      SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setSearch("");
    setDepartmentID(value);
  }

  async function departmentSearch(value) {
    setLoading(true);
    let jagsaalts = await DataRequest({
      url: hrUrl + "/employees",
      method: "POST",
      data: {
        IS_ACTIVE: buttonValue === 1 ? 1 : 0,
        DEPARTMENT_ID: value.DEPARTMENT_ID,
        USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
        SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
        USER_DEPARTMENT_ID: userDetils.USER_DEPARTMENT_ID,
      },
    });
    console.log("departmentSearch", {
      IS_ACTIVE: buttonValue === 1 ? 1 : 0,
      DEPARTMENT_ID: value.DEPARTMENT_ID,
      USER_TYPE_NAME: userDetils?.USER_TYPE_NAME.toUpperCase(),
      SUB_DEPARTMENT_ID: userDetils.USER_SUB_DEPARTMENT_ID,
    });
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0)
      setJagsaalt(jagsaalts?.data);
    setLoading(false);
    setSearch("");
    setDepartmentID(value);
  }

  async function anketA() {
    if (data?.checked === true)
      history.push(
        "/web/anketA/" +
          JSON.stringify({
            search: search,
            searchType: searchType,
            buttonValue: buttonValue,
          })
      );
    else alert.show("Ажилтан сонгон уу");
  }
  async function anketB() {
    if (data?.checked === true)
      history.push(
        "/web/anketB/" +
          JSON.stringify({
            search: search,
            searchType: searchType,
            buttonValue: buttonValue,
          })
      );
    else alert.show("Ажилтан сонгон уу");
  }

  async function anketANew() {
    if (localStorage?.getItem("person_id") !== undefined) {
      localStorage.removeItem("person_id");
    }
    localStorage.setItem(
      "personDetail",
      JSON.stringify({ person_id: "0", type: "newPerson" })
    );

    history.push(
      "/web/anketA/" +
        JSON.stringify({
          search: search,
          searchType: searchType,
          buttonValue: buttonValue,
        })
    );
  }

  function makeSearch(value, list, stype) {
    // console.log(value, "found");
    // console.log(list, "found");
    // console.log(stype, "stype");

    // console.log(
    //   "filteredValue",
    //   list?.filter((obj) => equalStr(obj[searchType], value))
    // );
    setFound(list?.filter((obj) => equalStr(obj[stype], value)));
    setSearch(value);
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
      } else if (value1.includes(value2)) {
        //console.log(true, "sonin");
        return true;
      }
    return false;
  }
  useEffect(() => {
    if (print.print !== 0) {
      window.setTimeout(handlePrint(), 3000);
      //console.log("itworket", print);
    }
  }, [print]);

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
            name: "Төрийн аудитын байгууллага",
            selector: "DEPARTMENT_NAME",
            sortable: true,
            width: "200px",
          },
          {
            name: "Харъяа газар",
            selector: "SUB_DEPARTMENT_NAME",
            sortable: true,
            width: "290px",
          },
          {
            name: "Дотоод бүтцийн нэгж",
            selector: "COMPARTMENT_NAME",
            sortable: true,
          },
          {
            name: "Албан тушаалын нэр",
            selector: "POSITION_NAME",
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
            name: "Ажилтны код",
            selector: "EMP_CODE",
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
            width: "60px",
            cell: (row) => (
              <div>
                <img
                  alt=""
                  src={Print}
                  width="20px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPrint({
                      print: 1,
                      person_ID:
                        row?.EMP_PERSON_ID !== undefined &&
                        row?.EMP_PERSON_ID !== null
                          ? row?.EMP_PERSON_ID
                          : row?.PERSON_ID,
                      emp_ID: row?.EMP_ID,
                      buttonValue: buttonValue,
                    });
                    forceRender();
                  }}
                />
              </div>
            ),

            center: true,
          },
          // {
          //   name: "Анкет Б",
          //   width: "60px",
          //   cell: (row) => (
          //     <div>
          //       <button
          //         onClick={() => {
          //           setPrint({
          //             print: 1,
          //             person_ID: row.PERSON_ID,
          //             emp_ID: row?.EMP_ID,
          //           });
          //         }}
          //       >
          //         hide
          //       </button>
          //     </div>
          //   ),
          //   sortable: true,
          //   center: true,
          // },
        ]
      : buttonValue === 2
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
            name: "Төрийн аудитын байгууллага",
            selector: "DEPARTMENT_NAME",
            sortable: true,
            width: "200px",
          },
          {
            name: "Харъяа газар",
            selector: "SUB_DEPARTMENT_NAME",
            sortable: true,
            width: "290px",
          },
          {
            name: "Дотоод бүтцийн нэгж",
            selector: "COMPARTMENT_NAME",
            sortable: true,
          },
          {
            name: "Албан тушаалын нэр",
            selector: "POSITION_NAME",
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
            name: "Төлөв",
            selector: "STATUS_NAME",
            sortable: true,
          },

          {
            name: "Анкет А",
            selector: "4",

            center: true,
          },
          {
            name: "Анкет Б",
            selector: "6",
            sortable: true,
            center: true,
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
            cell: (row) => (
              <div>
                <img
                  alt=""
                  src={Print}
                  width="20px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPrint({
                      print: 1,
                      person_ID:
                        row?.EMP_PERSON_ID !== undefined &&
                        row?.EMP_PERSON_ID !== null
                          ? row?.EMP_PERSON_ID
                          : row?.PERSON_ID,
                      emp_ID: row?.EMP_ID,

                      buttonValue: buttonValue,
                    });
                    forceRender();
                  }}
                />
              </div>
            ),
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
      {/* <Header title="АЖИЛТНЫ БҮРТГЭЛИЙН ЖАГСААЛТ" /> */}
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
          АЖИЛТНЫ БҮРТГЭЛИЙН ЖАГСААЛТ
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
            display: "none",
            width: 0,
            height: 0,
            position: "absolute",
          }}
        >
          {print.print !== 0 ? (
            <ComponentToPrint ref={componentRef} print={print} />
          ) : null}
        </div>
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
          <button
            className="button is-focused"
            style={{
              backgroundColor: buttonValue === 3 ? "#418ee6" : "white",
              color: buttonValue === 3 ? "white" : "black",
              borderColor: "#418ee6",
              borderStyle: "solid",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
            onClick={() => newPeople()}
          >
            Шинэ
          </button>
          <div style={{ padding: "0.3rem", paddingLeft: "2rem" }}>
            <span>Нийт:</span>&nbsp;{" "}
            <span style={{ color: "red" }}>{jagsaalt.length}</span>
          </div>
          {
            <div
              style={{ position: "absolute", right: "3rem", display: "flex" }}
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
                onClick={anketA}
              >
                АНКЕТ А ХЭСЭГ
              </button>

              {buttonValue === 1 || buttonValue === 2 ? (
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
                  onClick={() => anketB()}
                >
                  АНКЕТ Б ХЭСЭГ
                </button>
              ) : null}
              <div>
                <img
                  src={fourbox}
                  width="30px"
                  height={"30px"}
                  alt="fourbox"
                  style={{ margin: "0 8px", cursor: "pointer" }}
                  onClick={() => setView(false)}
                />
                <img
                  src={list}
                  width="30px"
                  height={"30px"}
                  alt="list"
                  style={{ margin: "0 2px", cursor: "pointer" }}
                  onClick={() => setView(true)}
                />
              </div>
            </div>
          }
        </div>
        <div
          style={{
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ display: "flex" }}>
            {/* {(buttonValue !== 3 && userDetils?.USER_TYPE_NAME === "ADMIN") ||
            (buttonValue !== 3 &&
              userDetils?.USER_TYPE_NAME === "GENERAL_DIRECTOR" &&
              userDetils.USER_SUB_DEPARTMENT_ID === null &&
              userDetils.USER_DEPARTMENT_ID === 101) ||
            (buttonValue !== 3 &&
              userDetils?.USER_TYPE_NAME === "HEAD_DIRECTOR" &&
              userDetils.USER_SUB_DEPARTMENT_ID === null &&
              userDetils.USER_DEPARTMENT_ID === 101) ? (
              <div className="select is-small">
                <DepartmentID
                  personChild={departmentID}
                  setPersonChild={departmentSearch}
                  edit={false}
                />
              </div>
            ) : null} */}
            {buttonValue === 1 && userDetils.USER_DEPARTMENT_ID === 101 ? (
              <>
                <div className="select is-small" style={{ marginRight: "1em" }}>
                  <DepartmentID
                    personChild={departmentID}
                    setPersonChild={departmentSearch}
                    edit={false}
                  />
                </div>
                <div className="select is-small">
                  <Subdepartment
                    personChild={subdepartment}
                    setPersonChild={setSubdepartment}
                    edit={false}
                  />
                </div>
              </>
            ) : null}
            <div
              className="select is-small"
              style={{ marginRight: "10px", marginLeft: "10px" }}
            >
              <select
                value={searchType}
                onChange={(text) => setSearchType(text.target.value)}
              >
                {" "}
                {buttonValue !== 3 ? (
                  <option value={"DEPARTMENT_NAME"}>
                    Төрийн аудитын байгууллага
                  </option>
                ) : null}
                {buttonValue !== 3 ? (
                  <option value={"SUB_DEPARTMENT_NAME"}>Харъяа газар</option>
                ) : null}
                {buttonValue !== 3 ? (
                  <option value={"COMPARTMENT_NAME"}>
                    Дотоод бүтцийн нэгж
                  </option>
                ) : null}
                {buttonValue !== 3 ? (
                  <option value={"POSITION_NAME"}>Албан тушаалын нэр</option>
                ) : null}
                <option value={"PERSON_FIRSTNAME"}>Ажилтны нэр</option>
                <option value={"PERSON_LASTNAME"}>Ажилтны овог</option>
                {buttonValue === 2 ? (
                  <option value={"STATUS_NAME"}>Төлөв</option>
                ) : (
                  <option value={"PERSON_PHONE"}>Утасны дугаар</option>
                )}
                {buttonValue === 2 ? null : (
                  <option value={"EMP_CODE"}>Ажилтны код</option>
                )}
                {buttonValue === 2 ? null : (
                  <option value={"PERSON_EMAIL"}>Имэйл</option>
                )}
              </select>
              {/* 
              <span class="icon is-small is-right">
                <img src={Filter} />
              </span> */}
            </div>

            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-small is-gray"
                type="email"
                placeholder="хайлт хийх утгаа оруулна уу"
                value={search}
                onChange={(e) =>
                  makeSearch(e.target.value, jagsaalt, searchType)
                }
                style={{
                  borderRadius: "5px",
                  width: "18rem",
                }}
              />

              <span className="icon is-small is-right">
                <img alt="" src={Search} />
              </span>
              <span className="icon is-small is-right"></span>
            </div>

            {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
              <button
                className="text"
                style={{
                  marginLeft: "1%",
                  borderRadius: "5px",
                  backgroundColor: "#b8e6f3",
                  color: "#000",
                  border: "0px",
                }}
                onClick={() => {
                  anketANew();
                }}
              >
                {" "}
                <span style={{ display: "flex", paddingRight: "22px" }}>
                  <img src={AddBlue} width="20px" height="20px " alt="" />
                  Нэмэх
                </span>
              </button>
            )}

            {buttonValue === 1 ? (
              <button
                className="text"
                style={{
                  marginLeft: "1%",
                  borderRadius: "5px",
                  backgroundColor: "#1cc88a",
                  color: "#fff",
                  border: "double",
                }}
                onClick={() => document.getElementById("emergencyXLS").click()}
              >
                <span style={{ display: "flex", paddingRight: "22px" }}>
                  <image src={Excel} width="20px" height="20px " />
                  Excel
                </span>
              </button>
            ) : null}
            <EmployExcel data={search === "" ? jagsaalt : found} />
          </div>
        </div>
        <iframe
          title="title"
          id="ifmcontentstoprint"
          style={{
            height: "0px",
            width: "0px",
            position: "absolute",
          }}
        ></iframe>
        {view ? (
          <DataTable
            columns={columns}
            data={search === "" ? jagsaalt : found}
            theme="solarized"
            customStyles={customStyles}
            noDataComponent="мэдээлэл байхгүй байна"
            selectableRows // add for checkbox selection
            Clicked
            onSelectedRowsChange={handleChange}
            noHeader={true}
            fixedHeader={true}
            responsive={true}
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
        ) : (
          <div id="user_box_lis" className="box_list_container">
            {(search === "" ? jagsaalt : found).map((value, index) => (
              <div
                className="box_list_item"
                style={
                  index === (search === "" ? jagsaalt : found).length - 1
                    ? { marginBottom: "3rem", cursor: "pointer" }
                    : { marginBottom: 0, cursor: "pointer" }
                }
                onClick={() => {
                  if (checkBox.index === index) {
                    setCheckBox({ index: "", value: false });
                  } else {
                    setCheckBox({ index: index, value: true });
                    handleChange({ selectedRows: [value] });
                  }
                }}
              >
                <div style={{ display: "flex", alignContent: "baseline" }}>
                  <div
                    style={{
                      width: "90px",
                      height: "118px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        value.FILE_PATH !== undefined &&
                        value.FILE_PATH !== null
                          ? hrUrl.replace("api/v1", "") +
                            "static" +
                            value?.FILE_PATH.replace("uploads", "")
                          : value.PERSON_GENDER === "1"
                          ? male
                          : female
                      }
                      style={{
                        objectFit: "fit",

                        width: "100%",
                        height: "100%",
                      }}
                      alt="avatar"
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: "10px",
                      flexWrap: "wrap",
                      width: "280px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {value.PERSON_LASTNAME + " "}
                        {value.PERSON_FIRSTNAME.toUpperCase()}
                      </span>
                      <input
                        type="checkbox"
                        checked={
                          checkBox.index === index ? checkBox.value : false
                        }
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </div>

                    <textarea
                      disabled
                      style={{
                        color: "#418ee6",
                        fontSize: "0.7rem",
                        border: "none",
                        width: "100%",
                        background: "none",
                      }}
                      value={value.POSITION_NAME}
                    ></textarea>
                    <br />
                    <span style={{ fontSize: "0.7rem" }}>
                      <FiCreditCard /> {value.EMP_CODE}
                    </span>
                    <br />
                    <span style={{ fontSize: "0.7rem" }}>
                      <FiPhone /> {value.PERSON_PHONE}
                    </span>
                    <br />
                    <div
                      style={{
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FiMail style={{ marginRight: "5px" }} />{" "}
                      {value.PERSON_EMAIL}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
      <div className="sweet-loading">
        <ScaleLoader
          loading={loading}
          size={30}
          css={override}
          color={"#2980b9"}
        />
      </div>
      <Footer />
    </div>
  );
}

function EmployExcel({ data }) {
  let listItems;
  if (data !== undefined) {
    listItems = (
      <div style={{ width: "30px", height: "30px" }}>
        <img alt="" src={Excel} height="30px" width="30px" />
        <div style={{ display: "none" }}>
          <ReactHTMLTableToExcel
            id="emergencyXLS"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="XLS"
          />

          <table id="table-to-xls">
            <tr>
              <th>№</th>
              <th>Төрийн аудитын байгууллага</th>
              <th>Харъяа газар</th>
              <th>Дотоод бүтцийн нэгж</th>
              <th>Албан тушаалын нэр</th>
              <th>Ажилтны нэр</th>
              <th>Ажилтны овог</th>
              <th>Ажилтны код</th>
              <th>Утасны дугаар</th>
              <th>Имэйл</th>
              <th>Регистр</th>
            </tr>
            {data?.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.DEPARTMENT_NAME}</td>
                <td>{value.SUB_DEPARTMENT_NAME}</td>
                <td>{value.COMPARTMENT_NAME}</td>
                <td>{value.POSITION_NAME}</td>
                <td>{value.PERSON_FIRSTNAME}</td>
                <td>{value.PERSON_LASTNAME}</td>
                <td>{value.EMP_CODE}</td>
                <td>{value.PERSON_PHONE}</td>
                <td>{value.PERSON_EMAIL}</td>
                <td>{value.PERSON_REGISTER_NO}</td>
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

export default Home;
