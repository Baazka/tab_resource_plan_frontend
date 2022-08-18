import React, { useState } from "react";
import urilgaBack from "../assets/images/urilgaBack.jpg";
import jilLogo from "../assets/images/jilLogo.gif";
import Styled from "styled-components";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
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
        url: "http://hr.audit.mn/hr/api/v1/IS_ARRIVE/",
        method: "POST",
        data: { IS_ARRIVE: kod },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") {
            setNer(response?.data.data);
          } else {
            alert.show("Системийн алдаа");
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
        overflow: "hidden",
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
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          <img src={jilLogo} alt="logo" width="250px" />
        </div>
        {ner.FIRST_NAME === undefined ? (
          <div>
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
                paddingTop: "10rem",
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
          <div style={{ textAlign: "-webkit-center", paddingTop: "8rem" }}>
            <p
              style={{
                width: "60%",
                color: "#919090",
                fontWeight: "bold",
                lineHeight: "1rem",
                fontSize: "1.1rem",
                fontFamily: "Roboto",
              }}
            >
              <strong>{ner.LAST_NAME + " " + ner.FIRST_NAME + " "}</strong>танд
              баярлалаа
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Urilga;
