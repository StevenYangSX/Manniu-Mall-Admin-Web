import Home from "@/pages/indexPageLayout/Home";

import { Navigate } from "react-router-dom";
import { lazy } from "react";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LoginPage from "@/pages/loginPage/LoginPage";
import reactKeysRoutes from "./modules/reactKyes";
import systemSetting from "./modules/systemSetting";
import SuspenseWrap from "./SuspenseWrap";
import dataDisplayingRoutes from "./modules/dataDisplaying";
import experienceRoutes from "./modules/experience";
import productRoutes from "./modules/product";
const LandingPage = lazy(() => import("@/pages/landingPage/LandingPage"));

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
        element: SuspenseWrap(<LandingPage />),
      },
      ...experienceRoutes,
      ...dataDisplayingRoutes,
      ...reactKeysRoutes,
      ...systemSetting,
      ...productRoutes,
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
