import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";
import Flash from "../../../utils/flash";

import { storeUserDataFromToken } from "../actions/auth";

const { Title } = Typography;

const loginData = {
  email: "",
  password: ""
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email")
    .email("Invalid email"),
  password: Yup.string().required("Please enter password")
});

const Login = props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  });

  const loginUser = async userData => {
    try {
      const result = await Api.request("auth.login", userData);

      const { token } = result.data;

      storeUserDataFromToken(token, dispatch);

      Flash("success", "Login successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={loginData}
      validationSchema={loginSchema}
      onSubmit={async values => await loginUser(values)}
    >
      {({ values, handleChange }) => (
        <div id="login-form">
          <Form className="headless-forms login-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="user" style={{ marginRight: "3px" }} />
              Sign In
            </Title>
            <Form.Item name="email">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
              />
            </Form.Item>

            <Form.Item name="password">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
            </Form.Item>

            <SubmitButton>Login</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
