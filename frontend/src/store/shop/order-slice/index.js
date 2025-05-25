


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// 🔵 NEW: Initiate Razorpay Order
export const initiateRazorpayOrder = createAsyncThunk(
  "/order/initiateRazorpayOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/shop/order/create`,
      orderData,
      {
        withCredentials: true,
      }
    );
    console.log(response.data,"/////////////////////")
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId,orderId,razorpaySignature,razorpayOrderId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/shop/order/capture`,
      {
        razorpayPaymentId:paymentId,
        orderId,razorpaySignature,razorpayOrderId
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/shop/order/list/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/shop/order/details/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
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
