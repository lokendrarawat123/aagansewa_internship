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
    // ADDED: Manager APIs
    getManager: builder.query({
      query: () => ({
        url: "/auth/get-manager",
        method: "GET",
      }),
      providesTags: ["manager"],
    }),
    addManager: builder.mutation({
      query: (data) => ({
        url: "/auth/add-manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
    updateManager: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/auth/update-manager/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/auth/delete-manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["manager"],
    }),
    // Service APIs
    getServices: builder.query({
      query: () => ({
        url: "/services/get-services",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: "/services/add-services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/update-services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/delete-services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
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
  // ADDED: Manager hooks
  useGetManagerQuery,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
  // Service hooks
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = provinceApi;