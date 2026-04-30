import { indexSlice } from "./indexSlice";
export const staffApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Staff (authenticated)
    getStaff: builder.query({
      query: () => ({
        url: "/staff/get-staff",
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    // Get Staff by ID
    getStaffById: builder.query({
      query: (id) => ({
        url: `/staff/get-staff/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "staff", id }],
    }),
    // Get All Staff
    getAllStaff: builder.query({
      query: () => ({
        url: "/staff/get-allStaff",
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    // Get Staff by Branch
    getStaffByBranch: builder.query({
      query: (branchId) => ({
        url: `/staff/branch/${branchId}/staff`,
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    // Add Staff
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/staff/add-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
    // Update Staff
    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staff/update-staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
    // Delete Staff
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/delete-staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
    // Staff Login
    staffLogin: builder.mutation({
      query: (credentials) => ({
        url: "/staff/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    // Staff Logout
    staffLogout: builder.mutation({
      query: () => ({
        url: "/staff/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetStaffByIdQuery,
  useGetAllStaffQuery,
  useGetStaffByBranchQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useStaffLoginMutation,
  useStaffLogoutMutation,
} = staffApi;