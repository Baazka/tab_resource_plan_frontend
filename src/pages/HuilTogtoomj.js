import React, { useEffect, useState, useReducer } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
function Nvvr(props) {
  return (
    <div style={{ display: "flex" }}>
      <BusadMedeelel />
      <Header title="ХУУЛЬ ТОГТООМЖ"></Header>
      <div style={{}}></div>

      <HamgaalaltiinHeregsel />
    </div>
  );
}
function BusadMedeelel(props) {
  return (
    <div style={{ marginTop: "3%" }}>
      <div
        className="box"
        style={{
          width: "150%",
          height: "300%",
          marginLeft: "30%",
        }}
      >
        <br />
        <div className="columns">
          <div className="column is-8">
            <span style={{ fontWeight: "bold" }}>
              Хууль тогтоомжийг төрөлжүүлэн бүлэглэн сан байгуулах
            </span>
          </div>
          <div className="column is-1">
            <button style={{ padding: "5px 10px" }}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function HamgaalaltiinHeregsel(props) {
  return (
    <div style={{ marginTop: "3%" }}>
      <div
        className="box"
        style={{
          width: "140%",
          height: "300%",
          marginLeft: "90%",
        }}
      >
        <br />
        <div className="columns">
          <div className="column is-6">
            <span style={{ fontWeight: "bold" }}>
              Байгууллагын дотоод, дүрэм, журам бүлэглэн, сан бүрдүүлэх
            </span>
          </div>
          <div className="column is-1">
            <button style={{ padding: "5px 10px" }}>+</button>
          </div>
        </div>
        <div style={{ textAlignLast: "center", backgroundColor: "beige" }}>
          <div className="columns ">
            <div className="column is-11 has-text-item">
              Байгууллагын дотоод
            </div>
          </div>
          <div className="columns ">
            <div className="column is-11">дүрэм</div>
          </div>
          <div className="columns">
            <div className="column is-11">журам бүлэглэн</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Nvvr;
