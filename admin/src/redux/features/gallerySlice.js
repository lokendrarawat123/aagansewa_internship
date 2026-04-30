import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "/api/gallery";

// Gallery Thunks
export const addGallery = createAsyncThunk(
  "gallery/addGallery",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add gallery",
      );
    }
  },
);

export const getGalleries = createAsyncThunk(
  "gallery/getGalleries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-gallery`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch galleries",
      );
    }
  },
);

export const getGalleryById = createAsyncThunk(
  "gallery/getGalleryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-gallery/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch gallery",
      );
    }
  },
);

export const getAllGalleries = createAsyncThunk(
  "gallery/getAllGalleries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-allGallery`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all galleries",
      );
    }
  },
);

export const getGalleriesByBranch = createAsyncThunk(
  "gallery/getGalleriesByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/branch/${branchId}/gallery`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch branch galleries",
      );
    }
  },
);

export const updateGallery = createAsyncThunk(
  "gallery/updateGallery",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE}/update-gallery/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update gallery",
      );
    }
  },
);

export const deleteGallery = createAsyncThunk(
  "gallery/deleteGallery",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-gallery/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete gallery",
      );
    }
  },
);

const initialState = {
  galleries: [],
  currentGallery: null,
  loading: {
    galleries: false,
    currentGallery: false,
  },
  error: {
    galleries: null,
    currentGallery: null,
  },
  message: null,
  totalGalleries: 0,
  filters: {
    branch_id: null,
    dateRange: null,
    search: "",
  },
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = {
        galleries: null,
        currentGallery: null,
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        branch_id: null,
        dateRange: null,
        search: "",
      };
    },
    setCurrentGallery: (state, action) => {
      state.currentGallery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Gallery
      .addCase(addGallery.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.message = action.payload.message;
      })
      .addCase(addGallery.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      })

      // Get Galleries
      .addCase(getGalleries.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(getGalleries.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.galleries = action.payload.photots || action.payload.data || [];
        state.totalGalleries = state.galleries.length;
      })
      .addCase(getGalleries.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      })

      // Get Gallery By ID
      .addCase(getGalleryById.pending, (state) => {
        state.loading.currentGallery = true;
        state.error.currentGallery = null;
      })
      .addCase(getGalleryById.fulfilled, (state, action) => {
        state.loading.currentGallery = false;
        state.currentGallery = action.payload.data;
      })
      .addCase(getGalleryById.rejected, (state, action) => {
        state.loading.currentGallery = false;
        state.error.currentGallery = action.payload;
      })

      // Get All Galleries
      .addCase(getAllGalleries.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(getAllGalleries.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.galleries = action.payload.data || [];
        state.totalGalleries = state.galleries.length;
      })
      .addCase(getAllGalleries.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      })

      // Get Galleries By Branch
      .addCase(getGalleriesByBranch.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(getGalleriesByBranch.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.galleries = action.payload.data || [];
        state.totalGalleries = state.galleries.length;
      })
      .addCase(getGalleriesByBranch.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      })

      // Update Gallery
      .addCase(updateGallery.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.message = action.payload.message;
        // Update gallery in the list
        const index = state.galleries.findIndex(
          (gallery) => gallery.gallery_id === action.payload.id,
        );
        if (index !== -1) {
          // Refresh the gallery data
          state.galleries[index] = { ...state.galleries[index] };
        }
      })
      .addCase(updateGallery.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      })

      // Delete Gallery
      .addCase(deleteGallery.pending, (state) => {
        state.loading.galleries = true;
        state.error.galleries = null;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.loading.galleries = false;
        state.message = action.payload.message;
        state.galleries = state.galleries.filter(
          (gallery) => gallery.gallery_id !== action.payload.id,
        );
        state.totalGalleries = state.galleries.length;
        // Clear current gallery if it was deleted
        if (state.currentGallery?.gallery_id === action.payload.id) {
          state.currentGallery = null;
        }
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.loading.galleries = false;
        state.error.galleries = action.payload;
      });
  },
});

export const {
  clearMessage,
  clearErrors,
  setFilters,
  clearFilters,
  setCurrentGallery,
} = gallerySlice.actions;

export default gallerySlice.reducer;
