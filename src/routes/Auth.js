import React from "react";
import { Switch } from "react-router-dom";

import AuthLayout from "../layouts/Auth";

import AppRoute from "../modules/common/components/AppRoute";
import Login from "../modules/auth/components/Login";
import Register from "../modules/auth/components/Register";

const AuthRoutes = () => (
  <Switch>
    <AppRoute exact path="/login" layout={AuthLayout} component={Login} />
    <AppRoute exact path="/register" layout={AuthLayout} component={Register} />
  </Switch>
);

export default AuthRoutes;
