import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
  user: user ? user : null,
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isAdmin: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      // console.log(response.data);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      } 
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AdminLogin = createAsyncThunk(
  "auth/AdminLogin",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      console.log(response.data);
      if (response.data.admin) {
        localStorage.setItem("admin", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const forgottPassword = createAsyncThunk(
  "auth/forgottPassword",
  async (userData, thunkAPI) => {
    try {
      console.log("favas");
      const response = await axios.put("/api/auth/forgottPassword", userData);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk(
  "Auth/logout",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get("/api/auth/logout", config);
      if (data.status) localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(forgottPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgottPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forgot = action.payload;
      })
      .addCase(forgottPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(AdminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.admin = action.payload;
        state.isAdmin = true;
      })
      .addCase(AdminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
