import { indexSlice } from "./indexSlice";
export const districtApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistrict: builder.query({
      query: () => ({
        url: "/branch/get-all-district",
        method: "GET",
      }),
      providesTags: ["district"],
    }),
    getBranchByDistrict: builder.query({
      query: (districtId) => ({
        url: `/branch/get-branchs/${districtId}`,
        method: "GET",
      }),
      providesTags: ["district"],
    }),
  }),
});
export const {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
  useGetServiceByBranchQuery,
} = districtApi;
