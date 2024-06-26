import { Navigate } from "react-router-dom";
import SuspenseWrap from "../SuspenseWrap";
import { lazy } from "react";
const MenuManagement = lazy(() => import("@/pages/systemPages/MenuManagement"));
const RoleManagement = lazy(() => import("@/pages/systemPages/RoleManagement"));
const UserManagement = lazy(() => import("@/pages/systemPages/UserManagement"));
const systemSetting = [
  {
    path: "/system",
    element: <Navigate to="/system/menu-management" />,
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
