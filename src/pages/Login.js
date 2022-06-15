import React, { useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import Background from "../assets/images/background.png";
import { LogoBottom, Filter } from "../assets/images/zurag";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import { DataRequest } from "../functions/DataApi";

const axios = require("axios");

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };
// const authContext = createContext();

// function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }
// function useAuth() {
//   return useContext(authContext);
// }

// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signin = (cb) => {
//     return fakeAuth.signin(() => {
//       setUser("user");
//       cb();
//     });
//   };

//   const signout = (cb) => {
//     return fakeAuth.signout(() => {
//       setUser(null);
//       cb();
//     });
//   };

//   return {
//     user,
//     signin,
//     signout,
//   };
// }
function Login(props) {
  const [ner, setNer] = useState();
  const [nuutsUg, setNuutsUg] = useState();
  const [sanuulakh, setSanuulakh] = useState(false);
  const alert = useAlert();
  const history = useHistory();
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
        url: "https://localhost:3001/api/v1/login",
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
                "https://localhost:3001/api/v1/profile/" +
                response?.data?.USER_ID,
              method: "GET",
              data: {},
            })
              .then(function (response) {
                console.log("test", response.data);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response?.data)
                );
                // auth.signin(() => {
                history.push("/web/dashboard/");

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
            placeholder="Нэвтрэх нэр"
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
            placeholder="Нууц үг"
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

export default Login;
//, useAuth, ProvideAuth
