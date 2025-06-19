import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiConnector } from '@/apiConnector'

const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    authLoading:true,
    signUpData:null
}

export const sendOtp = createAsyncThunk(
  "/auth/send-otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        'POST',
        '/auth/sendotp',
        { email } // sending email in body
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);


export const signUp = createAsyncThunk('/auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiConnector(
                'POST',
                '/auth/register',
                formData
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk('/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiConnector(
                'POST',
                '/auth/login',
                formData,
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// authSlice.js
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Explicitly avoid sending a body
      const res = await apiConnector("POST", "/auth/logout", {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const checkAuthh = createAsyncThunk(
    "/auth/checkauth",
    async (_, { rejectWithValue }) => {
        console.log('-----------------------------------')
        try {
            const response = await apiConnector(
                'GET',
                `/auth/check-auth`,
            );
            return response.data;
        } catch (error) {
            // check if backend sent a message in response
            console.log(error,"error in check auth")
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignupData(state, value) {
      state.signUpData = value.payload;
    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendOtp.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(signUp.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.success ? action.payload.user: null
                state.isAuthenticated = action.payload.success
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(checkAuthh.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(checkAuthh.fulfilled, (state, action) => {
                state.authLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuthh.rejected, (state, action) => {
                state.authLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
})

export const { setSignupData } = authSlice.actions;


export default authSlice.reducer