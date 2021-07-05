import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { UserB, Noti } from "../assets/images/zurag";

import { DataRequest } from "../functions/DataApi";
import { connect } from "react-redux";

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

const Header = (props) => {
  // const [, forceRender] = useReducer((s) => s + 1, 0);
  const [users, setUsers] = useState();
  const history = useHistory();
  const options = ["гарах"];
  const defaultOption = props?.userDetail?.userDetail?.array;
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  function onSelect(option) {
    console.log(option, "option");
    if (option === "2") history.push("/");
  }
  useEffect(() => {
    console.log(props?.userDetail?.userDetail, "header");
    console.log("myInitObject", userDetils);
  }, [props]);

  function logOut() {
    history.push("/");
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        width: "100vw",
        minHeight: "70px",
        backgroundColor: "#f1f1f1",
        width: "100%",
        display: "flex",
        zIndex: "1",
      }}
    >
      <div style={{ marginLeft: "7%", marginTop: "20px" }}>
        <span
          style={{
            color: "#418ee6",
            fontSize: 25,
            fontFamily: "RalewayRegular",
          }}
        >
          {props.title}
        </span>
      </div>

      <div class="navbar-menu" id="nav-links" style={{ marginTop: "15px" }}>
        <div class="navbar-end">
          <div>
            <img src={UserB} width="45" height="45" />
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
Header.propTypes = {};

export default connect(a, b)(Header);
