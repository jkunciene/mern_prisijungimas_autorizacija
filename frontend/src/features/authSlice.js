import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register as registerRequest,
  login as loginRequest,
} from "./apiService";
import { getUser, removeUser, setUser } from "./localStorage";

const initialState = {
  user: null,
  isLoading: false,
  error: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await loginRequest(user);
    setUser(response.data);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    removeUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const startSession = createAsyncThunk(
  "auth/startSession",
  async (_, thunkAPI) => {
    try {
      return getUser() || null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState, isLoading: true },
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
