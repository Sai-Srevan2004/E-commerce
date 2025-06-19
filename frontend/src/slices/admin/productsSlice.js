import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  error: null, // ← track errors
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/admin/products/add`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/admin/products/get`,
        { withCredentials: true }
      );
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/admin/products/edit/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/admin/products/delete/${id}`,
        { withCredentials: true }
      );
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })

      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default AdminProductsSlice.reducer;
