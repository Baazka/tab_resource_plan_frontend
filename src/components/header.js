import React, { useState, useMemo, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import { UserB, Noti } from "../assets/images/zurag";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
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
  const [users, setUsers] = useState();
  const history = useHistory();
  const options = ["гарах"];
  const defaultOption = props?.userDetail?.userDetail?.array;

  function onSelect(option) {
    if (option.label === "гарах") history.push("/");
  }

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

          <Dropdown
            options={options}
            onChange={onSelect}
            placeholder={
              defaultOption !== undefined ? defaultOption[0].USER_NAME : "Admin"
            }
          />
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {};

export default connect(a, b)(Header);
