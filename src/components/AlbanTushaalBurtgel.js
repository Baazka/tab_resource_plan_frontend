import React, { useState, useEffect } from "react";
import {
  DepartmentID,
  Subdepartment,
  Compartment,
  Positionlevel,
  Positioncategorytype,
  Positioncategory,
} from "../components/library";
import Header from "../components/header";
import { DataRequest } from "../functions/DataApi";
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
  Add,
  BlueNeg,
  BlueKhoyor,
  BlueKGurav,
  BlueDuruv,
  BlueTav,
  BlueZurgaa,
  BlueDoloo,
  BlueNaim,
  BlueGurav,
  Delete,
  M,
} from "../assets/images/zurag";
import { useAlert } from "react-alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import override from "../css/override";
import { useHistory } from "react-router-dom";
const axios = require("axios");

var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function AlbanTushaalBurtgel(props) {
  const [menu, setMenu] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [POSITION_ID, setPOSITION_ID] = useState();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Header title="Бүртгэл"></Header>
      <div
        style={{
          width: "20%",
          marginLeft: "7.5rem",
          textAlign: "center",
          borderRight: "1px solid #ececec",
          height: "100hv",
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
            onClick={() => history.push("/web/AlbanTushaal", { back: true })}
          >
            {"<Буцах"}
          </button>
        </div>

        <div className="AnketList" style={{ marginTop: "3rem" }}>
          <img
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
            I.ЕРӨНХИЙ МЭДЭЭЛЭЛ
          </button>
        </div>

        <div className="AnketList">
          <img
            src={menu === 2 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            II.ТАВИГДАХ ТУСГАЙ <br /> ШААРДЛАГА
          </button>
        </div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflow: "scroll",
            }}
          >
            {menu === 1 ? (
              <YurunkhiiMedeelel
                setLoading={setLoading}
                positionId={props.match?.params?.positionid}
                setPOSITION_ID={setPOSITION_ID}
              />
            ) : null}
            {menu === 2 ? (
              <TavigdahTusgai
                setLoading={setLoading}
                POSITION_ID={POSITION_ID}
              />
            ) : null}
            {/*
            {menu === 3 ? <Uramshuulal loading={setLoading} /> : null}
            {menu === 4 ? <NuhuhMulbur loading={setLoading} /> : null}
            {menu === 5 ? <Tuslamj loading={setLoading} /> : null}
            {menu === 6 ? <Surgalt loading={setLoading} /> : null}
            {menu === 7 ? <Shiitgel loading={setLoading} /> : null}
            {menu === 8 ? <HuwiinHereg loading={setLoading} /> : null} */}
          </div>
        </div>
      </div>
    </div>
  );
}

function YurunkhiiMedeelel(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);

  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      if (props?.positionId !== "undefined" && props?.positionId != null) {
        console.log("bolohgui bn bod", props?.positionId);
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/position/" + props?.positionId
        );
        console.log(listItems, "position");
        loadData(listItems?.data);
        props.setPOSITION_ID(props?.positionId);
      } else if (data === "undefined" || data === null) {
        console.log("boljil bn bod");
        loadData({
          COMPARTMENT_ID: "null",
          COMPARTMENT_NAME: "",
          COMPARTMENT_SHORT_NAME: "",
          CONFIRMED_COUNT: 1,
          DEPARTMENT_ID: 1,
          DEPARTMENT_NAME: "",
          DEPARTMENT_SHORT_NAME: "",
          POSITION_CATEGORY_ID: 1,
          POSITION_CATEGORY_NAME: "",
          POSITION_CATEGORY_TYPE_ID: 1,
          POSITION_CATEGORY_TYPE_NAME: "",
          POSITION_ID: 0,
          POSITION_LEVEL_ID: 1,
          POSITION_LEVEL_NAME: "",
          POSITION_NAME: "",
          SUB_DEPARTMENT_ID: "null",
          SUB_DEPARTMENT_NAME: "",
          SUB_DEPARTMENT_SHORT_NAME: "",
          IS_ACTIVE: 1,
          CREATED_BY: userDetils?.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          PERSON_ID: 0,
        });
      }
    }
    fetchData();
  }, [props]);
  // useEffect(() => {
  //   if (props?.positionId !== "undefined" && props?.positionId != null) {
  //   }
  // }, [data]);

  function saveToDB() {
    if (requiredField(data) === true) {
      props.setLoading(true);
      if (props?.positionId !== "undefined" && props?.positionId != null) {
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/position/",
          method: "PUT",
          data: data,
        })
          .then(function (response) {
            console.log(response.data);
            //history.push('/sample')
            if (response?.data.message === "success") {
              alert.show("амжилттай хадгаллаа");

              props.setPOSITION_ID(data.POSITION_ID);
              setEdit(!edit);
              props.setLoading(false);
            } else {
              props.setLoading(false);
              setEdit(!edit);
              alert.show("амжилтгүй");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            props.setLoading(false);
            alert.show("амжилтгүй");
          });
      } else {
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/position/",
          method: "POST",
          data: data,
        })
          .then(function (response) {
            console.log(response.data);
            //history.push('/sample')
            if (response?.data.message === "success") {
              alert.show("амжилттай хадгаллаа");
              console.log("success position", response?.data.POSITION_ID);
              props.setPOSITION_ID(response?.data.POSITION_ID);
              setEdit(!edit);
              props.setLoading(false);
            } else {
              props.setLoading(false);
              setEdit(!edit);
              alert.show("амжилтгүй");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            props.setLoading(false);
            alert.show("амжилтгүй");
          });
      }
    }
  }

  function requiredField() {
    if (data.POSITION_NAME === null || data.POSITION_NAME === "") {
      alert.show("Албан тушаалын нэр оруулан уу");
      return false;
    } else {
      return true;
    }
  }
  let listItems;
  if (data !== undefined && data !== null) {
    listItems = (
      <div>
        <div
          className="box"
          style={{
            marginTop: "80px",
            width: "98%",
            height: "auto",
            marginLeft: "15px",
            paddingBottom: "2.5rem",
          }}
        >
          <div className="columns">
            <div className="column is-11">
              <span style={{ fontWeight: "bold" }}>Үндсэн мэдээлэл</span>
            </div>
            <div className="column is-1">
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            </div>
            <div className="column is-1"></div>
          </div>
          <div className="columns">
            <div className="column is-3  has-text-right">
              <span style={{ color: "red" }}>*</span>Байгууллагын нэр
            </div>
            <div className="column is-2">
              <DepartmentID
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
            <div className="column is-3 has-text-right">
              <span style={{ color: "red" }}>*</span>Албан тушаалын ангилал
            </div>
            <div className="column is-4 ">
              <Positioncategorytype
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
              {/* <input
                style={{ border: "2px solid silver", width: "15rem" }}
                value={data[data?.length - 1].SUB_DEPARTMENT_NAME}
              ></input> */}
            </div>
          </div>
          <div className="columns">
            <div className="column is-3  has-text-right">
              <span style={{ color: "red" }}>*</span>Газар нэгжийн нэр
            </div>
            <div className="column is-2">
              <Subdepartment
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
            <div className="column is-3 has-text-right">
              <span style={{ color: "red" }}>*</span>Албан тушаалын зэрэглэл
            </div>
            <div className="column is-4 ">
              <Positioncategory
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-3  has-text-right">
              <span style={{ color: "red" }}>*</span>Албан хэлтэсийн нэр
            </div>
            <div className="column is-2">
              <Compartment
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
            <div className="column is-3  has-text-right">
              <span style={{ color: "red" }}>*</span>Батлагдсан орон тоо
            </div>
            <div className="column is-4 ">
              <input
                disabled={edit}
                type="number"
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.CONFIRMED_COUNT}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      CONFIRMED_COUNT: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-3  has-text-right">
              <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин
            </div>
            <div className="column is-2">
              <Positionlevel
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
            <div className="column is-3 has-text-right">
              {/* <span style={{ color: "red" }}>*</span>Албан тушаалын тодорхойлолт */}
            </div>
            <div className="column is-4 ">
              {/* <input
                disabled={edit}
                type="number"
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.CONFIRMED_COUNT}
                onChange={(text) => {
                  let value = data;
                  value.CONFIRMED_COUNT = text.target.value;
                  value.UPDATED_BY = userDetils?.USER_ID;
                  value.UPDATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
                  loadData(value);
                }}
              /> */}
            </div>
          </div>

          <div className="columns">
            <div
              className="column is-3  has-text-right"
              style={{ marginBottom: "0px" }}
            >
              <span style={{ color: "red" }}>*</span>Албан тушаалын нэр
            </div>
            <div className="column is-2">
              <input
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.POSITION_NAME}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      POSITION_NAME: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
            {/* <div className="column is-3 has-text-right">
              Тушаал бүртгэсэн ажилтан
            </div>
            <div className="column is-4 ">
              <input
                style={{
                  border: "2px solid silver",
                  width: "15rem",
                }}
                value={""}
              ></input>
            </div> */}
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
                <button className="buttonTsenkher" onClick={saveToDB}>
                  Хадгалах
                </button>
              </div>
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
function TavigdahTusgai(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  console.log("POSITION_ID", props?.POSITION_ID);
  const alert = useAlert();

  useEffect(() => {
    async function fetchData() {
      console.log("POSITION_ID", props?.POSITION_ID);
      if (props?.POSITION_ID !== "undefined" && props?.POSITION_ID != null) {
        let listItems = await axios(
          "http://hr.audit.mn/hr/api/v1/requirement/" + props?.POSITION_ID
        );
        console.log(listItems?.data, "requirement");
        loadData(listItems?.data);
      }
    }
    fetchData();
  }, [props]);
  useEffect(() => {
    if (data?.REQUIREMENT_ID === undefined) {
      console.log(data?.REQUIREMENT_ID, "orsooon");
      loadData({
        REQUIREMENT_ID: 0,
        REQUIREMENT_EDUCATION: "",
        REQUIREMENT_PROFESSION: "",
        REQUIREMENT_QUALIFICATION: "",
        REQUIREMENT_EXPERIENCE: "",
        REQUIREMENT_SKILL: "",
        POSITION_ID: props?.POSITION_ID,
        IS_ACTIVE: 1,
        CREATED_BY: userDetils?.USER_ID,
        CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
        PERSON_ID: 0,
      });
    }
  }, [data]);

  function saveToDB() {
    if (requiredField(data) === true) {
      props.setLoading(true);
      console.log("postRequirment1", data);
      if (data?.REQUIREMENT_ID !== 0 && data?.REQUIREMENT_ID !== undefined) {
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/requirement/",
          method: "PUT",
          data: data,
        })
          .then(function (response) {
            console.log(response.data);
            //history.push('/sample')
            if (response?.data.message === "success") {
              alert.show("амжилттай хадгаллаа");

              setEdit(!edit);
              props.setLoading(false);
            } else {
              props.setLoading(false);
              setEdit(!edit);
              alert.show("амжилтгүй");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            props.setLoading(false);
            alert.show("амжилтгүй");
          });
      } else {
        console.log("postRequirment", data);
        DataRequest({
          url: "http://hr.audit.mn/hr/api/v1/requirement/",
          method: "post",
          data: data,
        })
          .then(function (response) {
            console.log(response.data);
            //history.push('/sample')
            if (response?.data.message === "success") {
              alert.show("амжилттай хадгаллаа");
              console.log("success position", response?.data.POSITION_ID);

              setEdit(!edit);
              props.setLoading(false);
            } else {
              props.setLoading(false);
              setEdit(!edit);
              alert.show("амжилтгүй");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            props.setLoading(false);
            alert.show("амжилтгүй");
          });
      }
    }
  }

  function requiredField() {
    if (
      data.REQUIREMENT_EDUCATION === null ||
      data.REQUIREMENT_EDUCATION === ""
    ) {
      alert.show("Боловсрол оруулан уу");
      return false;
    } else {
      return true;
    }
  }
  let listItems;
  if (data !== undefined && data !== null) {
    listItems = (
      <div>
        <div
          className="box"
          style={{
            marginTop: "80px",
            width: "98%",
            height: "auto",
            marginLeft: "15px",
            paddingBottom: "2.5rem",
          }}
        >
          <div className="columns">
            <div className="column is-11">
              <span style={{ fontWeight: "bold" }}>Ерөнхий шаардлага</span>
            </div>
            <div className="column is-1">
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            </div>
            <div className="column is-1"></div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">
              Гүйцэтгэлийн шалгуур үзүүлэлт
            </div>
            <div className="column is-3">
              <input
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.REQUIREMENT_QUALIFICATION}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      REQUIREMENT_QUALIFICATION: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">Боловсрол</div>
            <div className="column is-3">
              <input
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.REQUIREMENT_EDUCATION}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      REQUIREMENT_EDUCATION: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">Мэргэжил</div>
            <div className="column is-3">
              <input
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.REQUIREMENT_PROFESSION}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      REQUIREMENT_PROFESSION: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">Туршлага</div>
            <div className="column is-3">
              <textarea
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.REQUIREMENT_EXPERIENCE}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      REQUIREMENT_EXPERIENCE: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">Ур чадвар</div>
            <div className="column is-3">
              <textarea
                disabled={edit}
                className="Borderless"
                placeholder="утгаа оруулна уу"
                value={data?.REQUIREMENT_SKILL}
                onChange={(text) => {
                  loadData({
                    ...data,
                    ...{
                      REQUIREMENT_SKILL: text.target.value,
                      UPDATED_BY: userDetils?.USER_ID,
                      UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
                    },
                  });
                }}
              />
            </div>
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
                <button className="buttonTsenkher" onClick={saveToDB}>
                  Хадгалах
                </button>
              </div>
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

export default AlbanTushaalBurtgel;
