import React from "react";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StorageHelper from "../../helpers/storage-helper";

const PrivateRoute = ({ auth, roles, path, redirectTo, ...rest }) =>
  userAuthorized(auth, roles) ? (
    redirectTo ? (
      <Redirect to={redirectTo} />
    ) : (
      <Route {...rest} />
    )
  ) : (
    <Redirect to="/login" />
  );

const userAuthorized = (auth, roles) =>
  auth.isAuthenticated && StorageHelper.userHasRole(roles);

const userHasRole = roles => {
  if (!roles || !roles.length) return true;
  const user = this.getUserFromToken();
  if (!user) return false;

  if (Array.isArray(roles)) {
    return roles.indexOf(user.role) > -1;
  } else {
    return roles === user.role;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
