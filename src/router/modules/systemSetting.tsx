import { Navigate } from "react-router-dom";
import SuspenseWrap from "../SuspenseWrap";
import { lazy } from "react";
const MenuManagement = lazy(() => import("@/pages/systemPages/MenuManagement"));
const RoleManagement = lazy(() => import("@/pages/systemPages/RoleManagement"));
const UserManagement = lazy(() => import("@/pages/systemPages/UserManagement"));
const ImageManagement = lazy(() => import("@/pages/systemPages/ImageManagement"));
const systemSetting = [
  {
    path: "/system",
    element: <Navigate to="/system/images-management" />,
  },
  {
    path: "/system/images-management",
    element: SuspenseWrap(<ImageManagement />),
  },
  {
    path: "/system/menu-management",
    element: SuspenseWrap(<MenuManagement />),
  },
  {
    path: "/system/role-management",
    element: SuspenseWrap(<RoleManagement />),
  },
  {
    path: "/system/user-management",
    element: SuspenseWrap(<UserManagement />),
  },
];

export default systemSetting;
