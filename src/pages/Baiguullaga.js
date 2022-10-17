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

// function Subdepartment(props) {
//   const [data, loadData] = useState([]);
//   const [subDepId, setSubDepId] = useState(null);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     async function test() {
//       let jagsaalts = await DataRequest({
//         url: hrUrl + "/subdepartment/" + props?.deparment_ID,
//         method: "GET",
//         data: {},
//       });

//       loadData(jagsaalts?.data);
//     }
//     test();
//   }, [props]);

//   return (
//     <div>
//       {props?.show === true && props?.deparment_ID === props.depId ? (
//         <div style={{ marginLeft: "2%" }}>
//           <div
//             style={{
//               borderRadius: "8px",
//               backgroundColor: "rgb(184, 217, 255,0.3)",
//               padding: "5px",
//               height: "40px",
//             }}
//           >
//             <div className="columns">
//               <div className="column is-4">
//                 <span
//                   style={{
//                     color: "grey",
//                     fontWeight: "bold",
//                     fontSize: "1rem",
//                     marginLeft: "5px",
//                   }}
//                 >
//                   Газар нэгж
//                 </span>
//                 <span
//                   style={{
//                     marginLeft: "20px",
//                     color: "white",
//                     height: "25px",
//                     width: "25px",
//                     backgroundColor: "#418ee6",
//                     borderRadius: "50%",
//                     display: "inline-block",
//                     textAlign: "center",
//                   }}
//                 >
//                   {data.length}
//                 </span>
//               </div>
//               <div className="column is-4"></div>
//               <div className="column is-4 has-text-right">
//                 <img
//                   alt=""
//                   src={Add}
//                   width="30px"
//                   height="25px"
//                   onClick={() =>
//                     props.setAdd({ type: 2, deparment_ID: props?.deparment_ID })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               marginLeft: "5%",
//             }}
//           >
//             {data.map((value, index) => (
//               <div
//                 style={{
//                   width: "100%",
//                   border: "1px solid rgb(184, 217, 255,0.3)",
//                 }}
//               >
//                 <div className="columns">
//                   <div className="column is-6">
//                     <button
//                       className="button"
//                       style={{
//                         justifyContent: "flex-start",
//                         border: "none",
//                       }}
//                       onClick={() => {
//                         setSubDepId(value.SUB_DEPARTMENT_ID);
//                         setShow(!show);
//                       }}
//                     >
//                       <span style={{ fontSize: "0.8rem" }}>
//                         {index + 1}.{value.SUB_DEPARTMENT_NAME}
//                       </span>
//                     </button>
//                   </div>
//                   <div className="column is-2" />
//                   <div className="column is-1">
//                     <span style={{ fontSize: "0.8rem" }}>Чиг үүрэг:</span>
//                   </div>
//                   <div className="column is-3">
//                     <ChigUureg
//                       deparment_id_path={
//                         props?.deparment_ID +
//                         "/" +
//                         value.SUB_DEPARTMENT_ID +
//                         "/null/"
//                       }
//                       SUB_DEPARTMENT_ID={value.SUB_DEPARTMENT_ID}
//                       COMPARTMENT_ID={props?.deparment_ID}
//                       DEPARTMENT_ID={null}
//                     />
//                   </div>
//                 </div>
//                 <Compartment
//                   show={show}
//                   deparment_ID={value.SUB_DEPARTMENT_ID}
//                   deparment_id_path={
//                     props?.deparment_ID +
//                     "/" +
//                     value.SUB_DEPARTMENT_ID +
//                     "/null"
//                   }
//                   subDepId={subDepId}
//                   setAdd={props.setAdd}
//                   subType={0}
//                 />
//               </div>
//             ))}
//           </div>
//           {data.length === 0 ? (
//             <Compartment
//               show={props?.show}
//               deparment_ID={props?.deparment_ID}
//               deparment_id_path={props?.deparment_ID + "/null/null?"}
//               subDepId={props?.deparment_ID}
//               setAdd={props.setAdd}
//               subType={1}
//             />
//           ) : null}
//         </div>
//       ) : null}
//     </div>
//   );
// }
// function Compartment(props) {
//   const [data, loadData] = useState([]);

//   useEffect(() => {
//     async function test() {
//       let jagsaalts = await DataRequest({
//         url: hrUrl + "/compartment/" + props?.deparment_id_path,
//         method: "GET",
//         data: {},
//       });
//       loadData(jagsaalts?.data);
//     }
//     test();
//   }, [props]);

//   return (
//     <div>
//       {props?.show === true && props?.deparment_ID === props.subDepId ? (
//         <div style={{ marginLeft: "2%" }}>
//           <div
//             style={{
//               borderRadius: "8px",
//               backgroundColor: "rgb(184, 217, 255,0.3)",
//               padding: "5px",
//               height: "40px",
//             }}
//           >
//             <div className="columns">
//               <div className="column is-4">
//                 {/* <img
//                   src={DownArrow}
//                   width="15px"
//                   style={{ marginLeft: "5px" }}
//                 /> */}
//                 <span
//                   style={{
//                     color: "grey",
//                     fontWeight: "bold",
//                     fontSize: "1rem",
//                     marginLeft: "5px",
//                   }}
//                 >
//                   Албан хэлтэс
//                 </span>
//                 <span
//                   style={{
//                     marginLeft: "20px",
//                     color: "white",
//                     height: "25px",
//                     width: "25px",
//                     backgroundColor: "#418ee6",
//                     borderRadius: "50%",
//                     display: "inline-block",
//                     textAlign: "center",
//                   }}
//                 >
//                   {data.length}
//                 </span>
//               </div>
//               <div className="column is-4"></div>
//               <div className="column is-4 has-text-right">
//                 <img
//                   src={Add}
//                   width="30px"
//                   height="25px"
//                   onClick={() =>
//                     props.setAdd({
//                       type: 3,
//                       deparment_ID: props?.deparment_ID,
//                       subType: props.subType,
//                     })
//                   }
//                   alt=""
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               marginLeft: "5%",
//             }}
//           >
//             {data.map((value, index) => (
//               <div
//                 style={{
//                   width: "100%",
//                   border: "1px solid rgb(184, 217, 255,0.3)",
//                 }}
//               >
//                 <div className="columns">
//                   <div className="column is-6">
//                     <button
//                       className="button"
//                       style={{
//                         justifyContent: "flex-start",
//                         border: "none",
//                       }}
//                     >
//                       {index + 1}.{value.COMPARTMENT_NAME}
//                     </button>
//                   </div>
//                   <div className="column is-1">
//                     <span style={{ fontSize: "0.8rem" }}>Чиг үүрэг:</span>
//                   </div>
//                   <div className="column is-5">
//                     <ChigUureg
//                       deparment_id_path={
//                         props?.deparment_ID +
//                         "/" +
//                         props.SUB_DEPARTMENT_ID +
//                         "/" +
//                         value.COMPARTMENT_ID
//                       }
//                       SUB_DEPARTMENT_ID={props.SUB_DEPARTMENT_ID}
//                       COMPARTMENT_ID={value.COMPARTMENT_ID}
//                       DEPARTMENT_ID={props?.deparment_ID}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }
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

const Baiguullaga = (props) => {
  const [jagsaalts, setJagsaalts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("PERSON_FIRSTNAME");
  const [found, setFound] = useState([]);
  const [IS_ACTIVE, setIS_ACTIVE] = useState(0);

  async function fetchData(param) {
    console.log(("IS_active", param));
    let jagsaalts = await DataRequest({
      url: hrUrl + "/organization/",
      method: "POST",
      data: { IS_ACTIVE: param === undefined ? IS_ACTIVE : param },
    });
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

// function AddDialog(props) {
//   const alert = useAlert();
//   const [data, loadData] = useState();

//   useEffect(() => {
//     //console.log("jagsaaltBaaaaaaaaprops", props);
//     async function test() {
//       if (data === undefined || data === null) {
//         if (props.add.deparment_ID !== "new") {
//           let jagsaalts = await DataRequest({
//             url: hrUrl + "/" + props?.add.path,
//             method: "GET",
//             data: {},
//           });
//           //console.log("jagsaaltBaaaaaaaa", jagsaalts);
//           if (jagsaalts.data !== undefined && jagsaalts.data.length !== 0)
//             loadData(jagsaalts?.data[0]);
//           else
//             loadData({
//               DEPARTMENT_ID: props.deparment_ID,
//               DEPARTMENT_CODE: "",
//               DEPARTMENT_SHORT_NAME: "",
//               DEPARTMENT_NAME: "",
//               ORDER_NO: "",
//               START_DATE: new Date(),
//               OFFICE_ID: 1,
//               OFFICE_ADDRESS: "",
//               OFFICE_PHONE: "",
//               IS_ACTIVE: 1,
//               CREATED_BY: userDetils?.USER_ID,
//               CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//             });
//         } else {
//           loadData({
//             DEPARTMENT_ID: props.deparment_ID,
//             DEPARTMENT_CODE: "",
//             DEPARTMENT_SHORT_NAME: "",
//             DEPARTMENT_NAME: "",
//             ORDER_NO: "",
//             START_DATE: new Date(),
//             OFFICE_ID: 1,
//             OFFICE_ADDRESS: "",
//             OFFICE_PHONE: "",
//             IS_ACTIVE: 1,
//             CREATED_BY: userDetils?.USER_ID,
//             CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//           });
//         }
//       }
//     }
//     test();
//   }, [props]);

//   function saveToDB() {
//     DataRequest({
//       url: hrUrl + "/" + props.add.path,
//       method: "POST",
//       data: data,
//     })
//       .then(function (response) {
//         if (response?.data?.message === "success") {
//           alert.show("амжилттай хадгаллаа");
//         } else {
//           alert.show("Системийн алдаа");
//         }
//         //history.push('/sample')
//       })
//       .catch(function (error) {
//         //alert(error.response.data.error.message);
//         console.log(error.response);
//         alert.show("Системийн алдаа");
//       });
//   }

//   let design;
//   if (data !== undefined && data !== null) {
//     design = (
//       <div>
//         <div
//           style={{
//             position: "absolute",
//             width: "60%",
//             height: "auto",
//             left: "25%",
//             top: "10%",
//             borderRadius: "6px",
//             backgroundColor: "white",
//             boxShadow:
//               "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//             zIndex: "1",
//           }}
//         >
//           <div
//             style={{
//               height: "auto",
//               backgroundColor: "#418ee6",
//               padding: "18px 10px 18px 10px",
//               color: "white",
//               marginBottom: "10px",
//               borderTopLeftRadius: "6px",
//               borderTopRightRadius: "6px",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <div>{/* <span>ТУШААЛЫН БҮРТГЭЛ</span> */}</div>
//             <div>
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   cursor: "grab",
//                 }}
//                 onClick={() => props.setAdd({ type: 0, id: 0 })}
//               >
//                 X
//               </span>
//             </div>
//           </div>
//           <div style={{ padding: "15px 15px 35px 15px" }}>
//             <div>
//               <div className="columns  ">
//                 <div className="column is-6">
//                   <h1>Код:</h1>
//                   <input
//                     class="input "
//                     value={data.DEPARTMENT_CODE}
//                     onChange={(e) =>
//                       loadData({
//                         ...data,
//                         ...{
//                           DEPARTMENT_CODE: e.target.value,
//                           UPDATED_BY: userDetils?.USER_ID,
//                           UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                         },
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="column is-6">
//                   <h1>Аймаг/хот:</h1>
//                   <Office
//                     personChild={data}
//                     setPersonChild={loadData}
//                     width={true}
//                   />
//                 </div>
//               </div>

//               <div className="columns">
//                 <div className="column is-6">
//                   <h1>Товч нэр:</h1>
//                   <input
//                     class="input"
//                     value={data.DEPARTMENT_SHORT_NAME}
//                     onChange={(e) =>
//                       loadData({
//                         ...data,
//                         ...{
//                           DEPARTMENT_SHORT_NAME: e.target.value,
//                           UPDATED_BY: userDetils?.USER_ID,
//                           UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                         },
//                       })
//                     }
//                   />
//                   <div className="columns">
//                     <div className="column is-12">
//                       <h1>Байгууллагын нэр:</h1>
//                       <input
//                         class="input"
//                         value={data.DEPARTMENT_NAME}
//                         onChange={(e) =>
//                           loadData({
//                             ...data,
//                             ...{
//                               DEPARTMENT_NAME: e.target.value,
//                               UPDATED_BY: userDetils?.USER_ID,
//                               UPDATED_DATE: dateFormat(
//                                 new Date(),
//                                 "dd-mmm-yyyy"
//                               ),
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="column is-6">
//                   <h1>Хаяг:</h1>
//                   <textarea
//                     class="input"
//                     value={data?.OFFICE_ADDRESS}
//                     onChange={(e) =>
//                       loadData({
//                         ...data,
//                         ...{
//                           OFFICE_ADDRESS: e.target.value,
//                           UPDATED_BY: userDetils?.USER_ID,
//                           UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                         },
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="columns">
//                   <div className="column is-6">
//                     <h1>Хэрэгжих огноо:</h1>
//                     <input
//                       type="date"
//                       className="input"
//                       value={dateFormat(data?.START_DATE, "yyyy-mm-dd")}
//                       onChange={(e) => {
//                         loadData({
//                           ...data,
//                           ...{
//                             START_DATE: e.target.value,
//                             UPDATED_BY: userDetils?.USER_ID,
//                             UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                           },
//                         });
//                       }}
//                     ></input>
//                   </div>
//                   <div className="column is-6">
//                     <h1>Утас:</h1>
//                     <input
//                       class="input  is-size-7"
//                       value={data?.OFFICE_PHONE}
//                       onChange={(e) => {
//                         loadData({
//                           ...data,
//                           ...{
//                             OFFICE_PHONE: e.target.value,
//                             UPDATED_BY: userDetils?.USER_ID,
//                             UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                           },
//                         });
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="columns">
//                   <div className="column is-6">
//                     <h1>Эрэмбэ:</h1>
//                     <input
//                       class="input  is-size-7"
//                       type="number"
//                       value={data.ORDER_NO}
//                       onChange={(e) => {
//                         loadData({
//                           ...data,
//                           ...{
//                             ORDER_NO: e.target.value,
//                             UPDATED_BY: userDetils?.USER_ID,
//                             UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
//                           },
//                         });
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="columns">
//                 <div className="column is-8"> </div>
//                 <div className="column is-4 has-text-right">
//                   <button
//                     className="buttonTsenkher ml-1"
//                     onClick={() => {
//                       saveToDB();
//                     }}
//                   >
//                     Хадгалах
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     design = <div>achaalj baina</div>;
//   }
//   return design;
// }

// function ChigUureg(props) {
//   const [data, loadData] = useState([]);
//   const [edit, setEdit] = useState(true);
//   const alert = useAlert();

//   useEffect(() => {
//     async function test() {
//       if (data.length === 0) {
//         let jagsaalts = await DataRequest({
//           url: hrUrl + "/organizationrole/" + props?.deparment_id_path,
//           method: "GET",
//           data: {},
//         });
//         if (jagsaalts.data !== undefined && jagsaalts.data.length !== 0)
//           loadData(jagsaalts?.data);
//         else addRow();
//       }
//     }
//     test();
//   }, [props]);
//   function saveToDB() {
//     if (requiredField(data) === true) {
//       DataRequest({
//         url: hrUrl + "/organizationrole/" + props?.deparment_id_path,
//         method: "POST",
//         data: data,
//       })
//         .then(function (response) {
//           //console.log("UpdateResponse", response);

//           if (response?.data?.message === "success") {
//             alert.show("амжилттай хадгаллаа");
//             setEdit(!edit);
//           } else {
//             alert.show("Системийн алдаа");
//             setEdit(!edit);
//           }
//           //history.push('/sample')
//         })
//         .catch(function (error) {
//           //alert(error.response.data.error.message);
//           console.log(error.response);
//           alert.show("Системийн алдаа");
//           setEdit(!edit);
//         });
//     }
//   }

//   function requiredField() {
//     for (let i = 0; i < data.length; i++) {
//       if (
//         data[i].ORGANIZATION_ROLE_NAME === null ||
//         data[i].ORGANIZATION_ROLE_NAME === ""
//       ) {
//         alert.show(" нэр оруулан уу");
//         return false;
//       } else if (i === data.length - 1) {
//         return true;
//       }
//     }
//   }

//   function addRow() {
//     let value = [...data];
//     value.push({
//       ORGANIZATION_ROLE_ID: null,
//       ORGANIZATION_ROLE_NAME: "",
//       DEPARTMENT_ID: props.DEPARTMENT_ID,
//       SUB_DEPARTMENT_ID: props.SUB_DEPARTMENT_ID,
//       COMPARTMENT_ID: props.COMPARTMENT_ID,
//       IS_ACTIVE: 1,
//       CREATED_BY: userDetils?.USER_ID,
//       CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
//     });
//     loadData(value);
//   }

//   function removeRow(indexParam, value) {
//     if (value?.ORGANIZATION_ROLE_ID !== null) {
//       DataRequest({
//         url: hrUrl + "/organizationrole/" + props?.deparment_id_path,
//         method: "POST",
//         data: {
//           ...value,
//           ...{
//             IS_ACTIVE: 1,
//             UPDATED_BY: userDetils?.USER_ID,
//             UPDATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
//           },
//         },
//       })
//         .then(function (response) {
//           console.log("UpdateResponse", response);
//           //history.push('/sample')
//           if (response?.data?.message === "success") {
//             alert.show("амжилттай устлаа");
//             setEdit(!edit);
//           }
//         })
//         .catch(function (error) {
//           //alert(error.response.data.error.message);
//           console.log(error.response);
//           alert.show("aldaa");
//         });
//     }
//     loadData(data.filter((element, index) => index !== indexParam)); //splice(indexParam, 0)
//   }

//   return (
//     <div style={{ display: "flex" }}>
//       <table className="table ">
//         <thead>
//           <tr>
//             <td>
//               <span className="textSaaral">№</span>
//             </td>
//             <td>
//               <span className="textSaaral">нэр</span>
//             </td>
//             {!edit ? (
//               <td
//                 style={{
//                   borderColor: "transparent",
//                   border: "none",
//                   paddingLeft: "0px",
//                   width: "50px",
//                 }}
//               >
//                 <img
//                   src={Add}
//                   width="30px"
//                   height="30px"
//                   onClick={() => addRow()}
//                   alt=""
//                 />
//               </td>
//             ) : null}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((value, index) => (
//             <tr>
//               <td>
//                 <span className="textSaaral">{index + 1}</span>
//               </td>
//               <td>
//                 <input
//                   disabled={edit}
//                   className="Borderless"
//                   placeholder="утгаа оруулна уу"
//                   value={data[index]?.ORGANIZATION_ROLE_NAME}
//                   onChange={(text) => {
//                     let value = [...data];
//                     value[index].ORGANIZATION_ROLE_NAME = text.target.value;
//                     value[index].UPDATED_BY = userDetils?.USER_ID;
//                     value[index].UPDATED_DATE = dateFormat(
//                       new Date(),
//                       "dd-mmm-yy"
//                     );
//                     loadData(value);
//                   }}
//                 />
//               </td>
//               {!edit ? (
//                 <td
//                   style={{
//                     paddingLeft: "0px",
//                     borderColor: "transparent",
//                     width: "50px",
//                   }}
//                 >
//                   <img
//                     src={Delete}
//                     width="30px"
//                     height="30px"
//                     onClick={() => removeRow(index, value)}
//                     alt=""
//                   />
//                 </td>
//               ) : null}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button
//         className="buttonTsenkher"
//         style={{ height: "30px", marginLeft: "5px" }}
//         onClick={() => setEdit(!edit)}
//       >
//         засах
//       </button>
//       {!edit ? (
//         <button
//           className="buttonTsenkher"
//           style={{ height: "30px", marginLeft: "5px" }}
//           onClick={() => saveToDB()}
//         >
//           хадгалах
//         </button>
//       ) : null}
//     </div>
//   );
// }

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
export default Baiguullaga;
