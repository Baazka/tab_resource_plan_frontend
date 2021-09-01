import React, { useState, useEffect, useReducer } from "react";
import { DataRequest } from "../functions/DataApi";
import { useAlert } from "react-alert";
import { Add, Delete } from "../assets/images/zurag";
import { Office, Suboffice, Edutype } from "../components/library";

const axios = require("axios");

function AnketAPrint(props) {
  const [data, loadData] = useState(1);
  let listItems;
  let huvisagch = 1;
  function buttonNemeh() {
    loadData(data);

    console.log("huvisagch", huvisagch + 1);
  }
  function buttonhasah() {
    loadData(data - 1);

    console.log("huvisagch", huvisagch - 1);
  }

  //   listItems = (

  //   );

  return (
    <iframe id="ifmcontentstoprint" style={{ height: "0px", width: "0px" }}>
      <div
        id="anketAPrint"
        style={{ marginLeft: "0%", marginRight: "0%", display: "none" }}
      >
        <div style={{}}>
          <Yrunkhii />
          <Gerbul />
        </div>
        <Sadan />
        <UrChadvar />
        <Bolowsrol />
        <Medeelel />
        <TsolDew />
        <TsergiinAlba />
        <Shalgagdahch />
        {/* <Tushaal /> */}
        <BvteeliinJagsaalt />

        <p>
          state:{data} <br /> huvisagch:{huvisagch}
        </p>

        <button
          onClick={() => buttonNemeh("haha")}
          className="button"
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        >
          +
        </button>

        <button
          className="button"
          onClick={() => buttonhasah()}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        >
          -
        </button>
      </div>
    </iframe>
  );
}

function Yrunkhii(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/person/0/439");
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
          <br /> хоёрдугаар хавсралт
        </span>
        <br />
        <h1 className="has-text-right is-size-5">Маягт 1</h1>
        <h1 className="level-item is-size-5">
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ “А ХЭСЭГ”{" "}
        </h1>
        <h1 className="is-size-5">Нэг.Хувь хүний талаарх мэдээлэл</h1>
        <h1>Регистрийн дугаар:</h1>
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
        <h1 className="level-item is-size-5">
          ТӨРИЙН АЛБАН ХААГЧИЙН АНКЕТ “А ХЭСЭГ”{" "}
        </h1>
        <h1 className="is-size-5">Нэг.Хувь хүний талаарх мэдээлэл</h1>
        <h1>Регистрийн дугаар:</h1>
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
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/family/439");
      console.log("family", listItems.data);
      loadData(listItems?.data.family);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1>
          1.8. Гэр бүлийн байдал (зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг
          бичнэ):
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Таны юу болох</th>
              <th>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</th>
              <th>Төрсөн Он</th>
              <th>Төрсөн аймаг, хот, сум, дүүрэг</th>
              <th>Одоо эрхэлж буй ажил</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.FAMILY_NAME}</td>
                <td>{(value.MEMBER_LASTNAME, value.MEMBER_FIRSTNAME)}</td>
                <td>{value.MEMBER_BIRTHDATE}</td>
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
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Sadan(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/family/439");
      console.log("family", listItems.data);
      loadData(listItems?.data.family);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1>
          1.9. Садан төрлийн байдал (Таны эцэг, эх, төрсөн ах, эгч дүү, өрх
          тусгаарласан хүүхэд болон таны эхнэр /нөхөр/-ийн эцэг, эхийг оруулна):
        </h1>

        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Таны юу болох</th>
              <th>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</th>
              <th>Төрсөн Он</th>
              <th>Төрсөн аймаг, хот, сум, дүүрэг</th>
              <th>Одоо эрхэлж буй ажил</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.FAMILY_NAME}</td>
                <td>{(value.MEMBER_LASTNAME, value.MEMBER_FIRSTNAME)}</td>
                <td>{value.MEMBER_BIRTHDATE}</td>
                <td>{value.MEMBER_ORG}</td>
                <td>{value.MEMBER_POSITION}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          .10.Оршин суугаа хаяг: ................................ аймаг, хот
          ................................ сум, дүүрэг, гэрийн хаяг:
          .......................................................................................................
          <br />
          Утасны дугаар: ................. ................. Е-майл хаяг:
          ........................................
        </h1>
        <h1>
          1.11.Зайлшгүй шаардлагатай үед холбоо барих хүн <br />
          Нэр.................. .............../ хэн болох/
        </h1>
      </div>
    );
  } else {
    listItems = (
      <div>
        <h1>
          1.8. Гэр бүлийн байдал (зөвхөн гэр бүлийн бүртгэлд байгаа хүмүүсийг
          бичнэ):
        </h1>
        <br />
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>Таны юу болох</th>
              <th>Гэр бүлийн гишүүний эцэг /эх/-ийн болон өөрийн нэр</th>
              <th>Төрсөн Он</th>
              <th>Төрсөн аймаг, хот, сум, дүүрэг</th>
              <th>Одоо эрхэлж буй ажил</th>
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
      </div>
    );
  }
  return listItems;
}
function UrChadvar(props) {
  const [data, loadData] = useState();

  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/exam/439");
      console.log("Exam", listItems.data);
      loadData(listItems?.data.Exam);
    }
    fetchdata();
  }, [props]);

  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span>Хоёр.Ур чадварын талаарх мэдээлэл</span>
        <h1>2.1.Төрийн жинхэнэ албаны шалгалтын талаарх мэдээлэл</h1>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Мэдээллийн агуулга</th>
              <th>Тайлбар </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.EXAM_TYPE_NAME}</td>
                <td>{value.DECISION_DESC}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          (* Шалгалт өгсөн эсэх гэсэн хэсэгт ерөнхий болон тусгай шалгалт
          “өгсөн” гэх, өгөөгүй бол “өгөөгүй” гэж бичнэ).
        </h1>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Bolowsrol(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/education/439");
      console.log("Education", listItems.data);
      loadData(listItems?.data.Education);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        {" "}
        <span>Гурав.Боловсролын талаарх мэдээлэл</span>
        <h1>
          3.1. Боловсрол (суурь боловсрол, дипломын дээд боловсрол, бакалавр,
          магистрын зэргийг оролцуулан)
        </h1>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Сургуулийн нэр*</th>
              <th>Орсон он, сар</th>
              <th>Төгссөн он, сар</th>
              <th>Эзэмшсэн мэргэжил, </th>
              <th>Гэрчилгээ, дипломын дугаар</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.SCHOOL_NAME}</td>
                <td>{value.START_DATE}</td>
                <td>{value.END_DATE}</td>
                <td>{value.PROFESSION_NAME}</td>
                <td>{value.DIPLOM_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <h1>(*Сургуулийн нэрийг бүтэн бичнэ)</h1>
        <br /> */}
        {/* <h1>3.2. Боловсролын болон шинжлэх ухааны докторын зэрэг </h1>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Зэрэг</th>
              <th>Хамгаалсан газар</th>
              <th>Он, сар</th>
              <th>Гэрчилгээ, дипломын дугаар</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.EDUCATION_COUNTRY}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          Боловсролын доктор (Ph.D)-ын зэрэг хамгаалсан сэдэв:
          ...................................................
          <br />
          Шинжлэх ухааны доктор (ScD)-ын зэрэг хамгаалсан сэдэв:
          ..........................................
          <br />
          ...................................................................................................................................................
        </h1> */}
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Medeelel(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/profession/439"
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
        <span>Дөрөв.Мэргэшлийн талаарх мэдээлэл</span>
        <h1>
          4.1. Мэргэшлийн бэлтгэл (Мэргэжлээрээ болон бусад чиглэлээр нарийн
          мэргэшүүлэх багц сургалтад хамрагдсан байдлыг бичнэ)
        </h1>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Хаана, дотоод, гадаадын ямар байгууллагад</th>
              <th>Эхэлсэн дууссан он, сар, өдөр</th>
              <th>Хугацаа /хоногоор</th>
              <th>Ямар чиглэлээр</th>
              <th>Үнэмлэх, гэрчилгээний дугаар, он, сар, өдөр</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.PROFESSION_COUNTRY}</td>
                <td>{value.START_DATE}</td>
                <td>{value.DURATION_DAY}</td>
                <td>{value.PROFESSION_DIRECTION}</td>
                <td>{value.DIPLOM_DATE}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function TsolDew(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(" http://hr.audit.mn/hr/api/v1/fame/439");
      console.log("Fame", listItems.data);
      loadData(listItems?.data.Fame);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <h1>
          4.2.Эрдмийн цол /дэд профессор, профессор, академийн гишүүнийг
          оролцуулан/
        </h1>
        <br />
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Цол</th>
              <th>Цол олгосон байгууллага</th>
              <th>Огноо</th>
              <th>Гэрчилгээ, дипломын дугаар</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.FAME_TYPE_NAME}</td>
                <td>{value.FAME_ORG}</td>
                <td>{value.FAME_DATE}</td>
                <td>{value.FAME_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function TsergiinAlba(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/force/439");
      console.log("Force", listItems.data);
      loadData(listItems?.data.Force);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span>Тав.Цэргийн алба хаасан эсэх</span>
        <table className="table is-bordered ">
          <thead>
            {data?.map((value, index) => (
              <tr>
                <th>Цэргийн алба хаасан</th>
                <td>{value.FORCE_TYPE_NAME}</td>
              </tr>
            ))}
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <th>Цэргийн алба хаагаагүй</th>
                <td>{value.FORCE_TYPE_NAME}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Д/д</th>
              <th>Цэргийн үүрэгтний үнэмлэхийн дугаар</th>
              <th>Цэргийн алба хаасан байдал</th>
              <th>Тайлбар</th>
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
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Shalgagdahch(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios("http://hr.audit.mn/hr/api/v1/Award/439");
      console.log("Award", listItems.data);
      loadData(listItems?.data.Award);
    }
    fetchdata();
  }, [props]);
  let listItems;
  if (data !== undefined && data?.length !== 0 && data !== null) {
    listItems = (
      <div>
        <span>
          Зургаа.Шагналын талаарх мэдээлэл{" "}
          <span>
            (Төрийн дээд шагнал, Засгийн газрын шагнал болон салбарын бусад
            шагналыг бичнэ)
          </span>
        </span>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Шагнагдсан огноо</th>
              <th>Шагналын нэр</th>
              <th>Шийдвэрийн нэр, огноо, дугаар</th>
              <th>Шагнуулсан үндэслэл</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.AWARD_DATE}</td>
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
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Tushaal(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/experience/439"
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
        <h1>Долоо.Туршлагын талаарх мэдээлэл</h1>
        <br />
        <h1>7.1. Ажилласан байдал </h1>

        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Ажилласан байгууллагын нэр*</th>
              <th>Газар, хэлтэс, алба</th>
              <th>Эрхэлсэн албан тушаал</th>
              <th>Ажилд орсон он, сар (тушаалын дугаар)</th>
              <th>Ажлаас гарсан он, сар (тушаалын дугаар)</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{value.EXPERIENCE_POSITION}</td>
                <td>{value.POSITION_CATEGORY_TYPE_ID}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>(*Байгууллагын нэрийг бүтнээр бичнэ).</h1>
        <br />
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function BvteeliinJagsaalt(props) {
  const [data, loadData] = useState();
  useEffect(() => {
    async function fetchdata() {
      let listItems = await axios(
        "http://hr.audit.mn/hr/api/v1/Literature/439"
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
        <h1>Найм.Бүтээлийн жагсаалт </h1>
        <table className="table is-bordered ">
          <thead>
            <tr>
              <th>Д/д</th>
              <th>Бүтээлийн нэр</th>
              <th>Бүтээлийн төрөл</th>
              <th>Бүтээл гаргасан огноо</th>
              <th>Тайлбар</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.LITERATURE_NAME}</td>
                <td>{value.LITERATURE_TYPE}</td>
                <td>{value.LITERATURE_DATE}</td>
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
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

export default AnketAPrint;
