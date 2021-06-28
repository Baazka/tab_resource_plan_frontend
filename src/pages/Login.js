import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Background from "../assets/images/background.png";
import { LogoBottom, Filter } from "../assets/images/zurag";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import { DataRequest } from "../functions/DataApi";

const axios = require("axios");

const a = (state, action) => {
  return {
    userDetail: state.user,
  };
};
const b = (dispatch) => {
  return {
    userNem: (user) => dispatch({ type: "ADD_USER", user: user }),
    userHas: (userID) => dispatch({ type: "remove _USER" }),
  };
};

function Login(props) {
  const [ner, setNer] = useState();
  const [nuutsUg, setNuutsUg] = useState();
  const [sanuulakh, setSanuulakh] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const alert = useAlert();
  const history = useHistory();

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
    console.log("ner nuuts ug", { username: ner, password: nuutsUg });
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
        },
      })
        .then(function (response) {
          console.log(response, "loginFirst");
          if (response?.data?.USER_ID !== 0) {
            if (sanuulakh) {
              localStorage.removeItem("rememberedUser");
              localStorage.setItem(
                "rememberedUser",
                JSON.stringify({
                  userName: ner,
                  password: nuutsUg,
                })
              );
            }
            DataRequest({
              url:
                "http://hr.audit.mn/reg/api/v1/profile/" +
                response?.data?.USER_ID,
              method: "GET",
              data: {},
            })
              .then(function (response) {
                console.log("login", response);
                props.userNem({
                  userID: response?.data?.USER_ID,
                  userDetail: response?.data,
                });
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response?.data)
                );

                history.push("/web/dashboard");
              })
              .catch(function (error) {
                //alert(error.response.data.error.message);
                console.log(error.response);
              });
          } else alert.show("Хэрэглэгчийн нэвтрэх нэр, нууц үг буруу байна!!!");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
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
        style={{ height: "6%", width: "25%", backgroundColor: "#233772" }}
      ></div>
      <div
        style={{
          height: "auto ",
          width: "25%",
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
            style={{ width: "300px" }}
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
              {/* appearance-none bg-white rounded-sm outline-none */}
              <input
                type="checkbox"
                tabIndex="3"
                onChange={() => setSanuulakh(!sanuulakh)}
                value={sanuulakh}
              />
              {/* <img src="/icon/checked.png" classNameName={"w-3 h-2 " + (sanuulakh ? "hidden z-20" : "block ")}/> */}
              <label style={{ color: "gray" }}>
                <span>&nbsp;</span>Сануулах
              </label>
            </div>
            <div style={{ paddingLeft: 80, marginBottom: "40px" }}>
              <a href="">Нууц үг мартсан?</a>
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

export default connect(a, b)(Login);
