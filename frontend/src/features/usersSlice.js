import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers as getUsersRequest } from "./apiService";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

// get users
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await getUsersRequest();

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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
