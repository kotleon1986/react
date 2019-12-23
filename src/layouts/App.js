import React, { Fragment, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { Spin } from "antd";

import { authorizeUser } from "../modules/auth/actions/auth";

import Routes from "../routes/Routes";

const AppLayout = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loader) {
      authorizeUser(dispatch).then(() => setLoader(false));
    }
  });

  const loading = () => <Spin id="loading-spinner" tip="Loading..." />;

  return <Fragment>{loader ? loading() : <Routes />}</Fragment>;
};

export default AppLayout;
