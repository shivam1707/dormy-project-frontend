import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Layout, Menu, Divider, Space, Button, theme } from "antd";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer1 from "./components/Footer";
import Login from "./pages/login";
import CustomerRegister from "./pages/login/CustomerRegister";
import Movies from "./pages/Movies";
import Dashboard from "./components/assets/dashboard.png";
import Assessment from "./components/assets/note_alt.png";
import Quiz from "./components/assets/quiz.png";
import Homepage from './pages/hompage'

const MenuComponent = () => {
  return (
    <Menu
      className="MenuItem"
      theme="dark"
      inlineCollapsed={false}
      defaultSelectedKeys={["1"]}
      mode="horizontal"
    >
      <Menu.Item
        key="1"
        icon={<img src={Dashboard} className="imgMenu" alt="Dashboard" />}
      >
        <Link to="/" className="textMenu">
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<img src={Assessment} className="imgMenu" alt="Assessment" />}
      >
        <Link to="/login" className="textMenu">
          Login
        </Link>
      </Menu.Item>
    </Menu>
  );
};

function App() {
  const { Header, Sider, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedwidth, setCollapsedWidth] = useState(
    window.innerWidth >= 768 ? 140 : 0
  );

  const openCollapsed = () => {
    setCollapsed(false);
  };

  const closeCollapsed = () => {
    setCollapsed(true);
  };

  return (
    <Router>
      <div className="App">
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 100]}>
          <Layout>
            <Header style={{ display: "flex", alignItems: "center" }}>
              <div className="demo-logo" />
              <MenuComponent />
            </Header>
            <Content className="content" style={{}}>
              <Routes>
                <Route
                  path="*"
                  element={<Navigate to="/home" />}
                />
                <Route element={<Login />} path="/login" />
                <Route element={<Homepage />} path="/home" />
              </Routes>
            </Content>
            <Layout>
            <Footer style={{ textAlign: "center" }}>
              <Footer1 />
            </Footer>
            </Layout>
          </Layout>

        </Space>
      </div>
    </Router>
  );
}

export default App;
