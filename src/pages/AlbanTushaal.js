import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import dateFormat from "dateformat";
import { useAlert } from "react-alert";
import DataTable, { createTheme } from "react-data-table-component";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Add, Edit, Delete, Excel } from "../assets/images/zurag";
import { Office } from "../components/library";
import hrUrl from "../hrUrl";
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

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

const AlbanTushaal = (props) => {
  const [jagsaalts, setJagsaalts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState([]);
  const [IS_ACTIVE, setIS_ACTIVE] = useState(0);

  async function fetchData(param) {
    console.log(("IS_active", param));
    let jagsaalts = await DataRequest({
      url: hrUrl + "/POSITION/",
      method: "POST",
      data: { IS_ACTIVE: param === undefined ? IS_ACTIVE : param },
    });
    console.log("POSITION", jagsaalts);
    if (jagsaalts.data !== undefined && jagsaalts.data.length > 0) {
      setJagsaalts(jagsaalts?.data);
    } else {
      setJagsaalts([]);
    }
    console.log(jagsaalts);
  }

  useEffect(() => {
    fetchData();
  }, [props]);

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
      name: "Төрийн аудитын байгууллага",
      selector: "DEPARTMENT_NAME",
      sortable: true,
      width: "200px",
    },
    {
      name: "Харъяа газар",
      selector: "SUB_DEPARTMENT_NAME",
      sortable: true,
      width: "290px",
    },
    {
      name: "Дотоод бүтцийн нэгж",
      selector: "COMPARTMENT_NAME",
      sortable: true,
      width: "290px",
    },
    {
      name: "Албан тушаал",
      selector: "POSITION_NAME",
      sortable: true,
      width: "290px",
    },
    // {
    //   name: "Дотоод бүтцийн нэгж",
    //   selector: "COMPARTMENT_NAME",
    //   sortable: true,
    // },
    // {
    //   name: "Албан тушаалын нэр",
    //   selector: "POSITION_NAME",
    //   sortable: true,
    // },
    // {
    //   name: "Ажилтны нэр",
    //   selector: "PERSON_FIRSTNAME",
    //   sortable: true,
    // },
    // {
    //   name: "Ажилтны овог",
    //   selector: "PERSON_LASTNAME",
    //   sortable: true,
    // },
    // {
    //   name: "Утасны дугаар",
    //   selector: "PERSON_PHONE",
    //   sortable: true,
    // },
    // {
    //   name: "Имэйл",
    //   selector: "PERSON_EMAIL",
    //   sortable: true,
    // },
  ];
  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    // localStorage.removeItem("personDetail");
    // if (
    //   state?.selectedRows !== undefined &&
    //   state?.selectedRows?.length !== 0
    // ) {
    //   console.log("state?.selectRows?.length", state.selectedRows);
    //   console.log("Selected Rows: ", state?.selectedRows[0]?.EMP_ID);
    //   localStorage.setItem(
    //     "personDetail",
    //     JSON.stringify({
    //       person_id:
    //         state?.selectedRows[0]?.EMP_PERSON_ID !== undefined &&
    //         state.selectedRows[0]?.EMP_PERSON_ID !== null
    //           ? state?.selectedRows[0]?.EMP_PERSON_ID
    //           : state?.selectedRows[0].PERSON_ID,
    //       emp_id: state?.selectedRows[0].EMP_ID,
    //       type: "employ",
    //       PERSON_FIRSTNAME: state?.selectedRows[0].PERSON_FIRSTNAME,
    //       PERSON_LASTNAME: state?.selectedRows[0].PERSON_LASTNAME,
    //     })
    //   );
    //   setData({ checked: true });
    // } else {
    //   setData({ checked: false });
    // }
  };

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        maxHeight: "100vh !important",
      }}
    >
      {/* <Header title="" /> */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          left: "7%",
          zIndex: 1,
          top: "20px",
        }}
      >
        <span
          style={{
            color: "#418ee6",
            fontSize: 25,
            fontFamily: "RalewayRegular",
          }}
        >
          БАЙГУУЛЛАГЫН БҮТЦИЙН БҮРТГЭЛ
        </span>
      </div>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "80px",
          marginLeft: "7.5rem",
          overflow: "hidden",
        }}
      >
        <div>
          <div
            className="select is-small"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          >
            <select
              value={IS_ACTIVE}
              onChange={(text) => {
                setIS_ACTIVE(text.target.value);
                fetchData(text.target.value);
              }}
            >
              {" "}
              <option value={0}>A/02</option>
              <option value={1}>Б/147</option>
            </select>
            {/* 
              <span class="icon is-small is-right">
                <img src={Filter} />
              </span> */}
          </div>
          <button
            className="text"
            style={{
              marginLeft: "1%",
              borderRadius: "5px",
              backgroundColor: "#1cc88a",
              color: "#fff",
              border: "double",
            }}
            onClick={() => document.getElementById("BaiguullagaXLS").click()}
          >
            <span style={{ display: "flex", paddingRight: "22px" }}>
              <image src={Excel} width="20px" height="20px " />
              Excel
            </span>
          </button>
          <div style={{ width: "500px" }}>
            <BaiguullagaExcel data={jagsaalts} />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={search === "" ? jagsaalts : found}
          theme="solarized"
          customStyles={customStyles}
          noDataComponent="мэдээлэл байхгүй байна"
          selectableRows // add for checkbox selection
          Clicked
          onSelectedRowsChange={handleChange}
          noHeader={true}
          fixedHeader={true}
          responsive={true}
          overflowY={true}
          overflowYOffset={"390px"}
          pagination={true}
          paginationPerPage={30}
          paginationComponentOptions={{
            rowsPerPageText: "Хуудас:",
            rangeSeparatorText: "нийт:",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

function BaiguullagaExcel({ data }) {
  let listItems;
  if (data !== undefined) {
    listItems = (
      <div style={{ width: "30px", height: "30px", display: "none" }}>
        <div>
          <ReactHTMLTableToExcel
            id="BaiguullagaXLS"
            className="download-table-xls-button"
            table="baiguullga-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="XLS"
          />

          <table id="baiguullga-to-xls">
            <tr>
              <th>№</th>
              <th>Төрийн аудитын байгууллага</th>
              <th>Харъяа газар</th>
              <th>Дотоод бүтцийн нэгж</th>
            </tr>
            {data.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.DEPARTMENT_NAME}</td>
                <td>{value.SUB_DEPARTMENT_NAME}</td>
                <td>{value.COMPARTMENT_NAME}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
export default AlbanTushaal;
