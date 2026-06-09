import { indexSlice } from "./indexSlice";

export const categoryApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ================= GET CATEGORY =================
    getAllCategories: builder.query({
      query: () => ({
        url: "/services/get-category",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    // ================= ADD CATEGORY =================
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/services/add-category",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Category"],
    }),

    // ================= UPDATE CATEGORY =================
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Category"],
    }),

    // ================= DELETE CATEGORY =================
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/services/delete-category/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
