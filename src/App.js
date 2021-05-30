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
      <Switch>
        <Route path="/" exact>
          <Login />{" "}
        </Route>
        <Route path="/workerList">
          <Home />
        </Route>
        <Route path="/anketA/:id" component={AnketA} exact />
      </Switch>
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
