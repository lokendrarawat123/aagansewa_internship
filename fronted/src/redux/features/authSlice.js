import { indexSlice } from "./indexSlice";
export const authApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      providesTags: ["auth"],
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      providesTags: ["auth"],
    }),
  }),
});
export const { useSignOutMutation, useSignInMutation } = authApi;
