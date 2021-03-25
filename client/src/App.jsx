import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main.jsx";
import { GlobalProvider } from "./ContextProvider";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Route path="/Register" exact>
            <Register />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}
