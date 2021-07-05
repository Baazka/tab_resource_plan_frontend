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
  const [jagsaalt, setJagsaalt] = useState();
  const [Button1, setButtons1] = useState(1);
  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://10.10.10.46:3002/api/v1/employees",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      console.log(jagsaalts);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="ТАЙЛАН" />
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
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            АНКЕТ А
          </div>
          {Button1 ? (
            <div className="columns">
              <div className="column is-12">
                <div
                  onClick={() => {
                    history.push("/web/Tailan/AnketA", {
                      TailanNer: "ТАЙЛАН",
                      turul: "emergency",
                    });
                  }}
                  className="button"
                  style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "whitesmoke",
                    textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "gerBvl",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "sadan",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "ShalgaltiinTalaarkhMedeelel",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "TangaragiinBvrtgel",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
              }}
            >
              Тангарагын бүртгэл
            </div>
          </div>
        ) : null}
        {Button1 ? (
          <div>
            <div
              onClick={() => {
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "GadaadHelniiMedleg",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "Bolowsrol",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "BolowsrolDoktor",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "MergeshliinBeltgel",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "ErdmiinTsol",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "Цэргийн алба",
                  turul: "TsergiinAlba",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "ShagnaliinTalaarhMedeelel",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "ТАЙЛАН",
                  turul: "TurshlagiinTalaarhMedeelel",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
                history.push("/web/Tailan/AnketA", {
                  TailanNer: "Бүтээлийн жагсаалт",
                  turul: "BvteeliinJagsaalt",
                });
              }}
              className="button"
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "whitesmoke",
                textAlign: "left",
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
