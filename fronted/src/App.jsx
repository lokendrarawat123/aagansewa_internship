import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { indexRouter } from "./router/Index";

const App = () => {
  return (
    <>
      <RouterProvider router={indexRouter} />
      <ToastContainer />
    </>
  );
};

export default App;
