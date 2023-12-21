import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DataTable, { createTheme } from "react-data-table-component";
import { Eye, Delete, Search } from "../assets/images/zurag";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import hrUrl from "../hrUrl";

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

const AHE = (props) => {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [jagsaalt, setJagsaalt] = useState([]);
  const [found, setFound] = useState();
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [search, setSearch] = useState("");
  const [data, loadData] = useState([]);
  const [showDialog, setShowDialog] = useState({ display: false });
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [dataOne, setDataOne] = useState({
    COMP_ID: null,
    COMP_REGNO: "",
    COMP_REGION: "",
    COMP_NAME: "",
    COMP_PHONE: "",
    COMP_EMAIL: "",
    COMP_WEB: "",
    COMP_ADDRESS: "",
    CREATED_BY: userDetails?.USER_ID,
  });

  function closeDialog() {
    setShowDialog({ display: false });
  }

  function openDialog(data) {
    if (data !== undefined) {
      setDataOne({
        COMP_ID: data.COMP_ID,
        COMP_REGNO: data.COMP_REGNO,
        COMP_REGION: data.COMP_REGION,
        COMP_NAME: data.COMP_NAME,
        COMP_PHONE: data.COMP_PHONE,
        COMP_EMAIL: data.COMP_EMAIL,
        COMP_WEB: data.COMP_WEB,
        COMP_ADDRESS: data.COMP_ADDRESS,
        CREATED_BY: userDetails?.USER_ID,
      });
    } else {
      setDataOne({
        COMP_ID: null,
        COMP_REGNO: "",
        COMP_REGION: "",
        COMP_NAME: "",
        COMP_PHONE: "",
        COMP_EMAIL: "",
        COMP_WEB: "",
        COMP_ADDRESS: "",
        CREATED_BY: userDetails?.USER_ID,
      });
    }
    setShowDialog({ display: true });
  }

  async function fetchData() {
    setLoading(true);
    let listItems = await DataRequest({
      url: hrUrl + "/compList",
      method: "POST",
      data: data,
    });
    if (listItems.data !== undefined && listItems.data.length > 0) {
      setJagsaalt([...listItems.data]);
      setSearch("");
    }
    setLoading(false);
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
      name: "АХЭ регистр",
      selector: "COMP_REGNO",
      sortable: true,
      expandableRows: true,
      width: "150px",
    },
    {
      name: "Харьяалал",
      selector: "COMP_REGION",
      sortable: true,
      expandableRows: true,
    },
    {
      name: "АХЭ нэр",
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
            onClick={() => openDialog(row)}
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
      dataOne.COMP_REGNO === undefined ||
      dataOne.COMP_REGNO === "" ||
      dataOne.COMP_REGNO === null
    ) {
      alert.show("АХЭ регистр оруулна уу");
      return false;
    }else if (dataOne.COMP_REGNO.length!==7) {
      alert.show("АХЭ регистр формат буруу байна");
      return false;
    } else if (
      dataOne.COMP_NAME === undefined ||
      dataOne.COMP_NAME === "" ||
      dataOne.COMP_NAME === null
    ) {
      alert.show("АХЭ нэр оруулна уу");
      return false;
    } else if (
      dataOne.COMP_PHONE === undefined ||
      dataOne.COMP_PHONE === "" ||
      dataOne.COMP_PHONE === null
    ) {
      alert.show("Утас оруулна уу");
      return false;
    }else if (dataOne.COMP_PHONE.length !== 8) {
      alert.show("Утасны дугаар формат буруу байна");
      return false;
    }  else if (
      dataOne.COMP_EMAIL === undefined ||
      dataOne.COMP_EMAIL === "" ||
      dataOne.COMP_EMAIL === null
    ) {
      alert.show("И-Мэйл оруулна уу");
      return false;
    } else if (validateEmail(dataOne.COMP_EMAIL) === false) {
      alert.show("И-Мэйл формат буруу байна");
      return false;
    } else {
      returnValue = true;
    }
    return returnValue;
  }

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
        url: hrUrl + "/compIU",
        method: "POST",
        data: dataOne,
      })
        .then(function (response) {
          if (response?.data?.message === "success") {
            alert.show("Амжилттай хадгаллаа");
            fetchData();
            setLoading(false);
            setShowDialog({ display: false });
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
      <Header title="АХЭ бүртгэл" />
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          //marginTop: "80px",
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
          <div style={{ display: "flex" }}>
            <div className="select is-small" style={{ marginRight: "10px" }}>
              <select
                value={searchType}
                onChange={(text) => setSearchType(text.target.value)}
              >
                <option>Сонгоно уу</option>
                <option value={"COMP_NAME"}>АХЭ нэр</option>
                <option value={"COMP_REGNO"}>АХЭ регистр</option>
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
              onClick={() => openDialog()}
            >
              Нэмэх
            </button>
          </div>

          {showDialog.display ? (
            <Dialog
              dataOne={dataOne}
              saveToDB={saveToDB}
              closeDialog={closeDialog}
              setDataOne={setDataOne}
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

function Dialog({ dataOne, closeDialog, saveToDB, setDataOne }) {
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
          <span>АХЭ бүртгэл</span>
        </div>
        <div>
          <span
            style={{
              fontWeight: "bold",
              cursor: "grab",
            }}
            onClick={() => closeDialog()}
          >
            X
          </span>
        </div>
      </div>
      <div>
        <div style={{ padding: "15px" }}>
          <div className="columns  ">
            <div className="column is-6">
              <h1>
                <span style={{ color: "red" }}>*</span>АХЭ регистр
              </h1>
              <input
                class="input is-size-7"
                value={dataOne.COMP_REGNO}
                disabled={dataOne.COMP_REGNO.length ===7 ? true : false}
                maxlength="7"
                onChange={(e) => {
                const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setDataOne({
                    ...dataOne,
                    COMP_REGNO: e.target.value,
                    });
                  }
                }}
              />
            </div>
            <div className="column is-6">
              <h1>Харьяалал</h1>
              <div className="select is-size-7 " style={{ width: "100%" }}>
                <select
                  value={dataOne.COMP_REGION}
                  onChange={(e) => {
                    setDataOne({
                      ...dataOne,
                      ...{
                        COMP_REGION: e.target.value,
                      },
                    });
                  }}
                  style={{ width: "-webkit-fill-available" }}
                >
                  <option>Сонгоно уу</option>
                  <option value={"Улаанбаатар"}>Улаанбаатар</option>
                  <option value={"Орон нутаг"}>Орон нутаг</option>
                </select>
              </div>
            </div>
          </div>
          <div className="columns  ">
            <div className="column is-6">
              <h1>
                <span style={{ color: "red" }}>*</span>АХЭ нэр
              </h1>
              <input
                class="input  is-size-7"
                value={dataOne.COMP_NAME}
                onChange={(e) => {
                  setDataOne({
                    ...dataOne,
                    ...{
                      COMP_NAME: e.target.value,
                    },
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
                value={dataOne.COMP_PHONE}
                maxlength="8"
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setDataOne({
                      ...dataOne,
                      COMP_PHONE: e.target.value,
                    });
                  }
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
                value={dataOne.COMP_EMAIL}
                onChange={(e) => {
                  setDataOne({
                    ...dataOne,
                    ...{
                      COMP_EMAIL: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="column is-6">
              <h1>Веб</h1>
              <input
                class="input  is-size-7"
                value={dataOne.COMP_WEB}
                onChange={(e) => {
                  setDataOne({
                    ...dataOne,
                    ...{
                      COMP_WEB: e.target.value,
                    },
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
                value={dataOne.COMP_ADDRESS}
                onChange={(e) => {
                  setDataOne({
                    ...dataOne,
                    ...{
                      COMP_ADDRESS: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-11"></div>
            <div className="column is-1 ">
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
        </div>
      </div>
    </div>
  );
}

export default AHE;
