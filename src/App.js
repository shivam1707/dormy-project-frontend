import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb, Divider, Space, Button, theme } from "antd";
import "./App.css";
import Footer1 from "./components/Footer";
import Login from "./pages/login";
import Homepage from "./pages/hompage";
import HeaderMenu from "./MenuComponent/TopMenu";
import SiderMenu from "./MenuComponent/SiderMenu";
import NavigateBack from "./MenuComponent/navigate";
import MasterEntry from "./AdminComponents/masterentry";
import PartnerRegistration from "./AdminComponents/partnerregisteration";
import Otp from "./pages/login/otp";

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
              <HeaderMenu />
            </Header>
            <Layout>
              <Sider width={250}>
                <SiderMenu />
              </Sider>
              <Layout className="containerContent">
                <NavigateBack />
                <Content className="content" style={{}}>
                  <Routes>
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Otp />} path="/otp/:number" />
                    <Route element={<Homepage />} path="/home" />
                    <Route element={<MasterEntry />} path="/masterentry" />
                    <Route element={<PartnerRegistration />} path="/partnerregistration" />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
              <Footer1 />
            </Footer>
          </Layout>
        </Space>
      </div>
    </Router>
  );
}

export default App;
