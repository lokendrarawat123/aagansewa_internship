import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api/staff';

// Staff Thunks
export const addStaff = createAsyncThunk(
  'staff/addStaff',
  async (staffData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/add-staff`, staffData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add staff');
    }
  }
);

export const getStaff = createAsyncThunk(
  'staff/getStaff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-staff`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff');
    }
  }
);

export const getStaffById = createAsyncThunk(
  'staff/getStaffById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-staff/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff');
    }
  }
);

export const getAllStaff = createAsyncThunk(
  'staff/getAllStaff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get-allStaff`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all staff');
    }
  }
);

export const getStaffByBranch = createAsyncThunk(
  'staff/getStaffByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/branch/${branchId}/staff`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch branch staff');
    }
  }
);

export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async ({ id, staffData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/update-staff/${id}`, staffData, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update staff');
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/delete-staff/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete staff');
    }
  }
);

// Staff Authentication
export const staffLogin = createAsyncThunk(
  'staff/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const staffLogout = createAsyncThunk(
  'staff/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/logout`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const initialState = {
  staff: [],
  currentStaff: null,
  authStaff: null,
  loading: {
    staff: false,
    currentStaff: false,
    auth: false,
  },
  error: {
    staff: null,
    currentStaff: null,
    auth: null,
  },
  message: null,
  totalStaff: 0,
  isAuthenticated: false,
  filters: {
    branch_id: null,
    service_id: null,
    search: '',
  },
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = {
        staff: null,
        currentStaff: null,
        auth: null,
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        branch_id: null,
        service_id: null,
        search: '',
      };
    },
    setCurrentStaff: (state, action) => {
      state.currentStaff = action.payload;
    },
    clearAuth: (state) => {
      state.authStaff = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Staff
      .addCase(addStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.message = action.payload.message;
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Get Staff
      .addCase(getStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.staff = action.payload.staff || action.payload.data || [];
        state.totalStaff = state.staff.length;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Get Staff By ID
      .addCase(getStaffById.pending, (state) => {
        state.loading.currentStaff = true;
        state.error.currentStaff = null;
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading.currentStaff = false;
        state.currentStaff = action.payload.data;
      })
      .addCase(getStaffById.rejected, (state, action) => {
        state.loading.currentStaff = false;
        state.error.currentStaff = action.payload;
      })

      // Get All Staff
      .addCase(getAllStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.staff = action.payload.data || [];
        state.totalStaff = state.staff.length;
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Get Staff By Branch
      .addCase(getStaffByBranch.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(getStaffByBranch.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.staff = action.payload.data || [];
        state.totalStaff = state.staff.length;
      })
      .addCase(getStaffByBranch.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Update Staff
      .addCase(updateStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.message = action.payload.message;
        // Update staff in the list
        const index = state.staff.findIndex(
          staff => staff.staff_id === action.payload.id
        );
        if (index !== -1) {
          // Refresh the staff data
          state.staff[index] = { ...state.staff[index] };
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Delete Staff
      .addCase(deleteStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading.staff = false;
        state.message = action.payload.message;
        state.staff = state.staff.filter(
          staff => staff.staff_id !== action.payload.id
        );
        state.totalStaff = state.staff.length;
        // Clear current staff if it was deleted
        if (state.currentStaff?.staff_id === action.payload.id) {
          state.currentStaff = null;
        }
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.payload;
      })

      // Staff Login
      .addCase(staffLogin.pending, (state) => {
        state.loading.auth = true;
        state.error.auth = null;
      })
      .addCase(staffLogin.fulfilled, (state, action) => {
        state.loading.auth = false;
        state.authStaff = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(staffLogin.rejected, (state, action) => {
        state.loading.auth = false;
        state.error.auth = action.payload;
        state.isAuthenticated = false;
      })

      // Staff Logout
      .addCase(staffLogout.pending, (state) => {
        state.loading.auth = true;
      })
      .addCase(staffLogout.fulfilled, (state, action) => {
        state.loading.auth = false;
        state.authStaff = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(staffLogout.rejected, (state, action) => {
        state.loading.auth = false;
        state.error.auth = action.payload;
      });
  },
});

export const { 
  clearMessage, 
  clearErrors, 
  setFilters, 
  clearFilters, 
  setCurrentStaff,
  clearAuth 
} = staffSlice.actions;

export default staffSlice.reducer;