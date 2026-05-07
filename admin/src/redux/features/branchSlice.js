import { indexSlice } from "./indexSlice";

export const branchApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Province Endpoints
    getProvince: builder.query({
      query: () => ({
        url: "/branch/get-allprovince",
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

    // District Endpoints
    getDistrict: builder.query({
      query: () => ({
        url: "/branch/get-all-district",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getDisrtrictWithBranch: builder.query({
      query: () => ({
        url: "/branch/get-districtwitbranch",
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

    // Branch Endpoints
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

    getManagers: builder.query({
      query: () => ({
        url: "auth/get-manager",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    addManager: builder.mutation({
      query: (data) => ({
        url: "/user/add-manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    updateManager: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-manager/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/user/delete-manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
  }), // Endpoints ko closure
}); // injectEndpoints ko closure

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
  useGetDisrtrictWithBranchQuery,
  useGetManagersQuery,
  useAddManagerMutation,
  useDeleteManagerMutation,
  useUpdateManagerMutation,
} = branchApi;
