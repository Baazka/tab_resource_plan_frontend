import React, { useState, useEffect } from "react";
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
  BlueNeg,
  BlueKhoyor,
  BlueKGurav,
  BlueDuruv,
  BlueTav,
  BlueZurgaa,
  BlueDoloo,
  BlueNaim,
  BlueGurav,
} from "../assets/images/zurag";
var dateFormat = require("dateformat");

function AnketNeg(props) {
  const [employ, setEmploy] = useState({});
  const [menu, setMenu] = useState(1);

  useEffect(() => {
    console.log("anketNeg", props.location.state.employDetail);
  }, [props]);

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
            {props.location.state.employDetail?.Person[0].PERSON_LASTNAME}
          </span>
          <span
            style={{
              color: "#418ee6",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
            }}
          >
            &nbsp;{" "}
            {props.location.state.employDetail?.Person[0].PERSON_FIRSTNAME}
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
            <Yrunkhii person={props.location.state.employDetail} /> <Kayag />
            <GerBul />
          </div>
        ) : null}
        {menu === 2 ? <Kayag /> : null}
        {menu === 3 ? <GerBul /> : null}
      </div>
    </div>
  );
}

function Yrunkhii(props) {
  const [edit, setEdit] = useState(true);

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
    // DataRequest({
    //   url: "http://localhost:3002/api/v1/updatePersonDetail/",
    //   method: "post",
    //   data: { person },
    // })
    //   .then(function (response) {
    //     console.log("UpdateResponse", response);
    //     //history.push('/sample')
    //   })
    //   .catch(function (error) {
    //     //alert(error.response.data.error.message);
    //     console.log(error.response);
    //   });
  }
  async function employDetail(value) {}

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
            <option value={2}>Эрэгтэй</option>
            <option value={1}>Эмэгтэй</option>
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
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_BIRTH_OFFICE_ID}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_BIRTH_OFFICE_ID: text.target.value },
              })
            }
          >
            {office.map((nation, index) => (
              <option id="index" value={nation.OFFICE_ID}>
                {nation.OFFICE_NAME}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ирэгншил</span>
        </div>
        <div className="column is-3">
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_NATIONAL_ID}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_NATIONAL_ID: text.target.value },
              })
            }
          >
            {national.map((nation, index) => (
              <option value={nation.NATIONAL_ID}>{nation.NATIONAL_NAME}</option>
            ))}
          </select>
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн сум,дүүрэг</span>
        </div>
        <div className="column is-3">
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_BIRTH_SUBOFFICE_ID}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_BIRTH_SUBOFFICE_ID: text.target.value },
              })
            }
          >
            {subOffice.map((nation) => (
              <option value={nation.SUB_OFFICE_ID}>
                {nation.SUB_OFFICE_NAME}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ургийн овог</span>
        </div>
        <div className="column is-3">
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_SUBNATIONAL_ID}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_SUBNATIONAL_ID: text.target.value },
              })
            }
          >
            {subNational.map((nation) => (
              <option value={nation.EMP_SUBNATIONAL_ID}>
                {nation.EMP_SUBNATIONAL_NAME}
              </option>
            ))}
          </select>
        </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн газар</span>
        </div>
        <div className="column is-3">
          <input
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_BIRTH_LAND}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_BIRTH_LAND: text.target.value },
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
          <select
            disabled={edit}
            className="anketInput"
            value={person?.PERSON_DYNASTY_ID}
            onChange={(text) =>
              setPerson({
                ...person,
                ...{ PERSON_DYNASTY_ID: text.target.value },
              })
            }
          >
            {dynasty.map((value) => (
              <option value={value.DYNASTY_ID}>{value.DYNASTY_NAME}</option>
            ))}
          </select>
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
            <option value={0}>Тийм</option>
            <option value={1}>Үгүй</option>
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
          <button className="buttonTsenkher">Засварлах</button>
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
                  <span className="textSaaral">Хэнтий аймаг</span>
                </td>
                <td>
                  <span className="textSaaral">Хэнтий аймаг Бугант сум</span>
                </td>
                <td>
                  <span className="textSaaral">Хэнтий аймаг Бугант сум</span>
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
                  <span className="textSaaral">Улаанбаатар</span>
                </td>
                <td>
                  <span className="textSaaral">Баянзүрэх дүүрэг</span>
                </td>
                <td>
                  <span className="textSaaral">
                    {" "}
                    Улаанбаатар Баянзүрэх дүүрэг 10 хороо
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="columns">
            <em className="utas m-3">Утасны дугаар:</em>
            <input
              className="utas1 ml-2 m-3"
              type="text"
              placeholder="99239568"
            ></input>
            <input
              className="utas1 ml-1 m-3"
              type="text "
              placeholder="Утас2"
            ></input>
            <em className="mail ml-1 m-3">И-мэйл хаяг</em>
            <input
              className="text ml-1 m-3"
              type="text"
              placeholder="bayanjargalb@audit.gov.mn"
            ></input>
            <input
              className="text ml-1 m-3"
              type="text"
              placeholder="И-мэйл хаяг 2"
            ></input>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-8 ">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <span className="textSaaral">1</span>
                </th>
                <td>
                  <span className="textSaaral">Аав</span>
                </td>
                <td>
                  <span className="textSaaral">Бат</span>
                </td>
                <td>
                  <span className="textSaaral">Буянбадрах</span>
                </td>
                <td>
                  <span className="textSaaral">99235645</span>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>

        <div className="column is-3"></div>
      </div>
      <div className="columns">
        <div className="column is-9"></div>
        <div className="column is-3 has-text-right">
          <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button>
          <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хадгалах
          </button>
          <button className="buttonTsenkher">Хадгалаад харах</button>
        </div>
      </div>
    </div>
  );
}

function GerBul(props) {
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
          <button className="buttonTsenkher">Засварлах</button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12">
          <table className="table is-bordered ">
            <thead>
              <tr>
                <td>№</td>
                <td>Таны Юу болох</td>
                <td>Садан төрлийн хүний эцэг, эхийн нэр</td>
                <td>Садан төрлийн хүний нэр</td>
                <td>Төрсөн он, сар, өдөр</td>
                <td>Төрсөн аймаг, хот</td>
                <td>төрөл сум, дүүрэг</td>

                <tr>
                  <td colSpan="2">Одоо эрхэлэж буй ажил</td>
                </tr>
                <tr>
                  <td rowSpan="2">Байгуулагын Нэр</td>
                  <td>Албан тушаал</td>
                </tr>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr></tr>
            </tbody>
          </table>
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
          <table className="table is-bordered ">
            <thead>
              <tr>
                <td>№</td>
                <td>Таны Юу болох</td>
                <td>Садан төрлийн хүний эцэг, эхийн нэр</td>
                <td>Садан төрлийн хүний нэр</td>
                <td>Төрсөн он, сар, өдөр</td>
                <td>Төрсөн аймаг, хот</td>
                <td>төрөл сум, дүүрэг</td>

                <tr>
                  <td colSpan="2">Одоо эрхэлэж буй ажил</td>
                </tr>
                <tr>
                  <td rowSpan="2">Байгуулагын Нэр</td>
                  <td>Албан тушаал</td>
                </tr>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="columns">
        <div className="column is-9" />

        <div className="column is-3 has-text-right">
          <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хэвлэх
          </button>
          <button className="buttonTsenkher" style={{ marginRight: "0.4rem" }}>
            Хадгалах
          </button>
          <button className="buttonTsenkher">Хадгалаад харах</button>
        </div>
      </div>
    </div>
  );
}

export default AnketNeg;
