import React, { useState } from "react";
import SideBar from "../components/sidebar";
import Header from "../components/header";
import {
  AvatarB,
  Face,
  Trush,
  Warning,
  BlackNeg,
  BlackKhoyor,
  BlackKGurav,
  BlackDuruv,
  BlackTav,
  BlackZurgaa,
  BlackDoloo,
  BlackNaim,
} from "../assets/images/zurag";

function AnketNeg(props) {
  console.log("anketA", props.match.params.id);
  const [menu, setMenu] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
  });
  function menuClick(value) {}

  return (
    <div
      style={{
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="АНКЕТ А"></Header>
      <div
        style={{
          width: "25%",
          marginLeft: "7.5rem",
          textAlign: "center",
          borderRight: "1px solid #ececec",
        }}
      >
        <div style={{ marginTop: "8rem" }}>
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

        <div className="AnketList" style={{ marginTop: "4rem" }}>
          <img src={BlackNeg} width="45px" height="45px" />
          <span className="AnketListText" onClick={() => menuClick(1)}>
            I-II. ХУВЬ ХҮНИЙ <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackKhoyor} width="45px" height="45px" />
          <span className="AnketListText">
            II. УР ЧАДВАРЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackKGurav} width="45px" height="45px" />
          <span className="AnketListText">
            III. БОЛОВСРОЛЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackDuruv} width="45px" height="45px" />
          <span className="AnketListText">
            IV. МЭРГЭЖЛИЙН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackTav} width="45px" height="45px" />
          <span
            className="AnketListText"
            style={{ marginRight: "3rem", marginLeft: "1rem" }}
          >
            V. ЦЭРГИЙН АЛБА <br /> ХААСАН ЭСЭХ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackZurgaa} width="45px" height="45px" />
          <span className="AnketListText">
            VI. ШАГНАЛЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackDoloo} width="45px" height="45px" />
          <span className="AnketListText">
            VII. ТУРШЛАГЫН <br />
            ТАЛААРХ МЭДЭЭЛЭЛ
          </span>
        </div>
        <div className="AnketList">
          <img src={BlackNaim} width="45px" height="45px" />
          <span className="AnketListText" style={{ marginRight: "4rem" }}>
            VIII. БҮТЭЭЛИЙН <br /> ЖАГСААЛТ
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Yrunkhii />
        <Kayag />
      </div>
    </div>
  );
}

function Yrunkhii(props) {
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
      <div class="columns ">
        <div class="column is-11">
          <span>Ерөнхий мэдээлэл</span>
        </div>
        <div class="column is-1">
          <button className="button is-info is-small is-focused ">
            Засварлах
          </button>
        </div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right ">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Эцэг эхийн нэр</span>
        </div>
        <div className="column is-3">Буянбадрах </div>
        <div className="column is-3 has-text-right ">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Хүйс</span>
        </div>
        <div className="column is-3">Эрэгтэй</div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3  has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Өөрийн нэр</span>
        </div>
        <div className="column is-3">Баянжаргал</div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн он,сар,өдөр</span>
        </div>
        <div className="column is-3">2021.05.31</div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Регистерийн дугаар</span>
        </div>
        <div className="column is-3">ЖИ88945687</div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн аймаг,хот</span>
        </div>
        <div className="column is-3">Улаанбаатар</div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ирэгншил</span>
        </div>
        <div className="column is-3">Монгол</div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн сум,дүүрэг</span>
        </div>
        <div className="column is-3">Баянзүрэх дүүрэг</div>
      </div>
      <div className="columns" style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Ургийн овог</span>
        </div>
        <div className="column is-3">Боржигон</div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Төрсөн газар</span>
        </div>
        <div className="column is-3">Хэнтий аймаг Бугант сум</div>
      </div>
      <div className="columns " style={{ marginBottom: "0px" }}>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Үндэс угсаа</span>
        </div>
        <div className="column is-3">Халх </div>
        <div className="column is-3 has-text-right">
          <span style={{ color: "red" }}>*</span>
          <span className="textSaaral">Гэрлэсэн эсэх</span>
        </div>
        <div className="column is-3">Тийм </div>
      </div>

      <div class="columns">
        <div class="column is-10"></div>

        <div class="column is-3">
          <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button>
          <button className="button is-info is-small is-focused ml-1">
            Хадгалах
          </button>
        </div>
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
      <div class="columns">
        <div class="column is-11">
          <span>Хаягийн мэдээлэл</span>
        </div>
        <div class="column is-1">
          <button className="button is-info is-small is-focused ">
            Засварлах
          </button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-1"></div>
        <div class="column is-11">
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
          <div class="columns">
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
      <div class="columns">
        <div class="column is-1"></div>
        <div class="column is-8 ">
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

        <div class="column is-3"></div>
      </div>
      <div className="columns">
        <div className="column is-9"></div>
        <div className="column is-3 has-text-right">
          <button className="button is-info is-small is-focused ml-3">
            Хэвлэх
          </button>
          <button className="button is-info is-small is-focused ml-3">
            Хадгалах
          </button>
          <button className="button is-info is-small is-focused ml-3">
            Хадгалаад харах
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnketNeg;
