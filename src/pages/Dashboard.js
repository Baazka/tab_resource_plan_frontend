import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import Iframe from "react-iframe";

const Dashboard = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();

  return (
    <div>
      {/* <Header title="Дашбоард" /> */}
      <div
        style={{
          position: "absolute",
          left: "20%",
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
          Дашбоард
        </span>
      </div>
      <div
        style={{
          backgroundColor: "white",
          overflow: "scroll",
          height: "100vh",
        }}
      >
        <Iframe
          url="https://app.powerbi.com/view?r=eyJrIjoiNmZmNjcxMTEtMzQxMC00ODM1LWI2ZWUtNWUwNjA2Y2I1ODgyIiwidCI6ImI0MDYwNDEyLTEwM2MtNDBlNy05YzExLTBhNjBkY2NhZjVhZCIsImMiOjEwfQ%3D%3D&pageName=ReportSection"
          width="93%"
          height="900px"
          id="myId"
          className="myClassname"
          position="relative"
        />
      </div>
    </div>
  );
};

export default Dashboard;
