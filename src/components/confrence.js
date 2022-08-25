import React, { useState } from "react";
import urilgaBack from "../assets/images/urilgaBack.jpg";
import jilLogo from "../assets/images/jilLogo.gif";
import Styled from "styled-components";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";

import { AiOutlineIdcard } from "react-icons/ai";
import { GiShirt } from "react-icons/gi";
const Urilga = (props) => {
  const [kod, setKod] = useState();
  const [ner, setNer] = useState({});
  const alert = useAlert();

  const ImgLogo = Styled.img`
        width: 250px;
        @media (min-width: 625px) {
            width: 350px;
        }
        @media (min-width: 400px) {
            width: 250px;
        }
        @media (min-width: 850px) {
            width: 450px;
        }
`;
  function saveToDB() {
    if (kod !== undefined && 0 < parseInt(kod) && parseInt(kod) < 1000) {
      DataRequest({
        url: "http://localhost:3002/api/v1/IS_ARRIVE_CONFRENCE/",
        method: "POST",
        data: { IS_ARRIVE: kod },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") {
            setNer(response?.data.data);
          } else {
            if (response.data.description !== undefined)
              alert.show(response.data.description);
            else alert.show("Системийн алдаа");
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("Системийн алдаа");
        });
    } else {
      alert.show("зөв R.S.V.P код оруулна уу");
    }
  }
  function downHandler(e) {
    if (e.key === "Enter") {
      saveToDB();
    }
  }
  return (
    <div
      style={{
        backgroundImage: "url(" + urilgaBack + ")",
        display: "flex",
        flexDirection: "column",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        justifyContent: "center",
        overflow: "scroll",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          border: "4px solid #e89f0f",
          borderRadius: "15px",
        }}
      >
        {ner.FIRST_NAME === undefined ? (
          <div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "2rem",
                fontStyle: "italic",
              }}
            >
              <span
                style={{
                  color: "#e89f0f",
                  fontFamily: "roboto",
                  fontSize: "2rem",
                }}
              >
                ЦАХИМ БҮРТГЭЛ
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              <img
                src={jilLogo}
                width="200px"
                style={{ marginTop: "4rem", marginBottom: "4rem" }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem",
                paddingBottom: "2rem",
                paddingTop: "2rem",
              }}
            >
              <span
                style={{
                  width: "60%",
                  color: "#919090",
                  fontWeight: "bold",
                  lineHeight: "1rem",
                  fontSize: "1.1rem",
                  fontFamily: "Roboto",
                }}
              >
                R.S.V.P код оруулна уу
              </span>
            </div>

            <div style={{ textAlign: "center" }}>
              <input
                className="urilgaInput"
                onKeyDown={downHandler}
                maxlength="3"
                type="number"
                value={kod}
                onChange={(e) => setKod(e.target.value)}
                placeholder="_ _ _"
              />
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "5rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "#e89f0f",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  padding: "0.5rem",
                  width: "60%",
                  fontFamily: "Roboto",
                  fontSize: "1.5rem",
                }}
                onClick={() => saveToDB()}
              >
                ИЛГЭЭХ
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "-webkit-center",
              paddingTop:
                window.innerHeight -
                (window.innerHeight / 2 + window.innerHeight / 3),
              width: "100%",
            }}
          >
            <p
              style={{
                color: "#e89f0f",
                fontStyle: "italic",
                fontSize: "2rem",
                fontFamily: "Aboreto",
                padding: "0.5rem",
              }}
            >
              Эрхэм хүндэт &nbsp;
              <span style={{ textDecoration: "underline", color: "black" }}>
                {" " + ner.FIRST_NAME !== null &&
                ner.FIRST_NAME !== undefined &&
                ner.FIRST_NAME !== "null"
                  ? ner.FIRST_NAME
                  : " "}
              </span>
              &nbsp; таныг
            </p>
            <p
              style={{
                color: "#3e3e5c",
                fontStyle: "italic",
                fontSize: "1.5rem",
                fontFamily: "Roboto",
                marginTop: "4rem",
                padding: "0.5rem",
              }}
            >
              Монгол Улсын Төрийн хяналтын тогтолцоо үүсэж <br />
              хөгжсөний 100 жилийн ойн <br />
              Хүндэтгэлийн хуралд хүрэлцэн <br />
              ирсэнд баярлалаа.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Urilga;
