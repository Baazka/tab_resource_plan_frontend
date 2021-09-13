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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "5%",
          }}
        >
          {data.map((value, index) => (
            <div>
              <button
                className="button"
                style={{}}
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
              />
            </div>
          ))}
          {data.length === 0 ? (
            <Compartment
              show={show}
              deparment_ID={props?.deparment_ID}
              subDepId={props?.deparment_ID}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "10%",
          }}
        >
          {data.map((value, index) => (
            <button className="button" style={{}}>
              {index + 1}.{value.COMPARTMENT_NAME}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const Baiguullaga = (props) => {
  const [jagsaalt, setJagsaalt] = useState([]);
  const [depId, setDepId] = useState(null);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(0);

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
        height: "100vh",
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
            marginTop: "10px",
            borderRadius: "8px",
            backgroundColor: "rgb(184, 217, 255,0.3)",
            padding: "5px",
          }}
        >
          <div className="columns">
            <div className="column is-4">
              <img src={DownArrow} width="15px" style={{ marginLeft: "5px" }} />
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
                width="40px"
                height="30px"
                onClick={() => setAdd(1)}
              />
            </div>
          </div>
        </div>
        {add === 1 ? <AddDialog /> : null}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {jagsaalt.map((value, index) => (
            <div>
              <button
                className="button"
                style={{ width: "20%" }}
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
  const [data, loadData] = useState({
    PERSON_ID: props.worker.PERSON_ID,
    DEPARTMENT_ID: 1,
    SUB_DEPARTMENT_ID: "null",
    COMPARTMENT_ID: "null",
    POSITION_ID: "null",
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
        </div>

        <div className="column is-6"></div>
        <div className="column is-2 has-text-right"></div>
      </div>
      <div>
        <div className="columns  ">
          <div className="column is-3">
            <h1>Код:</h1>
            <input
              class="input  is-size-7"
              //value={props.worker.PERSON_LASTNAME}
              disabled={true}
            />
          </div>
          <div className="column is-3">
            <h1>Аймаг/хот:</h1>
            <Office personChild={data} setPersonChild={loadData} />
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <h1>Товч нэр:</h1>
            <input
              class="input  is-size-7"
              //value={props.worker.PERSON_LASTNAME}
              disabled={true}
            />
            <div className="columns">
              <div className="column is-6">
                <h1>Байгууллагын нэр:</h1>
                <input
                  class="input  is-size-7"
                  //value={props.worker.PERSON_LASTNAME}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="column is-6">
            <h1>Хаяг:</h1>
            <textarea
              class="input  is-size-7"
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
                className="anketInput"
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
  );
}

export default Baiguullaga;
