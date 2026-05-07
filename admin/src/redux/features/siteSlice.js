import { indexSlice } from "./indexSlice";
export const siteApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Trusted Customer APIs
    getTrustedCustomers: builder.query({
      query: () => ({
        url: "/site/get-trusted-costumer",
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

    // Partner APIs
    getPartnerById: builder.query({
      query: (id) => ({
        url: `/site/get-partner/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "partner", id }],
    }),
    getAllPartners: builder.query({
      query: () => ({
        url: "/site/get-allPartner",
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    getPartnersByBranch: builder.query({
      query: (branchId) => ({
        url: `/site/branch/${branchId}/partner`,
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    addPartner: builder.mutation({
      query: (data) => ({
        url: "/site/add-partner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["partner"],
    }),
    updatePartner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/site/update-partner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["partner"],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `/site/delete-partner/${id}`,
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
    getReviewById: builder.query({
      query: (id) => ({
        url: `/site/get-review/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "review", id }],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/site/get-allReview",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    getReviewsByBranch: builder.query({
      query: (branchId) => ({
        url: `/site/branch/${branchId}/review`,
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

    getInquiryById: builder.query({
      query: (id) => ({
        url: `/site/get-inquiry/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "inquiry", id }],
    }),
    getAllInquiries: builder.query({
      query: () => ({
        url: "/site/get-allInquiry",
        method: "GET",
      }),
      providesTags: ["inquiry"],
    }),
    getInquiriesByBranch: builder.query({
      query: (branchId) => ({
        url: `/site/branch/${branchId}/inquiry`,
        method: "GET",
      }),
      providesTags: ["inquiry"],
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
  }),
});

export const {
  // Trusted Customer hooks
  useGetTrustedCustomersQuery,
  useAddTrustedCustomerMutation,
  useDeleteTrustedCustomerMutation,

  // Partner hooks
  useGetPartnerByIdQuery,
  useGetAllPartnersQuery,
  useGetPartnersByBranchQuery,
  useAddPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,

  // Review hooks
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useGetAllReviewsQuery,
  useGetReviewsByBranchQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,

  // Inquiry hooks

  useGetInquiryByIdQuery,
  useGetAllInquiriesQuery,
  useGetInquiriesByBranchQuery,
  useAddInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = siteApi;
