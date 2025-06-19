import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};
export const initiateRazorpayOrder = createAsyncThunk(
  "/order/initiateRazorpayOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await apiConnector("POST", "/shop/order/create", orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, orderId, razorpaySignature, razorpayOrderId }, { rejectWithValue }) => {
    try {
      const res = await apiConnector("POST", "/shop/order/capture", {
        razorpayPaymentId: paymentId,
        orderId,
        razorpaySignature,
        razorpayOrderId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apiConnector("GET", `/shop/order/list/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiConnector("GET", `/shop/order/details/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiateRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
      })
      .addCase(initiateRazorpayOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
