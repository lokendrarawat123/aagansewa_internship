import { indexSlice } from "./indexSlice";
export const ServiceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (filters) => ({
        url: "/services/get-all-service",
        method: "GET",
        params: {
          province_id: filters?.province_id,
          district_id: filters?.district_id,
          branch_id: filters?.branch_id,
        },
      }),
      providesTags: ["services"],
    }),
    // getServicesById: builder.query({
    //   query: (districtId) => ({
    //     url: `/branch/get-branchs/${districtId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["district"],
    // }),
    // getServiceByBranch: builder.query({
    //   query: (branchId) => ({
    //     url: `/services/get-services/${branchId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["district"],
    // }),
  }),
});
export const { useGetAllServicesQuery } = ServiceApi;
