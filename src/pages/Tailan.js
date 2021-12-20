import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { createTheme } from "react-data-table-component";
import { useHistory } from "react-router-dom";
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

const Home = (props) => {
  const history = useHistory();
  const [Button1, setButtons1] = useState(true);
  const [Button2, setButtons2] = useState(true);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
        overflow: "scroll",
      }}
    >
      <Header title="Судалгаа" />
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: " auto",
          marginBottom: "3%",
        }}
      >
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
        <div>
          <div
            onClick={() => setButtons2(!Button2)}
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
            {" "}
            Захиргаа удирдлагын газар судалгаа
            {Button2 ? (
              <div
                className="button"
                onClick={() => {
                  history.push("/web/shalgalt/shalgalt1/");
                }}
                style={{
                  display: "block",
                  width: "100%",
                  backgroundColor: "white",
                  textAlign: "left",
                  border: "hidden",
                  marginTop: "1%",
                  textAlignLast: " left",
                }}
              >
                Албан хаагчдын шалгалтын судалгаа
              </div>
            ) : null}
            {Button2 ? (
              <div>
                <div
                  onClick={() => {
                    history.push("/web/Bolowsrol1/bolowsrol/");
                  }}
                  className="button"
                  style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: "0%",
                    textAlignLast: "left",
                    border: "hidden",
                  }}
                >
                  Албан хаагчдын боловсролын судалгаа
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* <Nvvr /> */}
      <Footer />
    </div>
  );
};

export default Home;
