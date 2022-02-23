import React from "react";
import { useHistory } from "react-router-dom";
import { UserB, BackButton } from "../assets/images/zurag";

const Header = (props) => {
  const history = useHistory();
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  function onSelect(option) {
    if (option === "2") {
      localStorage.removeItem("userDetails");

      history.push("/");
      window.location.reload();
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
            alt=""
            src={BackButton}
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

      <div class="navbar-menu" id="nav-links" style={{ marginTop: "15px" }}>
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
Header.propTypes = {};

export default Header;
