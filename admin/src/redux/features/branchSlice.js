import { indexSlice } from "./indexSlice";
export const branchApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query({
      query: () => ({
        url: "/branch/get-province",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    addProvince: builder.mutation({
      query: (data) => ({
        url: "/branch/add-province",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-province/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
    getDistrict: builder.query({
      query: () => ({
        url: "/branch/get-district",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    addDistrict: builder.mutation({
      query: (data) => ({
        url: "/branch/add-district",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-district/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
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
  useGetBranchQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
