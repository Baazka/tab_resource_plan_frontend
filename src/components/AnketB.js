import React, { useState, useEffect } from "react";
import SideBar from "../components/sidebar";
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
const axios = require("axios");

var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function AnketB(props) {
  console.log("anketB", JSON.parse(localStorage.getItem("personDetail")));
  const [menu, setMenu] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Header title="АНКЕТ Б"></Header>
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
            III. АЛБАН ТУШААЛ
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
            IV.УРАМШУУЛАЛ
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
            V.НӨХӨХ ТӨЛБӨР
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
            VI.ТУСЛАМЖ
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
            VII. СУРГАЛТ
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
            VIII. ШИЙТГЭЛ
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
            IX. ХУВИЙН ХЭРЭГ
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
            {menu === 1 ? <AlbanTushaal loading={setLoading} /> : null}
            {menu === 2 ? <TsalinHuls loading={setLoading} /> : null}
            {menu === 3 ? <Uramshuulal loading={setLoading} /> : null}
            {menu === 4 ? <NuhuhMulbur loading={setLoading} /> : null}
            {menu === 5 ? <Tuslamj loading={setLoading} /> : null}
            {menu === 6 ? <Surgalt loading={setLoading} /> : null}
            {menu === 7 ? <Shiitgel loading={setLoading} /> : null}
            {menu === 8 ? <HuwiinHereg loading={setLoading} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbanTushaal(props) {
  const [turul, setTurul] = useState("urdun");
  return (
    <div>
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Нэг.</span> Үндсэн мэдээлэл{" "}
            <label className="checkbox"></label>
          </div>
          <div className="column is-1"></div>
          <div className="column is-1"></div>
        </div>
        <div className="columns">
          <div className="column is-3  has-text-right">Ажилтаны төрөл</div>
          <div className="column is-2">
            <select
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"default"}
            >
              <option value="default"></option>
              <option value="saab">Saab</option>
            </select>
          </div>
          <div className="column is-3 has-text-right">
            Албан тушаалын зэрэглэл
          </div>
          <div className="column is-4 ">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"ТАБ-5"}
            ></input>
          </div>
        </div>
        <div className="columns">
          <div className="column is-3  has-text-right">Газар Нэгжийн нэр </div>
          <div className="column is-2">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"Хөгжилийн бодлого төрөвл...."}
            ></input>
          </div>
          <div className="column is-3 has-text-right">Тушаалын дугаар</div>
          <div className="column is-4 ">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={""}
            ></input>
          </div>
        </div>
        <div className="columns">
          <div className="column is-3  has-text-right">
            Албан хэлтэсийн нэр{" "}
          </div>
          <div className="column is-2">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"Сургалтын хэлтэс"}
            ></input>
          </div>
          <div className="column is-3  has-text-right">
            Тушаалын хэрэгжих огноо
          </div>
          <div className="column is-4 ">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={""}
            ></input>
          </div>
        </div>
        <div className="columns">
          <div className="column is-3  has-text-right">Албан тушаалын нэр</div>
          <div className="column is-2">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"Сургалтын менежер"}
            ></input>
          </div>
          <div className="column is-3 has-text-right">
            Тушаал бүртгэсэн огноо
          </div>
          <div className="column is-4 ">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={""}
            ></input>
          </div>
        </div>
        <div className="columns">
          <div
            className="column is-3  has-text-right"
            style={{ marginBottom: "0px" }}
          >
            Албан тушаалын төрөл
          </div>
          <div className="column is-2">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"Төрийн тусгай"}
            ></input>
          </div>
          <div className="column is-3 has-text-right">
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
          </div>
        </div>
        <div className="columns">
          <div className="column is-3  has-text-right">
            Албан тушаалын ангилал
          </div>
          <div className="column is-2">
            <input
              style={{ border: "2px solid silver", width: "15rem" }}
              value={"Төрийн Аудитын ахлах тү....."}
            ></input>
          </div>
        </div>
      </div>
      <div
        className="box"
        style={{
          marginTop: "10px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <th>
              <span style={{ color: "#418ee6" }}>Хоёр.</span>Албан тушаалын
              томилгоо{" "}
            </th>
          </div>
        </div>
        <div className="columns is-gapless">
          <div className="column is-3">
            <table
              className="table is-bordered "
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <td>№</td>
                  <td>Газар нэгжийн нэр</td>
                  <td>Албан хэлтсийн нэр</td>
                  <td>Албан тушаалын төрөл</td>
                  <td>Албан тушаалын зэрэглэл</td>
                  <td>Тушаалын дугаар</td>
                  <td>Томилсон огноо</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="column is-9" />
          </div>
          <div
            className="column is-2 "
            style={{ marginTop: "115px", marginLeft: "17rem" }}
          >
            <img src={M} width="30px" height="30px" />
          </div>
        </div>
      </div>
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns is-gapless">
          <div className="column is-10">
            <div className="columns">
              <div className="column is-2">
                <th>
                  <span style={{ color: "#418ee6" }}>Гурав.</span>Цалин хөлсний
                  мэдээлэл{" "}
                </th>
              </div>
            </div>
            <table
              className="table is-bordered "
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <td>№</td>
                  <td>Цалингийн төрөл</td>
                  <td>Цалин хөлс нэмэгдэлийн нэр</td>
                  <td>Цалин хөлс Өөрчилсөн үндэслэл</td>
                  <td>Тушаалын нэр</td>
                  <td>Тушаалын дугаар</td>
                  <td>Томилсон огноо</td>
                  <td>Тайлбар</td>
                </tr>
              </thead>
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
              </tbody>
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
              </tbody>
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
              </tbody>
            </table>
          </div>
          <div className="column is-2 " style={{ marginTop: "160px" }}>
            <img src={M} width="30px" height="30px" />
          </div>
        </div>
      </div>
    </div>
  );
}
function TsalinHuls(props) {
  const [zasakhTowch, setZasakhTowch] = useState(false);
  return (
    <div
      className="box"
      style={{
        marginTop: "80px",
        width: "98%",
        height: "auto",
        marginLeft: "15px",
      }}
    >
      <div className="columns">
        <div className="column is-11">
          <span style={{ color: "#418ee6" }}>Гурав.</span>
          <span>Цалин хөлсний талаарх мэдээлэл</span>
        </div>
        <div className="column is-1">
          <button
            onClick={() => setZasakhTowch(!zasakhTowch)}
            className="buttonTsenkher"
          >
            Засварлах
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-7">
          <article className="message is-info ">
            <div className="message-body">
              <strong style={{ color: "black" }}>
                (Төрийн албаны тухай хуулийн 57 дугаар зүйлийн 57.2-т заасан
                цалин хөлсийг бичнэ)
              </strong>
            </div>
          </article>
        </div>
      </div>
      <div className="columns">
        <div className="column is-7">
          <article className="message is-info ">
            <div className="message-body">
              <strong style={{ color: "black" }}>Цалин хөлс /мян.мөр/</strong>
            </div>
          </article>
        </div>
      </div>
      <div className="table ">
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>№</th>
              <th>Цалингийн төрөл</th>
              <th>Цалин хөлс/нэмэгдэлийн нэр</th>
              <th>Цалин хөлс өөрчилсөн үндэслэл</th>
              <th>Шийдвэр, тушаалын нэр</th>
              <th>Шийдвэр, тушаалын дугаар</th>
              <th>Шийдвэр, тушаалын огноо</th>
              <th>Тайлбар</th>
              <th
                style={{
                  paddingLeft: "13px",
                  width: "80px",
                  textAlignLast: "start",
                }}
              >
                <img src={Add} width="30px" height="30px" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="classTbdy">
                <input style={{ width: "2rem" }} />
              </td>
              <td className="classTbdy">
                <input style={{ color: "silver" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="classTbdy">
                <input style={{ width: "2rem" }} />
              </td>
              <td className="classTbdy">
                <input />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input style={{ width: "-webkit-fill-available" }} />
              </td>
              <td className="classTbdy">
                <input />
              </td>
              <td className="classTdby">
                <img src={Delete} width="30px" height="30px" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {zasakhTowch ? (
        <div className="columns ">
          <div className="column is-11" />

          <div className="column is-1">
            {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
            <button className="buttonTsenkher">Хадгалах</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Uramshuulal(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Promotion/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Promotion === undefined || data?.Promotion?.length === 0)
      loadData({
        Promotion: [
          {
            PROMOTION_ID: 1,
            PROMOTION_NAME: "",
            PROMOTION_AMOUNT: 0,
            DECISION_NAME: "",
            DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            DECISION_NO: "",
            PROMOTION_MOTIVE: "",
            PROMOTION_DESC: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);

  async function addRow() {
    let value = data.Promotion;
    value.push({
      PROMOTION_ID: 1,
      PROMOTION_NAME: "",
      PROMOTION_AMOUNT: 0,
      DECISION_NAME: "",
      DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      DECISION_NO: "",
      PROMOTION_MOTIVE: "",
      PROMOTION_DESC: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Promotion: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/PromotionDelete",
        method: "POST",
        data: {
          Promotion: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Promotion: data?.Promotion.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Promotion?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Promotion?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Promotion",
          method: "POST",
          data: { Promotion: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Promotion",
          method: "PUT",
          data: {
            Promotion: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Promotion.length; i++) {
      if (
        data.Promotion[i].PROMOTION_NAME === null ||
        data.Promotion[i].PROMOTION_NAME === ""
      ) {
        alert.show("Урамшууллын нэр оруулан уу");
        return false;
      } else if (
        data.Promotion[i].DECISION_NAME === null ||
        data.Promotion[i].DECISION_NAME === ""
      ) {
        alert.show("Шийдвэрийн нэр оруулан уу");
        return false;
      } else if (
        data.Promotion[i].DECISION_NO === null ||
        data.Promotion[i].DECISION_NO === ""
      ) {
        alert.show("Шийдэрийн дугаар оруулан уу");
        return false;
      } else if (
        data.Promotion[i].PROMOTION_MOTIVE === null ||
        data.Promotion[i].PROMOTION_MOTIVE === ""
      ) {
        alert.show("Урамшуулал үндэслэл оруулан уу");
        return false;
      } else if (i === data.Promotion.length - 1) {
        return true;
      }
    }
  }

  let listItems;
  if (data?.Promotion !== undefined || data?.Promotion?.length !== 0) {
    listItems = (
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Дөрөв. </span>
            <span>Урамшууллын талаарх мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>

        <div className="columns" style={{ marginBottom: "0px" }}>
          <div className="column is-7">
            <article className="message is-info ">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  (Төрийн албаны тухай хуулийн 51 дугаар зүйлийн 51.1,51,4-т
                  заасан урамшууллыг бичнэ)
                </strong>
              </div>
            </article>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th>Урамшууллын нэр </th>
              <th>Урамшууллын мөнгөн дүн /мян.төг/</th>
              <th>Шийдвэрийн нэр</th>
              <th>Шийдвэр огно</th>
              <th>Шийдэрийн дугаар </th>
              <th>Урамшуулал үндэслэл</th>
              <th>Тайлбар</th>
              {!zasakhTowch ? (
                <th
                  style={{
                    paddingLeft: "0px",
                    width: "80px",
                    textAlignLast: "start",
                  }}
                >
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Promotion?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.PROMOTION_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].PROMOTION_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.PROMOTION_AMOUNT}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].PROMOTION_AMOUNT = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].DECISION_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      data.Promotion[index].DECISION_DATE,
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Promotion];
                      temp[index].DECISION_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NO}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].DECISION_NO = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.PROMOTION_MOTIVE}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].PROMOTION_MOTIVE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.PROMOTION_DESC}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Promotion];
                      temp[index].PROMOTION_DESC = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Promotion: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTbdy">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />

            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function NuhuhMulbur(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/amends/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems, "amends");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Amends === undefined || data?.Amends?.length === 0)
      loadData({
        Amends: [
          {
            AMENDS_ID: 1,
            AMENDS_NAME: "",
            AMENDS_AMOUNT: 0,
            DECISION_NAME: "",
            DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            DECISION_NO: "",
            AMENDS_MOTIVE: "",
            AMENDS_DESC: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);

  async function addRow() {
    let value = data.Amends;
    value.push({
      AMENDS_ID: 1,
      AMENDS_NAME: "",
      AMENDS_AMOUNT: 0,
      DECISION_NAME: "",
      DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      DECISION_NO: "",
      AMENDS_MOTIVE: "",
      AMENDS_DESC: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Amends: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/amendsDelete",
        method: "POST",
        data: {
          Amends: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Amends: data?.Amends.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Amends?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Amends?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/amends",
          method: "POST",
          data: { Amends: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/amends",
          method: "PUT",
          data: {
            Amends: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Amends.length; i++) {
      if (
        data.Amends[i].AMENDS_NAME === null ||
        data.Amends[i].AMENDS_NAME === ""
      ) {
        alert.show("Нөхөх төлбөрийн нэр оруулан уу");
        return false;
      } else if (
        data.Amends[i].DECISION_NAME === null ||
        data.Amends[i].DECISION_NAME === ""
      ) {
        alert.show("Шийдвэрийн нэр оруулан уу");
        return false;
      } else if (
        data.Amends[i].DECISION_NO === null ||
        data.Amends[i].DECISION_NO === ""
      ) {
        alert.show("Шийдэрийн дугаар оруулан уу");
        return false;
      } else if (
        data.Amends[i].AMENDS_DESC === null ||
        data.Amends[i].AMENDS_DESC === ""
      ) {
        alert.show("Нөхөх төлбөр олгосон үндэслэл оруулан уу");
        return false;
      } else if (i === data.Amends.length - 1) {
        return true;
      }
    }
  }

  let listItems;
  if (data?.Amends !== undefined || data?.Amends?.length !== 0) {
    listItems = (
      <div
        className=" box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Тав.</span>
            <span>Урамшууллын талаарх мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-7">
            <article className="message is-info ">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  (Төрийн албаны тухай хуулийн 51 дугаар зүйлийн 51.1,51,4-т
                  заасан урамшууллыг бичнэ)
                </strong>
              </div>
            </article>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th>Нөхөх төлбөрийн нэр</th>
              <th>Нөхөх төлбөрийн мөнгөн дүн/мян.төг/</th>
              <th>Шийдвэрийн нэр</th>
              <th>Шийдвэрийн огноо</th>
              <th>Шийдэрийн дугаар </th>
              <th>Нөхөх төлбөр олгосон үндэслэл</th>
              <th>Тайлбар</th>
              {!zasakhTowch ? (
                <th
                  style={{
                    paddingLeft: "12px",
                    width: "70px",
                    textAlignLast: "start",
                  }}
                >
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Amends?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AMENDS_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].AMENDS_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AMENDS_AMOUNT}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].AMENDS_AMOUNT = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].DECISION_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      data.Amends[index].DECISION_DATE,
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Amends];
                      temp[index].DECISION_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NO}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].DECISION_NO = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AMENDS_MOTIVE}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].AMENDS_MOTIVE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AMENDS_DESC}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Amends];
                      temp[index].AMENDS_DESC = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Amends: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTdby">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />

            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Tuslamj(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Aid/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems?.data.Aid, "Aid");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Aid === undefined || data?.Aid?.length === 0)
      loadData({
        Aid: [
          {
            AID_ID: 1,
            AID_NAME: "",
            AID_AMOUNT: 0,
            DECISION_NAME: "",
            DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            DECISION_NO: "",
            AID_MOTIVE: "",
            AID_DESC: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);

  async function addRow() {
    let value = data.Aid;
    value.push({
      AID_ID: 1,
      AID_NAME: "",
      AID_AMOUNT: 0,
      DECISION_NAME: "",
      DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      DECISION_NO: "",
      AID_MOTIVE: "",
      AID_DESC: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Aid: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/AidDelete",
        method: "POST",
        data: {
          Aid: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Aid: data?.Aid.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Aid?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Aid?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Aid",
          method: "POST",
          data: { Aid: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Aid",
          method: "PUT",
          data: {
            Aid: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Aid.length; i++) {
      if (data.Aid[i].AID_NAME === null || data.Aid[i].AID_NAME === "") {
        alert.show("Тусламжийн нэр оруулан уу");
        return false;
      } else if (
        data.Aid[i].DECISION_NAME === null ||
        data.Aid[i].DECISION_NAME === ""
      ) {
        alert.show("Шийдвэрийн нэр оруулан уу");
        return false;
      } else if (
        data.Aid[i].DECISION_NO === null ||
        data.Aid[i].DECISION_NO === ""
      ) {
        alert.show("Шийдэрийн дугаар оруулан уу");
        return false;
      } else if (
        data.Aid[i].AID_MOTIVE === null ||
        data.Aid[i].AID_MOTIVE === ""
      ) {
        alert.show("Тайлбар оруулан уу");
        return false;
      } else if (data.Aid[i].AID_DESC === null || data.Aid[i].AID_DESC === "") {
        alert.show("Бүрдүүлэлт хийсэн албан хаагчийн нэр оруулан уу");
        return false;
      } else if (i === data.Aid.length - 1) {
        return true;
      }
    }
  }

  let listItems;
  if (data?.Aid !== undefined || data?.Aid?.length !== 0) {
    listItems = (
      <div
        className=" box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Зургаа.</span>
            <span>Тусламжийн талаарх мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-9">
            <article className="message is-info ">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  (Төрийн албаны тухай хуулийн 60 дугаар зүйл, байгууллагын
                  хөдөлмөрийн дотоод журмыг үндэслэн албан хаагчид олгосон
                  Тусламжийг бичнэ)
                </strong>
              </div>
            </article>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th>Тусламжийн нэр</th>
              <th>Тусламжийн мөнгөн дүн /мян.мөг/</th>
              <th>Шийдвэрийн нэр</th>
              <th>Шийдвэрийн огноо</th>
              <th>Шийдэрийн дугаар </th>
              <th>Тусламж олгосон үндэслэл</th>
              <th>Тайлбар</th>
              {!zasakhTowch ? (
                <th style={{ paddingLeft: "0px" }}>
                  {" "}
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Aid?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AID_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].AID_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AID_AMOUNT}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].AID_AMOUNT = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].DECISION_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      data.Aid[index].DECISION_DATE,
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Aid];
                      temp[index].DECISION_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DECISION_NO}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].DECISION_NO = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AID_MOTIVE}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].AID_MOTIVE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.AID_DESC}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Aid];
                      temp[index].AID_DESC = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Aid: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTbdy">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />
            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}
function Surgalt(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/training/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems, "Training");
    loadData(listItems?.data);
  }, [props]);
  useEffect(() => {
    if (data?.Training === undefined || data?.Training?.length === 0)
      loadData({
        Training: [
          {
            TRAINING_ID: 1,
            TRAINING_SOURCE: "",
            TRAINING_PLACE: "",
            TRAINING_ORG: "",
            TRAINING_NAME: "",
            START_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            END_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            TRAINING_DESC: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);
  async function addRow() {
    let value = data.Training;
    value.push({
      TRAINING_ID: 1,
      TRAINING_SOURCE: "",
      TRAINING_PLACE: "",
      TRAINING_ORG: "",
      TRAINING_NAME: "",
      START_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      END_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      TRAINING_DESC: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Training: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/TrainingDelete",
        method: "POST",
        data: {
          Training: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Training: data?.Training.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }
  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Training?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Training?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Training",
          method: "POST",
          data: { Training: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Training",
          method: "PUT",
          data: {
            Training: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Training.length; i++) {
      if (
        data.Training[i].TRAINING_SOURCE === null ||
        data.Training[i].TRAINING_SOURCE === ""
      ) {
        alert.show("Хөтөлбөрийн эх үүсвэр оруулан уу");
        return false;
      } else if (
        data.Training[i].TRAINING_PLACE === null ||
        data.Training[i].TRAINING_PLACE === ""
      ) {
        alert.show("Мэргэшүүлэх сургалтанд хамрагдсан газар оруулан уу");
        return false;
      } else if (
        data.Training[i].TRAINING_ORG === null ||
        data.Training[i].TRAINING_ORG === ""
      ) {
        alert.show("Хаана, дотоод гадаадын ямар байгууллагад оруулан уу");
        return false;
      } else if (
        data.Training[i].TRAINING_NAME === null ||
        data.Training[i].TRAINING_NAME === ""
      ) {
        alert.show("Мэргэшүүлэх сургалтын нэр оруулан уу");
        return false;
      } else if (
        data.Training[i].TRAINING_DESC === null ||
        data.Training[i].TRAINING_DESC === ""
      ) {
        alert.show("Ямар чиглэлээр оруулан уу");
        return false;
      } else if (i === data.Training.length - 1) {
        return true;
      }
    }
  }
  let listItems;
  if (data?.Training !== undefined || data?.Training?.length !== 0) {
    listItems = (
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Долоо.</span>
            <span>Сургалтанд хамрагдсан талаарх мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-7">
            <article className="message is-info ">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  Байгууллагын хөдөлмөрийн дотоод журам, бусад хөтөлбөр эх
                  үүсвэрээс албан хаагчийн хамрагдсан сургалтыг бүртгэнэ.
                </strong>
              </div>
            </article>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th>Хөтөлбөрийн эх үүсвэр</th>
              <th>Мэргэшүүлэх сургалтанд хамрагдсан газар</th>
              <th>Хаана, дотоод гадаадын ямар байгууллагад</th>
              <th>Мэргэшүүлэх сургалтын нэр</th>
              <th>Эхэлсэн он,сар,өдөр </th>
              <th>Дууссан он,сар,өдөр</th>

              <th>Ямар чиглэлээр</th>
              {!zasakhTowch ? (
                <th
                  style={{
                    paddingLeft: "0px",
                    width: "80px",
                    textAlignLast: "start",
                  }}
                >
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Training?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.TRAINING_SOURCE}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Training];
                      temp[index].TRAINING_SOURCE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.TRAINING_PLACE}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Training];
                      temp[index].TRAINING_PLACE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.TRAINING_ORG}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Training];
                      temp[index].TRAINING_ORG = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.TRAINING_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Training];
                      temp[index].TRAINING_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      data.Training[index].START_DATE,
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Training];
                      temp[index].START_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      data.Training[index].END_DATE,
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Training];
                      temp[index].END_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.TRAINING_DESC}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Training];
                      temp[index].TRAINING_DESC = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Training: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTbdy">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />

            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}
function Shiitgel(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();

  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/Punishment/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems, "Punishment");
    loadData(listItems?.data);
  }, [props]);
  useEffect(() => {
    if (data?.Punishment === undefined || data?.Punishment?.length === 0)
      loadData({
        Punishment: [
          {
            PUNISHMENT_ID: 1,
            PUNISHMENT_HOLDER: "",
            DECISION_NAME: "",
            DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            DECISION_NO: "",
            PUNISHMENT_DESC: "",
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);
  async function addRow() {
    let value = data.Punishment;
    value.push({
      PUNISHMENT_ID: 1,
      PUNISHMENT_HOLDER: "",
      DECISION_NAME: "",
      DECISION_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      DECISION_NO: "",
      PUNISHMENT_DESC: "",
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Punishment: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/PunishmentDelete",
        method: "POST",
        data: {
          Punishment: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Punishment: data?.Punishment.filter(
        (element, index) => index !== indexParam
      ),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Punishment?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Punishment?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insertPunishment", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Punishment",
          method: "POST",
          data: { Punishment: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("updatePunishment", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/Punishment",
          method: "PUT",
          data: {
            Punishment: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Punishment.length; i++) {
      if (
        data.Punishment[i].PUNISHMENT_HOLDER === null ||
        data.Punishment[i].PUNISHMENT_HOLDER === ""
      ) {
        alert.show("Шийтгэл ногдуулсан албан тушаалтан оруулан уу");
        return false;
      } else if (
        data.Punishment[i].DECISION_NAME === null ||
        data.Punishment[i].DECISION_NAME === ""
      ) {
        alert.show("Шийдтэрийн нэр оруулан уу");
        return false;
      } else if (
        data.Punishment[i].DECISION_NO === null ||
        data.Punishment[i].DECISION_NO === ""
      ) {
        alert.show("Шийдвэрийн дугаар оруулан уу");
        return false;
      } else if (
        data.Punishment[i].PUNISHMENT_DESC === null ||
        data.Punishment[i].PUNISHMENT_DESC === ""
      ) {
        alert.show("Юуны учир, ямар шийтгэл ногдуулсан оруулан уу");
        return false;
      } else if (i === data.Punishment.length - 1) {
        return true;
      }
    }
  }
  let listItems;
  if (data?.Punishment !== undefined || data?.Punishment?.length !== 0) {
    listItems = (
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Найм.</span>
            <span>Цалин хөлсний талаарх мэдээлэл</span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-11">
            <article className="message is-info ">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  ( Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.1 буюу уг
                  хуулийн 37 , 39 дүгээр зүйлд заасныг болон 40 дүгээр зүйлийн
                  40.1 , 40.2 - т заасны дагуу эрх бүхий байгууллагаас тогтоосон
                  төрийн албан хаагчийн ёс зүйн хэм хэмжээг зөрчсөний улмаас
                  ногдуулсан сахилгын шийтгэлийг бичнэ.)
                </strong>
              </div>
            </article>
          </div>
        </div>
        <div className="columns">
          <div className="column is-11">
            <article className="message is-info">
              <div className="message-body">
                <strong style={{ color: "black" }}>
                  ('Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.6-д заасныг
                  үндэслэн сахилгын шийтгэлгүйд тооцсон тухай энэ хэсэгт бичиж
                  болно.)
                </strong>
              </div>
            </article>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th>
                Шийтгэл ногдуулсан
                <br /> албан тушаалтан
              </th>
              <th>Шийдтэрийн нэр</th>
              <th>
                Шийдвэрийн
                <br /> огноо
              </th>
              <th>
                Шийдвэрийн
                <br /> дугаар
              </th>
              <th>
                Юуны учир, ямар
                <br /> шийтгэл ногдуулсан
              </th>
              {!zasakhTowch ? (
                <th style={{ paddingLeft: "0px" }}>
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Punishment?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>

                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.PUNISHMENT_HOLDER}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Punishment];
                      temp[index].PUNISHMENT_HOLDER = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Punishment: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    value={value.DECISION_NAME}
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Punishment];
                      temp[index].DECISION_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Punishment: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(value.DECISION_DATE, "yyyy-mm-dd")}
                    onChange={(e) => {
                      let temp = [...data?.Punishment];
                      temp[index].DECISION_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Punishment: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    value={value.DECISION_NO}
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Punishment];
                      temp[index].DECISION_NO = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Punishment: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    value={value.PUNISHMENT_DESC}
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Punishment];
                      temp[index].PUNISHMENT_DESC = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Punishment: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTbdy">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />

            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }

  return listItems;
}

function HuwiinHereg(props) {
  const [zasakhTowch, setZasakhTowch] = useState(true);
  const [data, loadData] = useState(null);
  const alert = useAlert();
  useEffect(async () => {
    let listItems = await axios(
      "http://172.16.24.103:3002/api/v1/document/" +
        JSON.parse(
          localStorage.getItem("personDetail") === undefined
            ? "{}"
            : localStorage.getItem("personDetail")
        )?.emp_id
      // + props.person_id
    );
    console.log(listItems, "Tangarag");
    loadData(listItems?.data);
  }, [props]);

  useEffect(() => {
    if (data?.Document === undefined || data?.Document?.length === 0)
      loadData({
        Document: [
          {
            DOCUMENT_ID: 1,
            DOCUMENT_NAME: "",
            DOCUMENT_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
            PAGE_COUNT: 0,
            PROCESS_NOTE: "",
            COMPLETION_POSISION: "",
            COMPLETION_ENTRY_NAME: "",
            DOCUMENT_URL: null,
            PERSON_ID: props.person_id,
            IS_ACTIVE: "1",
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            ROWTYPE: "NEW",
            EMP_ID: JSON.parse(
              localStorage.getItem("personDetail") === undefined
                ? "{}"
                : localStorage.getItem("personDetail")
            )?.emp_id,
          },
        ],
      });
  }, [data]);

  async function addRow() {
    let value = data.Document;
    value.push({
      DOCUMENT_ID: 1,
      DOCUMENT_NAME: "",
      DOCUMENT_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      PAGE_COUNT: 0,
      PROCESS_NOTE: "",
      COMPLETION_POSISION: "",
      COMPLETION_ENTRY_NAME: "",
      DOCUMENT_URL: null,
      PERSON_ID: props.person_id,
      IS_ACTIVE: "1",
      CREATED_BY: userDetils?.USER_ID,
      CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      ROWTYPE: "NEW",
      EMP_ID: JSON.parse(
        localStorage.getItem("personDetail") === undefined
          ? "{}"
          : localStorage.getItem("personDetail")
      )?.emp_id,
    });

    await loadData({ Document: value });
  }
  function removeRow(indexParam, value) {
    if (value?.ROWTYPE !== "NEW") {
      DataRequest({
        url: "http://172.16.24.103:3002/api/v1/documentDelete",
        method: "POST",
        data: {
          Document: {
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
            setZasakhTowch(!zasakhTowch);
          }
        })
        .catch(function (error) {
          //alert(error.response.data.error.message);
          console.log(error.response);
          alert.show("aldaa");
        });
    }
    loadData({
      Document: data?.Document.filter((element, index) => index !== indexParam),
    }); //splice(indexParam, 0)
  }

  function saveToDB() {
    props.loading(true);
    if (requiredField(data) === true) {
      let newRow = data?.Document?.filter((value) => value.ROWTYPE === "NEW");
      let oldRow = data?.Document?.filter(
        (value) =>
          value.ROWTYPE !== "NEW" && value.UPDATED_BY === userDetils?.USER_ID
      );
      let message = 0;

      if (newRow?.length > 0) {
        console.log("insert", JSON.stringify(newRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/document",
          method: "POST",
          data: { Document: newRow },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 1;
              if (message !== 2) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
            //history.push('/sample')
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
      if (oldRow?.length > 0) {
        console.log("update", JSON.stringify(oldRow));
        DataRequest({
          url: "http://172.16.24.103:3002/api/v1/document",
          method: "PUT",
          data: {
            Document: oldRow,
            UPDATED_BY: userDetils?.USER_ID,
            UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          },
        })
          .then(function (response) {
            console.log("UpdateResponse", response);
            if (response?.data?.message === "success") {
              message = 2;
              //history.push('/sample')
              if (message !== 1) alert.show("амжилттай хадгаллаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            } else {
              alert.show("амжилтгүй алдаа");
              setZasakhTowch(!zasakhTowch);
              props.loading(false);
            }
          })
          .catch(function (error) {
            //alert(error.response.data.error.message);
            console.log(error.response);
            alert.show("амжилтгүй алдаа");
            setZasakhTowch(!zasakhTowch);
            props.loading(false);
          });
      }
    } else {
      props.loading(false);
    }
  }
  function requiredField() {
    for (let i = 0; i < data.Document.length; i++) {
      if (
        data.Document[i].DOCUMENT_NAME === null ||
        data.Document[i].DOCUMENT_NAME === ""
      ) {
        alert.show("Баримт бичгийн нэр оруулан уу");
        return false;
      } else if (
        data.Document[i].COMPLETION_POSISION === null ||
        data.Document[i].COMPLETION_POSISION === ""
      ) {
        alert.show("Бүрдүүлэлт хийсэн албан тушаалтан оруулан уу");
        return false;
      } else if (
        data.Document[i].COMPLETION_ENTRY_NAME === null ||
        data.Document[i].COMPLETION_ENTRY_NAME === ""
      ) {
        alert.show("Бүрдүүлэлт хийсэн албан хаагчийн нэр оруулан уу");
        return false;
      } else if (i === data.Document.length - 1) {
        return true;
      }
    }
  }

  let listItems;
  if (data?.Document !== undefined || data?.Document?.length !== 0) {
    listItems = (
      <div
        className="box"
        style={{
          marginTop: "80px",
          width: "98%",
          height: "auto",
          marginLeft: "15px",
        }}
      >
        <div className="columns">
          <div className="column is-11">
            <span style={{ color: "#418ee6" }}>Ёс.</span>
            <span>
              Хувийн хэргийн мэдээллийг хянасан, баяжуулсан тухай бүртгэл
            </span>
          </div>
          <div className="column is-1">
            <button
              onClick={() => setZasakhTowch(!zasakhTowch)}
              className="buttonTsenkher"
            >
              Засварлах
            </button>
          </div>
        </div>
        <table className="table" style={{ padding: "0%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <span>№</span>
              </th>
              <th className="classTbdy">Баримт бичгийн нэр</th>
              <th className="classTbdy">Баримт бичигийг бүрдүүлсэн огноо</th>
              <th className="classTbdy">Хуудасны тоо</th>
              <th className="classTbdy">Баяжуулалт хийсэн тухай тэмдэглэл</th>
              <th className="classTbdy">Бүрдүүлэлт хийсэн албан тушаалтан</th>
              <th className="classTbdy">
                Бүрдүүлэлт хийсэн албан хаагчийн нэр
              </th>
              {!zasakhTowch ? (
                <th
                  style={{
                    paddingLeft: "0px",
                    width: "80px",
                    textAlignLast: "start",
                  }}
                >
                  <img
                    src={Add}
                    width="30px"
                    height="30px"
                    onClick={() => addRow()}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data?.Document?.map((value, index) => (
              <tr>
                <td className="classTbdy">
                  <input
                    style={{ width: "2rem" }}
                    value={index + 1}
                    disabled={true}
                  />
                </td>

                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    value={value.DOCUMENT_NAME}
                    disabled={zasakhTowch}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Document];
                      temp[index].DOCUMENT_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    type="date"
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    className="classTbdy"
                    value={dateFormat(
                      new Date(data.Document[index].DOCUMENT_DATE),
                      "yyyy-mm-dd"
                    )}
                    onChange={(e) => {
                      let temp = [...data?.Document];
                      temp[index].DOCUMENT_DATE = e.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    value={value.PAGE_COUNT}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Document];
                      temp[index].PAGE_COUNT = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    value={value.PROCESS_NOTE}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Document];
                      temp[index].PROCESS_NOTE = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    value={value.COMPLETION_POSISION}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Document];
                      temp[index].COMPLETION_POSISION = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                <td className="classTbdy">
                  <input
                    style={{ width: "-webkit-fill-available" }}
                    disabled={zasakhTowch}
                    value={value.COMPLETION_ENTRY_NAME}
                    placeholder="утгаа оруулна уу"
                    onChange={(text) => {
                      let temp = [...data?.Document];
                      temp[index].COMPLETION_ENTRY_NAME = text.target.value;
                      temp[index].UPDATED_BY = userDetils?.USER_ID;
                      temp[index].UPDATED_DATE = dateFormat(
                        new Date(),
                        "dd-mmm-yy"
                      );
                      loadData({ Document: temp });
                    }}
                  />
                </td>
                {!zasakhTowch ? (
                  <td className="classTbdy">
                    <img
                      src={Delete}
                      width="30px"
                      height="30px"
                      onClick={() => removeRow(index, value)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!zasakhTowch ? (
          <div className="columns ">
            <div className="column is-11" />

            <div className="column is-1">
              {/* <button className="button is-info is-small is-focused ml-6">
            Хэвлэх
          </button> */}
              <button className="buttonTsenkher" onClick={saveToDB}>
                Хадгалах
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
export default AnketB;
