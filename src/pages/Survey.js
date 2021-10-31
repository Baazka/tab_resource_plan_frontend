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

const Survey = (props) => {
  const history = useHistory();

  const [jagsaalt, setJagsaalt] = useState();

  useEffect(() => {
    async function test() {
      let jagsaaltsHEAD = await DataRequest({
        url:
          "http://localhost:3002/api/v1/electionAttandee/" + 1 + "/" + "HEAD",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaaltsHEAD?.data);
      console.log(jagsaaltsHEAD);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  var cols = [];
  for (let index = 0; index < jagsaalt.length; index++) {
    {
      console.log(jagsaalt[index]);
      cols.push(
        <div class="column is-3">
          <div class="card is-clickable">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src="https://via.placeholder.com/90x120"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p>{jagsaalt[index].USER_NAME}</p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaalt[index].USER_POSITION}
                  </p>
                  {/* <p style={{ fontSize: "12px" }}>Мэдээлэл технологийн төв</p> */}
                  <div>
                    <input type="checkbox" id={jagsaalt[index].ID} />
                    <label for={jagsaalt[index].ID}>сонгох</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  //MAN
  const [jagsaaltman, setJagsaaltMan] = useState();

  useEffect(() => {
    async function test() {
      let jagsaaltsMAN = await DataRequest({
        url: "http://localhost:3002/api/v1/electionAttandee/" + 1 + "/" + "MAN",
        method: "GET",
        data: {},
      });
      setJagsaaltMan(jagsaaltsMAN?.data);
      console.log(jagsaaltsMAN);
    }
    test();
    console.log("jagsaalt", jagsaaltman);
  }, [props]);

  var colsMan = [];
  for (let indexMan = 0; indexMan < jagsaaltman.length; indexMan++) {
    {
      console.log(jagsaaltman[indexMan]);
      colsMan.push(
        <div class="column is-3">
          <div class="card is-clickable">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure
                    class="image"
                    style={{
                      width: 90,
                      height: 120,
                    }}
                  >
                    <img
                      src="https://via.placeholder.com/90x120"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p>{jagsaaltman[indexMan].USER_NAME}</p>
                  <p style={{ fontSize: "12px" }}>
                    {jagsaaltman[indexMan].USER_POSITION}
                  </p>
                  {/* <p style={{ fontSize: "12px" }}>Мэдээлэл технологийн төв</p> */}
                  <div>
                    <input type="checkbox" id={jagsaaltman[indexMan].ID} />
                    <label for={jagsaaltman[indexMan].ID}>сонгох</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            display: "flex",
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
                  //   flexwrap: "wrap",
                  // }}
                  >
                    <div class="columns" style={{ flexWrap: "wrap" }}>
                      {cols}
                      {/* <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column is-3">
                        <div class="card is-clickable" for="horns">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure
                                  class="image"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    border: 1,
                                    borderColor: "red",
                                  }}
                                >
                                  <img
                                    src="https://via.placeholder.com/90x120"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                              <div class="media-content">
                                <p>Н.Бат-Очир</p>
                                <p style={{ fontSize: "12px" }}>
                                  Программ хөгжүүлэгч, ахлах шинжээч
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  Мэдээлэл технологийн төв
                                </p>
                                <input type="checkbox" id="horns" />
                                <label for="horns">сонгох</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
