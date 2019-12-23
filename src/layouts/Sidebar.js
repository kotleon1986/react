import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

const Sidebar = props => {
  const [collapsed, setCollapsed] = useState(false);

  const getPage = () => {
    return props.location.pathname.substr(1);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[getPage()]}>
        <Menu.Item key="profile">
          <Link to="/profile">
            <Icon type="profile" />
            <span>My Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="change-password">
          <Link to="/change-password">
            <Icon type="unlock" />
            <span>Change Password</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
