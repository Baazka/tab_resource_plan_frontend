import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100px",
        minHeight: "60px",
        backgroundColor: "#f1f1f1",
        width: "100%",
        borderTopLeftRadius: "8% 55%",
      }}
    >
      <div style={{ position: "absolute", top: "25%", right: "30%" }}>
        <p>@Үндэсний аудитын газрын мэдээллийн технологийн төв. 2021 он</p>
      </div>
    </div>
  );
};
Header.propTypes = {};

export default Header;
