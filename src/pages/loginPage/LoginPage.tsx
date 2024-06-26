import { loginApi } from "@/api/authentication";
import { getSystemMenusApi } from "@/api/systemMenu";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormText } from "@ant-design/pro-components";
import { message, theme } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin, systemMenuUpdate } from "@/store/slices/userInfoSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import logoImg from "@/assets/images/logo.png";
type LoginType = "phone" | "account";

const Page = () => {
  const dispatch = useDispatch();
  const serverStatus = useAppSelector((state) => state.serverHealthReducer.serverRunning);
  const [loginType] = useState<LoginType>("account");
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const getSystemMenu = async () => {
    try {
      const response = await getSystemMenusApi();
      dispatch(systemMenuUpdate(response.data));
    } catch (error) {}
  };
  useEffect(() => {
    if (loggedIn) {
      getSystemMenu();
    }
  }, [loggedIn]);

  const onSubmit = (p1: any) => {
    let payload = { username: p1.username, password: p1.password };
    loginApi(payload)
      .then((res) => {
        dispatch(userLogin(res.data));
        setLoading(false);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("dfdfdf", err);
        messageApi.open({
          type: "error",
          content: err.message,
          duration: 5,
        });
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {contextHolder}
      <LoginFormPage
        submitter={{
          searchConfig: {
            submitText: "LOGIN",
          },
        }}
        loading={loading}
        disabled={!serverStatus}
        onFinish={async (values) => {
          setLoading(true);
          await onSubmit(values);
          return true;
        }}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo={logoImg}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="React Admin"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        subTitle="General admin system template"
        // activityConfig={{
        //   style: {
        //     boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: "rgba(255,255,255,0.25)",
        //     backdropFilter: "blur(4px)",
        //   },
        //   title: "活动标题，可配置图片",
        //   subTitle: "活动介绍说明文字",
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: token.colorBgElevated,
        //         color: token.colorPrimary,
        //         width: 120,
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   ),
        // }}
      >
        {/* <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
        </Tabs> */}
        {loginType === "account" && (
          <>
            <ProFormText
              initialValue="demo"
              name="username"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"User name"}
              rules={[
                {
                  required: true,
                  message: "Please enter username!",
                },
              ]}
            />
            <ProFormText.Password
              initialValue="password"
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"密码: ant.design"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
          </>
        )}

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a> */}
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
