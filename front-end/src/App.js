import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import home from "./pages/home/";
import loginPage from "./pages/login";
import registerPage from "./pages/register";
import activityPage from "./pages/activity";
import historyPage from "./pages/history";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={loginPage} />
        <Route exaxt path="/home" component={home} />
        <Route exact path="/register" component={registerPage} />
        <Route exact path="/newactivity" component={activityPage} />
        <Route exact path="/history" component={historyPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
