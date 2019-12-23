import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainRoutes from "./Main";
import AuthRoutes from "./Auth";

const Routes = () => (
  <Router>
    <MainRoutes />
    <AuthRoutes />
  </Router>
);

export default Routes;
