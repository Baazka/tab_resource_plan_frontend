import React, { useState, useEffect, useReducer, prevState } from "react";
import UrChadvar from "./urchadvar";
import Header from "../components/header";
import { DataRequest } from "../functions/DataApi";
import Bolowsrol from "../components/anketABolovsrol";
import Mergeshliin from "./anketAmergejil";
import TsergiinAlba from "./anketAtserge";
import Shagnaliin from "./anketAshagnal";
import Turshlgin from "./anketAturshlaga";
import Buteeliin from "./anketAbuteeliin";
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
  BlueKGurav,
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
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function AnketNeg(props) {
  console.log(
    props.location.state?.data?.employEmergency?.Emergency,
    "emergencyFirst"
  );
  const [emergency, setEmergency] = useState(
    props.location.state?.data?.employEmergency?.Emergency.length === 0
      ? [
          {
            MEMBER_ID: 1,
            FAMILY_NAME: "",
            EMERGENCY_LASTNAME: "",
            EMERGENCY_FIRSTNAME: "",
            EMERGENCY_PHONE: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        ]
      : props.location.state?.data?.employEmergency?.Emergency
  );
  const [menu, setMenu] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Header title="АНКЕТ А"></Header>
      <div
        style={{
          width: "20%",
          marginLeft: "7.5rem",
          textAlign: "center",
          borderRight: "1px solid #ececec",
          height: "100hv",
        }}
      >
        <div style={{ marginTop: "7rem" }}>
          <img src={AvatarB} width="120px" height="120px" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-0.4rem",
          }}
        >
          <img src={Face} width="40px" height="40px" />
          <img src={Trush} width="40px" height="40px" />
          <img src={Warning} width="40px" height="40px" />
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <span
            style={{
              color: "#5d5d5d",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
            }}
          >
            {
              props.location.state?.data?.employDetail?.Person[0]
                .PERSON_LASTNAME
            }
          </span>
          <span
            style={{
              color: "#418ee6",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
            }}
          >
            &nbsp;{" "}
            {
              props.location.state?.data?.employDetail?.Person[0]
                .PERSON_FIRSTNAME
            }
          </span>
        </div>
        <div className="AnketList" style={{ marginTop: "1.5rem" }}>
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
            I-II. ХУВЬ ХҮНИЙ <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
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
            II. УР ЧАДВАРЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </button>
        </div>
        <div className="AnketList">
          <img
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
            IV. МЭРГЭЖЛИЙН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </button>
        </div>
        <div className="AnketList">
          <img
            src={menu === 5 ? BlueTav : BlackTav}
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
            V. ЦЭРГИЙН АЛБА <br /> ХААСАН ЭСЭХ
          </button>
        </div>
        <div className="AnketList">
          <img
            src={menu === 6 ? BlueZurgaa : BlackZurgaa}
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
            VI. ШАГНАЛЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </button>
        </div>
        <div className="AnketList">
          <img
            src={menu === 7 ? BlueDoloo : BlackDoloo}
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
            VII. ТУРШЛАГЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </button>
        </div>
        <div className="AnketList">
          <img
            src={menu === 8 ? BlueNaim : BlackNaim}
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
            VIII. БҮТЭЭЛИЙН <br /> ЖАГСААЛТ
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
        {menu === 1 ? (
          <div>
            <Yrunkhii person={props.location.state?.data?.employDetail} />
            <Kayag person={props.location.state?.data?.employDetail} />
            <HolbooBarikhHun
              emergency={emergency}
              person={props.location.state?.data?.employDetail}
            />
            <GerBul
              family={props.location.state?.data?.employfamily}
              person={props.location.state?.data?.employDetail}
            />
          </div>
        ) : null}
        {menu === 2 ? (
          <UrChadvar
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 3 ? (
          <Bolowsrol
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 4 ? (
          <Mergeshliin
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 5 ? (
          <TsergiinAlba
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 6 ? (
          <Shagnaliin
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 7 ? (
          <Turshlgin
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
        {menu === 8 ? (
          <Buteeliin
            person_id={
              props.location.state?.data?.employDetail.Person[0].PERSON_ID
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function Yrunkhii(props) {
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  const [bornDate, setBornDate] = useState(
    props.person?.Person[0].PERSON_BORNDATE !== undefined
      ? dateFormat(
          new Date(props.person?.Person[0].PERSON_BORNDATE),
          "yyyy-mm-dd"
        )
      : ""
  );
  useEffect(() => {
    setPerson({
      ...person,
      ...{ PERSON_BORNDATE: dateFormat(bornDate, "dd-mmm-yy") },
    });
  }, [bornDate]);

  const [person, setPerson] = useState(props.person?.Person[0]);
  const national =
    props?.person?.National !== undefined ? props.person?.National : [];
  const subNational =
    props?.person?.SubNational !== undefined ? props.person?.SubNational : [];
  const dynasty =
    props?.person?.Dynasty !== undefined ? props.person?.Dynasty : [];
  const office =
    props?.person?.Office !== undefined ? props.person?.Office : [];
  const subOffice =
    props?.person?.SubOffice !== undefined ? props.person?.SubOffice : [];

  function khadgalakhYo() {
    console.log("PersonKhadgal", person);
    DataRequest({
      url: "http://10.10.10.46:3002/api/v1/updatePerson/",
      method: "post",
      data: { person },
    })
      .then(function (response) {
        console.log("UpdateResponse", response);
        //history.push('/sample')
        if (response?.data?.message === "success")
          alert.show("амжилттай хадгаллаа");
      })
      .catch(function (error) {
        //alert(error.response.data.error.message);
        console.log(error.response);
      });
  }

  return (
    <div
      className=" box"
      style={{
        marginTop: "80px",
        width: "98%",
        height: "auto",
        marginLeft: "10px",
      }}
    >
      <div className="columns ">
        <div className="column is-11">
          <span>Ерөнхий мэдээлэл</span>
        </div>
        <div className="column is-1">
          <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
            Засварлах
          </button>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right ">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Эцэг эхийн нэр</span>
        </div>
        <div className="column is-3">
          <input
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_LASTNAME}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_LASTNAME: text.target.value },
              })
            }
          />
        </div>
        <div className="column is-3 has-text-right ">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Хүйс</span>
        </div>
        <div className="column is-3">
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_GENDER}
            onChange={(text) =>
              setPerson({
                ...person,
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
        <div className="column is-3  has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Өөрийн нэр</span>
        </div>
        <div className="column is-3">
          <input
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_FIRSTNAME}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_FIRSTNAME: text.target.value },
              })
            }
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн он,сар,өдөр</span>
        </div>
        <div className="column is-3">
          <input
            className=""
            type="date"
            id="start"
            disabled={edit}
            className="anketInput"
            value={bornDate}
            min="1930-01-01"
            max="2021-12-31"
            onChange={(date) => {
              setBornDate(date.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Регистерийн дугаар</span>
        </div>
        <div className="column is-3">
          <input
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_REGISTER_NO}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_REGISTER_NO: text.target.value },
              })
            }
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн аймаг,хот</span>
        </div>
        <div className="column is-3">
          <Office personChild={person} setPersonChild={setPerson} edit={edit} />
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ирэгншил</span>
        </div>
        <div className="column is-3">
          <National
            personChild={person}
            setPersonChild={setPerson}
            edit={edit}
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн сум,дүүрэг</span>
        </div>
        <div className="column is-3">
          <Suboffice
            personChild={person}
            setPersonChild={setPerson}
            edit={edit}
          />
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ургийн овог</span>
        </div>
        <div className="column is-3">
          <Subnational
            personChild={person}
            setPersonChild={setPerson}
            edit={edit}
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн газар</span>
        </div>
        <div className="column is-3">
          <input
            disabled={edit}
            className="anketInput"
            value={person?.BIRTH_PLACE}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ BIRTH_PLACE: text.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Үндэс угсаа</span>
        </div>
        <div className="column is-3">
          <Dynasty
            personChild={person}
            setPersonChild={setPerson}
            edit={edit}
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Гэрлэсэн эсэх</span>
        </div>
        <div className="column is-3">
          <select
            disabled={edit}
            className="anketInput"
            name="cars"
            id="cars"
            value={person?.IS_MARRIED === null ? 1 : person?.IS_MARRIED}
            onChange={(text) =>
              setPerson({
                ...person,
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
        <div className="column is-8"></div>

        {!edit ? (
          <div className="column is-4 has-text-right">
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

function Kayag(props) {
  const [person, setPerson] = useState(props.person?.Person[0]);
  const [edit, setEdit] = useState(true);
  const alert = useAlert();

  function khadgalakhYo() {
    console.log("PersonKhadgal", person);
    DataRequest({
      url: "http://172.16.24.103:3002/api/v1/updatePersonAddress/",
      method: "post",
      data: { person },
    })
      .then(function (response) {
        console.log("UpdateResponse", response);
        //history.push('/sample')
        if (response?.data?.message === "success")
          alert.show("амжилттай хадгаллаа");
      })
      .catch(function (error) {
        //alert(error.response.data.error.message);
        console.log(error.response);
      });
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
          <span>Хаягийн мэдээлэл</span>
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
                  <span className="textSaaral">Оршин суугаа,аймаг,хот</span>
                </td>
                <td>
                  <span className="textSaaral">Оршин суугаа, аймаг, хот</span>
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
                  <span className="textSaaral"></span>
                </td>
                <td>
                  <span className="textSaaral"></span>
                </td>
                <td>
                  <input
                    disabled={edit}
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
                  <span className="textSaaral">Оршин суулгаа хаяг</span>
                </td>
                <td>
                  <span className="textSaaral"></span>
                </td>
                <td>
                  <span className="textSaaral"></span>
                </td>
                <td>
                  <input
                    className="anketInputTable"
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
            <em className="mail ml-1 m-3">И-мэйл хаяг</em>
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
        <div className="column is-9"></div>
        <div className="column is-3 has-text-right">
          {/* <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button> */}
          <button
            className="buttonTsenkher"
            style={{ marginRight: "0.4rem" }}
            onClick={khadgalakhYo}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}

function HolbooBarikhHun(props) {
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [emergency, setEmergency] = useState(props.emergency);
  const alert = useAlert();

  async function addRowKholbooBarikh() {
    let value = emergency;
    value.push({
      MEMBER_ID: 1,
      FAMILY_NAME: "",
      PERSON_ID: props.person?.Person[0].PERSON_ID,
      EMERGENCY_LASTNAME: "",
      EMERGENCY_FIRSTNAME: "",
      EMERGENCY_PHONE: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
    });

    await setEmergency(value);

    forceRender();
  }
  function removeEmergency(indexParam, value) {
    console.log(indexParam, "index");
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/emergencyDelete",
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
          console.log("UpdateResponse", response);
          //history.push('/sample')
          if (response?.data?.message === "success")
            alert.show("амжилттай устлаа");
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    setEmergency(emergency.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
    forceRender();
  }
  function khadgalakhYo() {
    let newRow = emergency.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = emergency.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      console.log("insert", JSON.stringify(newRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/emergency/",
        method: "POST",
        data: { emergency: newRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 1;
          if (message !== 2) alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
    if (oldRow?.length > 0) {
      console.log("update", JSON.stringify(oldRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/emergency/",
        method: "PUT",
        data: { emergency: oldRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 2;
          //history.push('/sample')
          if (message !== 1) alert.show("амжилттай хадгаллаа");
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
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
          <span>Хаягийн мэдээлэл</span>
        </div>
        <div className="column is-1">
          <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
            Засварлах
          </button>
        </div>
      </div>

      <div className="columns">
        <div className="column is-10 ">
          <span>Зайлшгүй шаардлагатай үед холбоо барих хүн</span>
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
                <td style={{ paddingLeft: "0px", borderColor: "transparent" }}>
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRowKholbooBarikh()}
                  />
                </td>
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

                  <td
                    style={{ paddingLeft: "0px", borderColor: "transparent" }}
                  >
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeEmergency(index, value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column is-2 has-text-left"></div>
      </div>
      <div className="columns">
        <div className="column is-9"></div>
        <div className="column is-3 has-text-right">
          {/* <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button> */}
          <button
            className="buttonTsenkher"
            style={{ marginRight: "0.4rem" }}
            onClick={() => khadgalakhYo()}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}

function GerBul(props) {
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const alert = useAlert();
  const [family, setFamily] = useState(
    props.family?.Family.length === 0
      ? [
          {
            PERSON_ID: props.person?.Person[0].PERSON_ID,
            FAMILY_ID: 1,
            FAMILY_NAME: "",
            MEMBER_TYPE: 1,
            MEMBER_ID: 1,
            MEMBER_LASTNAME: "",
            MEMBER_FIRSTNAME: "",
            MEMBER_BIRTHDATE: "09-Jun-21",
            MEMBER_BIRTH_OFFICE: "",
            MEMBER_BIRTH_SUBOFFICE: "",
            MEMBER_ORG: "",
            MEMBER_POSITION: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ]
      : props.family.Family.filter((a) => a.MEMBER_TYPE === 1)
  );
  const [family2, setFamily2] = useState(
    props.family?.Family.length === 0
      ? [
          {
            PERSON_ID: props.person?.Person[0].PERSON_ID,
            FAMILY_NAME: "",
            MEMBER_ID: 1,
            MEMBER_TYPE: 2,
            MEMBER_LASTNAME: "",
            MEMBER_FIRSTNAME: "",
            MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
            MEMBER_BIRTH_OFFICE: "",
            MEMBER_BIRTH_SUBOFFICE: "",
            MEMBER_ORG: "",
            MEMBER_POSITION: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
          },
        ]
      : props.family?.Family.filter((a) => a.MEMBER_TYPE === 2)
  );

  console.log("propsGerbul", props);
  async function addRowFamily() {
    let value = family;
    value.push({
      PERSON_ID: props.person?.Person[0].PERSON_ID,
      FAMILY_NAME: "",
      MEMBER_TYPE: 1,
      MEMBER_ID: 1,
      MEMBER_LASTNAME: "",
      MEMBER_FIRSTNAME: "",
      MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
      MEMBER_BIRTH_OFFICE: "",
      MEMBER_BIRTH_SUBOFFICE: "",
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
      PERSON_ID: props.person?.Person[0].PERSON_ID,
      FAMILY_NAME: "",
      MEMBER_TYPE: 2,
      MEMBER_ID: 1,
      MEMBER_LASTNAME: "",
      MEMBER_FIRSTNAME: "",
      MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
      MEMBER_BIRTH_OFFICE: "",
      MEMBER_BIRTH_SUBOFFICE: "",
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
        url: "http://172.16.24.103:3002/api/v1/familyDelete",
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
          if (response?.data?.message === "success")
            alert.show("амжилттай устлаа");
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
        url: "http://172.16.24.103:3002/api/v1/familyDelete",
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
          if (response?.data?.message === "success")
            alert.show("амжилттай устлаа");
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
    let combine = family.concat(family2);
    console.log("combine", combine);
    let newRow = combine.filter((value) => value.ROWTYPE === "NEW");
    let oldRow = combine.filter(
      (value) =>
        value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
    );
    let message = 0;

    if (newRow?.length > 0) {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/family/",
        method: "POST",
        data: { family: newRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 1;
          if (message !== 2) alert.show("амжилттай хадгаллаа");
          //history.push('/sample')
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
    }
    if (oldRow?.length > 0) {
      console.log("update", JSON.stringify(oldRow));
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/family/",
        method: "PUT",
        data: { family: oldRow },
      })
        .then(function (response) {
          console.log("UpdateResponse", response);
          if (response?.data?.message === "success") message = 2;
          //history.push('/sample')
          if (message !== 1) alert.show("амжилттай хадгаллаа");
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
        });
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
        <div className="column is-11 ">
          <span>
            Гэр бүлийн байдал(зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг бичнэ)
          </span>
        </div>
        <div className="column is-1">
          <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
            Засварлах
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-11">
          <div className="table-container">
            <table className="table is-bordered is-flex-wrap-wrap">
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
                    <span className="textSaaral">Төрсөн он, сар, өдөр</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн аймаг, хот</span>
                  </td>
                  <td rowspan="2">
                    <span className="textSaaral">Төрсөн сум, дүүрэг</span>
                  </td>
                  <td colspan="2">
                    <span className="textSaaral">Одоо эрхэлэж буй ажил</span>
                  </td>
                  <td rowspan="2" style={{ border: "none" }}>
                    &emsp; &emsp;&emsp;
                    <img
                      src={Add}
                      width="`50px"
                      height="50px"
                      onClick={() => addRowFamily()}
                      style={{ marginLeft: "-13px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="textSaaral">Байгуулагын Нэр</span>
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
                    <td>
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
                        disabled={edit}
                        className="anketInput"
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
                        disabled={edit}
                        className="anketInput"
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
                        type="date"
                        id="start"
                        disabled={edit}
                        className="anketInput"
                        value={dateFormat(
                          new Date(value.MEMBER_BIRTHDATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          family[index].MEMBER_BIRTHDATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        disabled={edit}
                        className="anketInput"
                        value={value.MEMBER_BIRTH_OFFICE}
                        onChange={(e) => {
                          family[index].MEMBER_BIRTH_OFFICE = e.target.value;
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
                        disabled={edit}
                        className="anketInput"
                        value={value.MEMBER_BIRTH_SUBOFFICE}
                        onChange={(e) => {
                          family[index].MEMBER_BIRTH_SUBOFFICE = e.target.value;
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
                        disabled={edit}
                        className="anketInput"
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
                        disabled={edit}
                        className="anketInput"
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
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 ">
          <em className="utas m-1">
            Садан төрлийн байдал (таны, эцэг, эх төрөн ах, эгч дүү, өрх
            тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг
            орлуулна)
          </em>
        </div>
      </div>

      <div className="columns">
        <div className="column is-11 ">
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
                    <span className="textSaaral">Одоо эрхэлэж буй ажил</span>
                  </td>
                  <td rowspan="2" style={{ border: "none" }}>
                    &emsp; &emsp;&emsp;
                    <img
                      src={Add}
                      width="`50px"
                      height="50px"
                      onClick={() => addRowFamily2()}
                      style={{ marginLeft: "-13px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="textSaaral">Байгуулагын Нэр</span>
                  </td>
                  <td>
                    <span className="textSaaral">Албан тушаал</span>
                  </td>
                </tr>

                {family2?.map((value, index) => (
                  <tr>
                    <td>
                      {" "}
                      <span className="textSaaral">{index + 1}</span>
                    </td>
                    <td>
                      {" "}
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
                        disabled={edit}
                        className="anketInput"
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
                        disabled={edit}
                        className="anketInput"
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
                        type="date"
                        id="start"
                        disabled={edit}
                        className="anketInput"
                        value={dateFormat(
                          new Date(value.MEMBER_BIRTHDATE),
                          "yyyy-mm-dd"
                        )}
                        min="1930-01-01"
                        max="2021-12-31"
                        onChange={(e) => {
                          family2[index].MEMBER_BIRTHDATE = dateFormat(
                            e.target.value,
                            "dd-mmm-yy"
                          );
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
                        disabled={edit}
                        className="anketInput"
                        value={value.MEMBER_BIRTH_OFFICE}
                        onChange={(e) => {
                          family2[index].MEMBER_BIRTH_OFFICE = e.target.value;
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
                        disabled={edit}
                        className="anketInput"
                        value={value.MEMBER_BIRTH_SUBOFFICE}
                        onChange={(e) => {
                          family2[index].MEMBER_BIRTH_SUBOFFICE =
                            e.target.value;
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
                        disabled={edit}
                        className="anketInput"
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
                        disabled={edit}
                        className="anketInput"
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
                        onClick={() => removeFamily2(index, value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-9" />

        <div className="column is-3 has-text-right">
          {/* <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button> */}
          <button
            className="buttonTsenkher"
            style={{ marginRight: "0.4rem" }}
            onClick={khadgalakhYo}
          >
            Хадгалах
          </button>
          {/* <button className="buttonTsenkher">Хадгалаад харах</button> */}
        </div>
      </div>
    </div>
  );
}

// function Bolowsrol(props) {
//   return (
//     <div
//       className="box"
//       style={{
//         marginTop: "80px",
//         width: "98%",
//         height: "40%",
//         marginLeft: "15px",
//       }}
//     >
//       <div class="columns">
//         <div class="column is-11">
//           <th>1.Төрийн жинхэн албаны шалгалтын талаарх мэдээлэл</th>
//         </div>
//         <button className="button is-info is-small is-focused ml-5">
//           Засварлах
//         </button>
//       </div>
//       <div class="columns is-12">
//         <div class="column is-0" />

//         <em className="TABLE m-3 has-text-link	">
//           3.1.Боловсрол (суурь Боловсрол. дипломын дээд
//           боловсрол,бакалавр,магистрын зэргийг оролуулан)
//         </em>
//       </div>
//       <div class="columns is-12">
//         <div class="column is-0 " />

//         <table className="table is-bordered p-3">
//           <thead>
//             <tr>
//               <td>№</td>
//               <td>Боловсролын зэрэг</td>
//               <td>Боловсрол эзэтшисэн</td>
//               <td>*Сургуулийн нэр</td>
//               <td>Огноо он,сар</td>
//               <td>Төгссөн он,сар</td>
//               <td>Эзэмшсэн мэргэжил</td>
//               <td>Гэрчилгээ дипломин дугаар</td>
//               <td>Сургуулийн холбоо барих мэдээлэл</td>
//               <td>Диплом хамгаалсан сэдэв</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th></th>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div class="columns is-12">
//         <div class="column is-0" />

//         <em className="TABLE m-3 has-text-link">
//           3.2. Боловсрол (суурь Боловсрол, дипломын дээд Боловсрол, бакалавр,
//           магистрын зэргийг оролцуулсан)
//         </em>
//       </div>

//       <div class="columns is-12">
//         <div class="column is-0 " />

//         <table className="table is-bordered ">
//           <thead>
//             <tr>
//               <td>№</td>
//               <td>Боловсролын зэрэг</td>
//               <td>Боловсрол эзэтшисэн газар</td>
//               <td>*Сургуулийн нэр</td>
//               <td>Орсон он,сар</td>
//               <td>Төгссөн он,сар</td>
//               <td>Эзэмшсэн мэргэжил</td>
//               <td>Гэрчилгээ дипломин дугаар</td>
//               <td>Сургуулийн холбоо барих мэдээлэл</td>
//               <td>Диплом хамгаалсан сэдэв</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th></th>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//             <tr></tr>
//           </tbody>
//         </table>
//       </div>
//       <div class="columns is-3">
//         <div class="column is-9" />

//         <div class="column is-12">
//           <button className="button is-info is-small is-focused ml-6">
//             Хэвлэх
//           </button>
//           <button className="button is-info is-small is-focused ml-1">
//             Хадгалах
//           </button>
//           <button className="button is-info is-small is-focused ml-1">
//             Хадгалаад харах
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default AnketNeg;
