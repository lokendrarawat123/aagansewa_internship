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
      providesTags: ["province"],
    }),
  }),
});
export const {
  useGetProvinceQuery,
  useAddProvinceMutation,
  useDeleteProvinceMutation,
  useGetDistrictQuery,
} = provinceApi;
