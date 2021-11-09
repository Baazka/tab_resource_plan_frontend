import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Iframe from "react-iframe";

const Dashboard = (props) => {
  const history = useHistory();
  const [jagsaalt, setJagsaalt] = useState();

  return (
    <div>
      {/* <Header title="Дашбоард" /> */}
      <div
        style={{
          position: "absolute",
          left: "20%",
          width: "50%",
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
          Дашбоард
        </span>
      </div>
      <div
        style={{
          backgroundColor: "white",
          overflow: "scroll",
          height: "100vh",
        }}
      >
        <Iframe
          url="https://app.powerbi.com/view?r=eyJrIjoiNWExZjEwMTItMTUwZS00MjRhLTlkYWItOTI2ZjNiYTRiYzkwIiwidCI6ImI0MDYwNDEyLTEwM2MtNDBlNy05YzExLTBhNjBkY2NhZjVhZCIsImMiOjEwfQ%3D%3D"
          width="93%"
          height={window.innerHeight - 100}
          id="myId"
          className="myClassname"
          position="relative"
        />
      </div>
    </div>
  );
};

export default Dashboard;
