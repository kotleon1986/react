import React from "react";
import { useSelector } from "react-redux";

import Datatable from "../../../common/components/Datatable";
import AdminUsersActionTypes from "../types/users";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    sorter: true,
    width: "20%"
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    sorter: true,
    width: "20%"
  },
  {
    title: "Role",
    dataIndex: "role.name",
    sorter: true,
    filters: [
      { text: "Admin", value: "admin" },
      { text: "User", value: "user" }
    ],
    render: (name, row) => row.role.displayName,
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

const UsersList = props => {
  return (
    <Datatable
      columns={columns}
      endpoint="admin.users.list"
      edit={AdminUsersActionTypes.SET_ADMIN_USER_CURRENT}
      history={props.history}
    />
  );
};

export default UsersList;
