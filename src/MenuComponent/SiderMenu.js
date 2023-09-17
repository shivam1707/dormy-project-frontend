import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./styles.css"
import Dashboard from "../components/assets/dashboard.png";
import Assessment from "../components/assets/note_alt.png";

const menuItems = [
  {
    key: "1",
    icon: <img src={Dashboard} className="imgMenu" alt="master entry" />,
    text: "Master Entry",
    link: "/masterentry",
  },
  {
    key: "2",
    icon: <img src={Dashboard} className="imgMenu" alt="Parter Registration" />,
    text: "Parter Registration",
    link: "/partnerregistration",
  },
  {
    key: "3",
    icon: <img src={Dashboard} className="imgMenu" alt="Parter Approval" />,
    text: "Parter Approval",
    link: "/partnerapproval",
  },
  {
    key: "4",
    icon: <img src={Assessment} className="imgMenu" alt="Partner Management" />,
    text: "Partner Management",
    children: [
      {
        key: "5",
        icon: (
          <img
            src={Assessment}
            className="imgMenu"
            alt="Property Configuration"
          />
        ),
        text: "Property Configuration",
        link: "/propertyConfig",
      },
      {
        key: "6",
        icon: (
          <img
            src={Assessment}
            className="imgMenu"
            alt="Layout Configuration"
          />
        ),
        text: "Layout Configuration",
        link: "/layoutConfig",
      },
      {
        key: "7",
        icon: (
          <img
            src={Assessment}
            className="imgMenu"
            alt="Business Configuration"
          />
        ),
        text: "Business Configuration",
        link: "/businessConfig",
      },
      {
        key: "8",
        icon: (
          <img src={Assessment} className="imgMenu" alt="General Pricing" />
        ),
        text: "General Pricing",
        link: "/generalPricing",
      },
    ],
  },
  {
    key: "9",
    icon: <img src={Dashboard} className="imgMenu" alt="Partner Statistic" />,
    text: "Partner Statistic",
    link: "/partnerstatistics",
  },
  {
    key: "10",
    icon: <img src={Dashboard} className="imgMenu" alt="Dom Statistic" />,
    text: "Dom Statistic",
    link: "/domstatistics",
  },
  {
    key: "11",
    icon: (
      <img src={Dashboard} className="imgMenu" alt="Partnership agreement" />
    ),
    text: "Partnership agreement",
    link: "/partneragreement",
  },
  {
    key: "12",
    icon: <img src={Dashboard} className="imgMenu" alt="Settings" />,
    text: "Settings",
    link: "/settings",
  },
  {
    key: "13",
    icon: <img src={Dashboard} className="imgMenu" alt="DOM logs/correction" />,
    text: "DOM logs/correction",
    link: "/domlogs",
  },
  // Add more items as needed
];

const SiderMenu = () => {
  return (
    <Menu
      className="MenuItem"
      // theme="dark"
      inlineCollapsed={false}
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        borderRight: 0,
      }}
    >
      <p className="mainpageHeading">Main Page</p>
      {menuItems.map((item) => {
        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.text}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.link}>{child.text}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.text}</Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default SiderMenu;
