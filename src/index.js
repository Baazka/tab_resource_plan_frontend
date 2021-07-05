import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bulma/css/bulma.min.css";
import SideBar from "./components/sidebar";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer/Reducer";
import { HashRouter } from "react-router-dom";
const store = createStore(reducer);

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 1000,
  offset: "30px",
  containerStyle: { color: "#233772" },

  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
