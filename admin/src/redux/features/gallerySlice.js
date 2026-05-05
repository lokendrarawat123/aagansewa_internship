import { indexSlice } from "./indexSlice";
export const galleryApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Gallery by ID
    getGalleryById: builder.query({
      query: (id) => ({
        url: `/gallery/get-gallery/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "gallery", id }],
    }),
    // Get All Galleries
    getAllGalleries: builder.query({
      query: () => ({
        url: "/gallery/get-allGallery",
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    // Get Galleries by Branch
    getGalleriesByBranch: builder.query({
      query: (branchId) => ({
        url: `/gallery/branch/${branchId}/gallery`,
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    // Add Gallery
    addGallery: builder.mutation({
      query: (data) => ({
        url: "/gallery/add-gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),
    // Update Gallery
    updateGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/gallery/update-gallery/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),
    // Delete Gallery
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetGalleryByIdQuery,
  useGetAllGalleriesQuery,
  useGetGalleriesByBranchQuery,
  useAddGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApi;
