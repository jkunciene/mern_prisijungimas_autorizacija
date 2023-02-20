import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGoal as createGoalRequest,
  getGoals as getGoalsRequest,
} from "./apiService";

const initialState = {
  goals: [],
  isLoading: false,
  error: "",
};

// create new Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const response = await createGoalRequest(goalData);

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

// get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await getGoalsRequest();

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

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
