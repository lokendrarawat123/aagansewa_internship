import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authState";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_DEV_BACKEND_URL,
  credentials: "include",
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // session expired or token invalid
  if (result.error?.status === 401) {
    api.dispatch(logout()); // redux clear

    window.location.href = "/"; // login page redirect
  }

  return result;
};
export const indexSlice = createApi({
  baseQuery,
  tagTypes: [
    "auth",
    "branch",
    "services",
    "gallery",
    "staff",
    "inquiry",
    "review",
    "partner",
    "province",
    "district",
    "manager",
  ],
  endpoints: () => ({}),
});
