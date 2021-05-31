import React, { useState, useMemo, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import { UserB, Noti } from "../assets/images/zurag";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { DataRequest } from "../functions/DataApi";
import { Context } from "../functions/Store";

const Header = (props) => {
  const [users, setUsers] = useState();
  const history = useHistory();
  const options = ["гарах"];
  const defaultOption = options[0];

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    test();
    console.log("user", users);
  }, [props]);

  async function test() {
    let jagsaalts = await DataRequest({
      url: "http://10.10.10.46:8000/api/v1/profile/1",
      method: "GET",
      data: {},
    });
    setUsers(jagsaalts?.data);
  }
  function onSelect(option) {
    if (option.label === "гарах") history.push("/");
  }

  function logOut() {
    history.push("/");
  }
  return (
    <div
      style={{
        position: "absolute",
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
              users !== undefined ? users.array[0].USER_NAME : "Admin"
            }
          />
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {};

export default Header;
