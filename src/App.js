import "./App.css";

import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Route,
  Link,
  useHistory,
  Switch,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import { useAlert } from "react-alert";
import Login from "./pages/Login";
import AnketA from "./components/anketNeg";
import AnketB from "./components/AnketB";
import SideBar from "./components/sidebar";
import AlbanTushaal from "./pages/AlbanTushaal";
import Dashboard from "./pages/Dashboard";
import Baiguullaga from "./pages/Baiguullaga";
import TushaalShiidver from "./pages/TushaalShiidver";
import Tailan from "./pages/Tailan";
import AnketAtailan from "./pages/AnketAtailan";
import { HashRouter } from "react-router-dom";
import AlbanTushaalBurtgel from "./components/AlbanTushaalBurtgel";
import { LogoB } from "../src/assets/images/zurag";
import Header from "../src/components/header";
import EmployeeInformation from "./pages/EmployeeInformation";
const axios = require("axios");

function App() {
  const [signin, setSignin] = useState(false);
  // var userDetail = localStorage.getItem("userDetails");

  return (
    <div>
      {/* <ProvideAuth> */}
      <HashRouter
        getUserConfirmation={(message, callback) => {
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
      >
        <Route path="/" exact>
          <Login />
        </Route>
        {/* {userDetail != undefined ? ( */}

        <Route path="/web">
          <Header setSignin={setSignin} />
          <SideBar />
        </Route>
        <Route path="/web/workerList/:search" component={Home} exact />
        <Route path="/web/anketA/:search" component={AnketA} exact />
        <Route path="/web/anketB/:search" component={AnketB} exact />
        <Route path="/web/dashboard/" component={Dashboard} exact />
        <Route path="/web/Baiguullaga/" component={Baiguullaga} exact />
        <Route
          path="/web/AlbanTushaal/:search"
          component={AlbanTushaal}
          exact
        />
        <Route path="/web/TushaalShiidver/" component={TushaalShiidver} exact />
        <Route path="/web/Tailan/" component={Tailan} exact />
        <Route
          path="/web/EmployeeInformation/"
          component={EmployeeInformation}
          exact
        />
        <Route
          path="/web/AlbanTushaalBurtgel/:positionid/:search"
          component={AlbanTushaalBurtgel}
          exact
        />
        <Route
          path="/web/Tailan/AnketA/:turul"
          component={AnketAtailan}
          exact
        />

        {/* ) : (
            <div
              style={{
                margin: "100px 100px 100px 25%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img src={LogoB} width="300px" />
              <span
                style={{ fontSize: "40px", color: "red", marginLeft: "20px" }}
              >
                404!
              </span>
              <span style={{ marginLeft: "20px" }}>
                Таны бичсэн хаяг байхгүй байна.
              </span>
              <button
              style={{
                marginLeft: "20px",
                width: "60px",
                backgroundColor: "transparent",
                border: "none",

              }}
            >
              нэвтрэх
            </button>
            </div>
          )} */}
      </HashRouter>
      {/* </ProvideAuth> */}
    </div>
  );
}

function Users() {
  return <h2>User</h2>;
}
function About() {
  return <h2>About us</h2>;
}

export default App;
