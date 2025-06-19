import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector"; // Adjust the path as needed

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiConnector(
        "GET",
        `/common/feature/get`
      );
      console.log(data,"feture image")
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const data = await apiConnector(
        "POST",
        `/common/feature/add`,
        { image },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
    // Optionally, handle addFeatureImage pending/fulfilled/rejected if needed
  },
});

export default commonSlice.reducer;
