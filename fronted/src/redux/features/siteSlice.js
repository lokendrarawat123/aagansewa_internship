import { indexSlice } from "../indexSlice";

export const siteApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    addInquery: builder.mutation({
      query: (data) => ({
        url: "/inquiry/add-inquiry", // 🔹 backend route: /api/inquiry
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inquery"],
    }),
  }),
});

export const { useAddInqueryMutation } = siteApi;
