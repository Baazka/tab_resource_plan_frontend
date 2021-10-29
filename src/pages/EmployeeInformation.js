import React, { useState, useEffect } from "react";
import {
  DepartmentID,
  Subdepartment,
  Compartment,
  Positionlevel,
  Positioncategorytype,
  Positioncategory,
  Positionorder,
  Edutype,
  Profession,
} from "../components/library";
import Header from "../components/header";
import {
  BlackNeg,
  BlackKhoyor,
  BlueNeg,
  BlueKhoyor,
} from "../assets/images/zurag";
import { useAlert } from "react-alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import override from "../css/override";
import { useHistory } from "react-router-dom";
const axios = require("axios");

var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function EmployeeInformation(props) {
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
      <Header title="Албан хаагчийн  мэдээлэл"></Header>
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
        ></div>

        <div className="AnketList" style={{ marginTop: "3rem" }}>
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
            Албан хаагчийн үндсэн <br /> мэдээлэл
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
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
            Албан тушаалын <br /> тодорхойлолт
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 3 ? BlueKhoyor : BlackKhoyor}
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
            Гүйцэтгэлийн
            <br /> төлөвлөгөө
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 4 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            Үндсэн хөрөнгө <br />
            эзэмшигчийн карт
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 5 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            Цалингийн карт
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 6 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            Зардлын гүйцэтгэл
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 7 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            Шаардах хуудас
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 8 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
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
            Албан томилолтын <br /> хуудас
          </button>
        </div>

        <div className="AnketList">
          <img
            alt=""
            src={menu === 9 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
          />
          <button
            className="button"
            style={{
              color: `${menu === 9 ? "#418ee6" : "#5d5d5d"}`,
              border: "none",
              width: "17rem",
              fontFamily: "RalewayRegular",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              marginTop: "3px",
              fontSize: "1rem",
            }}
            onClick={() => setMenu(9)}
          >
            Ажлын тайлан, үүрэг
            <br /> даалгавар
          </button>
        </div>
        <div className="AnketList">
          <img
            alt=""
            src={menu === 10 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
          />
          <button
            className="button"
            style={{
              color: `${menu === 10 ? "#418ee6" : "#5d5d5d"}`,
              border: "none",
              width: "17rem",
              fontFamily: "RalewayRegular",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              marginTop: "3px",
              fontSize: "1rem",
            }}
            onClick={() => setMenu(10)}
          >
            Албан бичиг
          </button>
        </div>
        <div className="AnketList">
          <img
            alt=""
            src={menu === 11 ? BlueKhoyor : BlackKhoyor}
            width="45px"
            height="45px"
          />
          <button
            className="button"
            style={{
              color: `${menu === 11 ? "#418ee6" : "#5d5d5d"}`,
              border: "none",
              width: "17rem",
              fontFamily: "RalewayRegular",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              marginTop: "3px",
              fontSize: "1rem",
            }}
            onClick={() => setMenu(11)}
          >
            Албан хаагчийн хүсэлт, <br /> өргөдөл
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
                search={props.match?.params?.search}
                setPOSITION_ID={setPOSITION_ID}
              />
            ) : null}
            {menu === 2 ? (
              <TavigdahTusgai
                setLoading={setLoading}
                POSITION_ID={POSITION_ID}
              />
            ) : null}
            {menu === 3 ? (
              <GuitsetgeliinTuluvluguu
                setLoading={setLoading}
                POSITION_ID={POSITION_ID}
              />
            ) : null}
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
      if (data == null || data == undefined)
        if (props?.positionId !== "undefined" && props?.positionId != null) {
          console.log("bolohgui bn bod", props?.positionId);
          let listItems;
          console.log("searchsearch", props);
          if (
            props.search != undefined &&
            JSON.parse(props.search)?.buttonValue === 2
          )
            listItems = await axios(
              "http://hr.audit.mn/hr/api/v1/position/0/" + props?.positionId
            );
          else
            listItems = await axios(
              "http://hr.audit.mn/hr/api/v1/position/1/" + props?.positionId
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
            POSITION_ORDER_ID: 1,
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
              <span style={{ fontWeight: "bold" }}>
                Албан хаагчийн үндсэн мэдээлэл
              </span>
            </div>
            {/* <div className="column is-1">
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            </div> */}
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
              <Positionorder
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
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
              <span style={{ color: "red" }}>*</span>Албан тушаалын төрөл
            </div>
            <div className="column is-4 ">
              <Positioncategorytype
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
              <span style={{ color: "red" }}>*</span>Албан тушаалын түвшин
            </div>
            <div className="column is-2">
              <Positionlevel
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
          </div>
          <div className="columns">
            <div className="column is-11"></div>

            {!edit ? (
              <div className="column is-1 ">
                <button className="buttonTsenkher">Хадгалах</button>
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
        EDUCATION_TYPE_ID: 1,
        PROFESSION_ID: 1,
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
              <span style={{ fontWeight: "bold" }}>
                Албан тушаалын тодорхойлолт
              </span>
            </div>
            {/* <div className="column is-1">
              <button
                className="buttonTsenkher"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Засварлах
              </button>
            </div> */}
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
              {/* <input
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
              /> */}
              <Edutype
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-5  has-text-right">Мэргэжил</div>
            <div className="column is-3">
              <Profession
                personChild={data}
                setPersonChild={loadData}
                edit={edit}
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
                <button className="buttonTsenkher">Хадгалах</button>
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
function GuitsetgeliinTuluvluguu(props) {
  const [data, loadData] = useState(null);
  const [edit, setEdit] = useState(true);
  console.log("POSITION_ID", props?.POSITION_ID);
  const alert = useAlert();
  const [NuutsiinBvrtgel, setNuutsiinBvrtgel] = useState({
    tsonkh: false,
    type: 0,
  });

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
        EDUCATION_TYPE_ID: 1,
        PROFESSION_ID: 1,
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
              <span style={{ fontWeight: "bold" }}>
                Гүйцэтгэлийн төлөвлөгөө
              </span>
            </div>
            <div className="column is-1">
              <button
                className="buttonTsenkher"
                onClick={() => setNuutsiinBvrtgel({ tsonkh: true, type: 1 })}
              >
                Нэмэх
              </button>
            </div>
            {NuutsiinBvrtgel?.tsonkh ? (
              <div>
                <TuluvluguUNemeh
                  setNuutsiinBvrtgel={setNuutsiinBvrtgel}
                  type={NuutsiinBvrtgel.type}
                />
              </div>
            ) : null}
            <div className="column is-1"></div>
          </div>

          <table className="table is-bordered is-flex-wrap-wrap">
            <tbody>
              <tr>
                <td>
                  <span className="textSaaral text-bold">№</span>
                </td>
                <td>
                  <span style={{ color: "red" }}>*</span>
                  <span className="textSaaral text-bold">Менежер</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Батлагч</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Харах</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Гүйцэтгэгч</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Төрөл</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Эхлэх огноо</span>
                </td>
                <td>
                  <span className="textSaaral text-bold">Дуусах огноо</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="columns">
            <div className="column is-11"></div>
          </div>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}

function TuluvluguUNemeh(props) {
  const [jagsaalt, setJagsaalt] = useState();
  const [found, setFound] = useState();
  const [search, setSearch] = useState("");
  const [tsonkhnuud, setTsonkhnuud] = useState(1);
  const [worker, setWorker] = useState();
  const [data, loadData] = useState({
    ID: 0,
    MANAGER_ID: 0,
    CONTRACTOR_ID: 0,
    TYPE: 0,
    IS_ACTIVE: 1,
    CREATED_BY: 1,
    CREATED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    UPDATE_BY: 1,
    UPDATE_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    INSPECTOR_ID: 0,
    APPROVE_ID: 0,
    START_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
    END_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  function saveToDB() {
    console.log("depid", data);
    // DataRequest({
    //   url: "http://hr.audit.mn/hr/api/v1/decision",
    //   method: "POST",
    //   data: data,
    // })
    //   .then(function (response) {
    //     console.log("tushaalResponse", response);
    //     if (response?.data?.message === "success") {
    //       alert.show("амжилттай хадгаллаа");

    //     } else {
    //       alert.show("амжилтгүй алдаа");
    //     }
    //     //history.push('/sample')
    //   })
    //   .catch(function (error) {
    //     //alert(error.response.data.error.message);
    //     console.log(error.response);
    //     alert.show("амжилтгүй алдаа");
    //   });
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "40%",
        height: "auto",
        left: "15%",
        top: "20%",
        borderRadius: "6px",
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        zIndex: "1",
      }}
    >
      <div
        style={{
          height: "auto",
          backgroundColor: "#418ee6",
          padding: "18px 10px 18px 10px",
          color: "white",
          marginBottom: "10px",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>Гүйцэтгэлийн төлөвлөгөө нэмэх</span>
        </div>
        <div>
          <span
            style={{
              fontWeight: "bold",
              cursor: " -webkit-grab",
              cursor: "grab",
            }}
            onClick={() => props.setNuutsiinBvrtgel(false)}
          >
            X
          </span>
        </div>
      </div>
      <div style={{ padding: "15px 15px 35px 15px" }}>
        <div>
          <div
            class="control has-icons-left has-icons-right"
            style={{ marginLeft: "10px" }}
          >
            <div className="columns">
              <div className="column is-5  has-text-right">
                <span style={{ color: "red" }}>* </span>Менежер
              </div>
              <div className="column is-3">
                <DepartmentID personChild={data} setPersonChild={loadData} />
              </div>
            </div>
            <div className="columns">
              <div className="column is-5  has-text-right">Батлагч</div>
              <div className="column is-3">
                <Profession
                  personChild={data}
                  setPersonChild={loadData}
                  // edit={edit}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-5  has-text-right">Харах</div>
              <div className="column is-3">
                <Profession
                  personChild={data}
                  setPersonChild={loadData}
                  // edit={edit}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-5  has-text-right">Гүйцэтгэгч</div>
              <div className="column is-3">
                <Profession
                  personChild={data}
                  setPersonChild={loadData}
                  // edit={edit}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-5  has-text-right">Төрөл</div>
              <div className="column is-3">
                <Profession
                  personChild={data}
                  setPersonChild={loadData}
                  // edit={edit}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column is-5  has-text-right">Эхлэх огноо</div>
              <div className="column is-3">
                <input
                  type="date"
                  disabled={props.edit}
                  className="anketInput"
                  value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        START_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>
            </div>

            <div className="columns">
              <div className="column is-5  has-text-right">Дуусах огноо</div>
              <div className="column is-3">
                <input
                  type="date"
                  disabled={props.edit}
                  className="anketInput"
                  value={dateFormat(data?.END_DATE, "yyyy-mm-dd")}
                  onChange={(e) => {
                    loadData({
                      ...data,
                      ...{
                        END_DATE: e.target.value,
                      },
                    });
                  }}
                ></input>
              </div>
            </div>

            <div className="columns">
              <div className="column is-9"></div>

              <div className="column is-3">
                <button
                  className="buttonTsenkher"
                  onClick={() => {
                    saveToDB();
                  }}
                >
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeInformation;
