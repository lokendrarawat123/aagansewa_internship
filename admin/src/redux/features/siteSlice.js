import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api/site';

// Trusted Customer/Partner Thunks
export const addTrustedCustomer = createAsyncThunk(
  'site/addTrustedCustomer',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-trusted-costumer`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add trusted customer');
    }
  }
);

export const getTrustedCustomers = createAsyncThunk(
  'site/getTrustedCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-trusted-costumer`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trusted customers');
    }
  }
);

export const deleteTrustedCustomer = createAsyncThunk(
  'site/deleteTrustedCustomer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-trusted-costumer/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete trusted customer');
    }
  }
);

// Partner Thunks
export const getPartnerById = createAsyncThunk(
  'site/getPartnerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-partner/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch partner');
    }
  }
);

export const getAllPartners = createAsyncThunk(
  'site/getAllPartners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-allPartner`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch partners');
    }
  }
);

export const getPartnersByBranch = createAsyncThunk(
  'site/getPartnersByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/branch/${branchId}/partner`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch branch partners');
    }
  }
);

export const addPartner = createAsyncThunk(
  'site/addPartner',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-partner`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add partner');
    }
  }
);

export const updatePartner = createAsyncThunk(
  'site/updatePartner',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/update-partner/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update partner');
    }
  }
);

export const deletePartner = createAsyncThunk(
  'site/deletePartner',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-partner/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete partner');
    }
  }
);

// Review Thunks
export const addReview = createAsyncThunk(
  'site/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-review`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

export const getReviews = createAsyncThunk(
  'site/getReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-review`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const getReviewById = createAsyncThunk(
  'site/getReviewById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch review');
    }
  }
);

export const getAllReviews = createAsyncThunk(
  'site/getAllReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-allReview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all reviews');
    }
  }
);

export const getReviewsByBranch = createAsyncThunk(
  'site/getReviewsByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/branch/${branchId}/review`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch branch reviews');
    }
  }
);

export const updateReview = createAsyncThunk(
  'site/updateReview',
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/update-review/${id}`, reviewData, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update review');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'site/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-review/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
    }
  }
);

// Inquiry Thunks
export const addInquiry = createAsyncThunk(
  'site/addInquiry',
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
  'site/getInquiries',
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
  'site/getInquiryById',
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
  'site/getAllInquiries',
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
  'site/getInquiriesByBranch',
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
  'site/updateInquiry',
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
  'site/deleteInquiry',
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
  // Trusted Customers/Partners
  trustedCustomers: [],
  partners: [],
  currentPartner: null,
  
  // Reviews
  reviews: [],
  currentReview: null,
  
  // Inquiries
  inquiries: [],
  currentInquiry: null,
  
  // Loading states
  loading: {
    trustedCustomers: false,
    partners: false,
    reviews: false,
    inquiries: false,
  },
  
  // Error states
  error: {
    trustedCustomers: null,
    partners: null,
    reviews: null,
    inquiries: null,
  },
  
  // Success messages
  message: null,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = {
        trustedCustomers: null,
        partners: null,
        reviews: null,
        inquiries: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Trusted Customer Cases
    builder
      .addCase(addTrustedCustomer.pending, (state) => {
        state.loading.trustedCustomers = true;
        state.error.trustedCustomers = null;
      })
      .addCase(addTrustedCustomer.fulfilled, (state, action) => {
        state.loading.trustedCustomers = false;
        state.message = action.payload.message;
      })
      .addCase(addTrustedCustomer.rejected, (state, action) => {
        state.loading.trustedCustomers = false;
        state.error.trustedCustomers = action.payload;
      })
      
      .addCase(getTrustedCustomers.pending, (state) => {
        state.loading.trustedCustomers = true;
      })
      .addCase(getTrustedCustomers.fulfilled, (state, action) => {
        state.loading.trustedCustomers = false;
        state.trustedCustomers = action.payload.trustedCustomers || action.payload.data || [];
      })
      .addCase(getTrustedCustomers.rejected, (state, action) => {
        state.loading.trustedCustomers = false;
        state.error.trustedCustomers = action.payload;
      })
      
      .addCase(deleteTrustedCustomer.fulfilled, (state, action) => {
        state.trustedCustomers = state.trustedCustomers.filter(
          customer => customer.costumer_id !== action.payload.id
        );
        state.message = action.payload.message;
      })

    // Partner Cases
    builder
      .addCase(getAllPartners.pending, (state) => {
        state.loading.partners = true;
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.loading.partners = false;
        state.partners = action.payload.data || [];
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.loading.partners = false;
        state.error.partners = action.payload;
      })
      
      .addCase(getPartnerById.fulfilled, (state, action) => {
        state.currentPartner = action.payload.data;
      })
      
      .addCase(getPartnersByBranch.fulfilled, (state, action) => {
        state.partners = action.payload.data || [];
      })
      
      .addCase(addPartner.pending, (state) => {
        state.loading.partners = true;
      })
      .addCase(addPartner.fulfilled, (state, action) => {
        state.loading.partners = false;
        state.message = action.payload.message;
      })
      .addCase(addPartner.rejected, (state, action) => {
        state.loading.partners = false;
        state.error.partners = action.payload;
      })
      
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.partners = state.partners.filter(
          partner => partner.costumer_id !== action.payload.id
        );
        state.message = action.payload.message;
      })

    // Review Cases
    builder
      .addCase(addReview.pending, (state) => {
        state.loading.reviews = true;
        state.error.reviews = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading.reviews = false;
        state.message = action.payload.message;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading.reviews = false;
        state.error.reviews = action.payload;
      })
      
      .addCase(getReviews.pending, (state) => {
        state.loading.reviews = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading.reviews = false;
        state.reviews = action.payload.reviews || action.payload.data || [];
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading.reviews = false;
        state.error.reviews = action.payload;
      })
      
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.data || [];
      })
      
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.currentReview = action.payload.data;
      })
      
      .addCase(getReviewsByBranch.fulfilled, (state, action) => {
        state.reviews = action.payload.data || [];
      })
      
      .addCase(updateReview.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          review => review.review_id !== action.payload.id
        );
        state.message = action.payload.message;
      })

    // Inquiry Cases
    builder
      .addCase(addInquiry.pending, (state) => {
        state.loading.inquiries = true;
        state.error.inquiries = null;
      })
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.loading.inquiries = false;
        state.message = action.payload.message;
      })
      .addCase(addInquiry.rejected, (state, action) => {
        state.loading.inquiries = false;
        state.error.inquiries = action.payload;
      })
      
      .addCase(getInquiries.pending, (state) => {
        state.loading.inquiries = true;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.loading.inquiries = false;
        state.inquiries = action.payload.allInquiry || action.payload.data || [];
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.loading.inquiries = false;
        state.error.inquiries = action.payload;
      })
      
      .addCase(getAllInquiries.fulfilled, (state, action) => {
        state.inquiries = action.payload.data || [];
      })
      
      .addCase(getInquiryById.fulfilled, (state, action) => {
        state.currentInquiry = action.payload.data;
      })
      
      .addCase(getInquiriesByBranch.fulfilled, (state, action) => {
        state.inquiries = action.payload.data || [];
      })
      
      .addCase(updateInquiry.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.inquiries = state.inquiries.filter(
          inquiry => inquiry.inquiry_id !== action.payload.id
        );
        state.message = action.payload.message;
      });
  },
});

export const { clearMessage, clearErrors } = siteSlice.actions;
export default siteSlice.reducer;