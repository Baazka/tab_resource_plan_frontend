import React, { useState } from "react";
import urilgaBack from "../assets/images/urilgaBack.jpg";
import jilLogo from "../assets/images/jilLogo.gif";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";

import { AiOutlineIdcard } from "react-icons/ai";
import { GiShirt } from "react-icons/gi";
import hrUrl from "../hrUrl";
const Urilga = (props) => {
  const [kod, setKod] = useState();
  const [ner, setNer] = useState({});
  const alert = useAlert();

  function saveToDB() {
    if (kod !== undefined && 0 < parseInt(kod) && parseInt(kod) < 1000) {
      DataRequest({
        url: hrUrl + "/IS_ARRIVE/",
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
                lineHeight: "1.8",
                fontSize: "1.1rem",
                fontFamily: "Roboto",
              }}
            >
              <strong>
                {/* {ner.LAST_NAME !== null &&
                ner.LAST_NAME !== undefined &&
                ner.LAST_NAME !== "null"
                  ? ner.LAST_NAME
                  : " "} */}
                {/* &nbsp; */}
                {" " + ner.FIRST_NAME !== null &&
                ner.FIRST_NAME !== undefined &&
                ner.FIRST_NAME !== "null"
                  ? ner.FIRST_NAME
                  : " "}
              </strong>
              &nbsp;танд баярлалаа
            </p>
            <div
              style={{
                color: "black",
                lineHeight: "1.8",
                fontSize: "0.9rem",
                marginTop: "8rem",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "roboto",
                padding: "0.8rem",
                width: "80%",
                backgroundColor: "rgba(145,	144	,144, 0.4)",
                borderRadius: "20px",
              }}
            >
              <div>
                <p>
                  <strong>Санамж:</strong> Шаардлагатай зүйлс
                </p>
              </div>
              <div
                style={{
                  paddingLeft: "0.8rem",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiOutlineIdcard />
                  <p style={{ marginLeft: "0.5rem" }}>Иргэний үнэмлэх</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <GiShirt />
                  <span style={{ marginLeft: "0.5rem" }}>
                    Ёслол хүндэтгэлийн хувцас
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Urilga;
