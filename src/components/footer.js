import React from "react";

const Header = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100vw",
        minHeight: "60px",
        backgroundColor: "#f1f1f1",
        borderTopLeftRadius: "8% 55%",
      }}
    >
      <div style={{ position: "absolute", top: "25%", right: "30%" }}>
        <p>© 2021 Үндэсний аудитын газрын Мэдээллийн технологийн төв</p>
      </div>
    </div>
  );
};
Header.propTypes = {};

export default Header;
