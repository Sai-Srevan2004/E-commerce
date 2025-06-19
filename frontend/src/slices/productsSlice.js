import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiConnector } from '@/apiConnector'

const initialState = {
    products: [],
    singleProductDetails: null,
    isLoading: false,
    isProductDetailsLoading: false,
}


export const fetchProducts = createAsyncThunk('/shop/products',
    async ({ filterParams, sortParams }, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams({
                ...filterParams,
                sortBy: sortParams,
            });
            const response = await apiConnector(
                'GET',
                `/shop/products/get?${query}`,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id,{ rejectWithValue }) => {
        try{
            const result = await apiConnector(
            'GET',
            `/shop/products/get/${id}`
        );
        console.log(result.data,"signle page details")
        return result?.data?.data;
        
        }
        catch(error)
        {
            console.log(error,"signlepagedetils")
           return rejectWithValue(error.response.data)    
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.singleProductDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
            })

            // Add these for product details!
            .addCase(fetchProductDetails.pending, (state) => {
                state.isProductDetailsLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isProductDetailsLoading = false;
                state.singleProductDetails = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isProductDetailsLoading = false;
                state.singleProductDetails = null;
            })
    }
})

export const { setProductDetails } = productsSlice.actions;
export default productsSlice.reducer;
