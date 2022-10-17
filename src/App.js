import "./App.css";

import React, { useEffect, useState } from "react";

import { Route, useHistory, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useAlert } from "react-alert";
import AnketA from "./components/anketNeg";
import AnketB from "./components/AnketB";
import SideBar from "./components/sidebar";
import AlbanTushaal from "./pages/AlbanTushaal";
import Dashboard from "./pages/Dashboard";
import Baiguullaga from "./pages/Baiguullaga";
import TushaalShiidver from "./pages/TushaalShiidver";
import Tailan from "./pages/Tailan";
import Survey from "./pages/Survey";
import SurveyFin from "./pages/SurveyFin";
import SurveyNAG from "./pages/SurveyNAG";
import HuilTogtoomj from "./pages/HuilTogtoomj";
import AnketAtailan from "./pages/AnketAtailan";
import { HashRouter, Redirect } from "react-router-dom";
import AlbanTushaalBurtgel from "./components/AlbanTushaalBurtgel";
import Nuur from "./components/aTailan";
import EmployeeInformation from "./pages/EmployeeInformation";
import { UserB, BackButton } from "./assets/images/zurag";
import Background from "./assets/images/background.png";
import { LogoBottom } from "./assets/images/zurag";
import { DataRequest } from "./functions/DataApi";
import Shalgalt1 from "./components/shalgalt";
import Bolowsrol1 from "./components/bolowsrol";
import Elders from "./pages/Elders";
import Urilga from "./components/urigla";
import Confrence from "./components/confrence";
import Schedule from "./components/schedule";
const axios = require("axios");
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
const Header = (props) => {
  const history = useHistory();
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  function onSelect(option) {
    if (option === "2") {
      localStorage.removeItem("userDetails");
      fakeAuth.signout(() => {
        history.push("/");
      });

      // window.location.reload();
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        width: "100vw",
        minHeight: "70px",
        backgroundColor: "#f1f1f1",
        display: "flex",
        zIndex: "1",
      }}
    >
      <div style={{ marginLeft: "7%", marginTop: "20px" }}>
        {props.back ? (
          <img
            src={BackButton}
            alt=""
            height="25"
            width="25"
            onClick={() => props.butsakh()}
            style={{ cursor: "pointer" }}
          />
        ) : null}
        <span
          style={{
            color: "#418ee6",
            fontSize: 25,
            fontFamily: "RalewayRegular",
            marginLeft: "10px",
          }}
        >
          {props.title}
        </span>
      </div>

      <div
        class="navbar-menu"
        id="nav-links"
        style={{ marginTop: "15px", marginRight: "10px" }}
      >
        <div class="navbar-end">
          <div>
            <img src={UserB} width="45" height="45" alt="" />
          </div>

          <select
            style={{
              border: "none",
              backgroundColor: "#f1f1f1",
              marginBottom: "12px",
            }}
            value={1}
            onChange={(text) => onSelect(text.target.value)}
          >
            <option value="1" disabled selected hidden>
              {userDetils !== undefined ? userDetils?.USER_NAME : "Admin"}
            </option>
            <option value={2}>Гарах</option>
          </select>
        </div>
      </div>
    </div>
  );
};
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
function Login(props) {
  const [ner, setNer] = useState();
  const [nuutsUg, setNuutsUg] = useState();
  const [sanuulakh, setSanuulakh] = useState(false);
  const alert = useAlert();
  const { state } = useLocation();
  const [login, setLogin] = useState();
  // let location = useLocation();
  // let auth = useAuth();

  useEffect(() => {
    if (localStorage.getItem("rememberedUser")?.includes("userName")) {
      setNer(JSON.parse(localStorage.getItem("rememberedUser")).userName);
      setNuutsUg(JSON.parse(localStorage.getItem("rememberedUser")).password);
    }
    // setNer(JSON.parse(localStorage.getItem("rememberedUser"))?.userName);
    // setNuutsUg(JSON.parse(localStorage.getItem("rememberedUser"))?.password);
  }, [props]);

  function downHandler(e) {
    if (e.key === "Enter") {
      nevtrekh();
    }
  }
  function nevtrekh() {
    if (ner !== undefined && nuutsUg !== undefined) {
      axios.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      axios({
        method: "post", //put
        url: "http://hr.audit.mn/reg/api/v1/login",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },

        data: {
          username: ner,
          password: nuutsUg,
          systemid: 1,
        },
      })
        .then(function (response) {
          if (
            response?.data?.USER_ID !== 0 &&
            response?.data?.USER_ID !== null &&
            response?.data?.USER_ID !== undefined
          ) {
            if (sanuulakh) {
              localStorage.removeItem("rememberedUser");
              localStorage.setItem(
                "rememberedUser",
                JSON.stringify({
                  userName: ner,
                  password: "",
                })
              );
            }
            DataRequest({
              url:
                "http://hr.audit.mn/reg/api/v1/profile/" +
                response?.data?.USER_ID +
                "/" +
                1,
              method: "GET",
              data: {},
            })
              .then(function (response) {
                console.log("test", response.data);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response?.data)
                );
                // DataRequest({
                //   url: "http://hr.audit.mn/reg/hr/api/v1/election/",
                //   method: "GET",
                //   data: {},
                // })
                //   .then(function (response) {
                //     console.log("elid", response.data);
                //     localStorage.setItem(
                //       "elid",
                //       JSON.stringify(response?.data.ELECTION_ID)
                //     );

                //     // auth.signin(() => {
                //     // history.push("/web/dashboard/");
                //     // fakeAuth.authenticate(() => {
                //     //   setLogin(true);
                //     // });

                //     // });
                //   })
                //   .catch(function (error) {
                //     //alert(error.response.data.error.message);
                //   });
                // auth.signin(() => {
                // history.push("/web/dashboard/");
                fakeAuth.authenticate(() => {
                  setLogin(true);
                });

                // });
              })
              .catch(function (error) {
                //alert(error.response.data.error.message);
              });
          } else alert.show("Хэрэглэгчийн нэвтрэх нэр, нууц үг буруу байна!!!");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
        });
    }
  }
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  if (fakeAuth.isAuthenticated === true) {
    if (userDetils?.USER_TYPE_NAME === "SURVEY")
      return <Redirect to={state?.form || "/web/surveyFin/"} />;
    else return <Redirect to={state?.form || "/web/workerList/null"} />;
  }
  return (
    <div
      style={{
        backgroundImage: "url(" + Background + ")",
        display: "flex",
        flexDirection: "column",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        justifyContent: "center",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "6%",
          width: "400px",
          backgroundColor: "#233772",
          mobile: "",
        }}
      ></div>
      <div
        style={{
          height: "auto ",
          width: "400px",
          backgroundColor: "#ececf8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            marginLeft: "8px",
            marginBottom: "8%",
            marginTop: "20px",
          }}
          src={LogoBottom}
          width="210px"
          alt=""
        />

        <div class="wrap-input100 mb-3 ">
          <input
            tabIndex="1"
            class="input is-normal"
            id="UserName"
            placeholder="Нэвтрэх нэр"
            type="text"
            style={{
              width: "300px",
            }}
            value={ner}
            onChange={(text) => setNer(text.target.value)}
          />
          <span class="symbol-input100">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <div class="wrap-input100 mb-3">
          <input
            tabIndex="2"
            class="input is-normal"
            id="Password"
            name="Password"
            placeholder="Нууц үг"
            type="password"
            onKeyDown={downHandler}
            style={{ width: "300px" }}
            value={nuutsUg}
            onChange={(text) => setNuutsUg(text.target.value)}
          />
          <span class="symbol-input100">
            <i class="fa fa-unlock-alt"></i>
          </span>
        </div>
        <div style={{ width: "300px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "self-start",
            }}
          >
            <div>
              <input
                type="checkbox"
                tabIndex="3"
                onChange={() => setSanuulakh(!sanuulakh)}
                value={sanuulakh}
              />
              <label style={{ color: "gray" }}>
                <span>&nbsp;</span>Сануулах
              </label>
            </div>
            <div style={{ paddingLeft: 80, marginBottom: "40px" }}>
              <a href="" style={{ color: "gray" }}>
                Нууц үг мартсан?
              </a>
            </div>
          </div>
        </div>

        <div class="container">
          <div
            class="col-md-12  text-center"
            style={{ paddingBottom: "50px", textAlign: "center" }}
          >
            <button
              class="button"
              style={{ backgroundColor: "#233772", color: "white" }}
              type="submit"
              onClick={nevtrekh}
            >
              Нэвтрэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
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
        <Route path="/urilga" exact>
          <Urilga />
        </Route>
        <Route path="/conference" exact>
          <Confrence />
        </Route>
        <Route path="/schedule" exact>
          <Schedule />
        </Route>
        <Route path="/web">
          <Header />
          <SideBar />
        </Route>

        <PrivateRoute path="/web/workerList/:search" component={Home} exact />
        <PrivateRoute path="/web/anketA/:search" component={AnketA} exact />
        <PrivateRoute path="/web/anketB/:search" component={AnketB} exact />
        <PrivateRoute path="/web/dashboard/" component={Dashboard} exact />
        <PrivateRoute path="/web/Baiguullaga/" component={Baiguullaga} exact />
        <PrivateRoute
          path="/web/AlbanTushaal/:search"
          component={AlbanTushaal}
          exact
        />

        <PrivateRoute path="/web/Tailan/" component={Tailan} exact />
        <PrivateRoute
          path="/web/HuilTogtoomj/"
          component={HuilTogtoomj}
          exact
        />
        <PrivateRoute
          path="/web/TushaalShiidver/"
          component={TushaalShiidver}
          exact
        />

        <PrivateRoute
          path="/web/EmployeeInformation/"
          component={EmployeeInformation}
          exact
        />
        <PrivateRoute
          path="/web/AlbanTushaalBurtgel/:positionid/:search"
          component={AlbanTushaalBurtgel}
          exact
        />
        <PrivateRoute
          path="/web/Tailan/AnketA/:turul"
          component={AnketAtailan}
          exact
        />
        <PrivateRoute path="/web/Survey" component={Survey} exact />
        <PrivateRoute path="/web/SurveyNAG" component={SurveyNAG} exact />
        <PrivateRoute path="/web/SurveyFin" component={SurveyFin} exact />
        <Route path="/print/anket/" component={Nuur} exact />
        <PrivateRoute
          path="/web/Shalgalt/shalgalt1/"
          component={Shalgalt1}
          exact
        />
        <PrivateRoute
          path="/web/Bolowsrol1/bolowsrol/"
          component={Bolowsrol1}
          exact
        />
        <PrivateRoute path="/web/Elders" component={Elders} exact />

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

export default App;
