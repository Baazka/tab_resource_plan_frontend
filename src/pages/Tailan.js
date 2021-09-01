import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter, Add } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

var rowNumber = 1;
createTheme("solarized", {
  text: {
    primary: "gray",
    secondary: "black",
  },
  background: {
    default: "white",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "white",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "4px",
      fontWeight: "bold",
      fontSize: "15px",
      borderColor: "white",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
      webkitBoxShadow: "0px 0px 3px 1px rgb(255 0 0)",
      borderColor: "grey",
      borderBottom: "0.5px solid",
    },
  },
};

const Home = (props) => {
  const history = useHistory();
  const { turul } = useParams();
  const [Button1, setButtons1] = useState(true);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="Судалгаа" />
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            borderColor: "gray",
            borderBottom: "1px solid",
            width: "100%",
            marginBottom: "10px",
          }}
        ></div>

        <div>
          <div
            onClick={() => setButtons1(!Button1)}
            class="button is-11"
            style={{
              display: "block",
              width: "100%",
              border: "none",
              backgroundColor: "silver",

              fontSize: "16px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Төрийн албан хаагчийн анкетийн А
          </div>
          {Button1 ? (
            <div className="columns">
              <div className="column is-12">
                <div
                  onClick={() => {
                    history.push("/web/Tailan/AnketA/emergency");
                  }}
                  className="button"
                  style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "white",
                    textAlign: "left",
                    border: "hidden",
                  }}
                >
                  Зайлшгүй шаардлагатай үед холбоо барих хүн
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/gerBvl");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-23px",
              }}
            >
              Гэр бүлийн байдал
            </div>
          </div>
        ) : null}

        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/sadan");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Садан төрлийн байдал
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/ShalgaltiinTalaarkhMedeelel");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/TangaragiinBvrtgel");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Тангаргийн бүртгэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/GadaadHelniiMedleg");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Гадаад хэлний мэдлэг
            </div>
          </div>
        ) : null}

        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/Bolowsrol");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Боловсрол
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/BolowsrolDoktor");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Боловсрол-доктор
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/MergeshliinBeltgel");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Мэргэшлийн бэлтгэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/ErdmiinTsol");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Эрдмийн цол
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/TsergiinAlba");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Цэргийн алба
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/ShagnaliinTalaarhMedeelel");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Шагналын талаарх мэдээлэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/TurshlagiinTalaarhMedeelel");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Туршлагын талаарх мэдээлэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA/BvteeliinJagsaalt");
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                textAlign: "left",
                border: "hidden",
                marginTop: "-10px",
              }}
            >
              Бүтээлийн жагсаалт
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
