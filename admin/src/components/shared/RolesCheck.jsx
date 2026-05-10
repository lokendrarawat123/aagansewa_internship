import { useSelector } from "react-redux";

export const useRole = () => {
  return useSelector((state) => state.auth.role);
};

export const useIsAdmin = () => {
  return useSelector((state) => state.auth.role === "admin");
};

export const useIsManager = () => {
  return useSelector((state) => state.auth.role === "manager");
};

export const useIsAdminOrManager = () => {
  return useSelector(
    (state) => state.auth.role === "admin" || state.auth.role === "manager",
  );
};

export const useIsAuth = () => {
  return useSelector((state) => state.auth.isAuth);
};
