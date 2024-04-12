import Home from "@/pages/indexPageLayout/Home";

import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LoginPage from "@/pages/loginPage/LoginPage";

import Page3Sub1 from "@/pages/Page3Sub1";
import Page3Sub2 from "@/pages/Page3Sub2";
import Page3Sub3 from "@/pages/Page3Sub3";

const DashBoard = lazy(() => import("@/pages/dashBoard/DashBoard"));
const MenuManagement = lazy(() => import("@/pages/systemPages/MenuManagement"));
const suspenseWrap = (component: JSX.Element) => {
  return <Suspense fallback={<div>loading.....</div>}>{component}</Suspense>;
};
const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: suspenseWrap(<DashBoard />),
      },
      // {
      //   path: "/page2",
      //   element: suspenseWrap(<Page2 />),
      // },
      {
        path: "/system",
        element: <Navigate to="/system/menu-management" />,
      },
      {
        path: "/system/menu-management",
        element: suspenseWrap(<MenuManagement />),
      },
      {
        path: "/order",
        element: <Navigate to="/order/list" />,
      },
      {
        path: "/order/list",
        element: suspenseWrap(<Page3Sub3 />),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
