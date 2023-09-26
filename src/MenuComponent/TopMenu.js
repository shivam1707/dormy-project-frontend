import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../components/assets/dashboard.png";
import Assessment from "../components/assets/note_alt.png";

const menuItems = [
  {
    key: "1",
    icon: <img src={Dashboard} className="imgMenu" alt="Dashboard" />,
    text: "Dashboard",
    link: "/",
  },
  {
    key: "2",
    icon: <img src={Assessment} className="imgMenu" alt="Assessment" />,
    text: "Login",
    link: "/login",
  },
  // Add more items as needed
];

const HeaderMenu = () => {
  const location = useLocation();
  return (
    <Menu
      selectedKeys={[
        menuItems.find((item) => location.pathname === item.link)?.key || "1",
      ]}
      className="MenuItem"
      theme="dark"
      inlineCollapsed={false}
      defaultSelectedKeys={["1"]}
      mode="horizontal"
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.link} className="textMenu">
            {item.text}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default HeaderMenu;
