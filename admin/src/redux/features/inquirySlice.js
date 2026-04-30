import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api/site';

// Inquiry Thunks
export const addInquiry = createAsyncThunk(
  'inquiry/addInquiry',
  async (inquiryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-inquiry`, inquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add inquiry');
    }
  }
);

export const getInquiries = createAsyncThunk(
  'inquiry/getInquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-inquiry`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch inquiries');
    }
  }
);

export const getInquiryById = createAsyncThunk(
  'inquiry/getInquiryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-inquiry/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch inquiry');
    }
  }
);

export const getAllInquiries = createAsyncThunk(
  'inquiry/getAllInquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-allInquiry`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all inquiries');
    }
  }
);

export const getInquiriesByBranch = createAsyncThunk(
  'inquiry/getInquiriesByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/branch/${branchId}/inquiry`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch branch inquiries');
    }
  }
);

export const updateInquiry = createAsyncThunk(
  'inquiry/updateInquiry',
  async ({ id, inquiryData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/update-inquiry/${id}`, inquiryData, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update inquiry');
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  'inquiry/deleteInquiry',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-inquiry/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete inquiry');
    }
  }
);

const initialState = {
  inquiries: [],
  currentInquiry: null,
  loading: false,
  error: null,
  message: null,
  totalInquiries: 0,
  filters: {
    branch_id: null,
    status: 'all',
    dateRange: null,
  },
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        branch_id: null,
        status: 'all',
        dateRange: null,
      };
    },
    setCurrentInquiry: (state, action) => {
      state.currentInquiry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Inquiry
      .addCase(addInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Inquiries (for authenticated users)
      .addCase(getInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.allInquiry || action.payload.data || [];
        state.totalInquiries = state.inquiries.length;
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Inquiry By ID
      .addCase(getInquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInquiry = action.payload.data;
      })
      .addCase(getInquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Inquiries
      .addCase(getAllInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.data || [];
        state.totalInquiries = state.inquiries.length;
      })
      .addCase(getAllInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Inquiries By Branch
      .addCase(getInquiriesByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiriesByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.data || [];
        state.totalInquiries = state.inquiries.length;
      })
      .addCase(getInquiriesByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Inquiry
      .addCase(updateInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // Update inquiry in the list
        const index = state.inquiries.findIndex(
          inquiry => inquiry.inquiry_id === action.payload.id
        );
        if (index !== -1) {
          // Refresh the inquiry data
          state.inquiries[index] = { ...state.inquiries[index] };
        }
      })
      .addCase(updateInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Inquiry
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.inquiries = state.inquiries.filter(
          inquiry => inquiry.inquiry_id !== action.payload.id
        );
        state.totalInquiries = state.inquiries.length;
        // Clear current inquiry if it was deleted
        if (state.currentInquiry?.inquiry_id === action.payload.id) {
          state.currentInquiry = null;
        }
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearMessage, 
  clearError, 
  setFilters, 
  clearFilters, 
  setCurrentInquiry 
} = inquirySlice.actions;

export default inquirySlice.reducer;