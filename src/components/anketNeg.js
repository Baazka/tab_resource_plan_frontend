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
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="АЖИЛТНЫ БҮРТГЭЛИЙН ЖАГСААЛТ" />
      <SideBar />
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
          <img src={BlackNeg} width="50px" height="50px" />
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
      <div
        className=" box"
        style={{
          marginTop: "80px",
          width: "91%",
          height: "35%",
          marginLeft: "10px",
        }}
      >
        <div class="columns ">
          <div class="column is-11">
            <th>Ерөнхий мэдээлэл</th>
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
          <div className="column is-3">Долгор </div>
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
          <div className="column is-3">Батсүмбэр</div>
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
    </div>
  );
}

export default AnketNeg;
