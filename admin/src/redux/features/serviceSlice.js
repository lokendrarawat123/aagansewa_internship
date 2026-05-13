import { indexSlice } from "./indexSlice";
export const serviceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Services (authenticated)
    getServices: builder.query({
      query: () => ({
        url: "/services/get-service",
        method: "GET",
      }),
      providesTags: ["services"],
    }),

    // Get Services with Branch details (public)
    getsAllServiceWithBranchName: builder.query({
      query: () => ({
        url: "/services/get-all-service",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    // Get Service by ID
    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/get-service/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "services", id }],
    }),
    // Get Services by Branch
    getServicesByBranch: builder.query({
      query: () => ({
        url: `/services/get-servicesByBranch`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    // Get All Services (public)
    getAllServices: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `/services/getAll-services${queryParams ? `?${queryParams}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["services"],
    }),
    // Add Service
    addService: builder.mutation({
      query: (data) => ({
        url: "/services/add-services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    // Update Service
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/update-services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    // Delete Service
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
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetServicesByBranchQuery,
  useGetAllServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetsAllServiceWithBranchNameQuery,
} = serviceApi;
