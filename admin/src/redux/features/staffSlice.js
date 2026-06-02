import { indexSlice } from "./indexSlice";
export const staffApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Staff (authenticated)

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
      query: () => ({
        url: `/staff/get-staff-branch`,
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    getBranchStaff: builder.query({
      query: (branchId) => ({
        url: `/staff/get-branch-staff/${branchId}/staff`,
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
  useGetAllStaffQuery,
  useGetStaffByBranchQuery,
  useGetBranchStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useStaffLoginMutation,
  useStaffLogoutMutation,
} = staffApi;
