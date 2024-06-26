import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MainMenu from "@/components/MainMenu";
import UserInfoDropDown from "@/components/userInfoDropDown/UserInfoDropDown";
import BreadCrumbWrap from "@/components/breadCrumb/BreadCrumb";

const { Header, Content, Sider } = Layout;
const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentMarginLeft, setContentMarginLeft] = useState(230);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="md"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        onBreakpoint={(broken) => {
          if (broken) {
            setContentMarginLeft(80);
          } else {
            setContentMarginLeft(230);
          }
        }}
        width="230px"
        style={{
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <MainMenu />
      </Sider>
      <Layout style={{ marginLeft: contentMarginLeft }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 0,
            background: colorBgContainer,
            justifyContent: "space-between",
            flexDirection: "row",
            borderRadius: "5px",
            boxShadow: " 0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <BreadCrumbWrap />
          <UserInfoDropDown />
        </Header>
        <Content style={{ margin: "16px 16px  0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}>
          Created by Steven Yang
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
