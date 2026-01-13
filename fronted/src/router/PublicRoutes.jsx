import About from "../pages/public/About";

import Blog from "../pages/public/Blog";
import Services from "../pages/public/Services";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import Home from "../pages/public/HomePage";
import Gallery from "../pages/public/Gallery";
import BranchServices from "../pages/public/BranchServices";

export const PublicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/Gallery",
    element: <Gallery />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "services/:place",
    element: <BranchServices />,
  },
];
