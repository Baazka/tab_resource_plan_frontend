import React, { useState, useEffect, useReducer } from "react";
import { FamilyArray } from "../components/library";
var dateFormat = require("dateformat");
const axios = require("axios");

function AnketAPrint(props) {
  useEffect(() => {
    console.log("anketAprintProps", props);
  }, [props]);

  return (
    <div style={{ padding: "20px" }}>
      <Yrunkhii
        person_ID={
          props.print.person_ID == undefined
            ? props.print.emp_ID
            : props.print.person_ID
        }
        buttonValue={props.print.buttonValue === 1 ? 0 : 1}
      />
    </div>
  );
}

function Yrunkhii(props) {
  const [data, loadData] = useState();
  let listItems;
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/person/" +
          props.buttonValue +
          "/" +
          props.person_ID +
          "/"
      );
      console.log("Yrunkhii", listItems.data);
      loadData(listItems?.data);
    }
    fetchdata();
  }, [props]);

  if (data != undefined && data !== null) {
    listItems = (
      <div style={{ fontSize: "14px" }}>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> хоёрдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right is-size-5">Маягт 1</h1>
        <h1
          className="level-item"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ <br />
          “А ХЭСЭГ”
        </h1>
        <div className="columns">
          <div className="column is-6">
            <h1 style={{ fontWeight: "bold" }}>
              Нэг.Хувь хүний талаарх мэдээлэл
            </h1>

            <div style={{ display: "flex" }}>
              <p>Регистрийн дугаар: &nbsp;</p>
              <table className="table is-bordered">
                <tbody>
                  <tr>
                    <td>{data.PERSON_REGISTER_NO.slice(0, 1)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(1, 2)}</td>
                    <td style={{ border: "none" }}></td>
                    <td>{data.PERSON_REGISTER_NO.slice(2, 3)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(3, 4)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(4, 5)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(5, 6)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(6, 7)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(7, 8)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(8, 9)}</td>
                    <td>{data.PERSON_REGISTER_NO.slice(9, 10)}</td>{" "}
                  </tr>
                </tbody>
              </table>
            </div>

            <h1>1.1. Иргэншил &nbsp;{data.NATIONAL_NAME}</h1>
            <h1>1.2. Ургийн овог: &nbsp;{data.SURNAME}</h1>

            <h1>
              1.3. Эцэг ( эх)-ийн нэр: &nbsp;
              {data.PERSON_LASTNAME}
            </h1>

            <h1>
              1.4. Өөрийн нэр: &nbsp;{data.PERSON_FIRSTNAME} &nbsp; 1.5. Хүйс:{" "}
            </h1>
            <h1>
              1.5. Төрсөн: &nbsp;
              {dateFormat(data.PERSON_BORNDATE, "yyyy-mm-dd")}
            </h1>
            <h1>
              1.6. Төрсөн аймаг, хот ,улс: &nbsp;{data.OFFICE_NAME}
              сум, дүүрэг: &nbsp; {data.SUB_OFFICE_NAME}
              <br /> Төрсөн газар: &nbsp;{data.SUB_OFFICE_NAME}
            </h1>
            <h1>1.7. Үндэс, угсаа: &nbsp;{data.DYNASTY_NAME}</h1>
          </div>
          <div className="column is-6">
            <div
              className="box level-item"
              style={{
                textAlign: "center",
                marginLeft: "60%",
                marginRight: "10%",
                height: "70%",
                padding: "3rem",
              }}
            >
              Цээж зураг
              <br />
              4Х6
            </div>
          </div>
        </div>
        <Gerbul person_ID={data?.PERSON_ID} />
        <Sadan person_ID={data?.PERSON_ID} khayag={data} />
        <UrChadvar person_ID={data?.PERSON_ID} />
        <Bolowsrol person_ID={data?.PERSON_ID} />
        <Medeelel person_ID={data?.PERSON_ID} />
        <TsolDew person_ID={data?.PERSON_ID} />
        <TsergiinAlba person_ID={data?.PERSON_ID} />
        <Shalgagdahch person_ID={data?.PERSON_ID} />
        <Tushaal person_ID={data?.PERSON_ID} />
        <BvteeliinJagsaalt person_ID={data?.PERSON_ID} />
      </div>
    );
  } else {
    listItems = (
      <div>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> хоёрдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right is-size-5">Маягт 1</h1>
        <h1 className="level-item is-size-5" style={{ fontWeight: "bold" }}>
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ “А ХЭСЭГ”{" "}
        </h1>
        <h1 className="is-size-5" style={{ fontWeight: "bold" }}>
          Нэг.Хувь хүний талаарх мэдээлэл
        </h1>
        <div>
          <p>Регистрийн дугаар:</p>
          <span></span>
        </div>
        <h1>
          1.1. Иргэншил ..................
          ...................................................
        </h1>
        <h1>
          1.2. Ургийн овог:
          ...............................................................
        </h1>
        <br />
        <h1>
          1.3. Эцэг ( эх)-ийн нэр:
          .....................................................
        </h1>
        <h1>
          1.4. Өөрийн нэр: ............................................ 1.5.
          Хүйс: ..........................{" "}
        </h1>
        <h1>1.5. Төрсөн: .......... он ........ сар ....... өдөр </h1>
        <h1>
          1.6. Төрсөн аймаг, хот: улс ........................... сум, дүүрэг:
          .............................
          <br /> Төрсөн газар:
          ...............................................................
        </h1>
        <h1>
          1.7. Үндэс, угсаа:
          ..........................................................
        </h1>
      </div>
    );
  }
  return listItems;
}
function Gerbul(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/family/" + props.person_ID
      );
      console.log("FamilyGG", listItems.data);
      loadData(listItems?.data.Family);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1>
          1.8. Гэр бүлийн байдал (зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг
          бичнэ)
        </h1>
        <br />

        <table className="table is-bordered">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Таны юу болох</td>
              <td>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</td>
              <td>Төрсөн Он</td>
              <td>Төрсөн аймаг, хот, сум, дүүрэг</td>
              <td>Одоо эрхэлж буй ажил</td>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((a) => a.MEMBER_TYPE === 1)
              .map((value, index) => (
                <tr>
                  <td>{value.FAMILY_NAME}</td>
                  <td>
                    {value.MEMBER_LASTNAME + ", " + value.MEMBER_FIRSTNAME}
                  </td>
                  <td> {value.MEMBER_BIRTHDATE}</td>
                  <td>{value.MEMBER_ORG}</td>
                  <td>{value.MEMBER_POSITION}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <br />
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1>
          1.8. Гэр бүлийн байдал (зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг
          бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Таны юу болох</td>
              <td>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</td>
              <td>Төрсөн Он</td>
              <td>Төрсөн аймаг, хот, сум, дүүрэг</td>
              <td>Одоо эрхэлж буй ажил</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function Sadan(props) {
  const [data, loadData] = useState();
  const [emergency, setEmergency] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/family/" + props.person_ID
      );
      loadData(listItems?.data.Family);
      listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/emergency/" + props.person_ID
      );
      console.log(listItems?.data?.Emergency, "emergency");
      setEmergency(listItems?.data?.Emergency);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span>
          1.9. Садан төрлийн байдал (Таны эцэг, эх, төрсөн ах, эгч дүү, өрх
          тусгаарласан хүүхэд
          <br /> болон таны эхнэр /нөхөр/-ийн эцэг, эхийг оруулна):
        </span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Таны юу болох</td>
              <td>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</td>
              <td>Төрсөн Он</td>
              <td>Төрсөн аймаг, хот, сум, дүүрэг</td>
              <td>Одоо эрхэлж буй ажил</td>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((a) => a.MEMBER_TYPE === 2)
              .map((value, index) => (
                <tr>
                  <td>{value.FAMILY_NAME}</td>
                  <td>
                    {value.MEMBER_LASTNAME + ", " + value.MEMBER_FIRSTNAME}
                  </td>
                  <td>{dateFormat(value.MEMBER_BIRTHDATE, "yyyy-mm-dd")}</td>
                  <td>{value.MEMBER_ORG}</td>
                  <td>{value.MEMBER_POSITION}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h1>
          10.Оршин суугаа хаяг: &nbsp;{props.khayag.PERSON_HOME_ADDRESS}
          <br />
          Утасны дугаар: &nbsp;{props.khayag.PERSON_PHONE} Е-майл хаяг: &nbsp;
          {props.khayag.PERSON_EMAIL}
        </h1>
        <h1>
          1.11.Зайлшгүй шаардлагатай үед холбоо барих хүн <br />
        </h1>
        <table className="table is-bordered">
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
            {emergency?.map((value, index) => (
              <tr>
                <td>
                  <span className="textSaaral">{index + 1}</span>
                </td>
                <td>
                  <input
                    value={value.FAMILY_NAME}
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_LASTNAME}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_FIRSTNAME}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_PHONE}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1>
          1.9. Садан төрлийн байдал (Таны эцэг, эх, төрсөн ах, эгч дүү, өрх
          тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг оруулна):
        </h1>

        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Таны юу болох</td>
              <td>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</td>
              <td>Төрсөн Он</td>
              <td>Төрсөн аймаг, хот, сум, дүүрэг</td>
              <td>Одоо эрхэлж буй ажил</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h1>
          10.Оршин суугаа хаяг: &nbsp;{props.khayag.PERSON_HOME_ADDRESS}
          <br />
          Утасны дугаар: &nbsp;{props.khayag.PERSON_PHONE} Е-майл хаяг: &nbsp;
          {props.khayag.PERSON_EMAIL}
        </h1>
        <br />
        <table className="table is-bordered ">
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
                    edit={true}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_LASTNAME}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_FIRSTNAME}
                  />
                </td>
                <td>
                  <input
                    placeholder="утгаа оруулна уу"
                    disabled={true}
                    className="anketInput"
                    value={value.EMERGENCY_PHONE}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function UrChadvar(props) {
  const [data, loadData] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/exam/" + props.person_ID
      );
      console.log("Exam", listItems.data);
      loadData(listItems?.data.Exam);
    }
    fetchdata();
  }, [props]);

  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          Хоёр.Ур чадварын талаарх мэдээлэл
        </span>

        <span>2.1.Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл</span>

        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Мэдээллийн агуулга</td>
              <td>Тайлбар </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.EXAM_TYPE_NAME}</td>
                <td>{value.IS_EXAM === 1 ? "Өгсөн" : "Өгөөгүй"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          (* Шалгалт өгсөн эсэх гэсэн хэсэгт ерөнхий болон тусгай шалгалт
          “өгсөн” гэх, өгөөгүй <br /> бол “өгөөгүй” гэж бичнэ)
        </h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          Хоёр.Ур чадварын талаарх мэдээлэл
        </span>
        <span>2.1.Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл</span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Мэдээллийн агуулга</td>
              <td>Тайлбар </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h1>
          (* Шалгалт өгсөн эсэх гэсэн хэсэгт ерөнхий болон тусгай шалгалт
          “өгсөн” гэх, өгөөгүй бол “өгөөгүй” гэж бичнэ).
        </h1>
      </div>
    );
  }
  return listItems;
}
function Bolowsrol(props) {
  const [data, loadData] = useState([]);
  const [dataSecond, loadDataSecond] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/education/" + props.person_ID
      );
      console.log("Education", listItems.data);
      loadData(
        listItems?.data.Education.filter((a) => a.EDUCATION_LEVEL === 1)
      );
      loadDataSecond(
        listItems?.data.Education.filter((a) => a.EDUCATION_LEVEL === 2)
      );
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <span style={{ fontWeight: "bold" }}>
          Гурав.Боловсролын талаарх мэдээлэл
        </span>
        <h1>
          3.1. Боловсрол (суурь боловсрол, дипломын дээд боловсрол, бакалавр,
          магистрын <br />
          зэргийг оролцуулан)
        </h1>
        <h1>
          <table className="table is-bordered ">
            <thead style={{ textAlignLast: "center" }}>
              <tr>
                <td>Сургуулийн нэр*</td>
                <td>Орсон он, сар</td>
                <td>Төгссөн он, сар</td>
                <td>Эзэмшсэн мэргэжил, </td>
                <td>Гэрчилгээ, дипломын дугаар</td>
              </tr>
            </thead>
            <tbody>
              {data?.map((value, index) => (
                <tr>
                  <td>{value.SCHOOL_NAME}</td>
                  <td>{dateFormat(value.START_DATE, "yyyy-mm-dd")}</td>
                  <td> {dateFormat(value.END_DATE, "yyyy-mm-dd")}</td>
                  <td>{value.PROFESSION_NAME}</td>
                  <td>{value.DIPLOM_NO}</td>
                </tr>
              ))}
            </tbody>
          </table>
          (*Сургуулийн нэрийг бүтэн бичнэ)
        </h1>
        <br />
        <h1>3.2. Боловсролын болон шинжлэх ухааны докторын зэрэг </h1>
        <h1>
          <table className="table is-bordered ">
            <thead style={{ textAlignLast: "center" }}>
              <tr>
                <td>Зэрэг</td>
                <td>Хамгаалсан газар</td>
                <td>Он, сар</td>
                <td>Гэрчилгээ, дипломын дугаар</td>
              </tr>
            </thead>
            <tbody>
              {dataSecond?.map((value, index) => (
                <tr>
                  <td>{value.EDUCATION_TYPE_NAME}</td>
                  <td>{value.EDUCATION_COUNTRY}</td>
                  <td>{dateFormat(value.END_DATE, "yyyy-mm-dd")}</td>
                  <td>{value.DIPLOM_NO}</td>
                </tr>
              ))}
            </tbody>
          </table>
          Боловсролын доктор (Ph.D)-ын зэрэг хамгаалсан сэдэв:
          {dataSecond.length > 0 ? dataSecond[0].DIPLOM_SUBJECT : ""}
          <br />
          Шинжлэх ухааны доктор (ScD)-ын зэрэг хамгаалсан сэдэв:
          <br />
        </h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        {" "}
        <span style={{ fontWeight: "bold" }}>
          Гурав.Боловсролын талаарх мэдээлэл
        </span>
        <h1>
          3.1. Боловсрол (суурь боловсрол, дипломын дээд боловсрол, бакалавр,
          магистрын зэргийг оролцуулан)
        </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Сургуулийн нэр*</td>
              <td>Орсон он, сар</td>
              <td>Төгссөн он, сар</td>
              <td>Эзэмшсэн мэргэжил, </td>
              <td>Гэрчилгээ, дипломын дугаар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h1>(*Сургуулийн нэрийг бүтэн бичнэ)</h1>
        <br />
        <h1>
          <h1>3.2. Боловсролын болон шинжлэх ухааны докторын зэрэг </h1>
          <table className="table is-bordered ">
            <thead style={{ textAlignLast: "center" }}>
              <tr>
                <td>Зэрэг</td>
                <td>Хамгаалсан газар</td>
                <td>Он, сар</td>
                <td>Гэрчилгээ, дипломын дугаар</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          Боловсролын доктор (Ph.D)-ын зэрэг хамгаалсан сэдэв:
          ...................................................
          <br />
          Шинжлэх ухааны доктор (ScD)-ын зэрэг хамгаалсан сэдэв:
          ..........................................
          <br />
          ...................................................................................................................................................
        </h1>
      </div>
    );
  }
  return listItems;
}
function Medeelel(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/profession/" + props.person_ID
      );
      console.log("Profession", listItems.data);
      loadData(listItems?.data.Profession);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <span style={{ fontWeight: "bold" }}>
          Дөрөв.Мэргэшлийн талаарх мэдээлэл
        </span>
        <h1>
          4.1. Мэргэшлийн бэлтгэл (Мэргэжлээрээ болон бусад чиглэлээр нарийн
          мэргэшүүлэх багц сургалтад хамрагдсан байдлыг бичнэ)
        </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Хаана, дотоод, гадаадын ямар байгууллагад</td>
              <td>Эхэлсэн дууссан он, сар, өдөр</td>
              <td>Хугацаа /хоногоор</td>
              <td>Ямар чиглэлээр</td>
              <td>Үнэмлэх, гэрчилгээний дугаар, он, сар, өдөр</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.PROFESSION_COUNTRY}</td>
                <td>{dateFormat(value.START_DATE, "yyyy-mm-dd")}</td>
                <td>{value.DURATION_DAY}</td>
                <td>{value.PROFESSION_DIRECTION}</td>
                <td>{dateFormat(value.DIPLOM_DATE, "yyyy-mm-dd")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <span style={{ fontWeight: "bold" }}>
          Дөрөв.Мэргэшлийн талаарх мэдээлэл
        </span>
        <h1>
          4.1. Мэргэшлийн бэлтгэл (Мэргэжлээрээ болон бусад чиглэлээр нарийн
          мэргэшүүлэх багц сургалтад хамрагдсан байдлыг бичнэ)
        </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Хаана, дотоод, гадаадын ямар байгууллагад</td>
              <td>Эхэлсэн дууссан он, сар, өдөр</td>
              <td>Хугацаа /хоногоор</td>
              <td>Ямар чиглэлээр</td>
              <td>Үнэмлэх, гэрчилгээний дугаар, он, сар, өдөр</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <br />
      </div>
    );
  }
  return listItems;
}
function TsolDew(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        " http://hr.audit.mn/hr/api/v1/fame/" + props.person_ID
      );
      console.log("Fame", listItems.data);
      loadData(listItems?.data.Fame);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          4.2.Эрдмийн цол /дэд профессор, профессор, академийн гишүүнийг
          оролцуулан/
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Цол</td>
              <td>Цол олгосон байгууллага</td>
              <td>Огноо</td>
              <td>Гэрчилгээ, дипломын дугаар</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.FAME_TYPE_NAME}</td>
                <td>{value.FAME_ORG}</td>
                <td>{dateFormat(value.FAME_DATE, "yyyy-mm-dd")}</td>
                <td>{value.FAME_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1>
          4.2.Эрдмийн цол /дэд профессор, профессор, академийн гишүүнийг
          оролцуулан/
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Цол</td>
              <td>Цол олгосон байгууллага</td>
              <td>Огноо</td>
              <td>Гэрчилгээ, дипломын дугаар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function TsergiinAlba(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/force/" + props.person_ID
      );
      console.log("Force", listItems.data);
      loadData(listItems?.data.Force);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>Тав.Цэргийн алба хаасан эсэх</span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Цэргийн алба хаасан</td>
              <td>Хаасан</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Цэргийн алба хаагаагүй</td>
              <td>Хаасан</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Цэргийн үүрэгтний үнэмлэхийн дугаар</td>
              <td>Цэргийн алба хаасан байдал</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.FORCE_NO}</td>
                <td>{value.FORCE_TYPE_NAME}</td>
                <td>{value.FORCE_DESC}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>/Цэргийн алба хаасан бол дээрх мэдээллийг бөглөнө/.</h1>
        <br />
      </div>
    );
  } else {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>Тав.Цэргийн алба хаасан эсэх</span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Цэргийн алба хаасан</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Цэргийн алба хаагаагүй</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Цэргийн үүрэгтний үнэмлэхийн дугаар</td>
              <td>Цэргийн алба хаасан байдал</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <h1>/Цэргийн алба хаасан бол дээрх мэдээллийг бөглөнө/.</h1>
        <br />
      </div>
    );
  }
  return listItems;
}
function Shalgagdahch(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Award/" + props.person_ID
      );
      console.log("Award", listItems.data);
      loadData(listItems?.data.Award);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          Зургаа.Шагналын талаарх мэдээлэл{" "}
          <span>
            (Төрийн дээд шагнал, Засгийн газрын шагнал болон салбарын бусад
            шагналыг бичнэ)
          </span>
        </span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Шагнагдсан огноо</td>
              <td>Шагналын нэр</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Шагнуулсан үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{dateFormat(value.AWARD_DATE, "yyyy-mm-dd")}</td>
                <td>{value.AWARD_NAME}</td>
                <td>{value.DECISION_NO}</td>
                <td>{value.AWARD_DESC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          Зургаа.Шагналын талаарх мэдээлэл{" "}
          <span>
            (Төрийн дээд шагнал, Засгийн газрын шагнал болон салбарын бусад
            шагналыг бичнэ)
          </span>
        </span>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Шагнагдсан огноо</td>
              <td>Шагналын нэр</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Шагнуулсан үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function Tushaal(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/experience/" + props.person_ID
      );
      console.log("Experience", listItems.data);
      loadData(listItems?.data.Experience);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>Долоо.Туршлагын талаарх мэдээлэл</h1>
        <br />
        <h1>7.1. Ажилласан байдал </h1>

        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Ажилласан байгууллагын нэр*</td>
              <td>Газар, хэлтэс, алба</td>
              <td>Эрхэлсэн албан тушаал</td>
              <td>Ажилд орсон он, сар (тушаалын дугаар)</td>
              <td>Ажлаас гарсан он, сар (тушаалын дугаар)</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.EXPERIENCE_POSITION}</td>
                <td>{value.POSITION_CATEGORY_TYPE_ID}</td>
                <td>{value.EXPERIENCE_POSITION}</td>
                <td>
                  {dateFormat(
                    data.ENTERED_DATE,
                    "yyyy-mm-dd" + ", " + value.ENTERED_NO
                  )}
                </td>
                <td>
                  {dateFormat(
                    data.EXPIRED_DATE,
                    "yyyy-mm-dd" + ", " + value.ENTERED_NO
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>(*Байгууллагын нэрийг бүтнээр бичнэ).</h1>
        <br />
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>Долоо.Туршлагын талаарх мэдээлэл</h1>
        <br />
        <h1>7.1. Ажилласан байдал </h1>

        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Ажилласан байгууллагын нэр*</td>
              <td>Газар, хэлтэс, алба</td>
              <td>Эрхэлсэн албан тушаал</td>
              <td>Ажилд орсон он, сар (тушаалын дугаар)</td>
              <td>Ажлаас гарсан он, сар (тушаалын дугаар)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <h1>(*Байгууллагын нэрийг бүтнээр бичнэ).</h1>
        <br />
      </div>
    );
  }
  return listItems;
}
function BvteeliinJagsaalt(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Literature/" + props.person_ID
      );
      console.log("Literature", listItems.data);
      loadData(listItems?.data.Literature);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1 style={{ fontWeight: "bold" }}>Найм.Бүтээлийн жагсаалт </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Бүтээлийн нэр</td>
              <td>Бүтээлийн төрөл</td>
              <td>Бүтээл гаргасан огноо</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.LITERATURE_NAME}</td>
                <td>{value.LITERATURE_TYPE}</td>
                <td>{dateFormat(value.LITERATURE_DATE, "yyyy-mm-dd")}</td>
                <td>{value.LITERATURE_DESC}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          “Тайлбар” хэсэгт гадаад хэлнээс орчуулсан болон хамтран зохиогчийн
          тухай тэмдэглэнэ.
        </h1>
        <h1 className="level-item"> Анкетаа үнэн бичсэн: </h1>
        <div className="columns">
          <div className="column is-2 ml-1"></div>
          <div className="column is-3 ml-1">
            .................................... <br />
            /Эцэг (эх)-ийн нэр/{" "}
          </div>
          <div className="column is-4">
            ........................................... <br /> /өөрийн нэр/{" "}
          </div>
          <div className="column is-2">
            ...................................
            <br /> /Гарын үсэг/
          </div>
        </div>
        <h1 className="level-item">
          {" "}
          Огноо: .......................................
        </h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1 style={{ fontWeight: "bold" }}>Найм.Бүтээлийн жагсаалт </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Бүтээлийн нэр</td>
              <td>Бүтээлийн төрөл</td>
              <td>Бүтээл гаргасан огноо</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <h1>
          “Тайлбар” хэсэгт гадаад хэлнээс орчуулсан болон хамтран зохиогчийн
          тухай тэмдэглэнэ.
        </h1>
        <h1 className="level-item"> Анкетаа үнэн бичсэн: </h1>
        <div className="columns">
          <div className="column is-2 ml-5"></div>
          <div className="column is-3 ml-6">
            .................................... <br />
            /Эцэг (эх)-ийн нэр/{" "}
          </div>
          <div className="column is-4">
            ........................................... <br /> /өөрийн нэр/{" "}
          </div>
          <div className="column is-2">
            ...................................
            <br /> /Гарын үсэг/
          </div>
        </div>
        <h1 className="level-item">
          {" "}
          Огноо: .......................................
        </h1>
      </div>
    );
  }
  return listItems;
}
function BAnket(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/person/439");
      console.log("listItems", listItems.data.person);
      loadData(listItems?.data);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> гуравдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right">Маягт 2</h1>
        <h1
          className="level-item"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ
          <br /> “Б ХЭСЭГ”
        </h1>
        <h1 className="">
          Албан хаагчийн эцэг(эх)-ийн нэр .............{data.PERSON_LASTNAME}
          ............... өөрийн нэр ............. {data.PERSON_FIRSTNAME}
          ................ шинээр
        </h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> гуравдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right">Маягт 2</h1>
        <h1 className="level-item" style={{ fontWeight: "bold" }}>
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ “Б ХЭСЭГ”
        </h1>
        <h1 className="">
          Албан хаагчийн эцэг(эх)-ийн нэр ............. ............... өөрийн
          нэр ............. ................ шинээр
        </h1>
      </div>
    );
  }
  return listItems;
}
function BAlbanTushaal(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/positionEmployee/439"
      );
      console.log(
        "Buynaa ",
        listItems?.data.sort(function sortFunction(a, b) {
          var dateA = new Date(a.CREATED_DATE).getTime();
          var dateB = new Date(b.CREATED_DATE).getTime();
          return dateA > dateB ? 1 : -1;
        })
      );
      loadData(
        listItems?.data.sort(function sortFunction(a, b) {
          var dateA = new Date(a.CREATED_DATE).getTime();
          var dateB = new Date(b.CREATED_DATE).getTime();
          return dateA > dateB ? 1 : -1;
        })
      );
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data.length !== 0) {
    listItems = (
      <div>
        <br />
        <h1 className="" style={{ fontWeight: "bold" }}>
          Нэг.Албан тушаалын карт
        </h1>
        <br />
        <table className="table is-bordered ">
          <tbody>
            <tr>
              <td>1</td>
              <td>Байгууллагын нэр: </td>
              <td>{data[data.length - 1].DEPARTMENT_NAME}</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Нэгжийн нэр</td>
              <td>{data[data.length - 1].SUB_DEPARTMENT_NAME}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Албан тушаалын нэр</td>
              <td>{data[data.length - 1].POSITION_NAME}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Албан тушаалын ангилал</td>
              <td>{data[data.length - 1].POSITION_CATEGORY_TYPE_NAME}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Албан тушаалын зэрэглэл</td>
              <td>{data[data.length - 1].POSITION_LEVEL_NAME}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Албан тушаал бий болгосон шийдвэрийн нэр</td>
              <td>{data[data.length - 1].POSITION_CATEGORY_NAME}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Албан тушаал бий болгосон огноо</td>
              <td>
                {dateFormat(
                  data[data.length - 1].CREATED_DATECREATED_DATE,
                  "yyyy-mm-dd"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <table className="table is-bordered ">
          <tbody>
            <tr>
              <td>1</td>
              <td>Байгууллагын нэр:</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Нэгжийн нэр</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Албан тушаалын нэр</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Албан тушаалын ангилал</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Албан тушаалын зэрэглэл</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Албан тушаал бий болгосон шийдвэрийн нэр</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Албан тушаал бий болгосон огноо</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BAlbantushaalTomilgoo(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/positionEmployee/439"
      );
      console.log("", listItems.data);
      loadData(listItems?.data);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>Хоёр.Албан тушаалын томилгоо:</h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Томилогдсон албан тушаалын нэр</td>
              <td>Томилсон огноо, шийдвэрийн нэр, дугаар</td>
              <td>Өөрчилсөн огноо, шийдвэрийн нэр, дугаар</td>
              <td>Өөрчилсөн шалтгаан</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.POSITION_NAME}</td>
                <td>
                  {dateFormat(
                    data.START_DATE,
                    "yyyy-mm-dd" +
                      ", " +
                      value.POSITION_CATEGORY_TYPE_NAME +
                      ", " +
                      value.DECISION_NO
                  )}
                </td>
                <td>
                  {dateFormat(
                    data.REGISTER_DATE,
                    "yyyy-mm-dd" +
                      ", " +
                      value.POSITION_CATEGORY_TYPE_NAME +
                      ", " +
                      value.DECISION_NO
                  )}
                </td>
                <td>{value.SUB_DEPARTMENT_NAME}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>Хоёр.Албан тушаалын томилгоо:</h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Томилогдсон албан тушаалын нэр</td>
              <td>Томилсон огноо, шийдвэрийн нэр, дугаар</td>
              <td>Өөрчилсөн огноо, шийдвэрийн нэр, дугаар</td>
              <td>Өөрчилсөн шалтгаан</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BZeregDewTsol(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/position/439");
      console.log("Salary", listItems.data);
      loadData(listItems?.data.Salary);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Гурав.Албан тушаалын зэрэг дэв, цол:
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Албан тушаалын ангилал, зэрэглэл</td>
              <td>Зэрэг дэв, цолны нэр</td>
              <td>Шийдвэрийн огноо, дугаар</td>
              <td>Үнэмлэхийн дугаар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Гурав.Албан тушаалын зэрэг дэв, цол:
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Албан тушаалын ангилал, зэрэглэл</td>
              <td>Зэрэг дэв, цолны нэр</td>
              <td>Шийдвэрийн огноо, дугаар</td>
              <td>Үнэмлэхийн дугаар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BTsalin(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/salary/439");
      console.log("salary", listItems.data);
      loadData(listItems?.data.salary);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Дөрөв.Цалин хөлсний талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 57 дугаар зүйлийн 57.2-т заасан цалин
          хөлсийг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <tbody>
            <tr>
              <td rowspan="2">Он</td>
              <td colspan="6">Цалин хөлс /мян.төг/</td>
              <td rowspan="2">Тайлбар</td>
            </tr>
            <tr>
              <td>Албан тушаалын</td>
              <td>Онцгой нөхцөлийн нэмэгдэл</td>
              <td>Төрийн алба хаасан хугацааны нэмэгдэл</td>
              <td>Зэрэг дэвийн нэмэгдэл</td>
              <td>Цолны нэмэгдэл</td>
              <td>Бусад</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Дөрөв.Цалин хөлсний талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 57 дугаар зүйлийн 57.2-т заасан цалин
          хөлсийг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <tbody>
            <tr>
              <td rowspan="2">Он</td>
              <td colspan="6">Цалин хөлс /мян.төг/</td>
              <td rowspan="2">Тайлбар</td>
            </tr>
            <tr>
              <td>Албан тушаалын</td>
              <td>Онцгой нөхцөлийн нэмэгдэл</td>
              <td>Төрийн алба хаасан хугацааны нэмэгдэл</td>
              <td>Зэрэг дэвийн нэмэгдэл</td>
              <td>Цолны нэмэгдэл</td>
              <td>Бусад</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BUramshuulal(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/Promotion/439");
      console.log("Promotion", listItems.data);
      loadData(listItems?.data.Promotion);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1>
          “Тайлбар” хэсэгт цалин хөлсийг өөрчилсөн үндэслэл, шийдвэрийн нэр,
          огноог бичнэ.{" "}
        </h1>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Тав. Урамшууллын талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 51 дүгээр зүйлийн 51.1, 51.4-т заасан
          урамшууллыг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Урамшуулал авсан огноо</td>
              <td>Урамшууллын нэр, мөнгөн дүн /мян.төг/</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Урамшуулсан үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{dateFormat(value.DECISION_DATE, "yyyy-mm-dd")}</td>
                <td>{value.PROMOTION_NAME + ", " + value.PROMOTION_AMOUNT}</td>
                <td>
                  {value.DECISION_NAME +
                    ", " +
                    dateFormat(value.DECISION_DATE, "yyyy-mm-dd")}
                </td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1>
          “Тайлбар” хэсэгт цалин хөлсийг өөрчилсөн үндэслэл, шийдвэрийн нэр,
          огноог бичнэ.{" "}
        </h1>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Тав. Урамшууллын талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 51 дүгээр зүйлийн 51.1, 51.4-т заасан
          урамшууллыг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Урамшуулал авсан огноо</td>
              <td>Урамшууллын нэр, мөнгөн дүн /мян.төг/</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Урамшуулсан үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BNuhuhTulbur(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/amends/439");
      console.log("Amends", listItems.data);
      loadData(listItems?.data.Amends);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          {" "}
          Зургаа.Нөхөх төлбөрийн талаарх мэдээлэл
        </h1>
        <h1>
          Төрийн албаны тухай хуулийн 59 дүгээр зүйлийн 59.1-59.8-д заасан нөхөх
          төлбөрийг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Нөхөх төлбөр олгосон огноо</td>
              <td>Нөхөх төлбөрийн нэр, мөнгөн дүн /мян.төг/</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Нөхөх төлбөр олгосон үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{dateFormat(value.DECISION_DATE, "yyyy-mm-dd")}</td>
                <td>{value.AMENDS_NAME + ", " + value.AMENDS_AMOUNT}</td>
                <td>
                  {value.DECISION_NAME +
                    ", " +
                    dateFormat(value.DECISION_DATE, "yyyy-mm-dd") +
                    ", " +
                    value.DECISION_NO}
                </td>
                <td>{value.AMENDS_MOTIVE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          {" "}
          Зургаа.Нөхөх төлбөрийн талаарх мэдээлэл
        </h1>
        <h1>
          Төрийн албаны тухай хуулийн 59 дүгээр зүйлийн 59.1-59.8-д заасан нөхөх
          төлбөрийг бичнэ)
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Нөхөх төлбөр олгосон огноо</td>
              <td>Нөхөх төлбөрийн нэр, мөнгөн дүн /мян.төг/</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Нөхөх төлбөр олгосон үндэслэл</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return listItems;
}
function BShiitegliinTalaarh(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Punishment/439"
      );
      console.log("Punishment", listItems.data.person);
      loadData(listItems?.data.Punishment);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <br />
        <h1 style={{ fontWeight: "bold" }}>
          Долоо.Шийтгэлийн талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.1 буюу уг хуулийн
          37, 39 дүгээр зүйлд заасныг болон 40 дүгээр зүйлийн 40.1, 40.2-т
          заасны дагуу эрх бүхий байгууллагаас тогтоосон төрийн албан хаагчийн
          ёс зүйн хэм хэмжээг зөрчсөний улмаас ногдуулсан сахилгын шийтгэлийг
          бичнэ)
        </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Байгууллагын нэр</td>
              <td>Шийтгэл ногдуулсан албан тушаалтан</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Юуны учир, ямар шийтгэл ногдуулсан*</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>&nbsp;</td>
                <td>{value.PUNISHMENT_HOLDER}</td>
                <td>
                  {value.DECISION_NAME +
                    ", " +
                    dateFormat(value.DECISION_DATE, "yyyy-mm-dd") +
                    ", " +
                    value.DECISION_NO}
                </td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          (*Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.6-д заасныг
          үндэслэн сахилгын шийтгэлгүйд тооцсон тухай энэ хэсэгт бичиж болно).
        </h1>
        <br />
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1 style={{ fontWeight: "bold" }}>
          Долоо.Шийтгэлийн талаарх мэдээлэл
        </h1>
        <h1>
          (Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.1 буюу уг хуулийн
          37, 39 дүгээр зүйлд заасныг болон 40 дүгээр зүйлийн 40.1, 40.2-т
          заасны дагуу эрх бүхий байгууллагаас тогтоосон төрийн албан хаагчийн
          ёс зүйн хэм хэмжээг зөрчсөний улмаас ногдуулсан сахилгын шийтгэлийг
          бичнэ)
        </h1>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Байгууллагын нэр</td>
              <td>Шийтгэл ногдуулсан албан тушаалтан</td>
              <td>Шийдвэрийн нэр, огноо, дугаар</td>
              <td>Юуны учир, ямар шийтгэл ногдуулсан*</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h1>
          (*Төрийн албаны тухай хуулийн 48 дугаар зүйлийн 48.6-д заасныг
          үндэслэн сахилгын шийтгэлгүйд тооцсон тухай энэ хэсэгт бичиж болно).
        </h1>
        <br />
      </div>
    );
  }
  return listItems;
}
function BHuwiinHereg(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/document/439");
      console.log("Document", listItems.data.person);
      loadData(listItems?.data.Document);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1 style={{ fontWeight: "bold" }}>
          Найм.Хувийн хэргийг мэдээллийг хянасан, баяжуулсан тухай бүртгэл
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Мэдээллийн агуулга</td>
              <td>Баяжуулалт хийсэн огноо</td>
              <td>Хянаж, баяжуулалт хийсэн албан тушаалтны нэр</td>
              <td>Баяжилт хийсэн огноо</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.DOCUMENT_NAME}</td>
                <td>{dateFormat(value.DOCUMENT_DATE, "yyyy-mm-dd")}</td>
                <td></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h1 className="level-item">---оОо---</h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1 style={{ fontWeight: "bold" }}>
          Найм.Хувийн хэргийг мэдээллийг хянасан, баяжуулсан тухай бүртгэл
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Мэдээллийн агуулга</td>
              <td>Баяжуулалт хийсэн огноо</td>
              <td>Хянаж, баяжуулалт хийсэн албан тушаалтны нэр</td>
              <td>Баяжилт хийсэн огноо</td>
              <td>Тайлбар</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1 className="level-item">---оОо---</h1>
      </div>
    );
  }
  return listItems;
}
function CAnket(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/exam/439");
      console.log("listItems", listItems.data.person);
      loadData(listItems?.data);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div style={{ pageBreakInside: "auto" }}>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> гуравдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right">Маягт 3</h1>
        <h1 className="level-item" style={{ fontWeight: "bold" }}>
          ТӨРИЙН АЛБАН ХААГЧИЙН ХУВИЙН ХЭРЭГТ БАЙХ ҮНДСЭН БАРИМТ <br />
          БИЧГИЙН ЖАГСААЛТ БИЧИХ ХҮСНЭГТ
        </h1>
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column is-2">
            {" "}
            ...............................................
            <br />
            /Эцэг (эх)-ийн нэр/
          </div>
          <div className="column is-2">
            ..............................................
            <br />
            /өөрийн нэр/
          </div>
          <div className="column is-8"></div>
        </div>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Баримт бичгийн нэр</td>
              <td>Баримт бичгийг бүрдүүлсэн огноо </td>
              <td>Хуудасны тоо</td>
              <td>Баяжуулалт хийсэн тухай тэмдэглэл</td>
              <td>
                Хувийн хэргийг бүрдүүлж, баяжуулалт хийсэн албан тушаалтны нэр
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <h1 className="level-item">Товъёог бичсэн:</h1>
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column is-3">
            {" "}
            ...............................................
            <br />
            /Албан тушаал/
          </div>
          <div className="column is-3">
            ..............................................
            <br />
            /нэр/
          </div>
          <div className="column is-2">
            ..............................................
            <br />
            /Гарын үсэг/
          </div>
          <div className="column is-6"></div>
        </div>
        <div className="columns ">
          <div className="column is-5"></div>
          <div className="column is-3">
            Огноо: .......................................
          </div>
        </div>
      </div>
    );
  } else {
    listItems = (
      <div>
        <span className="level-right has-text-right">
          Төрийн албаны зөвлөлийн 2019 оны 01 дүгээр
          <br /> сарын 31-ний өдрийн ..... дугаар тогтоолын
          <br /> гуравдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right">Маягт 3</h1>
        <span style={{ textAlign: "center", fontWeight: "bold" }}>
          ТӨРИЙН АЛБАН ХААГЧИЙН ХУВИЙН ХЭРЭГТ БАЙХ ҮНДСЭН БАРИМТ <br />
          БИЧГИЙН ЖАГСААЛТ БИЧИХ ХҮСНЭГТ
        </span>
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column is-2">
            {" "}
            ...............................................
            <br />
            /Эцэг (эх)-ийн нэр/
          </div>
          <div className="column is-2">
            ..............................................
            <br />
            /өөрийн нэр/
          </div>
          <div className="column is-8"></div>
        </div>
        <table className="table is-bordered ">
          <thead style={{ textAlignLast: "center" }}>
            <tr>
              <td>Д/д</td>
              <td>Баримт бичгийн нэр</td>
              <td>Баримт бичгийг бүрдүүлсэн огноо </td>
              <td>Хуудасны тоо</td>
              <td>Баяжуулалт хийсэн тухай тэмдэглэл</td>
              <td>
                Хувийн хэргийг бүрдүүлж, баяжуулалт хийсэн албан тушаалтны нэр
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <h1 className="level-item">Товъёог бичсэн:</h1>
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column is-3">
            {" "}
            ...............................................
            <br />
            /Албан тушаал/
          </div>
          <div className="column is-3">
            ..............................................
            <br />
            /нэр/
          </div>
          <div className="column is-2">
            ..............................................
            <br />
            /Гарын үсэг/
          </div>
          <div className="column is-6"></div>
        </div>
        <div className="columns ">
          <div className="column is-5"></div>
          <div className="column is-3">
            Огноо: .......................................
          </div>
        </div>
      </div>
    );
  }
  return listItems;
}
export default AnketAPrint;
