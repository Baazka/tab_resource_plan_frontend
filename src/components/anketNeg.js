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

function AnketNeg(props) {
  console.log("anketA", props.match.params.id);
  const [menu, setMenu] = useState(0);
  function SelectMenu(value) {}

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
          overflow: "scroll",
        }}
      >
        {menu === 1 ? <Yrunkhii /> : null}
        {menu === 2 ? <Kayag /> : null}
        {menu === 3 ? <GerBul /> : null}
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
        <div class="column is-12">
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
      <div class="columns">
        <div class="column is-12 ">
          <span>
            Гэр бүлийн байдал(зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг бичнэ)
          </span>
        </div>
        <div className="column is-1">
          <button className="button is-info is-small is-focused">
            Засварлах
          </button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
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
                  <td colspan="2">Одоо эрхэлэж буй ажил</td>
                </tr>
                <tr>
                  <td rowspan="2">Байгуулагын Нэр</td>
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
      <div class="columns">
        <div class="column is-12 ">
          <em className="utas m-1">
            Садан төрлийн байдал (таны, эцэг, эх төрөн ах, эгч дүү, өрх
            тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг
            орлуулна)
          </em>
        </div>
      </div>

      <div class="columns">
        <div class="column is-12 ">
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
                  <td colspan="2">Одоо эрхэлэж буй ажил</td>
                </tr>
                <tr>
                  <td rowspan="2">Байгуулагын Нэр</td>
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
      <div class="columns">
        <div class="column is-9" />

        <div class="column is-3 has-text-right">
          <button className="button is-info is-small is-focused ml-4">
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
