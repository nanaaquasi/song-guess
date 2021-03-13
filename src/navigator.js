import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";
import Welcome from "./pages/Welcome";

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/redirect' component={RedirectPage} />
      <Route exact path='/welcome' component={Welcome} />
    </Switch>
  );
};

export default Router;
