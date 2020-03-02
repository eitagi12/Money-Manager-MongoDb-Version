import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import home from "./pages/home/";
import loginPage from "./pages/login";
import registerPage from "./pages/register";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={loginPage} />
        <Route exaxt path="/home" component={home} />
        <Route exact path="/register" component={registerPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
