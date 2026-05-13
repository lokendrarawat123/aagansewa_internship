import { useSelector } from "react-redux";

// ADMIN हो कि होइन (true / false)
export const useIsAdmin = () => {
  return useSelector((state) => state.user.role === "admin");
};

// MANAGER हो कि होइन (true / false)
export const useIsManager = () => {
  return useSelector((state) => state.user.role === "manager");
};
