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
  const [dataNemeh, setDataNemeh] = useState({
    COMP_REGNO:null,
    PERSON_REGNO:null,
    PERSON_NAME:"",
    PERSON_PHONE:"",
    PERSON_EMAIL:"",
    PERSON_ADDRESS:"",
    CREATED_BY:userDetails?.USER_ID
  });
  const [passVisibility, setPassVisibility] = useState({});

  const togglePassVisibility = (row) => {
    setPassVisibility((prevVisibility) => ({
      ...prevVisibility,
      [row.USER_CODE]: !prevVisibility[row.USER_CODE],
    }));
  };

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
    if(data!==null){
      setDataNemeh(data);
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
      selector: "PERSON_NAME",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "Хэрэглэгчийн регистр",
      selector: "PERSON_REGNO",
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
      name: "Нууц үг",
      sortable: true,
      expandableRows: true,
      cell: (row) => (
        <div>
          <button
            onClick={() => togglePassVisibility(row)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {passVisibility[row.USER_CODE] ? row.USER_PASSWORD : "харах"}
          </button>
        </div>
      ),
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

  function requiredField() {
    let returnValue = false;
    if (
      dataNemeh.PERSON_REGNO === undefined ||
      dataNemeh.PERSON_REGNO === "" ||
      dataNemeh.PERSON_REGNO === null
    ) {
      alert.show("Регистрийн дугаар оруулна уу"); 
      return false;
    } else if (
      dataNemeh.PERSON_NAME === undefined ||
      dataNemeh.PERSON_NAME === "" || dataNemeh.PERSON_NAME === null
    ) {
      alert.show("Овог нэрээ оруулна уу");
      return false;
    }else if (
      dataNemeh.PERSON_PHONE === undefined ||
      dataNemeh.PERSON_PHONE === "" || dataNemeh.PERSON_PHONE === null
    ) {
      alert.show("Утас оруулна уу");
      return false;
    }else if (
      dataNemeh.PERSON_EMAIL === undefined ||
      dataNemeh.PERSON_EMAIL === "" || dataNemeh.PERSON_EMAIL === null
    ) {
      alert.show("И-Мэйл оруулна уу");
      return false;
    } 
    else if(validateEmail(dataNemeh.PERSON_EMAIL) === false){
      alert.show("И-Мэйл формат буруу байна");
      return false;
    }
    else {
      returnValue = true;
    }
    return returnValue;
  }

  // function validateRegister(code) {
  //   var validRegister = new RegExp("^([А-Я|Ө|Ү|а-я|ө|ү]{2})([0-9]{8})$")
  //   return validRegister.test(code);
  // }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
 
  useEffect(() => {
    fetchData();
  }, [props]);

  function saveToDB() {
    if (requiredField()) {
      setLoading(true);
      
    DataRequest({
      url: hrUrl + "/compPersonInsert",
      method: "POST",
      data: dataNemeh,
    })
      .then(function (response) {
        if (response?.data?.message === "success") {
          alert.show("Амжилттай хадгаллаа");
          fetchData();
          setLoading(false);
          setShowNemeh({display: false})
        } else {
          alert.show("Системийн алдаа");
          setLoading(false);
        }
      })
      .catch(function (error) {
        // alert(error.response.data.error.message);
        console.log(error.response);
        alert.show("Системийн алдаа");
        setLoading(false);
      });
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
                  <option>Сонгоно уу</option>
                  <option value={"COMP_NAME"}>АХЭ нэр</option>
                  <option value={"PERSON_REGNO"}>Хэрэглэгчийн регистр</option>
                </select>
              </div>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-small is-gray"
                  type="email"
                  placeholder="Хайлт хийх утгаа оруулна уу"
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
          <Nemeh setDataNemeh = {setDataNemeh} dataNemeh={dataNemeh}  closeNemeh ={closeNemeh} saveToDB={saveToDB} />
        ) : null}

        {showZasah.display ? (
          <Zasah setDataZasah = {setDataNemeh}  dataZasah ={dataNemeh}  closeZasah ={closeZasah} saveToDB={saveToDB} />
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

function Nemeh({setDataNemeh, dataNemeh, closeNemeh,saveToDB}) {
  
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
                <h1><span style={{ color: "red" }}>*</span>АХЭ нэр</h1>
                <div  class="input is-size-7" >
                  <AHEname  personChild={dataNemeh} setPersonChild={setDataNemeh} />
                </div>
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
              <input
                placeholder="Утгаа оруулна уу"
                class="input  is-size-7"
                maxLength="10"
                value={dataNemeh.PERSON_REGNO}
                onChange={ (e) => {
                  setDataNemeh({
                    ...dataNemeh,
                    ...{ PERSON_REGNO: e.target.value },
                  });
                }}
              />
            </div>
            <div className="column is-6">
            <h1>
                <span style={{ color: "red" }}>*</span>Овог нэр
              </h1>
              <input
                placeholder="Жишээ: А.Бат"
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
                // type="number"
                maxlength="8"
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
                type="text"
                value={dataNemeh.PERSON_EMAIL}
                onChange={(e) => {
                    setDataNemeh({
                    ...dataNemeh,
                    PERSON_EMAIL: e.target.value,
                   });
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
                    saveToDB();
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

function Zasah({setDataZasah, dataZasah,closeZasah,saveToDB}) {
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
                  saveToDB();
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
