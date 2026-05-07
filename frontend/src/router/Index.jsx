import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import NotFound from "../components/NotFound";
import { PublicRoutes } from "./PublicRoutes";
import { PublicLayout } from "../layout/PublicLayout";
import { adminRoutes } from "./AdminRoutes";
export const indexRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "",
    element: <PublicLayout />,
    children: PublicRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
