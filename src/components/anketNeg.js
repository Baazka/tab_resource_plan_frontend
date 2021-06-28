import React, {
  useState,
  useEffect,
  useReducer,
  prevState,
  useRef,
} from "react";
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
import { useHistory } from "react-router-dom";
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));
const axios = require("axios");

function AnketNeg(props) {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [data, loadData] = useState();
  const [menu, setMenu] = useState(1);

  const refContainer = useRef(null);
  const history = useHistory();

  function saveAvatar(file) {
    const fd = new FormData();
    fd.append("image", file.target.files[0], file.target.files[0].name);
    console.log("zurag===============>", file.target.files[0]);
  }

  useEffect(async () => {
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
          BIRTH_PLACE: "",
          IS_MARRIED: 0,
          IS_ACTIVE: 1,
          CREATED_BY: userDetils?.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          PERSON_ID: 0,
        });
      } else {
        if (
          JSON.parse(localStorage.getItem("personDetail")).type === "employ"
        ) {
          let listItems = await axios(
            "http://172.16.24.103:3002/api/v1/person/0/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          loadData(listItems?.data);
        } else if (
          JSON.parse(localStorage.getItem("personDetail")).type === "newPerson"
        ) {
          let listItems = await axios(
            "http://172.16.24.103:3002/api/v1/person/1/" +
              JSON.parse(localStorage.getItem("personDetail")).person_id
          );
          console.log("amjilttai", listItems.data);
          loadData(listItems?.data);
        }
      }
    }
  }, [props]);

  function khadgalakhYo() {
    if (localStorage.getItem("personDetail")?.includes("person_id")) {
      if (JSON.parse(localStorage.getItem("personDetail")).person_id === "0") {
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/person/",
          method: "post",
          data: { person: data },
        })
          .then(function (response) {
            console.log(
              "UpdateResponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              response.data
            );
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
              console.log(
                "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
                localStorage.getItem("personDetail")
              );
              alert.show("амжилттай хадгаллаа");
              forceRender();
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
          });
      } else {
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/updatePerson/",
          method: "post",
          data: { person: data },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            //history.push('/sample')
            if (response?.data?.message === "success") {
              alert.show("амжилттай хадгаллаа");
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
          });
      }
    }
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
              onClick={() => history.push("/web/workerlist", { back: true })}
            >
              {"<  Буцах"}
            </button>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <img src={AvatarB} width="120px" height="120px" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-0.4rem",
            }}
          >
            <div>
              <input
                ref={refContainer}
                class="file-input"
                accept="image/*"
                type="file"
                onChange={(file) => saveAvatar(file)}
                style={{ display: "none" }}
              />
            </div>
            <img
              src={Face}
              width="40px"
              height="40px"
              onClick={() => refContainer.current.click()}
            />

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
              <Yrunkhii
                data={data}
                loadData={loadData}
                khadgalakhYo={khadgalakhYo}
                forceUpdate={forceRender}
              />
              <Kayag person_id={data?.PERSON_ID} />
              <HolbooBarikhHun person={data} person_id={data?.PERSON_ID} />
              <GerBul person={data} person_id={data?.PERSON_ID} />
            </div>
          ) : null}
          {menu === 2 ? <UrChadvar person_id={data?.PERSON_ID} /> : null}
          {menu === 3 ? <Bolowsrol person_id={data?.PERSON_ID} /> : null}
          {menu === 4 ? <Mergeshliin person_id={data?.PERSON_ID} /> : null}
          {menu === 5 ? <TsergiinAlba person_id={data?.PERSON_ID} /> : null}
          {menu === 6 ? <Shagnaliin person_id={data?.PERSON_ID} /> : null}
          {menu === 7 ? <Turshlgin person_id={data?.PERSON_ID} /> : null}
          {menu === 8 ? <Buteeliin person_id={data?.PERSON_ID} /> : null}
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Yrunkhii(props) {
  const [edit, setEdit] = useState(true);
  const alert = useAlert();
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [data, loadData] = useState();
  console.log("get0", props);
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
          <span className="headerTextBold">Ерөнхий мэдээлэл</span>
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
            placeholder="утгаа оруулна уу"
            disabled={edit}
            className="anketInput"
            value={props.data?.PERSON_LASTNAME}
            onChange={(text) =>
              props.loadData({
                ...props.data,
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
        <div className="column is-3  has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Өөрийн нэр</span>
        </div>
        <div className="column is-3">
          <input
            placeholder="утгаа оруулна уу"
            disabled={edit}
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
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн он,сар,өдөр</span>
        </div>
        <div className="column is-3">
          <input
            placeholder="утгаа оруулна уу"
            className=""
            type="date"
            id="start"
            disabled={edit}
            className="anketInput"
            value={dateFormat(
              new Date(props.data?.PERSON_BORNDATE),
              "yyyy-mm-dd"
            )}
            min="1930-01-01"
            max="2021-12-31"
            onChange={(e) => {
              props.loadData({
                ...props.data,
                ...{
                  PERSON_BORNDATE: dateFormat(
                    e.target.value === undefined ? new Date() : e.target.value,
                    "dd-mmm-yy"
                  ),
                },
              });
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
            placeholder="утгаа оруулна уу"
            disabled={edit}
            className="anketInput"
            value={props.data?.PERSON_REGISTER_NO}
            onChange={(text) =>
              props.loadData({
                ...props.data,
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
          <Office
            personChild={props.data}
            setPersonChild={props.loadData}
            forceUpdat
            te={props.forceUpdate}
            edit={edit}
          />
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ирэгншил</span>
        </div>
        <div className="column is-3">
          <National
            personChild={props.data}
            setPersonChild={props.loadData}
            edit={edit}
          />
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн сум,дүүрэг</span>
        </div>
        <div className="column is-3">
          <Suboffice
            personChild={props.data}
            setPersonChild={props.loadData}
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
            personChild={props.data}
            setPersonChild={props.loadData}
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
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Үндэс угсаа</span>
        </div>
        <div className="column is-3">
          <Dynasty
            personChild={props.data}
            setPersonChild={props.loadData}
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
            value={props.data?.IS_MARRIED === null ? 1 : props.data?.IS_MARRIED}
            onChange={(text) =>
              loadData({
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
        <div className="column is-11"></div>

        {!edit ? (
          <div className="column is-1 ">
            {/* <button
              className="buttonTsenkher"
              style={{ marginRight: "0.4rem" }}
            >
              Хэвлэх
            </button> */}
            <button className="buttonTsenkher" onClick={props.khadgalakhYo}>
              Хадгалах
            </button>
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

  useEffect(async () => {
    if (localStorage.getItem("personDetail")?.includes("person_id")) {
      if (JSON.parse(localStorage.getItem("personDetail")).type === "employ") {
        let listItems = await axios(
          "http://172.16.24.103:3002/api/v1/person/0/" +
            JSON.parse(localStorage.getItem("personDetail")).person_id
        );
        console.log("amjilttai", listItems.data);
        setPerson(listItems?.data);
      } else if (
        JSON.parse(localStorage.getItem("personDetail")).type === "newPerson"
      ) {
        let listItems = await axios(
          "http://172.16.24.103:3002/api/v1/person/1/" +
            JSON.parse(localStorage.getItem("personDetail")).person_id
        );
        console.log("amjilttai", listItems.data);
        setPerson(listItems?.data);
      }
    }
  }, [props]);

  function khadgalakhYo() {
    console.log("PersonKhadgal", person);
    DataRequest({
      url: "http://172.16.24.103:3002/api/v1/updatePersonAddress/",
      method: "post",
      data: { person: person },
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
          <span className="headerTextBold">Хаягийн мэдээлэл</span>
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
              placeholder="утгаа оруулна уу"
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
              placeholder="утгаа оруулна уу"
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
              placeholder="утгаа оруулна уу"
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
              placeholder="утгаа оруулна уу"
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
  const [emergency, setEmergency] = useState();
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/emergency/" + props.person_id
    );
    console.log("emergency", listItems?.data?.Emergency);
    setEmergency(listItems?.data?.Emergency);
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
              Зайлшгүй шаардлагатай үед холбоо барих хүн
            </span>
          </div>
          <div className="column is-1">
            <button className="buttonTsenkher" onClick={() => setEdit(!edit)}>
              Засварлах
            </button>
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
                      />
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
                        />
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
  const [edit, setEdit] = useState(true);
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [data, loadData] = useState([]);
  const alert = useAlert();
  const [family, setFamily] = useState([]);
  const [family2, setFamily2] = useState([]);

  useEffect(async () => {
    console.log("testewwwwwwwwwwwwwwwwew", props);
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/family/" + props.person_id
    );
    console.log(listItems, "family");
    loadData(listItems?.data.Family);
  }, [props]);

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
              MEMBER_BIRTHDATE: "09-Jun-21",
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
              MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
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
      MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
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
      MEMBER_BIRTHDATE: dateFormat(new Date(), "yyyy-mm-dd"),
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
          <span className="headerTextBold">
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
        <div className="column is-12">
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
                  {!edit ? (
                    <td rowspan="2" style={{ border: "none", width: "60px" }}>
                      <img
                        src={Add}
                        width="`40px"
                        height="40px"
                        onClick={() => addRowFamily()}
                        style={{ marginLeft: "-13px" }}
                      />
                    </td>
                  ) : null}
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
                        style={{ width: "100px" }}
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
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
                        style={{ width: "110px" }}
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
                        placeholder="утгаа оруулна уу"
                        type="date"
                        id="start"
                        style={{ width: "120px" }}
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
                      <Office
                        personChild={value}
                        setPersonChild={setFamily}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <Suboffice
                        personChild={value}
                        setPersonChild={setFamily}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        placeholder="утгаа оруулна уу"
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
                        placeholder="утгаа оруулна уу"
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
        <div className="column is-12 ">
          <em className="utas m-1">
            Садан төрлийн байдал (таны, эцэг, эх төрөн ах, эгч дүү, өрх
            тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг
            орлуулна)
          </em>
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
                    <span className="textSaaral">Одоо эрхэлэж буй ажил</span>
                  </td>
                  {!edit ? (
                    <td
                      rowspan="2"
                      style={{
                        border: "none",
                        width: "50px",
                        paddingLeft: "0px",
                      }}
                    >
                      <img
                        src={Add}
                        width="`50px"
                        height="50px"
                        onClick={() => addRowFamily2()}
                      />
                    </td>
                  ) : null}
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
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
                        style={{ width: "100px" }}
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
                        className="anketInput"
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
                        type="date"
                        id="start"
                        style={{ width: "120px" }}
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
                      <Office
                        personChild={value}
                        setPersonChild={setFamily2}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Office
                        personChild={value}
                        setPersonChild={setFamily2}
                        forceUpdate={forceRender}
                        edit={edit}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        style={{ width: "110px" }}
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
                        placeholder="утгаа оруулна уу"
                        disabled={edit}
                        className="anketInput"
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
                          width="30px"
                          height="30px"
                          onClick={() => removeFamily2(index, value)}
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
