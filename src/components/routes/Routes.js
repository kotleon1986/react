import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainLayout}>
          <Route exact path="/login" component={Login} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
