import SuspenseWrap from "@/router/SuspenseWrap";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
const ProductCategory = lazy(() => import("@/pages/product/ProductCategory"));

const productRoutes = [
  {
    path: "/product",
    element: <Navigate to="/product/category" />,
  },
  {
    path: "/product/category",
    element: SuspenseWrap(<ProductCategory />),
  },
];

export default productRoutes;
