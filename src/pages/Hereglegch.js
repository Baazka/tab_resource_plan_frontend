import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Eye, Delete } from "../assets/images/zurag";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import hrUrl from "../hrUrl";
import { AHEname } from "../components/library";

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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

const validRegister = new RegExp("^([А-Я|Ө|Ү|а-я|ө|ү]{2})([0-9]{8})$");

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("Имэйл хаяг формат буруу байна");
  return false;
}

const Hereglegch = (props) => {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [jagsaalt, setJagsaalt] = useState([]);
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [data, loadData] = useState([]);
  const [showNemeh, setShowNemeh] = useState({ display: false });
  const [showZasah, setShowZasah] = useState({ display: false });
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(true);
  const [dataNemeh, setDataNemeh] = useState({
    COMP_REGNO:null,
    PERSON_REGNO:null,
    PERSON_NAME:"",
    PERSON_PHONE:"",
    PERSON_EMAIL:"",
    PERSON_ADDRESS:"",
    CREATED_BY:userDetails?.USER_ID
  });
  const [dataZasah, setDataZasah] = useState({
    PERSON_ID:"",
    PERSON_NAME:"",
    PERSON_PHONE:"",
    PERSON_EMAIL:"",
    PERSON_ADDRESS:"",
    CREATED_BY:userDetails?.USER_ID
  });

  function closeNemeh(){
    setShowNemeh({display: false})
  }

  function closeZasah(){
    setShowZasah({display: false})
  }

  function openNemeh(data){
    if(data!==undefined){
      setDataNemeh(data);
    }else{
      setDataNemeh({
        COMP_REGNO:null,
        PERSON_REGNO:null,
        PERSON_NAME:"",
        PERSON_PHONE:"",
        PERSON_EMAIL:"",
        PERSON_ADDRESS:"",
        CREATED_BY:userDetails?.USER_ID
      });
    }
    setShowNemeh({display: true})
  }

  function openZasah(data){
    if(data!==undefined){
      setDataZasah(data);
    }else{
      setDataZasah({
        PERSON_ID:"",
        PERSON_NAME:"",
        PERSON_PHONE:"",
        PERSON_EMAIL:"",
        PERSON_ADDRESS:"",
        CREATED_BY:userDetails?.USER_ID
      });
    }
    setShowZasah({display: true})
  }

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
      name: "АХЭ регистр",
      selector: "COMP_REGNO",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "АХЭ ID",
      selector: "COMP_ID",
      sortable: true,
      expandableRows: true,
      width: "70px",
    },
    {
      name: "Хэрэглэгчийн нэр",
      selector: "USER_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн регистр",
      selector: "PERSON_REGISTER_NO",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн ID",
      selector: "PERSON_ID",
      sortable: true,
      expandableRows: true
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
      width: "60px",
    },
      {
        name: "Утас",
        selector: "PERSON_PHONE",
        sortable: true,
        expandableRows: true
      },
      {
        name: "И-Мэйл",
        selector: "PERSON_EMAIL",
        sortable: true,
        expandableRows: true,
      },
      // {
      //   name: "Хаяг",
      //   selector: "PERSON_ADDRESS",
      //   sortable: true,
      //   expandableRows: true,
      // },
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
              onClick={() => openZasah(row)}
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
        url: hrUrl + "/compPersonDelete",
        method: "POST",
        data: {
          USER_CODE: value?.USER_CODE,
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

  function requiredField(param) {
    let returnValue = false;
    if (
      param?.PERSON_NAME === undefined ||
      (param?.PERSON_NAME === "" && param?.PERSON_NAME === null)
    ) {
      alert.show("овог нэрээ оруулна уу");
    } else if (
      param?.PERSON_REGNO === undefined ||
      param?.PERSON_REGNO === "" ||
      param?.PERSON_REGNO === null
    ) {
      alert.show("регистрийн дугаар оруулна уу");
      return false;
    } else {
      returnValue = true;
    }
    return returnValue;
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  function saveToDB(value) {
    if (requiredField(data) === true) {
      setLoading(true);
      if (localStorage.getItem("personDetail")?.includes("person_id")) {
        if (
          JSON.parse(localStorage.getItem("personDetail")).person_id === "0"
        ) {
    DataRequest({
      url: hrUrl + "/compIU",
      method: "POST",
      data: value,
    })
      .then(function (response) {
        if (response?.data?.message === "success") {
          alert.show("амжилттай хадгаллаа");
        } else {
          alert.show("Системийн алдаа");
        }
      })
      .catch(function (error) {
        // alert(error.response.data.error.message);
        console.log(error.response);
        alert.show("Системийн алдаа");
      });
    } else {
      DataRequest({
        url: hrUrl + "/compIU",
        method: "POST",
        data: value,
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") {
            alert.show("амжилттай хадгаллаа");
            setEdit(!edit);
            setLoading(false);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
  }
}
}

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
                  <option value={"COMP_NAME"}>АХЭ нэр</option>
                  <option value={"PERSON_REGISTER_NO"}>Хэрэглэгчийн регистр</option>
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
              onClick={() => openNemeh()}
            >
              Нэмэх
            </button>
            </div>
        </div>

        {showNemeh.display ? (
          <Nemeh  dataNemehP ={dataNemeh} saveToDB={saveToDB} closeNemeh ={closeNemeh} setDataNemehP = {setDataNemeh}/>
        ) : null}

        {showZasah.display ? (
          <Zasah  dataZasahP ={dataZasah} saveToDB={saveToDB} closeZasah ={closeZasah} setDataZasahP = {setDataZasah}/>
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

function Nemeh({dataNemehP,closeNemeh,saveToDB}) {

  const [dataNemeh,setDataNemeh] = useState(dataNemehP)
  const [register, setRegister] = useState(0);
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;

  async function personNoCheck(registerT) {
    console.log(registerT, "registerTT");
    let listItems = await axios({
      method: "POST",
      url: hrUrl + "/personNoCheck",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: { PERSON_REGNO: registerT },
    });
    console.log(listItems?.data?.CNT, "register");
    setRegister(listItems?.data?.CNT);
  }
  
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
            <span>НЭМЭХ</span>
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
                cursor: "grab",
              }}
              onClick={()=>closeNemeh()}
            >
              X
            </span>
          </div>
        </div>
        <div>
        <div style={{padding: "15px"}} >
          <div className="columns  ">
          <div className="column is-6">
                <h1>АХЭ нэр</h1>
                <AHEname personChild={dataNemeh} setPersonChild={setDataNemeh} />
              </div>
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>АХЭ регистр
              </h1>
              <input
                class="input  is-size-7"
                value={dataNemeh.COMP_REGNO}
                disabled={true}
              />
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Хэрэглэгчийн регистр
              </h1>
              {/* <input
                class="input  is-size-7"
                value={dataNemeh.PERSON_REGNO}
                onChange={(e) => {
                  setDataNemeh({
                    ...dataNemeh,
                    PERSON_REGNO: e.target.value,
                  });
                }}
              /> */}
              <input
            placeholder="Утгаа оруулна уу"
            class="input  is-size-7"
            pattern="[а-я|А-Я|ө|Ө|ү|Ү]{2}[0-9]{8}"
            value={dataNemeh.PERSON_REGNO}
            onChange={async (e) => {
              setDataNemeh({
                ...dataNemeh,
                ...{ PERSON_REGNO: e.target.value },
              });
              if (e.target.value.length === 10) {
                if (
                  cyrillicPattern.test(e.target.value.slice(0, 2)) &&
                  /\d/.test(e.target.value.slice(2, 10))
                ) {
                  await personNoCheck(e.target.value);
                  console.log(e.target.value, "registerT");
                } else setRegister(false);
              } else {
                setRegister(false);
              }
            }}
          />
            </div>
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Овог нэр
              </h1>
              <input
                class="input  is-size-7"
                value={dataNemeh.PERSON_NAME}
                onChange={(e) => {
                  setDataNemeh({
                    ...dataNemeh,
                    PERSON_NAME: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Утас
              </h1>
              <input
                class="input  is-size-7"
                value={dataNemeh.PERSON_PHONE}
                onChange={(e) => {
                  setDataNemeh({
                    ...dataNemeh,
                    PERSON_PHONE: e.target.value,
                  });
                }}
              />
            </div>
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>И-Мэйл
              </h1>
              <input
                class="input is-size-7"
                value={dataNemeh.PERSON_EMAIL}
                onChange={(e) => {
                const email = e.target.value;
                  if (ValidateEmail(email)) {
                    setDataNemeh({
                    ...dataNemeh,
                    PERSON_EMAIL: email,
                   });
                  } else {
                  // Alert or handle incorrect email format here
                  alert("Имэйл хаяг формат буруу байна");
                  // You might want to clear the input field or handle it differently
                  }
                }}
              />
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-12">
              <h1>Хаяг</h1>
              <input
                class="input  is-size-7"
                value={dataNemeh.PERSON_ADDRESS}
                onChange={(e) => {
                  setDataNemeh({
                    ...dataNemeh,
                    PERSON_ADDRESS: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
          <div className="column is-11"></div>
            <div className="column is-1 ">
              <button 
                  className="buttonTsenkher" 
                  onClick={() => {
                    saveToDB(dataNemeh);
                  }}
                  >
                Хадгалах
              </button>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
}

function Zasah({dataZasahP,closeZasah,saveToDB}) {

  const [dataZasah,setDataZasah] = useState(dataZasahP)

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
            <span>ЗАСАХ</span>
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
                cursor: "grab",
              }}
              onClick={()=>closeZasah()}
            >
              X
            </span>
          </div>
        </div>
        <div>
        <div style={{padding: "15px"}} >
          <div className="columns  ">
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Овог нэр
              </h1>
              <input
                class="input  is-size-7"
                value={dataZasah.PERSON_NAME}
                onChange={(e) => {
                  setDataZasah({
                    ...dataZasah,
                    PERSON_NAME: e.target.value,
                  });
                }}
              />
            </div>
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Утас
              </h1>
              <input
                class="input  is-size-7"
                value={dataZasah.PERSON_PHONE}
                onChange={(e) => {
                  setDataZasah({
                    ...dataZasah,
                    PERSON_PHONE: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>И-Мэйл
              </h1>
              <input
                class="input  is-size-7"
                value={dataZasah.PERSON_EMAIL}
                onChange={(e) => {
                  setDataZasah({
                    ...dataZasah,
                    PERSON_EMAIL: e.target.value,
                  });
                }}
              />
            </div>
            <div className="column is-6">
              <h1>Хаяг</h1>
              <input
                class="input  is-size-7"
                value={dataZasah.PERSON_ADDRESS}
                onChange={(e) => {
                  setDataZasah({
                    ...dataZasah,
                    PERSON_ADDRESS: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
          <div className="column is-11"></div>
            <div className="column is-1 ">
              <button 
                className="buttonTsenkher"
                onClick={() => {
                  saveToDB(dataZasah);
              }}>
                Хадгалах
              </button>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
}

export default Hereglegch;
