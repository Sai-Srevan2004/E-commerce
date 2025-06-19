import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await apiConnector("POST", "/shop/address/add", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "addresses/fetchAllAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apiConnector("GET", `/shop/address/get/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const res = await apiConnector("PUT", `/shop/address/update/${userId}/${addressId}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const res = await apiConnector("DELETE", `/shop/address/delete/${userId}/${addressId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
