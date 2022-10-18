import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { DataRequest } from "../functions/DataApi";
import dateFormat from "dateformat";
import styled from "styled-components";
import { useTable, usePagination, useSortBy } from "react-table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Add, Edit, Delete, Excel } from "../assets/images/zurag";
import { Office } from "../components/library";
import hrUrl from "../hrUrl";
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} style={{ border: "none", width: "90vw" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    backgroundColor: "transparent",
                    color: "#808080",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderBottom: "1px solid black",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          style={{
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        borderRight: "none",
                        borderLeft: "none",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination" style={{ justifyContent: "end" }}>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="border p-1"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="border p-1"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="border p-1"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="border p-1"
        >
          {">>"}
        </button>{" "}
        <span>
          Хуудас{" "}
          <strong>
            {pageIndex + 1} - {pageOptions.length}
          </strong>{" "}
        </span>
        <span class="px-1"> Нийт: {rows.length}</span>
        {/* <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="border p-1"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </>
  );
}

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

  const columns = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: (row, i) => i + 1,
      },
      {
        Header: "Төрийн аудитын байгууллага",
        accessor: "DEPARTMENT_NAME",
      },
      {
        Header: "Харъяа газар",
        accessor: "SUB_DEPARTMENT_NAME",
      },
      {
        Header: "Дотоод бүтцийн нэгж",
        accessor: "COMPARTMENT_NAME",
      },
      {
        Header: "Албан тушаал",
        accessor: "POSITION_NAME",
      },
    ],

    []
  );

  const data = React.useMemo(() => jagsaalts, [jagsaalts]);

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
            className="button"
            style={{
              height: "1.8rem",
              padding: "0.5rem",
              borderRadius: "5px",
              backgroundColor: "#1cc88a",
              color: "#fff",
            }}
            onClick={() => document.getElementById("AlbanTushaalXLS").click()}
          >
            <span style={{ display: "flex", paddingRight: "22px" }}>
              <image src={Excel} width="20px" height="20px " />
              Excel
            </span>
          </button>

          <div style={{ width: "500px" }}>
            <BaiguullagaExcel data={jagsaalts} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100vh !important",
              overflow: "scroll",
            }}
          >
            <Styles>
              <Table columns={columns} data={data} />
            </Styles>
          </div>
        </div>
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
            id="AlbanTushaalXLS"
            className="download-table-xls-button"
            table="albanTushaal-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="XLS"
          />

          <table id="albanTushaal-to-xls">
            <tr>
              <th>№</th>
              <th>Төрийн аудитын байгууллага</th>
              <th>Харъяа газар</th>
              <th>Дотоод бүтцийн нэгж</th>
              <th>Албан тушаал</th>
            </tr>
            {data.map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.DEPARTMENT_NAME}</td>
                <td>{value.SUB_DEPARTMENT_NAME}</td>
                <td>{value.COMPARTMENT_NAME}</td>
                <td>{value.POSITION_NAME}</td>
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
