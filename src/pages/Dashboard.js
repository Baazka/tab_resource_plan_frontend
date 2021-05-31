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
      <Header title="Дашборд" />
      <div
        style={{
          backgroundColor: "white",

          overflow: "hidden",
        }}
      >
        <Iframe
          url="https://app.powerbi.com/view?r=eyJrIjoiOTVmMzU1ZmUtZjQzMi00MzAyLWI2YTEtN2EyMWI5OTMxYjFhIiwidCI6ImI0MDYwNDEyLTEwM2MtNDBlNy05YzExLTBhNjBkY2NhZjVhZCIsImMiOjEwfQ%3D%3D"
          width="93%"
          height="850px"
          id="myId"
          className="myClassname"
          position="relative"
        />
      </div>
    </div>
  );
};

export default Dashboard;
