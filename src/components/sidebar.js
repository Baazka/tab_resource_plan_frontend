import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "../css/sidebarHeader.css";

import { useHistory } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import {
  RigthArrow,
  LeftArrow,
  Logo,
  User,
  Group,
  Bag,
  Documents,
  UserB,
  GroupB,
  BagB,
  DocumentsB,
  DashboardW,
  Dashboard,
  Tailan,
  TailanB,
  Baiguullaga,
  BBaiguullaga,
  Hereglegch,
  BHereglegch
} from "../assets/images/zurag";

const SideBar = (props) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);
  const history = useHistory();
  const [menuClick, setMenuClick] = useState({
    menu0: false,
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    menu8: false,
  });
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  function SelectMenu(value) {
    let temp = {
      menu0: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      // menu6: false,
      // menu7: false,
      menu10: false,
      menu11: false,
      menu12: false,
    };
    setMenuClick({ ...temp, ...value });
    if (value?.menu0) {
      history.push("/web/dashboard");
      setMenuCollapse(true);
    } else if (value?.menu1) {
      history.push("/web/workerList/null");
      setMenuCollapse(true);
    } else if (value?.menu2) {
      history.push("/web/Baiguullaga");
      setMenuCollapse(true);
    } else if (value?.menu3) {
      history.push("/web/AlbanTushaal/null");
      setMenuCollapse(true);
    } else if (value?.menu4) {
      history.push("/web/TushaalShiidver");
      setMenuCollapse(true);
    } else if (value?.menu5) {
      history.push("/web/Tailan");
      setMenuCollapse(true);
    } else if (value?.menu6) {
      history.push("/print/anket/");
      setMenuCollapse(true);
    } else if (value?.menu7) {
      history.push("/web/Survey/");
      setMenuCollapse(true);
    } else if (value?.menu8) {
      history.push("/web/SurveyNAG/");
      setMenuCollapse(true);
    } else if (value?.menu9) {
      history.push("/web/SurveyFin/");
      setMenuCollapse(true);
    } else if (value?.menu10) {
      history.push("/web/Elders/");
      setMenuCollapse(true);
    } else if (value?.menu11) {
      history.push("/web/AHE");
      setMenuCollapse(true);
    } else if (value?.menu12) {
      history.push("/web/Hereglegch");
      setMenuCollapse(true);
    }
    // else if (value?.menu7) {
    //   history.push("/web/HuilTogtoomj/");
    //   history.push("/web/EmployeeInformation");
    //   setMenuCollapse(true);
    // }
  }

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}

        <ProSidebar collapsed={menuCollapse} breakPoint="xs sm md lg xl">
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {menuCollapse ? (
                <nav class="navbar" style={{ backgroundColor: "transparent" }}>
                  <div class="navbar-brand">
                    <img
                      alt=""
                      src={Logo}
                      width="70"
                      height="70"
                      style={{ marginLeft: "14px", marginTop: "10px" }}
                    />
                  </div>
                </nav>
              ) : (
                <nav
                  class="navbar"
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "-webkit-center",
                  }}
                >
                  <div class="navbar-brand">
                    <img
                      alt=""
                      src={Logo}
                      width="70"
                      height="70"
                      style={{
                        marginLeft: "10%",
                        marginTop: "10px",
                      }}
                    />
                    <span
                      style={{
                        color: "white",
                        marginLeft: "2%",
                        fontSize: "16px",
                        marginTop: "22px",

                        fontFamily: "RalewaySemiBold",
                        lineHeight: "20px",
                      }}
                    >
                      Үндсэний аудитын газар
                    </span>
                  </div>
                </nav>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            {userDetils.USER_TYPE_NAME !== "SURVEY" ? (
              <Menu iconShape="square">
                <MenuItem active={menuClick.menu0}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu0: !menuClick.menu0 })}
                  >
                    <img
                      src={menuClick.menu0 ? Dashboard : DashboardW}
                      width="40"
                      height="30"
                      alt=""
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu0 ? "#418ee6" : "white"}`,
                      }}
                    >
                      Дашбоард
                    </p>
                  </div>
                </MenuItem>
                <MenuItem active={menuClick.menu1}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu1: !menuClick.menu1 })}
                  >
                    <img
                      src={menuClick.menu1 ? UserB : User}
                      width="40"
                      height="30"
                      alt=""
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu1 ? "#418ee6" : "white"}`,
                      }}
                    >
                      Ажилтны бүртгэлийн жагсаалт
                    </p>
                  </div>
                </MenuItem>
                {userDetils?.USER_TYPE_NAME.includes("BRANCH") ? null : (
                  <MenuItem active={menuClick.menu2}>
                    <div
                      className="CustomMenu"
                      onClick={() => SelectMenu({ menu2: !menuClick.menu2 })}
                    >
                      <img
                        src={menuClick.menu2 ? GroupB : Group}
                        width="40"
                        height="30"
                        alt=""
                      />
                      <p
                        className="MenuText"
                        style={{
                          color: `${menuClick.menu2 ? "#418ee6" : "white"}`,
                        }}
                      >
                        Байгууллагын бүтцийн бүртгэл
                      </p>
                    </div>
                  </MenuItem>
                )}
                {userDetils?.USER_TYPE_NAME.includes("BRANCH") ? null : (
                  <MenuItem active={menuClick.menu3}>
                    <div
                      className="CustomMenu"
                      onClick={() => SelectMenu({ menu3: !menuClick.menu3 })}
                    >
                      <img
                        src={menuClick.menu3 ? BagB : Bag}
                        width="40"
                        height="30"
                        alt=""
                      />
                      <p
                        className="MenuText"
                        style={{
                          color: `${menuClick.menu3 ? "#418ee6" : "white"}`,
                        }}
                      >
                        Албан тушаалын бүртгэл
                      </p>
                    </div>
                  </MenuItem>
                )}
                <MenuItem active={menuClick.menu4}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu4: !menuClick.menu4 })}
                  >
                    <img
                      src={menuClick.menu4 ? DocumentsB : Documents}
                      width="40"
                      height="30"
                      alt=""
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu4 ? "#418ee6" : "white"}`,
                      }}
                    >
                      Шийдвэр, тушаалын бүртгэл
                    </p>
                  </div>
                </MenuItem>
                {userDetils?.USER_TYPE_NAME.includes("BRANCH") ? null : (
                  <MenuItem active={menuClick.menu5}>
                    <div
                      className="CustomMenu"
                      onClick={() => SelectMenu({ menu5: !menuClick.menu5 })}
                    >
                      <img
                        src={menuClick.menu5 ? TailanB : Tailan}
                        width="40"
                        height="30"
                        alt=""
                      />
                      <p
                        className="MenuText"
                        style={{
                          color: `${menuClick.menu5 ? "#418ee6" : "white"}`,
                        }}
                      >
                        Судалгаа
                      </p>
                    </div>
                  </MenuItem>
                )}

                <MenuItem active={menuClick.menu10}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu10: !menuClick.menu10 })}
                  >
                    <img
                      src={menuClick.menu10 ? BagB : Bag}
                      width="40"
                      height="30"
                      alt=""
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu10 ? "#418ee6" : "white"}`,
                      }}
                    >
                      Ахмадын бүртгэл
                    </p>
                  </div>
                </MenuItem>

                {userDetils.USER_TYPE_NAME.includes("ADMIN") ? (
                  <>
                    <MenuItem active={menuClick.menu11}>
                      <div
                        className="CustomMenu"
                        onClick={() =>
                          SelectMenu({ menu11: !menuClick.menu11 })
                        }
                      >
                        <img
                          src={menuClick.menu11 ? BBaiguullaga : Baiguullaga}
                          width="40"
                          height="30"
                          alt=""
                        />
                        <p
                          className="MenuText"
                          style={{
                            color: `${menuClick.menu11 ? "#418ee6" : "white"}`,
                          }}
                        >
                          АХЭ бүртгэл
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem active={menuClick.menu12}>
                      <div
                        className="CustomMenu"
                        onClick={() =>
                          SelectMenu({ menu12: !menuClick.menu12 })
                        }
                      >
                        <img
                          src={menuClick.menu12 ? BHereglegch : Hereglegch}
                          width="40"
                          height="30"
                          alt=""
                        />
                        <p
                          className="MenuText"
                          style={{
                            color: `${menuClick.menu12 ? "#418ee6" : "white"}`,
                          }}
                        >
                          Хэрэглэгч
                        </p>
                      </div>
                    </MenuItem>
                  </>
                ) : null}

                {/* <MenuItem active={menuClick.menu7}>
                <div
                  className="CustomMenu"
                  onClick={() => SelectMenu({ menu7: !menuClick.menu4 })}
                >
                  <img
                    src={menuClick.menu4 ? DocumentsB : Documents}
                    width="40"
                    height="30"
                  />
                  <p
                    className="MenuText"
                    style={{
                      color: `${menuClick.menu7 ? "#418ee6" : "white"}`,
                    }}
                  >
                    {" "}
                    Шийдвэр, тушаалын бүртгэл
                  </p>
                </div>
              </MenuItem> */}
                {/* {userDetils?.USER_TYPE_NAME.includes("BRANCH") ? null : (
                <MenuItem active={menuClick.menu6}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu6: !menuClick.menu6 })}
                  >
                    <img
                      src={menuClick.menu6 ? BNegB : BNeg}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu6 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Албан хаагчийн мэдээлэл
                    </p>
                  </div>
                </MenuItem>
              )} */}
                {/* <MenuItem active={menuClick.menu7}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu7: !menuClick.menu7 })}
                  >
                    <img
                      src={menuClick.menu7 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu7 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
                {/* <MenuItem active={menuClick.menu8}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu8: !menuClick.menu8 })}
                  >
                    <img
                      src={menuClick.menu8 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu8 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
                {/* <MenuItem active={menuClick.menu9}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu9: !menuClick.menu9 })}
                  >
                    <img
                      src={menuClick.menu9 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu9 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
              </Menu>
            ) : (
              <Menu iconShape="square">
                {/* <MenuItem active={menuClick.menu7}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu7: !menuClick.menu7 })}
                  >
                    <img
                      src={menuClick.menu7 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu7 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
                {/* <MenuItem active={menuClick.menu8}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu8: !menuClick.menu8 })}
                  >
                    <img
                      src={menuClick.menu8 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu8 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
                {/* <MenuItem active={menuClick.menu9}>
                  <div
                    className="CustomMenu"
                    onClick={() => SelectMenu({ menu9: !menuClick.menu9 })}
                  >
                    <img
                      src={menuClick.menu9 ? GroupB : Group}
                      width="40"
                      height="30"
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu9 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Санал асуулга
                    </p>
                  </div>
                </MenuItem> */}
              </Menu>
            )}
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <img alt="" src={RigthArrow} width="40" height="30" />
              ) : (
                <img alt="" src={LeftArrow} width="50" height="50" />
              )}
            </div>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
