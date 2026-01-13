import { indexSlice } from "./indexSlice";
export const districtApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query({
      query: () => ({
        url: "/branch/get-district",
        method: "GET",
      }),
      providesTags: ["district"],
    }),
  }),
});
export const { useGetDistrictQuery } = districtApi;
