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
    // Pathless parent: URL ma kei hudaina, children ko path matra dekhincha
    path: "/manager",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: managerRoutes, // Manager ko routes file yaha use gareko
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
