import React from "react";
import { useSelector } from "react-redux";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import * as Yup from "yup";

const { Title } = Typography;

const userData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: ""
};

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first name"),
  lastName: Yup.string().required("Please enter last name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Invalid email"),
  password: Yup.string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const CreateEditUser = () => {
  const user = useSelector(state => state.adminUsers.current);
  // const dispatch = useDispatch();

  const saveUser = userData => {
    console.log(userData);
  };

  return (
    <Formik
      initialValues={user || userData}
      validationSchema={userSchema}
      onSubmit={async values => await saveUser(values)}
    >
      {({ values, handleChange }) => (
        <div id="admin-user-form">
          <Form className="headless-forms user-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="user" style={{ marginRight: "3px" }} />
              {user ? "Update User" : "Create User"}
            </Title>

            <Form.Item name="firstName">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstName}
              />
            </Form.Item>

            <Form.Item name="lastName">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={values.lastName}
              />
            </Form.Item>

            <Form.Item name="email">
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
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

            <Form.Item name="confirmPassword">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </Form.Item>

            <SubmitButton>Submit</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateEditUser;
