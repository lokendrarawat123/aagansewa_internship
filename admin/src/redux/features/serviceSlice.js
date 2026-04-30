import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api/services';

// Service Thunks
export const addService = createAsyncThunk(
  'service/addService',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-services`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add service');
    }
  }
);

export const getServices = createAsyncThunk(
  'service/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-services`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
    }
  }
);

export const getServiceById = createAsyncThunk(
  'service/getServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
    }
  }
);

export const getServicesByBranch = createAsyncThunk(
  'service/getServicesByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-services/${branchId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch branch services');
    }
  }
);

export const getAllServices = createAsyncThunk(
  'service/getAllServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/getAll-services`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all services');
    }
  }
);

export const updateService = createAsyncThunk(
  'service/updateService',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/update-services/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-services/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete service');
    }
  }
);

// Public Services (for frontend)
export const getPublicServices = createAsyncThunk(
  'service/getPublicServices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axios.get(`${API_BASE}/getAll-services?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public services');
    }
  }
);

const initialState = {
  services: [],
  currentService: null,
  publicServices: [],
  loading: {
    services: false,
    currentService: false,
    publicServices: false,
  },
  error: {
    services: null,
    currentService: null,
    publicServices: null,
  },
  message: null,
  totalServices: 0,
  filters: {
    branch_id: null,
    search: '',
  },
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = {
        services: null,
        currentService: null,
        publicServices: null,
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        branch_id: null,
        search: '',
      };
    },
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Service
      .addCase(addService.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading.services = false;
        state.message = action.payload.message;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Get Services
      .addCase(getServices.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading.services = false;
        state.services = action.payload.allServices || action.payload.services || action.payload.data || [];
        state.totalServices = state.services.length;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Get Service By ID
      .addCase(getServiceById.pending, (state) => {
        state.loading.currentService = true;
        state.error.currentService = null;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading.currentService = false;
        state.currentService = action.payload.data;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading.currentService = false;
        state.error.currentService = action.payload;
      })

      // Get Services By Branch
      .addCase(getServicesByBranch.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(getServicesByBranch.fulfilled, (state, action) => {
        state.loading.services = false;
        state.services = action.payload.data || [];
        state.totalServices = state.services.length;
      })
      .addCase(getServicesByBranch.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Get All Services
      .addCase(getAllServices.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading.services = false;
        state.services = action.payload.allServices || action.payload.data || [];
        state.totalServices = state.services.length;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading.services = false;
        state.message = action.payload.message;
        // Update service in the list
        const index = state.services.findIndex(
          service => service.service_id === action.payload.id
        );
        if (index !== -1) {
          // Refresh the service data
          state.services[index] = { ...state.services[index] };
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading.services = false;
        state.message = action.payload.message;
        state.services = state.services.filter(
          service => service.service_id !== action.payload.id
        );
        state.totalServices = state.services.length;
        // Clear current service if it was deleted
        if (state.currentService?.service_id === action.payload.id) {
          state.currentService = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })

      // Get Public Services
      .addCase(getPublicServices.pending, (state) => {
        state.loading.publicServices = true;
        state.error.publicServices = null;
      })
      .addCase(getPublicServices.fulfilled, (state, action) => {
        state.loading.publicServices = false;
        state.publicServices = action.payload.data || [];
      })
      .addCase(getPublicServices.rejected, (state, action) => {
        state.loading.publicServices = false;
        state.error.publicServices = action.payload;
      });
  },
});

export const { 
  clearMessage, 
  clearErrors, 
  setFilters, 
  clearFilters, 
  setCurrentService 
} = serviceSlice.actions;

export default serviceSlice.reducer;