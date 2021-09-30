import React, { useEffect, useState, useReducer } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import dateFormat from "dateformat";
import { useAlert } from "react-alert";
import {
  Search,
  Filter,
  Add,
  Excel,
  AddBlue,
  DownArrow,
  Edit,
  Delete,
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { Suboffice, Office } from "../components/library";
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

const axios = require("axios");

function Subdepartment(props) {
  const [data, loadData] = useState([]);
  const [subDepId, setSubDepId] = useState(null);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("Sub_Department");

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/subdepartment/" + props?.deparment_ID,
        method: "GET",
        data: {},
      });

      loadData(jagsaalts?.data);
    }
    test();
  }, [props]);

  return (
    <div>
      {props?.show == true && props?.deparment_ID === props.depId ? (
        <div style={{ marginLeft: "2%" }}>
          <div
            style={{
              borderRadius: "8px",
              backgroundColor: "rgb(184, 217, 255,0.3)",
              padding: "5px",
              height: "40px",
            }}
          >
            <div className="columns">
              <div className="column is-4">
                <span
                  style={{
                    color: "grey",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginLeft: "5px",
                  }}
                >
                  Газар нэгж
                </span>
                <span
                  style={{
                    marginLeft: "20px",
                    color: "white",
                    height: "25px",
                    width: "25px",
                    backgroundColor: "#418ee6",
                    borderRadius: "50%",
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {data.length}
                </span>
              </div>
              <div className="column is-4"></div>
              <div className="column is-4 has-text-right">
                <img
                  src={Add}
                  width="30px"
                  height="25px"
                  onClick={() =>
                    props.setAdd({ type: 2, deparment_ID: props?.deparment_ID })
                  }
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginLeft: "5%",
            }}
          >
            {data.map((value, index) => (
              <div
                style={{
                  width: "100%",
                  border: "1px solid rgb(184, 217, 255,0.3)",
                }}
              >
                <div className="columns">
                  <div className="column is-6">
                    <button
                      className="button"
                      style={{
                        justifyContent: "flex-start",
                        border: "none",
                      }}
                      onClick={() => {
                        setSubDepId(value.SUB_DEPARTMENT_ID);
                        setShow(!show);
                      }}
                    >
                      <span style={{ fontSize: "0.8rem" }}>
                        {index + 1}.{value.SUB_DEPARTMENT_NAME}
                      </span>
                    </button>
                  </div>
                  <div className="column is-2" />
                  <div className="column is-1">
                    <span style={{ fontSize: "0.8rem" }}>Чиг үүрэг:</span>
                  </div>
                  <div className="column is-3">
                    <ChigUureg
                      deparment_id_path={
                        props?.deparment_ID +
                        "/" +
                        value.SUB_DEPARTMENT_ID +
                        "/null/"
                      }
                      SUB_DEPARTMENT_ID={value.SUB_DEPARTMENT_ID}
                      COMPARTMENT_ID={props?.deparment_ID}
                      COMPARTMENT_ID={props?.deparment_ID}
                      DEPARTMENT_ID={null}
                    />
                  </div>
                </div>
                <Compartment
                  show={show}
                  deparment_ID={value.SUB_DEPARTMENT_ID}
                  deparment_id_path={
                    props?.deparment_ID +
                    "/" +
                    value.SUB_DEPARTMENT_ID +
                    "/null"
                  }
                  subDepId={subDepId}
                  setAdd={props.setAdd}
                  subType={0}
                />
              </div>
            ))}
          </div>
          {data.length === 0 ? (
            <Compartment
              show={props?.show}
              deparment_ID={props?.deparment_ID}
              deparment_id_path={props?.deparment_ID + "/null/null?"}
              subDepId={props?.deparment_ID}
              setAdd={props.setAdd}
              subType={1}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
function Compartment(props) {
  const [data, loadData] = useState([]);

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/compartment/" +
          props?.deparment_id_path,
        method: "GET",
        data: {},
      });
      loadData(jagsaalts?.data);
    }
    test();
  }, [props]);

  return (
    <div>
      {props?.show == true && props?.deparment_ID === props.subDepId ? (
        <div style={{ marginLeft: "2%" }}>
          <div
            style={{
              borderRadius: "8px",
              backgroundColor: "rgb(184, 217, 255,0.3)",
              padding: "5px",
              height: "40px",
            }}
          >
            <div className="columns">
              <div className="column is-4">
                {/* <img
                  src={DownArrow}
                  width="15px"
                  style={{ marginLeft: "5px" }}
                /> */}
                <span
                  style={{
                    color: "grey",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginLeft: "5px",
                  }}
                >
                  Албан хэлтэс
                </span>
                <span
                  style={{
                    marginLeft: "20px",
                    color: "white",
                    height: "25px",
                    width: "25px",
                    backgroundColor: "#418ee6",
                    borderRadius: "50%",
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {data.length}
                </span>
              </div>
              <div className="column is-4"></div>
              <div className="column is-4 has-text-right">
                <img
                  src={Add}
                  width="30px"
                  height="25px"
                  onClick={() =>
                    props.setAdd({
                      type: 3,
                      deparment_ID: props?.deparment_ID,
                      subType: props.subType,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "5%",
            }}
          >
            {data.map((value, index) => (
              <div
                style={{
                  width: "100%",
                  border: "1px solid rgb(184, 217, 255,0.3)",
                }}
              >
                <div className="columns">
                  <div className="column is-6">
                    <button
                      className="button"
                      style={{
                        justifyContent: "flex-start",
                        border: "none",
                      }}
                    >
                      {index + 1}.{value.COMPARTMENT_NAME}
                    </button>
                  </div>
                  <div className="column is-1">
                    <span style={{ fontSize: "0.8rem" }}>Чиг үүрэг:</span>
                  </div>
                  <div className="column is-5">
                    <ChigUureg
                      deparment_id_path={
                        props?.deparment_ID +
                        "/" +
                        props.SUB_DEPARTMENT_ID +
                        "/" +
                        value.COMPARTMENT_ID
                      }
                      SUB_DEPARTMENT_ID={props.SUB_DEPARTMENT_ID}
                      COMPARTMENT_ID={value.COMPARTMENT_ID}
                      DEPARTMENT_ID={props?.deparment_ID}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const Baiguullaga = (props) => {
  const [jagsaalt, setJagsaalt] = useState([]);
  const [depId, setDepId] = useState(null);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState({ type: 0, id: 0, subid: 0 });
  const alert = useAlert();

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://hr.audit.mn/hr/api/v1/department/",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      console.log(jagsaalts);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="БАЙГУУЛЛАГЫН БҮТЦИЙН БҮРТГЭЛ" />
      <div
        style={{
          backgroundColor: "white",
          width: "91%",
          height: "90%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            backgroundColor: "rgb(184, 217, 255,0.3)",
            padding: "5px",
            height: "40px",
          }}
        >
          <div className="columns">
            <div className="column is-4">
              {/* <img src={DownArrow} width="15px" style={{ marginLeft: "5px" }} /> */}
              <span
                style={{
                  color: "grey",
                  fontWeight: "bold",

                  marginLeft: "5px",
                  fontSize: "1rem",
                }}
              >
                Байгууллагын нэр
              </span>
              <span
                style={{
                  marginLeft: "20px",
                  color: "white",
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#418ee6",
                  borderRadius: "50%",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                {jagsaalt.length}
              </span>
            </div>
            <div className="column is-4"></div>
            <div className="column is-4 has-text-right">
              <img
                src={Add}
                width="30px"
                height="25px"
                onClick={() =>
                  setAdd({ type: 1, deparment_ID: "new", path: "department/" })
                }
              />
            </div>
          </div>
        </div>
        {add?.type != 0 ? <AddDialog setAdd={setAdd} add={add} /> : null}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {jagsaalt.map((value, index) => (
            <div
              style={{
                marginLeft: "2%",
                border: "1px solid rgb(184, 217, 255,0.3)",
              }}
            >
              <div className="columns">
                <div className="column is-6">
                  <button
                    className="button"
                    style={{
                      justifyContent: "flex-start",
                      border: "none",
                    }}
                    onClick={() => {
                      setDepId(value.DEPARTMENT_ID);
                      setShow(!show);
                    }}
                  >
                    <span style={{ fontSize: "0.8rem" }}>
                      {index + 1}.{value.DEPARTMENT_NAME}
                    </span>
                  </button>
                  <img
                    src={Edit}
                    width="20px"
                    height="20px"
                    style={{ marginTop: "12px", cursor: "pointer" }}
                    onClick={() =>
                      setAdd({
                        type: 1,
                        id: value.DEPARTMENT_ID,
                        path: "/department/" + value.DEPARTMENT_ID,
                      })
                    }
                  />
                </div>
                <div className="column is-2" />
                <div className="column is-1">
                  <span style={{ fontSize: "0.8rem" }}>Чиг үүрэг:</span>
                </div>
                <div className="column is-3">
                  <ChigUureg
                    deparment_id_path={value.DEPARTMENT_ID + "/null/null/"}
                    SUB_DEPARTMENT_ID={null}
                    COMPARTMENT_ID={null}
                    DEPARTMENT_ID={null}
                  />
                </div>
              </div>
              <Subdepartment
                show={show}
                deparment_ID={value.DEPARTMENT_ID}
                depId={depId}
                setAdd={setAdd}
                setShow={setShow}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

function AddDialog(props) {
  const alert = useAlert();
  const [data, loadData] = useState();
  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    console.log("jagsaaltBaaaaaaaaprops", props);
    async function test() {
      if (data == undefined || data == null) {
        if (props.add.deparment_ID !== "new") {
          let jagsaalts = await DataRequest({
            url: "http://hr.audit.mn/hr/api/v1/" + props?.add.path,
            method: "GET",
            data: {},
          });
          console.log("jagsaaltBaaaaaaaa", jagsaalts);
          if (jagsaalts.data !== undefined && jagsaalts.data.length !== 0)
            loadData(jagsaalts?.data[0]);
          else
            loadData({
              DEPARTMENT_ID: props.deparment_ID,
              DEPARTMENT_CODE: "",
              DEPARTMENT_SHORT_NAME: "",
              DEPARTMENT_NAME: "",
              ORDER_NO: "",
              START_DATE: new Date(),
              OFFICE_ID: 1,
              OFFICE_ADDRESS: "",
              OFFICE_PHONE: "",
              IS_ACTIVE: 1,
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
            });
        } else {
          loadData({
            DEPARTMENT_ID: props.deparment_ID,
            DEPARTMENT_CODE: "",
            DEPARTMENT_SHORT_NAME: "",
            DEPARTMENT_NAME: "",
            ORDER_NO: "",
            START_DATE: new Date(),
            OFFICE_ID: 1,
            OFFICE_ADDRESS: "",
            OFFICE_PHONE: "",
            IS_ACTIVE: 1,
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
          });
        }
      }
    }
    test();
  }, [props]);

  function saveToDB() {
    console.log("testAddDepartment", data);
    DataRequest({
      url: "http://hr.audit.mn/hr/api/v1/" + props.add.path,
      method: "POST",
      data: data,
    })
      .then(function (response) {
        if (response?.data?.message === "success") {
          alert.show("амжилттай хадгаллаа");
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

  let design;
  if (data != undefined && data !== null) {
    design = (
      <div>
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
            <div>{/* <span>ТУШААЛЫН БҮРТГЭЛ</span> */}</div>
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  cursor: " -webkit-grab",
                  cursor: "grab",
                }}
                onClick={() => props.setAdd({ type: 0, id: 0 })}
              >
                X
              </span>
            </div>
          </div>
          <div style={{ padding: "15px 15px 35px 15px" }}>
            <div>
              <div className="columns  ">
                <div className="column is-6">
                  <h1>Код:</h1>
                  <input
                    class="input "
                    value={data.DEPARTMENT_CODE}
                    onChange={(e) =>
                      loadData({
                        ...data,
                        ...{
                          DEPARTMENT_CODE: e.target.value,
                          UPDATED_BY: userDetils?.USER_ID,
                          UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
                        },
                      })
                    }
                  />
                </div>
                <div className="column is-6">
                  <h1>Аймаг/хот:</h1>
                  <Office
                    personChild={data}
                    setPersonChild={loadData}
                    width={true}
                  />
                </div>
              </div>

              <div className="columns">
                <div className="column is-6">
                  <h1>Товч нэр:</h1>
                  <input
                    class="input"
                    value={data.DEPARTMENT_SHORT_NAME}
                    onChange={(e) =>
                      loadData({
                        ...data,
                        ...{
                          DEPARTMENT_SHORT_NAME: e.target.value,
                          UPDATED_BY: userDetils?.USER_ID,
                          UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
                        },
                      })
                    }
                  />
                  <div className="columns">
                    <div className="column is-12">
                      <h1>Байгууллагын нэр:</h1>
                      <input
                        class="input"
                        value={data.DEPARTMENT_NAME}
                        onChange={(e) =>
                          loadData({
                            ...data,
                            ...{
                              DEPARTMENT_NAME: e.target.value,
                              UPDATED_BY: userDetils?.USER_ID,
                              UPDATED_DATE: dateFormat(
                                new Date(),
                                "dd-mmm-yyyy"
                              ),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  <h1>Хаяг:</h1>
                  <textarea
                    class="input"
                    value={data?.OFFICE_ADDRESS}
                    onChange={(e) =>
                      loadData({
                        ...data,
                        ...{
                          OFFICE_ADDRESS: e.target.value,
                          UPDATED_BY: userDetils?.USER_ID,
                          UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="columns">
                  <div className="column is-6">
                    <h1>Хэрэгжих огноо:</h1>
                    <input
                      type="date"
                      className="input"
                      value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
                      onChange={(e) => {
                        loadData({
                          ...data,
                          ...{
                            START_DATE: e.target.value,
                            UPDATED_BY: userDetils?.USER_ID,
                            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
                          },
                        });
                      }}
                    ></input>
                  </div>
                  <div className="column is-6">
                    <h1>Утас:</h1>
                    <input
                      class="input  is-size-7"
                      value={data?.OFFICE_PHONE}
                      onChange={(e) => {
                        loadData({
                          ...data,
                          ...{
                            OFFICE_PHONE: e.target.value,
                            UPDATED_BY: userDetils?.USER_ID,
                            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
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
                    <h1>Эрэмбэ:</h1>
                    <input
                      class="input  is-size-7"
                      type="number"
                      value={data.ORDER_NO}
                      onChange={(e) => {
                        loadData({
                          ...data,
                          ...{
                            ORDER_NO: e.target.value,
                            UPDATED_BY: userDetils?.USER_ID,
                            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    design = <div>achaalj baina</div>;
  }
  return design;
}

function ChigUureg(props) {
  const [data, loadData] = useState([]);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    async function test() {
      if (data.length === 0) {
        let jagsaalts = await DataRequest({
          url:
            "http://hr.audit.mn/hr/api/v1/organizationrole/" +
            props?.deparment_id_path,
          method: "GET",
          data: {},
        });
        if (jagsaalts.data !== undefined && jagsaalts.data.length != 0)
          loadData(jagsaalts?.data);
        else addRow();
      }
    }
    test();
  }, [props]);
  function saveToDB() {
    if (requiredField(data) === true) {
      DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/organizationrole/" +
          props?.deparment_id_path,
        method: "POST",
        data: data,
      })
        .then(function (response) {
          console.log("UpdateResponse", response);

          if (response?.data?.message === "success") {
            alert.show("амжилттай хадгаллаа");
            setEdit(!edit);
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
  }

  function requiredField() {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].ORGANIZATION_ROLE_NAME === null ||
        data[i].ORGANIZATION_ROLE_NAME === ""
      ) {
        alert.show(" нэр оруулан уу");
        return false;
      } else if (i === data.length - 1) {
        return true;
      }
    }
  }

  function addRow() {
    let value = [...data];
    value.push({
      ORGANIZATION_ROLE_ID: null,
      ORGANIZATION_ROLE_NAME: "",
      DEPARTMENT_ID: props.DEPARTMENT_ID,
      SUB_DEPARTMENT_ID: props.SUB_DEPARTMENT_ID,
      COMPARTMENT_ID: props.COMPARTMENT_ID,
      IS_ACTIVE: 1,
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
    });
    loadData(value);
  }

  function removeRow(indexParam, value) {
    if (value?.ORGANIZATION_ROLE_ID !== null) {
      DataRequest({
        url:
          "http://hr.audit.mn/hr/api/v1/organizationrole/" +
          props?.deparment_id_path,
        method: "POST",
        data: {
          ...value,
          ...{
            IS_ACTIVE: 1,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
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
    loadData(data.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
  }

  return (
    <div style={{ display: "flex" }}>
      <table className="table ">
        <thead>
          <tr>
            <td>
              <span className="textSaaral">№</span>
            </td>
            <td>
              <span className="textSaaral">нэр</span>
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
          {data.map((value, index) => (
            <tr>
              <td>
                <span className="textSaaral">{index + 1}</span>
              </td>
              <td>
                <input
                  disabled={edit}
                  className="Borderless"
                  placeholder="утгаа оруулна уу"
                  value={data[index]?.ORGANIZATION_ROLE_NAME}
                  onChange={(text) => {
                    let value = [...data];
                    value[index].ORGANIZATION_ROLE_NAME = text.target.value;
                    value[index].UPDATED_BY = userDetils?.USER_ID;
                    value[index].UPDATED_DATE = dateFormat(
                      new Date(),
                      "dd-mmm-yy"
                    );
                    loadData(value);
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
      <button
        className="buttonTsenkher"
        style={{ height: "30px", marginLeft: "5px" }}
        onClick={() => setEdit(!edit)}
      >
        засах
      </button>
      {!edit ? (
        <button
          className="buttonTsenkher"
          style={{ height: "30px", marginLeft: "5px" }}
          onClick={() => saveToDB()}
        >
          хадгалах
        </button>
      ) : null}
    </div>
  );
}

export default Baiguullaga;
