import "./App.css";

import React from "react";

import {
  BrowserRouter,
  Route,
  Link,
  useHistory,
  Switch,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import { useAlert } from "react-alert";
import Login from "./pages/Login";
import AnketA from "./components/anketNeg";
import Store from "./functions/Store";
import SideBar from "./components/sidebar";
import Header from "./components/header";
import AlbanTushaal from "./pages/AlbanTushaal";
import Dashboard from "./pages/Dashboard";
import Baiguullaga from "./pages/Baiguullaga";
import TushaalShiidver from "./pages/TushaalShiidver";

const axios = require("axios");

function App() {
  const alert = useAlert();
  const history = useHistory();

  function BlogPost() {
    // We can call useParams() here to get the params,
    // or in any child element as well!
    let { slug } = useParams();
    // ...
  }

  return (
    <Store>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/web">
        <SideBar />
      </Route>
      <Route path="/web/workerList">
        <Home />
      </Route>
      <Route path="/web/alba">
        <AlbanTushaal />
      </Route>
      <Route path="/web/anketA/:id" component={AnketA} exact />
      <Route path="/web/dashboard/" component={Dashboard} exact />
      <Route path="/web/Baiguullaga/" component={Baiguullaga} exact />
      <Route path="/web/AlbanTushaal/" component={AlbanTushaal} exact />
      <Route path="/web/TushaalShiidver/" component={TushaalShiidver} exact />
    </Store>
  );
}

function Users() {
  return <h2>User</h2>;
}
function About() {
  return <h2>About us</h2>;
}

export default App;
