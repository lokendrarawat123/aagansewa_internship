import { useSelector } from "react-redux";
import { Navigate, replace } from "react-router-dom";

const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return isAuth ? children : <Navigate to="/" replace />;
};

export default Guard;
