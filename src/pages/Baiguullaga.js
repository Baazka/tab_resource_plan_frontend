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
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { Suboffice, Office } from "../components/library";

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
                    fontSize: "1.1rem",
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
                    props.setAdd({ type: 2, id: props?.deparment_ID })
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
              <div style={{ width: "100%" }}>
                <button
                  className="button"
                  style={{
                    width: "-webkit-fill-available",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    setSubDepId(value.SUB_DEPARTMENT_ID);
                    setShow(!show);
                  }}
                >
                  {index + 1}.{value.SUB_DEPARTMENT_NAME}
                </button>
                <Compartment
                  show={show}
                  deparment_ID={value.SUB_DEPARTMENT_ID}
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
        url: "http://hr.audit.mn/hr/api/v1/compartment/" + props?.deparment_ID,
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
                    fontSize: "1.1rem",
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
                      id: props?.deparment_ID,
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
              <button
                className="button"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                {index + 1}.{value.COMPARTMENT_NAME}
              </button>
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
                  fontSize: "1.1rem",
                  marginLeft: "5px",
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
                onClick={() => setAdd({ type: 1, id: 0 })}
              />
            </div>
          </div>
        </div>
        {add?.type != 0 ? <AddDialog setAdd={setAdd} add={add} /> : null}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {jagsaalt.map((value, index) => (
            <div style={{ marginLeft: "2%" }}>
              <button
                className="button"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
                onClick={() => {
                  setDepId(value.DEPARTMENT_ID);
                  setShow(!show);
                }}
              >
                {index + 1}.{value.DEPARTMENT_NAME}
              </button>
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
  const [tsalinKhuls, setTsalin] = useState(false);
  const alert = useAlert();
  const [button, setbutton] = useState(1);
  const [EMPLOYEE_ID, setEMPLOYEE_ID] = useState();
  const [data, loadData] = useState({});
  const [, forceRender] = useReducer((s) => s + 1, 0);
  useEffect(() => {
    console.log("addIDprops", props.add);
  }, [props]);
  // useEffect(() => {
  //   forceRender();
  // }, [data]);
  // function saveToDB() {
  //   console.log("tushaalshiidverData", data);
  //   DataRequest({
  //     url: "http://hr.audit.mn/hr/api/v1/decision",
  //     method: "POST",
  //     data: data,
  //   })
  //     .then(function (response) {
  //       console.log("tushaalResponse", response);
  //       if (response?.data?.message === "success") {
  //         setEMPLOYEE_ID(response?.data?.EMPLOYEE_ID);
  //         alert.show("амжилттай хадгаллаа");
  //         if (props.type !== 2) setbutton(2);
  //       } else {
  //         alert.show("амжилтгүй алдаа");
  //       }
  //       //history.push('/sample')
  //     })
  //     .catch(function (error) {
  //       //alert(error.response.data.error.message);
  //       console.log(error.response);
  //       alert.show("амжилтгүй алдаа");
  //     });
  // }
  // function salary() {
  //   if (
  //     EMPLOYEE_ID !== null &&
  //     EMPLOYEE_ID !== "" &&
  //     EMPLOYEE_ID !== undefined
  //   ) {
  //     setbutton(2);
  //   } else {
  //     alert.show("үндсэн мэдээлэл бөглөөд хадгалана уу");
  //   }
  // }
  return (
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
                  //value={props.worker.PERSON_LASTNAME}
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
                  //value={props.worker.PERSON_LASTNAME}
                />
                <div className="columns">
                  <div className="column is-12">
                    <h1>Байгууллагын нэр:</h1>
                    <input
                      class="input"
                      //value={props.worker.PERSON_LASTNAME}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <h1>Хаяг:</h1>
                <textarea
                  class="input"
                  // value={data?.DECISION_NO}
                  // onChange={(e) => {
                  //   loadData({
                  //     ...data,
                  //     ...{
                  //       DECISION_NO: e.target.value,
                  //     },
                  //   });
                  // }}
                />
              </div>
            </div>

            <div>
              <div className="columns">
                <div className="column is-6">
                  <h1>Хэрэгжих огноо:</h1>
                  <input
                    type="date"
                    disabled={props.edit}
                    className="input"
                    // value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
                    // onChange={(e) => {
                    //   loadData({
                    //     ...data,
                    //     ...{
                    //       START_DATE: e.target.value,
                    //     },
                    //   });
                    // }}
                  ></input>
                </div>
                <div className="column is-6">
                  <h1>Утас:</h1>
                  <input
                    class="input  is-size-7"
                    // value={data?.DECISION_DESC}
                    // onChange={(e) => {
                    //   loadData({
                    //     ...data,
                    //     ...{
                    //       DECISION_DESC: e.target.value,
                    //     },
                    //   });
                    // }}
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
                    //value={props.worker.PERSON_LASTNAME}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-8"> </div>
              <div className="column is-4 has-text-right">
                <button
                  className="buttonTsenkher ml-1"
                  // onClick={() => {
                  //   saveToDB();
                  // }}
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
}

export default Baiguullaga;
