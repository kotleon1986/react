import React from "react";
import { useSelector } from "react-redux";

import Datatable from "../../../common/components/Datatable";
import AdminUsersActionTypes from "../types/users";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    sorter: true,
    width: "20%",
    search: true
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    sorter: true,
    width: "20%",
    search: true
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
    dataIndex: "email",
    sorter: true,
    search: true
  }
];

const UsersList = props => {
  const store = useSelector(state => state.adminUsers);

  const deleteUser = id => {
    console.log(id);
  };

  return (
    <Datatable
      title="Users"
      addButton={{ text: "Add User", icon: "user-add" }}
      columns={columns}
      endpoint="admin.users.list"
      store={store}
      data={AdminUsersActionTypes.SET_ADMIN_USERS_DATA}
      params={AdminUsersActionTypes.SET_ADMIN_USERS_PARAMS}
      history={props.history}
      deleteCallback={deleteUser}
    />
  );
};

export default UsersList;
