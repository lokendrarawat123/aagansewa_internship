import { indexSlice } from "./indexSlice";
export const provinceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query({
      query: () => ({
        url: "/branch/get-province",
        method: "GET",
      }),
      providesTags: ["province"],
    }),
    addProvince: builder.mutation({
      query: (data) => ({
        url: "/branch/add-province",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["province"],
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-province/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["province"],
    }),
    getDistrict: builder.query({
      query: () => ({
        url: "/branch/get-district",
        method: "GET",
      }),
      providesTags: ["district"],
    }),
    addDistrict: builder.mutation({
      query: (data) => ({
        url: "/branch/add-district",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["district"],
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-district/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["district"],
    }),
    // ADDED: Branch APIs
    getBranch: builder.query({
      query: () => ({
        url: "/branch/get-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/add-branch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
  }),
});
export const {
  useGetProvinceQuery,
  useAddProvinceMutation,
  useDeleteProvinceMutation,
  useGetDistrictQuery,
  useAddDistrictMutation,
  useDeleteDistrictMutation,
  // ADDED: Branch hooks
  useGetBranchQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
} = provinceApi;