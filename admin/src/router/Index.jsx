import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Login from "../components/ui/Login";
import NotFound from "../components/shared/NotFound";
import Guard from "./Guard";
import { managerRoutes } from "./ManagerRoutes";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "/manager",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: managerRoutes,
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
