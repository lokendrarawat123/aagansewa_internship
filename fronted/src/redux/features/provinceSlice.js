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
  }),
});
export const { useGetProvinceQuery } = provinceApi;
