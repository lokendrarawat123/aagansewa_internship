import { indexSlice } from "./indexSlice";
export const siteApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Trusted Customer APIs
    getTrustedCustomers: builder.query({
      query: () => ({
        url: "/site/get-customer",
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    addTrustedCustomer: builder.mutation({
      query: (data) => ({
        url: "/site/add-trusted-costumer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["partner"],
    }),
    deleteTrustedCustomer: builder.mutation({
      query: (id) => ({
        url: `/site/delete-trusted-costumer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["partner"],
    }),

    // Review APIs
    getReviews: builder.query({
      query: () => ({
        url: "/site/get-review",
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    addReview: builder.mutation({
      query: (data) => ({
        url: "/site/add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/site/update-review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/site/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),

    // Inquiry APIs

    getAllInquiries: builder.query({
      query: () => ({
        url: "/site/get-allInquiry",
        method: "GET",
      }),
      providesTags: ["inquiry"],
    }),
    getInquiriesByBranch: builder.query({
      query: () => ({
        url: `/site/get-inquiry-branch`,
        method: "GET",
      }),
      providesTags: ["inquiry"],
    }),
    // siteSlice.js भित्र (Inquiry सम्बन्धी एन्डपोइन्ट)

    getBranchInquiry: builder.query({
      query: ({ branch_id, page = 1, limit = 10 }) => ({
        url: `/site/get-branch-inquiry?branch_id=${branch_id}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result, error, { branch_id }) => [
        { type: "inquiry", id: `branch-${branch_id}` },
        "inquiry",
      ],
      keepUnusedDataFor: 0,
    }),
    addInquiry: builder.mutation({
      query: (data) => ({
        url: "/site/add-inquiry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inquiry"],
    }),
    updateInquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/site/update-inquiry/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["inquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/site/delete-inquiry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inquiry"],
    }),
    // get profile
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    //change password for manager
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  // Trusted Customer hooks
  useGetTrustedCustomersQuery,
  useAddTrustedCustomerMutation,
  useDeleteTrustedCustomerMutation,

  // Review hooks
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,

  // Inquiry hooks
  useGetBranchInquiryQuery,
  useGetInquiryByIdQuery,
  useGetAllInquiriesQuery,
  useGetInquiriesByBranchQuery,
  useAddInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  //get profile
  useGetProfileQuery,
  // change pasword query
  useChangePasswordMutation,
} = siteApi;
