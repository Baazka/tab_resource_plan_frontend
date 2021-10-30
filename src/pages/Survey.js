import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import AnketNeg from "../components/anketNeg";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import Iframe from "react-iframe";

const Dashboard = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();

  var rows = [];
  for (let index = 0; index < 10; index++) {
    {
      rows.push(
        <div
          style={{
            backgroundcolor: "#f1f1f1",
            width: "100px",
            margin: "10px",
            textAlign: "center",
            lineheight: "75px",
            fontsize: "30px",
          }}
        >
          {index}
        </div>
      );
    }
  }

  return (
    //   for (let index = 0; index < array.length; index++) {
    //       const element = array[index];

    //   }
    <div>
      <div style={{ marginLeft: "2%" }}>
        <div
          style={{
            height: "90vh",
            display: "flex",
            maxHeight: "100vh !important",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "20%",
              left: "7%",
              zIndex: 1,
              top: "100px",
              width: "91.7%",
            }}
          >
            <div class="card">
              <div class="card-content">
                <p class="title" style={{ textAlign: "center" }}>
                  Ёс зүйн хорооны гишүүдийг сонгох санал асуулга
                </p>
                <div
                  class="box"
                  style={{
                    borderColor: "ffecb5",
                    backgroundColor: "#fff3cd",
                    padding: "15px",
                    color: "#664d03",
                  }}
                >
                  Ёс зүйн хорооны гишүүдийг сонгох санал асуулга
                </div>
                <br />
                <div>
                  <div class="subtitle">Аудитын удирдах түвшний ажилтан</div>
                  <hr />
                  <div
                  // style={{
                  //   display: "flex",
                  //   flexwrap: "nowrap",
                  //   backgroundColor: "DodgerBlue",
                  // }}
                  >
                    {/* {rows} */}
                    <div class="thumbContainer">
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img
                              width="90"
                              height="119"
                              src=""
                              style={{ border: 1, borderColor: "red" }}
                            />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          borderColor: "red",
                          border: "1px",
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="thumbBox"
                        style={{
                          width: "306px",
                          height: "166px",
                          float: "left",
                          marginLeft: 0,
                          margintop: "5px",
                          background: "white",
                          border: 1,
                        }}
                      >
                        <div class="tr1 thumbList ui-draggable">
                          <div
                            class="picture"
                            style={{
                              width: "90px",
                              height: "118px",
                              float: "left",
                              overflow: "hidden",
                              position: "relative",
                              zIndex: 1,
                              margintop: "13px",
                              marginRight: "13px",
                            }}
                          >
                            <img width="90" height="119" src="" />
                          </div>
                          <div class="info" style={{ float: "left" }}>
                            <div class="sysName">Н.Учрал</div>
                            <div class="app">Гэрээт ажилтан</div>
                            <div class="dep">Аудитын хоёрдугаар газар</div>
                            <div class="mail">uchraln@audit.gov.mn</div>

                            <div class="mobile">(976) 95019011</div>
                          </div>
                          <div class="line" style={{ width: "65%" }}></div>
                          <div class="checkBox"></div>

                          <div
                            class="bttns"
                            id="buttons"
                            //style="margin-right:3px;"
                          >
                            <div
                              class="item cmdButton"
                              id="print"
                              mode="1"
                            ></div>
                            <div
                              class="item cmdButton"
                              id="edit"
                              mode="3"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div style={{ textAlign: "center" }}>
              
            </div>
            <div
              style={{
                borderColor: "ffecb5",
                backgroundColor: "#fff3cd",
                borderRadius: "5px",
                padding: "15px",
                color: "#664d03",
              }}
            >
              Ёс зүйн хорооны гишүүдийг сонгох санал асуулга
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
