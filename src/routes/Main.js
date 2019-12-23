import React from "react";
import { Switch } from "react-router-dom";

import AppRoute from "../modules/common/components/AppRoute";
import Home from "../modules/home/components/Home";
import Profile from "../modules/auth/components/Profile";

const MainRoutes = () => (
  <Switch>
    <AppRoute exact path="/" component={Home} />
    <AppRoute exact path="/profile" component={Profile} />
  </Switch>
);

export default MainRoutes;
