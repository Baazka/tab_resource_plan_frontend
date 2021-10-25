import React, { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "../css/sidebarHeader.css";

import { useHistory } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  RigthArrow,
  LeftArrow,
  Logo,
  LogoB,
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
  BNegB,
  BNeg,
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
      menu6: false,
      menu7: false,
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
    }
    //else if (value?.menu7) {
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
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu2 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
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
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu3 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
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
                  />
                  <p
                    className="MenuText"
                    style={{
                      color: `${menuClick.menu4 ? "#418ee6" : "white"}`,
                    }}
                  >
                    {" "}
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
                    />
                    <p
                      className="MenuText"
                      style={{
                        color: `${menuClick.menu5 ? "#418ee6" : "white"}`,
                      }}
                    >
                      {" "}
                      Судалгаа
                    </p>
                  </div>
                </MenuItem>
              )}
              <MenuItem active={menuClick.menu7}>
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
              </MenuItem>
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
            </Menu>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <img src={RigthArrow} width="40" height="30" />
              ) : (
                <img src={LeftArrow} width="50" height="50" />
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
