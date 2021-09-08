import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import dateFormat from "dateformat";
import {
  Search,
  Filter,
  Add,
  Excel,
  AddBlue,
  DownArrow,
} from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { Suboffice } from "../components/library";

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
                }}
              >
                {jagsaalt.length}
              </span>
            </div>
            <div className="column is-2 has-text-right"></div>
          </div>
        </div>
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

export default Baiguullaga;
