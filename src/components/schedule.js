import React from "react";
import "./table.css";

const Schedule = (props) => {
  return (
    <div
      style={{
        // backgroundImage: `url(" + ${urilgaBack} + ")`,
        display: "flex",
        flexDirection: "column",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          border: "4px solid #e89f0f",
          borderRadius: "15px",
          overflowY: "scroll",
        }}
      >
        <div>
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              paddingBottom: "2rem",
              paddingTop: "2rem",
            }}
          >
            <span
              style={{
                width: "60%",
                color: "#919090",
                fontWeight: "bold",
                lineHeight: "1rem",
                fontSize: "1.1rem",
                fontFamily: "Roboto",
              }}
            >
              ТӨРИЙН ХЯНАЛТЫН ТОГТОЛЦОО ҮҮСЭЖ ХӨГЖСӨНИЙ ТҮҮХТ 100 ЖИЛИЙН ОЙН
              ХҮНДЭТГЭЛТИЙН ХУРЛЫН ХӨТӨЛБӨР
            </span>
          </div>

          <div
            style={{
              textAlign: "left",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "50px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Хугацаа
                  </th>
                  <th
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Арга хэмжээ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    09.00-09.20
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Хөтлөгч Монгол Улсын Соёлын гавьяат зүтгэлтэн Б.Ганбаатар
                    зочид төлөөлөгчдийг танилцуулах
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    09.20-09.45
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Монгол Улсын Их Хурлын дарга Гомбожавын Занданшатар нээлтийн
                    үг хэлж мэндчилгээ дэвшүүлэх
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    09.45-10.10
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Монгол Улсын Ерөнхий аудитор Д. Занданбат Төрийн хяналтын
                    тогтолцоо үүсэж хөгжсөний 100 жилийн Ойн хүндэтгэлийн хурлын
                    илтгэл
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    10.10-10.20
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Монгол Улсын Ерөнхийлөгчийн Илгээлт
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    10.20-10.30
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Завсарлага
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    10.30-10.50
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Монгол Улсын Ерөнхий сайд Лувсаннамсрайн Оюун-Эрдэнэ үг хэлж
                    мэндчилгээ дэвшүүлэх
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    10.50-11.00
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Монгол Улсын Их Хурлын Төсвийн байнгын хорооны дарга
                    Ч.Хүрэлбаатар үг хэлж мэндчилгээ дэвшүүлэх
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.00-11.30
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Олон улсын аудитын дээд байгууллагуудын цахим мэндчилгээ
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.30-11.35
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Төрийн аудитын байгууллагад ажиллаж байсан ахмад настан
                    Ч.Раднаа баяр хүргэж үг хэлэх (Ерөнхий аудитор асан)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.35-11.40
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Төрийн аудитын байгууллагыг төлөөлж Дундговь аймаг дах
                    Төрийн аудитын газрын аудитын менежер Х.Наранцацрал үг хэлэх
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.40-11.45
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Хувийн аудитын компаниудыг төлөөлж ”Грант Торнтон Аудит”
                    ХХК-ийн гүйцэтгэх захирал О.Идшинринжин үг хэлэх
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.45-11.50
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Тамгын дарга С.Цэрэнбаяр Ойн хүндэтгэлийн хурлыг хаах
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    11.50-12.10
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Төрийн хяналтын тогтолцоо үүсэж хөгжсөний 100 жилийн Ойн
                    түүхэн баримтат кино
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    12.10-14.00
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Үдийн завсарлага
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    14.00-14.30
                  </td>
                  <td
                    style={{
                      padding: "5px",
                    }}
                  >
                    Хурлын нийт оролцогчид Их эзэн Чингис хааны хөшөөний урд
                    дурсгалын зураг авхуулах
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
