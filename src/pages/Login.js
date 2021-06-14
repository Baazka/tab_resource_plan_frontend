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
  const [ner, setNer] = useState("");
  const [nuutsUg, setNuutsUg] = useState("");
  const [sanuulakh, setSanuulakh] = useState(false);
  const alert = useAlert();
  const history = useHistory();

  function nevtrekh() {
    axios({
      method: "post", //put
      url: "http://10.10.10.46:3001/api/v1/login",
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
        console.log(props);
        if (response?.data?.userid?.[0] != 0) {
          DataRequest({
            url:
              "http://10.10.10.46:3001/api/v1/profile/" +
              response?.data?.USER_ID,
            method: "GET",
            data: {},
          })
            .then(function (response) {
              console.log("UpdateResponse", response);
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
  return (
    <div
      style={{
        backgroundImage: "url(" + Background + ")",
        display: "flex",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <div
          style={{ height: "6%", width: "25%", backgroundColor: "#233772" }}
        ></div>
        <div
          style={{
            height: "50%",
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
              class="input is-normal"
              data-val="true"
              data-val-required="Нэвтрэх нэр оруулна уу!"
              id="UserName"
              name="UserName"
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
              class="input is-normal"
              data-val="true"
              data-val-required="Нууц үг оруулна уу!"
              id="Password"
              name="Password"
              placeholder="Нууц үг"
              type="password"
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
                <input type="checkbox" />
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
            <div class="col-md-12  text-center">
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
    </div>
  );
}

export default connect(a, b)(Login);
