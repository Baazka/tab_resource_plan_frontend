import React, { useState, useEffect, useReducer, useRef } from "react";
import { UrChadvar, TangaragBurtgel, GadaadKhel } from "./urchadvar";
import { DataRequest } from "../functions/DataApi";
import Bolowsrol from "../components/anketABolovsrol";
import { Mergeshliin, ZeregTsol } from "./anketAmergejil";
import TsergiinAlba from "./anketAtserge";
import Shagnaliin from "./anketAshagnal";
import Turshlgin from "./anketAturshlaga";
import Buteeliin from "./anketAbuteeliin";
import FormData from "form-data";
import {
  AvatarB,
  Face,
  Trush,
  Warning,
  BlackNeg,
  BlackKhoyor,
  BlackGurav,
  BlackDuruv,
  BlackTav,
  BlackZurgaa,
  BlackDoloo,
  BlackNaim,
  BlueNeg,
  BlueKhoyor,
  BlueDuruv,
  BlueTav,
  BlueZurgaa,
  BlueDoloo,
  BlueNaim,
  BlueGurav,
  Add,
  Delete,
} from "../assets/images/zurag";
import {
  National,
  Subnational,
  Dynasty,
  Office,
  Suboffice,
  FamilyArray,
} from "./library";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import override from "../css/override";
import AvatarEditor from "react-avatar-editor";
import hrUrl from "../hrUrl";

var dateFormat = require("dateformat");

const axios = require("axios");

function AnketNeg(props) {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [data, loadData] = useState();
  const [menu, setMenu] = useState(1);
  const [edit, setEdit] = useState(true);
  const refContainer = useRef(null);
  const history = useHistory();
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState({});
  const [avatarImg, setAvatarImg] = useState();
  const avatarRef = useRef(null);
  const [editTypes, setEditTypes] = useState({
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: undefined,
    width: 200,
    height: 200,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: undefined,
  });

  function handleScale(e) {
    const scale = parseFloat(e.target.value);
    setEditTypes({ ...editTypes, scale });
  }

  function rotateLeft(e) {
    e.preventDefault();

    setEditTypes({
      ...editTypes,
      ...{ rotate: (editTypes.rotate - 90) % 360 },
    });
  }

  function rotateRight(e) {
    e.preventDefault();

    setEditTypes({
      ...editTypes,
      ...{ rotate: (editTypes.rotate + 90) % 360 },
    });
  }

  function saveAvatar(file) {
    if (avatar.FILE_PATH !== undefined && avatar.FILE_PATH !== null) {
      alert.show("аватар зургаа устгана уу");
    } else if (
      localStorage.getItem("personDetail")?.includes("person_id") &&
      JSON.parse(localStorage.getItem("personDetail")).person_id !== "0"
    ) {
      setAvatarImg(file.target.files[0]);
    } else {
      alert.show("Ерөнхий мэдээлэл бөгөлнө үү");
    }
  }

  function DeleteAvatar() {
    DataRequest({
      url: hrUrl + "/" + "avatar",
      method: "POST",
      data: avatar,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (response) {
      if (response?.data?.message === "success") {
        alert.show("амжилттай устлаа");
        setAvatar({});
        fetchData();
      } else {
        alert.show("Системийн алдаа");
      }
      //history.push('/sample')
    });
  }

  function requiredField(param) {
    let returnValue = false;
    if (
      param?.PERSON_LASTNAME === undefined ||
      (param?.PERSON_LASTNAME === "" && param?.PERSON_LASTNAME === null)
    ) {
      alert.show("овог нэрээ оруулна уу");
    } else if (
      (param?.PERSON_FIRSTNAME === undefined,
      param?.PERSON_FIRSTNAME === "" || param?.PERSON_FIRSTNAME === null)
    ) {
      alert.show("нэрээ оруулна уу");
    } else if (
      param?.PERSON_REGISTER_NO === undefined ||
      param?.PERSON_REGISTER_NO === "" ||
      param?.PERSON_REGISTER_NO === null
    ) {
      alert.show("регистерийн дугаар оруулна уу");
      return false;
    } else if (
      param?.PERSON_BORNDATE === undefined ||
      param?.PERSON_BORNDATE === "" ||
      param?.PERSON_BORNDATE === null
    ) {
      alert.show("төрсөн он сар өдөрөө оруулна уу");
    } else if (
      param?.BIRTH_PLACE === undefined ||
      param?.BIRTH_PLACE === "" ||
      param?.BIRTH_PLACE === null
    ) {
      alert.show("төрсөн газарын мэдээлэл оруулна уу");
    } else if (
      param?.BIRTH_PLACE === undefined ||
      param?.BIRTH_PLACE === "" ||
      param?.BIRTH_PLACE === null
    ) {
      alert.show("төрсөн газарын мэдээлэл оруулна уу");
    } else {
      returnValue = true;
    }
    return returnValue;
  }
  async function fetchData() {
    if (localStorage.getItem("personDetail")?.includes("person_id")) {
      if (JSON.parse(localStorage.getItem("personDetail")).person_id === "0") {
        loadData({
          PERSON_REGISTER_NO: "",
          PERSON_LASTNAME: "",
          PERSON_FIRSTNAME: "",
          PERSON_BORNDATE: dateFormat(new Date(), "yyyy-mm-dd"),
          PERSON_GENDER: 1,
          PERSON_PHONE: "",
          PERSON_NATIONAL_ID: 1,
          PERSON_EMAIL: "",
          NATIONAL_ID: 1,
          DYNASTY_ID: 1,
          BIRTH_OFFICE_ID: 1,
          BIRTH_SUBOFFICE_ID: 1,
          SURNAME: "",
          BIRTH_PLACE: "",
          IS_MARRIED: 0,
          IS_ACTIVE: 1,
          CREATED_BY: userDetils?.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          PERSON_ID: 0,
        });
        setLoading(false);
      } else {
        if (
          JSON.parse(localStorage.getItem("personDetail")).type === "employ"
        ) {
          let listItems = await axios(
            hrUrl +
              "/person/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          if (listItems.data !== undefined && listItems.data.length > 0)
            loadData(listItems.data[0]);
          setLoading(false);
          let avatarImg = await axios(
            hrUrl +
              "/avatar/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          if (avatarImg.data !== undefined && avatarImg.data.length > 0)
            setAvatar(avatarImg.data[avatarImg.data.length - 1]);
        } else if (
          JSON.parse(localStorage.getItem("personDetail")).type === "newPerson"
        ) {
          let listItems = await axios(
            hrUrl +
              "/person/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          if (listItems.data !== undefined && listItems.data.length > 0)
            loadData(listItems?.data);
          setLoading(false);
        }
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [props]);

  function khadgalakhYo() {
    if (requiredField(data) === true) {
      setLoading(true);
      if (localStorage.getItem("personDetail")?.includes("person_id")) {
        if (
          JSON.parse(localStorage.getItem("personDetail")).person_id === "0"
        ) {
          DataRequest({
            url: hrUrl + "/person/",
            method: "post",
            data: { person: data },
          })
            .then(function (response) {
              console.log(response.data);
              //history.push('/sample')
              if (response?.data.message === "success") {
                loadData({
                  ...data,
                  PERSON_ID: response?.data?.person_id,
                });

                localStorage.removeItem("personDetail");
                localStorage.setItem(
                  "personDetail",
                  JSON.stringify({
                    person_id: response?.data?.person_id,
                    type: "newPerson",
                  })
                );
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                setLoading(false);
                forceRender();
              } else {
                setLoading(false);
                alert.show("амжилтгүй");
              }
            })
            .catch(function (error) {
              //alert(error.response.data.error.message);
              console.log(error.response);
            });
        } else {
          DataRequest({
            url: hrUrl + "/updatePerson/",
            method: "post",
            data: { person: data },
          })
            .then(function (response) {
              console.log("UpdateResponse", response);
              //history.push('/sample')
              if (response?.data?.message === "success") {
                alert.show("амжилттай хадгаллаа");
                setEdit(!edit);
                setLoading(false);
              }
            })
            .catch(function (error) {
              //alert(error.response.data.error.message);
              console.log(error.response);
            });
        }
      }
    }
  }
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function onInputClick(event) {
    event.target.value = "";
  }
  let listItems;
  if (data !== undefined && data !== null) {
    listItems = (
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        {/* <Header title="АНКЕТ А"></Header> */}

        <div
          style={{
            position: "absolute",
            left: "9%",
            width: "50%",
            zIndex: 1,
            top: "20px",
          }}
        >
          <span
            style={{
              color: "#418ee6",
              fontSize: 25,
              fontFamily: "RalewayRegular",
            }}
          >
            АНКЕТ А
          </span>
        </div>
        <div
          style={{
            width: "20%",
            marginLeft: "7.5rem",
            textAlign: "center",
            borderRight: "1px solid #ececec",
            height: "100hv",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              padding: 0,
              marginTop: "4.5rem",
              textAlign: "left",
              pointerEvents: "initial",
            }}
          >
            <button
              className="button is-small"
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: "0px",
                color: "#2980b9",
                borderRadius: "0px",
                pointerEvents: "initial",
                textDecoration: "underline",
              }}
              onClick={() =>
                history.push("/web/workerlist/" + props.match.params.search)
              }
            >
              {"<  Буцах"}
            </button>
          </div>
          {avatarImg !== undefined ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                alignItems: "center",
              }}
            >
              <AvatarEditor
                ref={avatarRef}
                image={avatarImg}
                width={100}
                height={125}
                border={20}
                scale={editTypes.scale}
                rotate={editTypes.rotate}
              />
              <div style={{ padding: "3px" }}>
                <input
                  id="typeinp"
                  type="range"
                  min={editTypes.allowZoomOut ? "0.1" : "1"}
                  max="2"
                  step="0.01"
                  defaultValue="1"
                  value={editTypes.scale}
                  onChange={handleScale}
                />
              </div>
              <div style={{ padding: "4px" }}>
                <button onClick={rotateLeft}>Зүүн</button>
                <button onClick={rotateRight}>Баруун</button>
              </div>

              <button
                onClick={() => {
                  if (avatarRef) {
                    // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
                    // drawn on another canvas, or added to the DOM.
                    // const canvas = avatarRef.current.getImage();

                    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
                    const canvasScaled = avatarRef.current
                      .getImageScaledToCanvas()
                      .toDataURL();

                    const formData = new FormData();
                    formData.append(
                      "data",
                      JSON.stringify({
                        type: "avatar",
                        person_id: JSON.parse(
                          localStorage.getItem("personDetail")
                        ).person_id,
                        CREATED_BY: userDetils.USER_ID,
                      })
                    );
                    formData.append(
                      "files",
                      dataURLtoFile(canvasScaled, avatarImg.originalname)
                    );
                    DataRequest({
                      url: hrUrl + "/" + "fileUpload",
                      method: "POST",
                      data: formData,
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }).then(function (response) {
                      if (response?.data?.message === "success") {
                        alert.show("амжилттай хадгаллаа");
                        setAvatar(response?.data);
                        setAvatarImg();
                      } else {
                        alert.show("Системийн алдаа");
                      }
                      //history.push('/sample')
                    });

                    console.log("canvasScaled", canvasScaled);
                  }
                }}
              >
                Хадгалах
              </button>

              {/* <input
                name="scale"
                type="range"
                onChange={handleScale}
                value={editTypes.scale}
                min={editTypes.allowZoomOut ? "0.1" : "1"}
                max="2"
                // step="0.01"
                // defaultValue="1"
              /> */}
            </div>
          ) : (
            <>
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={
                    avatar.FILE_PATH !== undefined && avatar.FILE_PATH !== null
                      ? hrUrl.replace("api/v1", "") +
                        "static" +
                        avatar?.FILE_PATH.replace("uploads", "")
                      : AvatarB
                  }
                  width="120px"
                  height="120px"
                  alt="avatar"
                />
              </div>
              <div
                className="container"
                style={{
                  justifyContent: "center",
                  marginTop: "-0.4rem",
                }}
              >
                <div style={{ visibility: "hidden" }}>
                  <input
                    ref={refContainer}
                    class="file-input"
                    accept="image/*"
                    type="file"
                    onClick={onInputClick}
                    onChange={(file) => saveAvatar(file)}
                  />
                </div>
                <img
                  alt=""
                  src={Face}
                  width="40px"
                  height="40px"
                  style={{ cursor: "pointer" }}
                  onClick={() => refContainer.current.click()}
                />

                <img
                  style={{ cursor: "pointer" }}
                  alt="trush"
                  src={Trush}
                  width="40px"
                  height="40px"
                  onClick={() => DeleteAvatar()}
                />
                <img
                  alt=""
                  src={Warning}
                  style={{ cursor: "pointer" }}
                  width="40px"
                  height="40px"
                  onClick={() => alert.show("test")}
                />
              </div>
            </>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            <span
              style={{
                color: "#5d5d5d",
                fontFamily: "RalewaySemiBold",
                fontSize: "1rem",
              }}
            >
              {data?.PERSON_LASTNAME}
            </span>
            <span
              style={{
                color: "#418ee6",
                fontFamily: "RalewaySemiBold",
                fontSize: "1rem",
              }}
            >
              &nbsp; {data?.PERSON_FIRSTNAME}
            </span>
          </div>
          <div className="AnketList" style={{ marginTop: "1.5rem" }}>
            <img
              alt=""
              src={menu === 1 ? BlueNeg : BlackNeg}
              width="45px"
              height="45px"
            />
            <button
              className="button"
              style={{
                color: `${menu === 1 ? "#418ee6" : "#5d5d5d"}`,
                border: "none",
                width: "17rem",
                fontFamily: "RalewayRegular",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                marginTop: "3px",
                fontSize: "1rem",
              }}
              onClick={() => setMenu(1)}
            >
              I-II. ХУВЬ ХҮНИЙ <br />
              ТАЛААРХ МЭДЭЭЛЭЛ
            </button>
          </div>
          {localStorage.getItem("personDetail")?.includes("person_id") ? (
            JSON.parse(localStorage.getItem("personDetail")).person_id ===
            "0" ? null : (
              <div>
                <div className="AnketList">
                  <img
                    src={menu === 2 ? BlueKhoyor : BlackKhoyor}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 2 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(2)}
                  >
                    II. УР ЧАДВАРЫН <br />
                    ТАЛААРХ МЭДЭЭЛЭЛ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    alt=""
                    src={menu === 3 ? BlueGurav : BlackGurav}
                    width="45px"
                    height="45px"
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 3 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(3)}
                  >
                    III. БОЛОВСРОЛЫН <br />
                    ТАЛААРХ МЭДЭЭЛЭЛ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    src={menu === 4 ? BlueDuruv : BlackDuruv}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 4 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(4)}
                  >
                    IV. МЭРГЭШЛИЙН <br />
                    ТАЛААРХ МЭДЭЭЛЭЛ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    src={menu === 5 ? BlueTav : BlackTav}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 5 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(5)}
                  >
                    V. ЦЭРГИЙН АЛБА <br /> ХААСАН ЭСЭХ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    src={menu === 6 ? BlueZurgaa : BlackZurgaa}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 6 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(6)}
                  >
                    VI. ШАГНАЛЫН <br />
                    ТАЛААРХ МЭДЭЭЛЭЛ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    src={menu === 7 ? BlueDoloo : BlackDoloo}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 7 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(7)}
                  >
                    VII. ТУРШЛАГЫН <br />
                    ТАЛААРХ МЭДЭЭЛЭЛ
                  </button>
                </div>
                <div className="AnketList">
                  <img
                    src={menu === 8 ? BlueNaim : BlackNaim}
                    width="45px"
                    height="45px"
                    alt=""
                  />
                  <button
                    className="button"
                    style={{
                      color: `${menu === 8 ? "#418ee6" : "#5d5d5d"}`,
                      border: "none",
                      width: "17rem",
                      fontFamily: "RalewayRegular",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      marginTop: "3px",
                      fontSize: "1rem",
                    }}
                    onClick={() => setMenu(8)}
                  >
                    VIII. БҮТЭЭЛИЙН <br /> ЖАГСААЛТ
                  </button>
                </div>
              </div>
            )
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            boxSizing: "border-box",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              top: "45%",
              zIndex: "1",
            }}
          >
            <ScaleLoader
              loading={loading}
              size={30}
              css={override}
              color={"#2980b9"}
            />
          </div>
          <div
            style={{
              filter: `${loading === true ? "blur(8px)" : "blur(0px)"}`,
              webkitFilter: `${loading === true ? "blur(8px)" : "blur(0px)"}`,
            }}
          >
            {menu === 1 ? (
              <div>
                <Yrunkhii
                  data={data}
                  loadData={loadData}
                  khadgalakhYo={khadgalakhYo}
                  forceUpdate={forceRender}
                  edit={edit}
                  setEdit={setEdit}
                />
                {localStorage.getItem("personDetail")?.includes("person_id") ? (
                  JSON.parse(localStorage.getItem("personDetail")).person_id ===
                  "0" ? null : (
                    <div>
                      <Kayag person_id={data?.PERSON_ID} loading={setLoading} />
                      <HolbooBarikhHun
                        person={data}
                        loading={setLoading}
                        person_id={data?.PERSON_ID}
                      />

                      <GerBul
                        person={data}
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                    </div>
                  )
                ) : null}
              </div>
            ) : null}
            {localStorage.getItem("personDetail")?.includes("person_id") ? (
              JSON.parse(localStorage.getItem("personDetail")).person_id ===
              "0" ? null : (
                <div>
                  {menu === 2 ? (
                    <div>
                      <UrChadvar
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                      <TangaragBurtgel
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                      <GadaadKhel
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                    </div>
                  ) : null}
                  {menu === 3 ? (
                    <Bolowsrol
                      person_id={data?.PERSON_ID}
                      loading={setLoading}
                    />
                  ) : null}
                  {menu === 4 ? (
                    <div>
                      <Mergeshliin
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                      <ZeregTsol
                        person_id={data?.PERSON_ID}
                        loading={setLoading}
                      />
                    </div>
                  ) : null}
                  {menu === 5 ? (
                    <TsergiinAlba
                      person_id={data?.PERSON_ID}
                      loading={setLoading}
                    />
                  ) : null}
                  {menu === 6 ? (
                    <Shagnaliin
                      person_id={data?.PERSON_ID}
                      loading={setLoading}
                    />
                  ) : null}
                  {menu === 7 ? (
                    <Turshlgin
                      person_id={data?.PERSON_ID}
                      loading={setLoading}
                    />
                  ) : null}
                  {menu === 8 ? (
                    <Buteeliin
                      person_id={data?.PERSON_ID}
                      loading={setLoading}
                    />
                  ) : null}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Yrunkhii(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [register, setRegister] = useState(0);
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;

  async function personNoCheck(registerT) {
    console.log(registerT, "registerTT");
    let listItems = await axios({
      method: "POST",
      url: hrUrl + "/personNoCheck",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: { PERSON_REGISTER_NO: registerT },
    });
    console.log(listItems?.data?.CNT, "register");
    setRegister(listItems?.data?.CNT);
  }
  return (
    <div
      className=" box"
      style={{
        marginTop: "80px",
        width: "98%",
        height: "auto",
        marginLeft: "10px",
        zIndex: "-1",
      }}
    >
      <div className="columns">
        <div className="column is-11 is-narrow-tablet">
          <span className="headerTextBold">Ерөнхий мэдээлэл</span>
        </div>
        <div className="column is-1 is-narrow-tablet">
          {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
            <button
              className="buttonTsenkher"
              onClick={() => props.setEdit(!props.edit)}
            >
              Засварлах
            </button>
          )}
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Эцэг эхийн нэр</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <input
            placeholder="утгаа оруулна уу"
            disabled={props.edit}
            className="anketInput"
            value={props.data?.PERSON_LASTNAME}
            required={true}
            onChange={(text) =>
              props.loadData({
                ...props.data,
                ...{ PERSON_LASTNAME: text.target.value },
              })
            }
          />
        </div>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Хүйс</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <select
            disabled={props.edit}
            className="anketInput"
            value={props.data?.PERSON_GENDER}
            onChange={(text) =>
              props.loadData({
                ...props.data,
                ...{ PERSON_GENDER: text.target.value },
              })
            }
          >
            <option value={1}>Эрэгтэй</option>
            <option value={2}>Эмэгтэй</option>
          </select>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3  has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Өөрийн нэр</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <input
            placeholder="утгаа оруулна уу"
            disabled={props.edit}
            className="anketInput"
            value={props.data?.PERSON_FIRSTNAME}
            onChange={(text) =>
              props.loadData({
                ...props.data,
                ...{ PERSON_FIRSTNAME: text.target.value },
              })
            }
          />
        </div>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн он,сар,өдөр</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <input
            type="date"
            disabled={props.edit}
            className="anketInput"
            value={dateFormat(props.data?.PERSON_BORNDATE, "yyyy-mm-dd")}
            onChange={(e) => {
              props.loadData({
                ...props.data,
                ...{
                  PERSON_BORNDATE: e.target.value,
                },
              });
            }}
          ></input>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Регистерийн дугаар</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <input
            placeholder="утгаа оруулна уу"
            disabled={props.edit}
            className="anketInput"
            pattern="[а-я|А-Я|ө|Ө|ү|Ү]{2}[0-9]{8}"
            style={{
              borderBottom:
                register > 0 || register === false ? "1px solid red" : "none",
            }}
            value={props.data?.PERSON_REGISTER_NO}
            onChange={async (text) => {
              props.loadData({
                ...props.data,
                ...{ PERSON_REGISTER_NO: text.target.value },
              });
              if (text.target.value.length === 10) {
                if (
                  cyrillicPattern.test(text.target.value.slice(0, 2)) &&
                  /\d/.test(text.target.value.slice(2, 10))
                ) {
                  await personNoCheck(text.target.value);
                  console.log(text.target.value, "registerT");
                } else setRegister(false);
              } else {
                setRegister(false);
              }
            }}
          />
          {register > 0 ? (
            <span
              style={{ color: "red", fontSize: "0.6rem", marginLeft: "4px" }}
            >
              Бүртгэгдсэн байна!!!
            </span>
          ) : null}
          {register === false ? (
            <span
              style={{ color: "red", fontSize: "0.6rem", marginLeft: "4px" }}
            >
              формат буруу байна
            </span>
          ) : null}
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн аймаг,хот</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <Office
            personChild={props.data}
            setPersonChild={props.loadData}
            forceUpdate={props.forceUpdate}
            edit={props.edit}
          />
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Иргэншил</span>
        </div>
        <div className="column is-3">
          <National
            personChild={props.data}
            setPersonChild={props.loadData}
            edit={props.edit}
          />
        </div>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн сум,дүүрэг</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <Suboffice
            personChild={props.data}
            setPersonChild={props.loadData}
            forceUpdate={props.forceUpdate}
            edit={props.edit}
          />
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ургийн овог</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <Subnational
            personChild={props.data}
            setPersonChild={props.loadData}
            edit={props.edit}
          />
        </div>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн газар</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <input
            disabled={props.edit}
            placeholder="утгаа оруулна уу"
            className="anketInput"
            value={props.data?.BIRTH_PLACE}
            onChange={(text) =>
              props.loadData({
                ...props.data,
                ...{ BIRTH_PLACE: text.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Үндэс угсаа</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <Dynasty
            personChild={props.data}
            setPersonChild={props.loadData}
            edit={props.edit}
          />
        </div>
        <div className="column is-3 has-text-right is-narrow-tablet">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Гэрлэсэн эсэх</span>
        </div>
        <div className="column is-3 is-narrow-tablet">
          <select
            disabled={props.edit}
            className="anketInput"
            name="cars"
            id="cars"
            value={props.data?.IS_MARRIED}
            onChange={(text) =>
              props.loadData({
                ...props.data,
                ...{ IS_MARRIED: text.target.value },
              })
            }
          >
            <option value={1}>Тийм</option>
            <option value={0}>Үгүй</option>
          </select>
        </div>
      </div>

      <div className="columns">
        <div className="column is-11 is-narrow-tablet"></div>

        {!props.edit ? (
          <div className="column is-1 is-narrow-tablet">
            {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}

            {register > 0 || register === false ? (
              <button
                style={{
                  fontFamily: "RalewayRegular",
                  border: "#418ee6",
                  borderRadius: "5px",
                  padding: "8px",
                  color: "white",
                }}
              >
                Хадгалах
              </button>
            ) : (
              <button className="buttonTsenkher" onClick={props.khadgalakhYo}>
                Хадгалах
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Kayag(props) {
  const [person, setPerson] = useState();
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("personDetail")?.includes("person_id")) {
        if (
          JSON.parse(localStorage.getItem("personDetail")).type === "employ"
        ) {
          let listItems = await axios(
            hrUrl +
              "/person/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          if (listItems.data !== undefined && listItems.data.length > 0)
            setPerson(listItems?.data[0]);
        } else if (
          JSON.parse(localStorage.getItem("personDetail")).type === "newPerson"
        ) {
          let listItems = await axios(
            hrUrl +
              "/person/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          if (listItems.data !== undefined && listItems.data.length > 0)
            setPerson(listItems?.data[0]);
        }
      }
    }
    fetchData();
  }, [props]);
  function setOfficeID(value) {
    setPerson({
      ...person,
      ...{ CARD_OFFICE_ID: value?.OFFICE_ID },
    });
  }
  function setSubOfficeID(value) {
    setPerson({
      ...person,
      ...{ CARD_SUB_OFFICE_ID: value?.SUB_OFFICE_ID },
    });
  }
  function setOfficeIDHome(value) {
    setPerson({
      ...person,
      ...{ HOME_OFFICE_ID: value?.OFFICE_ID },
    });
  }
  function setSubOfficeIDHome(value) {
    setPerson({
      ...person,
      ...{ HOME_SUB_OFFICE_ID: value?.SUB_OFFICE_ID },
    });
  }
  function requiredField() {
    let returnValue = false;
    if (person.PERSON_PHONE === null || person.PERSON_PHONE === "") {
      alert.show("утасны дугаараа оруулан уу");
    } else if (person.PERSON_EMAIL === null || person.PERSON_EMAIL === "") {
      alert.show("имэйлээ оруулан уу");
    } else {
      returnValue = true;
    }
    return returnValue;
  }
  function khadgalakhYo() {
    props.loading(true);
    if (requiredField() === true) {
      console.log("test", {
        ...person,
        ...{
          PERSON_ID: JSON.parse(localStorage.getItem("personDetail")).person_id,
        },
      });
      DataRequest({
        url: hrUrl + "/updatePersonAddress/",
        method: "post",
        data: {
          person: {
            ...person,
            ...{
              PERSON_ID: JSON.parse(localStorage.getItem("personDetail"))
                .person_id,
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай хадгаллаа");
            setEdit(!edit);
            props.loading(false);
          } else {
            props.loading(false);
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          props.loading(false);
          setEdit(!edit);
        });
    } else {
      props.loading(false);
    }
  }
  return (
    <div
      className=" box"
      style={{
        width: "98%",
        height: "auto",
        marginLeft: "10px",
      }}
    >
      <div className="columns">
        <div className="column is-11">
          <span className="headerTextBold">Хаягийн мэдээлэл</span>
        </div>
        <div className="column is-1">
          {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
            <button
              className="buttonTsenkher"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Засварлах
            </button>
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column is-12">
          <table className="table is-bordered p-3">
            <thead>
              <tr>
                <td>
                  <span className="textSaaral">№</span>
                </td>
                <td style={{ width: "300px" }}>
                  <span className="textSaaral">Оршин суугаа хаягийн төрөл</span>
                </td>
                <td style={{ width: "250px" }}>
                  <span className="textSaaral">Оршин суугаа аймаг,хот</span>
                </td>
                <td>
                  <span className="textSaaral">Оршин суугаа сум ,дүүрэг</span>
                </td>
                <td style={{ width: "360px" }}>
                  <span className="textSaaral">Дэлгэрэнгүй хаяг</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <span className="textSaaral">1</span>
                </th>
                <td>
                  <span className="textSaaral">Иргэний үнэмлэхний хаяг</span>
                </td>
                <td>
                  <Office
                    personChild={{ OFFICE_ID: person?.CARD_OFFICE_ID }}
                    setPersonChild={setOfficeID}
                    fullWidth={true}
                    edit={edit}
                  />
                </td>
                <td>
                  <Suboffice
                    personChild={{
                      SUB_OFFICE_ID: person?.CARD_SUB_OFFICE_ID,
                      OFFICE_ID: person?.CARD_OFFICE_ID,
                    }}
                    setPersonChild={setSubOfficeID}
                    fullWidth={true}
                    edit={edit}
                  />
                </td>
                <td>
                  <input
                    disabled={edit}
                    placeholder="утгаа оруулна уу"
                    className="anketInputTable"
                    value={person?.PERSON_CARD_ADDRESS}
                    onChange={(text) =>
                      setPerson({
                        ...person,
                        ...{ PERSON_CARD_ADDRESS: text.target.value },
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span className="textSaaral">2</span>
                </th>
                <td>
                  <span className="textSaaral">Оршин суугаа хаяг</span>
                </td>
                <td>
                  <span className="textSaaral">
                    {" "}
                    <Office
                      personChild={{ OFFICE_ID: person?.HOME_OFFICE_ID }}
                      setPersonChild={setOfficeIDHome}
                      fullWidth={true}
                      edit={edit}
                    />
                  </span>
                </td>
                <td>
                  <Suboffice
                    personChild={{
                      SUB_OFFICE_ID: person?.HOME_SUB_OFFICE_ID,
                      OFFICE_ID: person?.HOME_OFFICE_ID,
                    }}
                    setPersonChild={setSubOfficeIDHome}
                    fullWidth={true}
                    edit={edit}
                  />
                </td>
                <td>
                  <input
                    className="anketInputTable"
                    placeholder="утгаа оруулна уу"
                    disabled={edit}
                    value={person?.PERSON_HOME_ADDRESS}
                    onChange={(text) =>
                      setPerson({
                        ...person,
                        ...{ PERSON_HOME_ADDRESS: text.target.value },
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="columns">
            <em className="utas m-3">Утасны дугаар:</em>
            <input
              className="anketInput"
              disabled={edit}
              value={person?.PERSON_PHONE}
              placeholder="Утас1"
              onChange={(text) =>
                setPerson({
                  ...person,
                  ...{ PERSON_PHONE: text.target.value },
                })
              }
            />
            <input
              className="anketInput"
              disabled={edit}
              value={person?.PERSON_PHONE2}
              placeholder="Утас2"
              onChange={(text) =>
                setPerson({
                  ...person,
                  ...{ PERSON_PHONE2: text.target.value },
                })
              }
            />
            <em className="mail ml-1 m-3">И-мэйл хаяг:</em>
            <input
              className="anketInput"
              disabled={edit}
              value={person?.PERSON_EMAIL}
              placeholder="И-мэйл хаяг1"
              onChange={(text) =>
                setPerson({
                  ...person,
                  ...{ PERSON_EMAIL: text.target.value },
                })
              }
            />
            <input
              className="anketInput"
              disabled={edit}
              style={{ marginLeft: "10px" }}
              value={person?.PERSON_EMAIL2}
              placeholder="И-мэйл хаяг2"
              onChange={(text) =>
                setPerson({
                  ...person,
                  ...{ PERSON_EMAIL2: text.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-11"></div>

        {!edit ? (
          <div className="column is-1">
            {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
            <button className="buttonTsenkher" onClick={khadgalakhYo}>
              Хадгалах
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HolbooBarikhHun(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [emergency, setEmergency] = useState();
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(hrUrl + "/emergency/" + props.person_id);
      //console.log("emergency", listItems?.data?.Emergency);
      setEmergency(listItems?.data?.Emergency);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (emergency === undefined || emergency?.length === 0) {
      setEmergency([
        {
          MEMBER_ID: 1,
          FAMILY_NAME: "",
          PERSON_ID: props.person_id,
          EMERGENCY_LASTNAME: "",
          EMERGENCY_FIRSTNAME: "",
          EMERGENCY_PHONE: "",
          IS_ACTIVE: "1",
          CREATED_BY: userDetils?.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          ROWTYPE: "NEW",
        },
      ]);
    }
  }, [emergency]);

  function addRowKholbooBarikh() {
    let value = emergency;
    value.push({
      MEMBER_ID: 1,
      FAMILY_NAME: "",
      PERSON_ID: props.person_id,
      EMERGENCY_LASTNAME: "",
      EMERGENCY_FIRSTNAME: "",
      EMERGENCY_PHONE: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    setEmergency(value);

    forceRender();
  }
  function removeEmergency(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: hrUrl + "/emergencyDelete",
        method: "POST",
        data: {
          emergency: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          alert.show("aldaa");
        });
    }
    setEmergency(emergency.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
    forceRender();
  }
  function requiredField() {
    // emergency.forEach((a, index) => {
    for (let i = 0; i < emergency.length; i++) {
      if (
        emergency[i].EMERGENCY_LASTNAME === null ||
        emergency[i].EMERGENCY_LASTNAME === ""
      ) {
        alert.show("Овогоо оруулан уу");
        return false;
      } else if (
        emergency[i].EMERGENCY_FIRSTNAME === null ||
        emergency[i].EMERGENCY_FIRSTNAME === ""
      ) {
        alert.show("нэрээ оруулан уу");
        return false;
      } else if (
        emergency[i].EMERGENCY_PHONE === null ||
        emergency[i].EMERGENCY_PHONE === ""
      ) {
        alert.show("утасны дугаар оруулан уу");
        return false;
      } else if (i === emergency.length - 1) {
        return true;
      }
    }
  }

  async function khadgalakhYo() {
    props.loading(true);

    if (requiredField() === true) {
      let newRow = emergency.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = emergency.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        DataRequest({
          url: hrUrl + "/emergency/",
          method: "POST",
          data: { emergency: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: hrUrl + "/emergency/",
          method: "PUT",
          data: { emergency: oldRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") message = 2;
            //history.push('/sample')
            if (message !== 1) {
              alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }

  let listItems;
  if (emergency !== undefined && emergency.length !== 0) {
    listItems = (
      <div
        className=" box"
        style={{
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span className="headerTextBold">
              зайлшгүй шаардлагатай үед холбоо барих хүний мэдээлэл
            </span>
          </div>
          <div className="column is-1">
            {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
              <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
                Засварлах
              </button>
            )}
          </div>
        </div>

        <div className="columns">
          <div className="column is-10 ">
            <table className="table is-bordered textSaaral">
              <thead>
                <tr>
                  <td>
                    <span className="textSaaral">№</span>
                  </td>
                  <td>
                    <span className="textSaaral">Таны юу болох</span>
                  </td>
                  <td>
                    <span className="textSaaral">Овог</span>
                  </td>
                  <td>
                    <span className="textSaaral">Нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Утасны дугаар</span>
                  </td>
                  {!edit ? (
                    <td
                      style={{ paddingLeft: "0px", borderColor: "transparent" }}
                    >
                      <img
                        src={Add}
                        width="30px"
                        height="30px"
                        onClick={() => addRowKholbooBarikh()}
                        alt=""
                      />
                      <input
                        style={{ width: "40px", visibility: "hidden" }}
                      ></input>
                    </td>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {emergency?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <FamilyArray
                        personChild={value}
                        setPersonChild={setEmergency}
                        emergencyArray={emergency}
                        indexChild={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
                        value={value.EMERGENCY_LASTNAME}
                        onChange={(e) => {
                          emergency[index].EMERGENCY_LASTNAME = e.target.value;
                          emergency[index].UPDATED_BY = userDetils?.USER_ID;
                          emergency[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setEmergency(emergency);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
                        value={value.EMERGENCY_FIRSTNAME}
                        onChange={(e) => {
                          emergency[index].EMERGENCY_FIRSTNAME = e.target.value;
                          emergency[index].UPDATED_BY = userDetils?.USER_ID;
                          emergency[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setEmergency(emergency);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
                        value={value.EMERGENCY_PHONE}
                        onChange={(e) => {
                          emergency[index].EMERGENCY_PHONE = e.target.value;
                          emergency[index].UPDATED_BY = userDetils?.USER_ID;
                          emergency[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setEmergency(emergency);
                          forceRender();
                        }}
                      />
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeEmergency(index, value)}
                          alt=""
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="column is-2 has-text-left"></div>
        </div>
        <div className="columns">
          <div className="column is-11"></div>

          {!edit ? (
            <div className="column is-1 ">
              {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
              <button className="buttonTsenkher" onClick={khadgalakhYo}>
                Хадгалах
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function GerBul(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [data, loadData] = useState([]);
  const alert = useAlert();
  const [family, setFamily] = useState([]);
  const [family2, setFamily2] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(hrUrl + "/family/" + props.person_id);
      console.log("listItems.data.Family?", listItems.data.Family);
      // listItems.data.Family?.map((value, index) => {
      //   listItems.data.Family[index].MEMBER_BIRTHDATE = new Date(
      //     value.MEMBER_BIRTHDATE
      //   ).getFullYear();
      // });
      loadData(listItems?.data.Family);
    }
    fetchData();
  }, [props]);

  function requiredField(value) {
    for (let i = 0; i < value.length; i++) {
      if (
        value[i].MEMBER_LASTNAME === null ||
        value[i].MEMBER_LASTNAME === ""
      ) {
        alert.show("Овогоо оруулан уу");
        return false;
      } else if (
        value[i].MEMBER_FIRSTNAME === null ||
        value[i].MEMBER_FIRSTNAME === ""
      ) {
        alert.show("Нэр оруулан уу");
        return false;
      } else if (value[i].MEMBER_ORG === null || value[i].MEMBER_ORG === "") {
        alert.show("Байгууллагын нэр оруулан уу");
        return false;
      } else if (
        value[i].MEMBER_POSITION === null ||
        value[i].MEMBER_POSITION === ""
      ) {
        alert.show("Албан тушаал оруулан уу");
        return false;
      } else if (
        value[i].MEMBER_BIRTHDATE === null ||
        value[i].MEMBER_BIRTHDATE === ""
      ) {
        alert.show("огноо оруулан уу");
        return false;
      }
      // if (
      //   value[i].MEMBER_BIRTHDATE !== null &&
      //   value[i].MEMBER_BIRTHDATE !== ""
      // ) {
      //   value[i].MEMBER_BIRTHDATE = value[i].MEMBER_BIRTHDATE + "-01-01";
      // }
      if (i === value.length - 1) {
        return true;
      }
    }
  }
  useEffect(() => {
    setFamily(
      data.length === 0
        ? [
            {
              PERSON_ID: props.person_id,
              FAMILY_ID: 1,
              FAMILY_NAME: "",
              MEMBER_TYPE: 1,
              MEMBER_ID: 1,
              MEMBER_LASTNAME: "",
              MEMBER_FIRSTNAME: "",
              MEMBER_BIRTHDATE: "",
              OFFICE_ID: "1",
              SUB_OFFICE_ID: "1",
              MEMBER_ORG: "",
              MEMBER_POSITION: "",
              IS_ACTIVE: "1",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
            },
          ]
        : data.filter((a) => a.MEMBER_TYPE === 1)
    );
    setFamily2(
      data?.length === 0
        ? [
            {
              PERSON_ID: props.person_id,
              FAMILY_NAME: "",
              MEMBER_ID: 1,
              MEMBER_TYPE: 2,
              MEMBER_LASTNAME: "",
              MEMBER_FIRSTNAME: "",
              MEMBER_BIRTHDATE: "",
              OFFICE_ID: "1",
              SUB_OFFICE_ID: "1",
              MEMBER_ORG: "",
              MEMBER_POSITION: "",
              IS_ACTIVE: "1",
              CREATED_BY: userDetils?.USER_ID,
              CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
              ROWTYPE: "NEW",
            },
          ]
        : data.filter((a) => a.MEMBER_TYPE === 2)
    );
  }, [data]);

  console.log("propsGerbul", props);
  async function addRowFamily() {
    let value = family;
    value.push({
      PERSON_ID: props.person_id,
      FAMILY_NAME: "",
      MEMBER_TYPE: 1,
      MEMBER_ID: 1,
      MEMBER_LASTNAME: "",
      MEMBER_FIRSTNAME: "",
      MEMBER_BIRTHDATE: "",
      OFFICE_ID: "1",
      SUB_OFFICE_ID: "1",
      MEMBER_ORG: "",
      MEMBER_POSITION: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await setFamily(value);

    forceRender();
  }
  async function addRowFamily2() {
    let value = family2;
    value.push({
      PERSON_ID: props.person_id,
      FAMILY_NAME: "",
      MEMBER_TYPE: 2,
      MEMBER_ID: 1,
      MEMBER_LASTNAME: "",
      MEMBER_FIRSTNAME: "",
      MEMBER_BIRTHDATE: "",
      OFFICE_ID: "1",
      SUB_OFFICE_ID: "1",
      MEMBER_ORG: "",
      MEMBER_POSITION: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await setFamily2(value);

    forceRender();
  }
  function removeFamily(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: hrUrl + "/familyDelete",
        method: "POST",
        data: {
          family: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    setFamily(family.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
    forceRender();
  }
  function removeFamily2(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: hrUrl + "/familyDelete",
        method: "POST",
        data: {
          family: {
            ...value,
            ...{
              IS_ACTIVE: 1,
              UPDATED_BY: userDetils?.USER_ID,
              UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            },
          },
        },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success") {
            alert.show("амжилттай устлаа");
            setEdit(!edit);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    setFamily2(family2.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
    forceRender();
  }
  function khadgalakhYo() {
    console.log("family2", family2);
    let combine = family.concat(family2);
    props.loading(true);
    if (requiredField(combine) === true) {
      console.log("combine", combine);
      let newRow = combine.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = combine.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        DataRequest({
          url: hrUrl + "/family/",
          method: "POST",
          data: { family: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("updateGerBul.", JSON.stringify(oldRow));
        DataRequest({
          url: hrUrl + "/family/",
          method: "PUT",
          data: { family: oldRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setEdit(!edit);
              props.loading(false);
            } else {
              alert.show("Системийн алдаа");
              setEdit(!edit);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("Системийн алдаа");
            setEdit(!edit);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function setOffice(value) {
    console.log("officeID", value);
    family[value.index].OFFICE_ID = value.OFFICE_ID;
    family[value.index].UPDATED_BY = userDetils?.USER_ID;
    family[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    setFamily(family);
    forceRender();
  }
  function setSubOffice(value) {
    console.log("officeID", value);
    family[value.index].SUB_OFFICE_ID = value.SUB_OFFICE_ID;
    family[value.index].UPDATED_BY = userDetils?.USER_ID;
    family[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    setFamily(family);
    forceRender();
  }

  function setOffice2(value) {
    console.log("family2", value);
    family2[value.index].OFFICE_ID = value.OFFICE_ID;
    family2[value.index].UPDATED_BY = userDetils?.USER_ID;
    family2[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    setFamily2(family2);
    forceRender();
  }
  function setSubOffice2(value) {
    family2[value.index].SUB_OFFICE_ID = value.SUB_OFFICE_ID;
    family2[value.index].UPDATED_BY = userDetils?.USER_ID;
    family2[value.index].UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
    setFamily2(family2);
    forceRender();
  }

  return (
    <div
      className=" box"
      style={{
        width: "98%",
        height: "auto",
        marginLeft: "10px",
      }}
    >
      <div className="columns">
        <div className="column is-11 ">
          <span className="headerTextBold">
            Гэр бүлийн байдал (зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг
            бичнэ)
          </span>
        </div>
        <div className="column is-1">
          {userDetils?.USER_TYPE_NAME.includes("DIRECTOR") ? null : (
            <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
              Засварлах
            </button>
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column is-12">
          <div className="table-container">
            <table className="table is-bordered ">
              <tbody>
                <tr>
                  <td rowspan="2">
                    <span className="textSaaral">№</span>
                  </td>
                  <td rowspan="2">
                    <span style={{ color: "red" }}>*</span>
                    <span className="textSaaral">Таны юу болох</span>
                  </td>
                  <td rowspan="2">
                    {" "}
                    <span style={{ color: "red" }}>*</span>
                    <span className="textSaaral">
                      Гэр бүлийн гишүүний эцэг,эхийн нэр
                    </span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Гэр бүлийн гишүүний нэр</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн он</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн аймаг, хот</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн сум, дүүрэг</span>
                  </td>
                  <td colspan="2">
                    <span className="textSaaral">Одоо эрхэлж буй ажил</span>
                  </td>
                  {!edit ? (
                    <td rowspan="2" style={{ border: "none", paddingLeft: 0 }}>
                      <div style={{ width: "35px", height: "35px" }}>
                        <img
                          src={Add}
                          width="`15px"
                          height="15px"
                          onClick={() => addRowFamily()}
                          alt=""
                        />
                      </div>
                    </td>
                  ) : null}
                </tr>
                <tr>
                  <td>
                    <span className="textSaaral">Байгууллагын нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Албан тушаал</span>
                  </td>
                </tr>

                {family?.map((value, index) => (
                  <tr>
                    <td>
                      {" "}
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td style={{ width: "80px" }}>
                      {" "}
                      <FamilyArray
                        personChild={value}
                        setPersonChild={setFamily}
                        emergencyArray={family}
                        indexChild={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_LASTNAME}
                        onChange={(e) => {
                          family[index].MEMBER_LASTNAME = e.target.value;
                          family[index].UPDATED_BY = userDetils?.USER_ID;
                          family[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily(family);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_FIRSTNAME}
                        onChange={(e) => {
                          family[index].MEMBER_FIRSTNAME = e.target.value;
                          family[index].UPDATED_BY = userDetils?.USER_ID;
                          family[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily(family);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        pattern="[0-9]{4}"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_BIRTHDATE}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            console.log("testInput", e.target.value);
                            if (parseInt(e.target.value) <= parseInt(2100)) {
                              family[index].MEMBER_BIRTHDATE = e.target.value;
                              family[index].UPDATED_BY = userDetils?.USER_ID;
                              family[index].UPDATED_DATE = dateFormat(
                                new Date(),
                                "dd-mmm-yy"
                              );
                              setFamily(family);
                              forceRender();
                            }
                          } else {
                            family[index].MEMBER_BIRTHDATE = e.target.value;
                            family[index].UPDATED_BY = userDetils?.USER_ID;
                            family[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            setFamily(family);
                            forceRender();
                          }
                        }}
                      />
                    </td>
                    <td>
                      <Office
                        personChild={value}
                        setPersonChild={setOffice}
                        index={index}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <Suboffice
                        personChild={value}
                        setPersonChild={setSubOffice}
                        index={index}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_ORG}
                        onChange={(e) => {
                          family[index].MEMBER_ORG = e.target.value;
                          family[index].UPDATED_BY = userDetils?.USER_ID;
                          family[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily(family);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_POSITION}
                        onChange={(e) => {
                          family[index].MEMBER_POSITION = e.target.value;
                          family[index].UPDATED_BY = userDetils?.USER_ID;
                          family[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily(family);
                          forceRender();
                        }}
                      />
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                        }}
                      >
                        <img
                          src={Delete}
                          width="30px"
                          height="30px"
                          onClick={() => removeFamily(index, value)}
                          alt=""
                        />
                        <input
                          style={{ width: "30px", visibility: "hidden" }}
                        ></input>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 ">
          <span className="headerTextBold">
            Садан төрлийн байдал (таны, эцэг, эх төрөн ах, эгч дүү, өрх
            тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг
            орлуулна)
          </span>
        </div>
      </div>

      <div className="columns">
        <div className="column is-12 ">
          <div className="table-container" style={{ scrollbarWidth: "5px" }}>
            <table className="table is-bordered is-flex-wrap-wrap">
              <tbody>
                <tr>
                  <td rowspan="2">
                    <span className="textSaaral">№</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Таны юу болох</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">
                      Садан төрлийн хүний эцэг, эхийн нэр
                    </span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Садан төрлийн хүний нэр</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн он, сар, өдөр</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн аймаг, хот</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн сум, дүүрэг</span>
                  </td>
                  <td colspan="2">
                    <span className="textSaaral">Одоо эрхэлж буй ажил</span>
                  </td>
                  {!edit ? (
                    <td
                      rowspan="2"
                      style={{
                        border: "none",
                        paddingLeft: "0px",
                      }}
                    >
                      <div style={{ width: "35px", height: "35px" }}>
                        <img
                          src={Add}
                          width="`30px"
                          height="30px"
                          onClick={() => addRowFamily2()}
                          alt=""
                        />
                      </div>
                    </td>
                  ) : null}
                </tr>
                <tr>
                  <td>
                    <span className="textSaaral">Байгууллагын нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Албан тушаал</span>
                  </td>
                </tr>

                {family2?.map((value, index) => (
                  <tr>
                    <td>
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      <FamilyArray
                        personChild={value}
                        setPersonChild={setFamily2}
                        emergencyArray={family2}
                        indexChild={index}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_LASTNAME}
                        onChange={(e) => {
                          family2[index].MEMBER_LASTNAME = e.target.value;
                          family2[index].UPDATED_BY = userDetils?.USER_ID;
                          family2[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily2(family2);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        style={{ width: "110px" }}
                        value={value.MEMBER_FIRSTNAME}
                        onChange={(e) => {
                          family2[index].MEMBER_FIRSTNAME = e.target.value;
                          family2[index].UPDATED_BY = userDetils?.USER_ID;
                          family2[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily2(family2);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        pattern="[0-9]{4}"
                        style={{ width: "120px" }}
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_BIRTHDATE}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            if (parseInt(e.target.value) <= parseInt(2100)) {
                              family2[index].MEMBER_BIRTHDATE = e.target.value;
                              family2[index].UPDATED_BY = userDetils?.USER_ID;
                              family2[index].UPDATED_DATE = dateFormat(
                                new Date(),
                                "dd-mmm-yy"
                              );
                              setFamily2(family2);
                              forceRender();
                            }
                          } else {
                            family2[index].MEMBER_BIRTHDATE = e.target.value;
                            family2[index].UPDATED_BY = userDetils?.USER_ID;
                            family2[index].UPDATED_DATE = dateFormat(
                              new Date(),
                              "dd-mmm-yy"
                            );
                            setFamily2(family2);
                            forceRender();
                          }
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <Office
                        personChild={value}
                        setPersonChild={setOffice2}
                        index={index}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Suboffice
                        personChild={value}
                        setPersonChild={setSubOffice2}
                        index={index}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        value={value.MEMBER_ORG}
                        onChange={(e) => {
                          family2[index].MEMBER_ORG = e.target.value;
                          family2[index].UPDATED_BY = userDetils?.USER_ID;
                          family2[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily2(family2);
                          forceRender();
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInputWidth"
                        style={{ width: "110px" }}
                        value={value.MEMBER_POSITION}
                        onChange={(e) => {
                          family2[index].MEMBER_POSITION = e.target.value;
                          family2[index].UPDATED_BY = userDetils?.USER_ID;
                          family2[index].UPDATED_DATE = dateFormat(
                            new Date(),
                            "dd-mmm-yy"
                          );
                          setFamily2(family2);
                          forceRender();
                        }}
                      />
                    </td>
                    {!edit ? (
                      <td
                        style={{
                          paddingLeft: "0px",
                          borderColor: "transparent",
                        }}
                      >
                        <img
                          src={Delete}
                          width="40px"
                          height="40px"
                          onClick={() => removeFamily2(index, value)}
                          alt=""
                        />
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-11"></div>

        {!edit ? (
          <div className="column is-1">
            {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
            <button className="buttonTsenkher" onClick={khadgalakhYo}>
              Хадгалах
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AnketNeg;
