import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import DataTable, { createTheme } from "react-data-table-component";
import { Search, Filter } from "../assets/images/zurag";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

var rowNumber = 1;
createTheme("solarized", {
  text: {
    primary: "gray",
    secondary: "black",
  },
  background: {
    default: "white",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "white",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "4px",
      fontWeight: "bold",
      fontSize: "15px",
      borderColor: "white",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
      webkitBoxShadow: "0px 0px 3px 1px rgb(255 0 0)",
      borderColor: "grey",
      borderBottom: "0.5px solid",
    },
  },
};

const Home = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [found, setFound] = useState();
  const alert = useAlert();

  useEffect(() => {
    async function test() {
      let jagsaalts = await DataRequest({
        url: "http://10.10.10.46:3002/api/v1/employees",
        method: "GET",
        data: {},
      });
      setJagsaalt(jagsaalts?.data);
      console.log(jagsaalts);
    }
    test();
    console.log("jagsaalt", jagsaalt);
  }, [props]);

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state);

    if (state?.selectedRows != undefined)
      employDetail(state?.selectedRows[0]?.EMP_PERSON_ID);
  };
  async function employDetail(value) {
    let employDetail = await DataRequest({
      url: "http://10.10.10.46:3002/api/v1/person/" + value,
      method: "GET",
      data: {},
    });

    let employEmergency = await DataRequest({
      url: "http://10.10.10.46:3002/api/v1/emergency/" + value,
      method: "GET",
      data: {},
    });
    let employfamily = await DataRequest({
      url: "http://10.10.10.46:3002/api/v1/family/" + value,
      method: "GET",
      data: {},
    });

    setData({
      employDetail: employDetail?.data,
      employEmergency: employEmergency?.data,
      employfamily: employfamily?.data,
    });
  }

  async function anketA() {
    if (data !== undefined) history.push("/web/anketA/1", { data });
    else alert.show("Албан тушаалтан сонго");
  }

  function makeSearch(value) {
    setSearch(value);
    let found = jagsaalt?.filter((obj) =>
      equalStr(obj.PERSON_FIRSTNAME, value)
    );
    console.log(found);
    if (found != undefined && found.length > 0) setFound(found);
    else setFound([]);
  }
  function equalStr(value1, value2) {
    if (
      value1 !== undefined &&
      value1 !== "" &&
      value2 !== undefined &&
      value2 !== ""
    )
      if (value1.toUpperCase().includes(value2.toUpperCase())) return true;
    return false;
  }

  const columns = [
    {
      name: "№",
      selector: (row, index) => {
        return index + 1;
      },
      sortable: true,
      width: "40px",
    },
    {
      name: "Газар нэгж",
      selector: "EMP_DEPARTMENT_NAME",
      sortable: true,
      width: "200px",
    },
    {
      name: "Хэлтэс",
      selector: "EMP_SUBDEPARTMENT_NAME",
      sortable: true,
      width: "290px",
    },
    {
      name: "Албан тушаал",
      selector: "EMP_ROLE_NAME",
      sortable: true,
    },
    {
      name: "Ажилтны нэр",
      selector: "PERSON_FIRSTNAME",
      sortable: true,
    },
    {
      name: "Ажилтны овог",
      selector: "PERSON_LASTNAME",
      sortable: true,
    },
    {
      name: "Ажилтны төрөл",
      selector: "EMP_COMPARTMENT_NAME",
      sortable: true,
    },
    {
      name: "Утасны дугаар",
      selector: "PERSON_PHONE",
      sortable: true,
    },
    {
      name: "Имэйл",
      selector: "PERSON_EMAIL",
      sortable: true,
    },
    {
      name: "Анкет А",
      selector: "4",
      sortable: true,
      center: true,
    },
    {
      name: "Анкет Б",
      selector: "6",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      <Header title="АЖИЛТНЫ БҮРТГЭЛИЙН ЖАГСААЛТ" />
      <div
        style={{
          backgroundColor: "white",
          width: "91%",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            borderColor: "gray",
            borderBottom: "1px solid",
            width: "100%",
            padding: "0.5rem",
            marginRight: "-10px",
          }}
        >
          <button
            className="button is-focused"
            style={{
              backgroundColor: "#418ee6",
              color: "white",
              borderColor: "#418ee6",
              borderStyle: "solid",
              border: "2px",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
            }}
          >
            Идэвхтэй
          </button>
          <button
            className="button is-focused"
            style={{
              backgroundColor: "transparent",
              borderColor: "#418ee6",
              color: "black",
              borderStyle: "solid",
              borderRadius: "5px",
              width: "12rem",
              height: "2.1rem",
              fontFamily: "RalewaySemiBold",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
          >
            Идэвхгүй
          </button>
          <div style={{ position: "absolute", right: "3rem" }}>
            <button
              className="button is-focused"
              style={{
                backgroundColor: "#418ee6",
                color: "white",
                borderColor: "#418ee6",
                borderStyle: "solid",
                border: "2px",
                borderRadius: "5px",
                width: "12rem",
                height: "2.1rem",
                fontFamily: "RalewaySemiBold",
                fontSize: "1rem",
              }}
              onClick={anketA}
            >
              АНКЕТ А ХЭСЭГ
            </button>
            <button
              className="button is-focused"
              style={{
                backgroundColor: "#418ee6",
                color: "white",
                borderColor: "#418ee6",
                borderStyle: "solid",
                border: "2px",
                borderRadius: "5px",
                width: "12rem",
                height: "2.1rem",
                fontFamily: "RalewaySemiBold",
                fontSize: "1rem",
                marginLeft: "0.5rem",
              }}
            >
              АНКЕТ Б ХЭСЭГ
            </button>
          </div>
        </div>
        <div
          style={{
            width: "20rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <div class="control has-icons-left has-icons-right">
              <select
                value={"EMP_DEPARTMENT_NAME"}
                // onChange={(text) =>
                //   setPerson({
                //     ...person,
                //     ...{ PERSON_GENDER: text.target.value },
                //   })
                // }
              >
                <option value={"EMP_DEPARTMENT_NAME"}>Газар нэгж</option>
                <option value={"EMP_SUBDEPARTMENT_NAME"}>Хэлтэс</option>
                <option value={"EMP_ROLE_NAME"}>Албан тушаал</option>
                <option value={"PERSON_FIRSTNAME"}>Ажилтны нэр</option>
                <option value={"PERSON_LASTNAME"}>Ажилтны овог</option>
                <option value={"EMP_COMPARTMENT_NAME"}>Ажилтны төрөл</option>
                <option value={"PERSON_PHONE"}>Утасны дугаар</option>
                <option value={"PERSON_EMAIL"}>Имэйл</option>
              </select>

              <span class="icon is-small is-right">
                <img src={Filter} />
              </span>
              <span class="icon is-small is-right"></span>
            </div>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-small is-gray"
                type="email"
                placeholder="хайлт хийх утгаа оруулна уу"
                value={search}
                onChange={(e) => makeSearch(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "18rem",
                }}
              />

              <span class="icon is-small is-right">
                <img src={Search} />
              </span>
              <span class="icon is-small is-right"></span>
            </div>
            <span style={{ width: "40", height: "40" }}>
              <img src={Filter} width="35" height="40" />
            </span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={search === "" ? jagsaalt : found}
          theme="solarized"
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={10}
          noDataComponent="мэдээлэл байхгүй байна"
          selectableRows // add for checkbox selection
          Clicked
          onSelectedRowsChange={handleChange}
          noHeader={true}
          fixedHeader={true}
          overflowY={true}
          overflowYOffset={"390px"}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
