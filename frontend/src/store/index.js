import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import productsReducer from '../slices/productsSlice'
import searchReducer from '../slices/searchSlice'
import cartReducer from '../slices/cartSlice'
import reviewReducer from '../slices/reviewSlice'
import addressReducer from '../slices/addressSlice'
import orderReducer from '../slices/orderSlice'
import commonReducer from '../slices/commonSlice'
import adminProductsReducer from '../slices/admin/productsSlice'
import adminOrderReducer from '../slices/admin/orderSlice'



export const store = configureStore({
  reducer: {
    auth:authReducer,
    products:productsReducer,
    search:searchReducer,
    shopCart:cartReducer,
    shopReview: reviewReducer,
    shopAddress:addressReducer,
    shopOrder:orderReducer,
    commonFeature:commonReducer,

    adminProducts: adminProductsReducer,
    adminOrder: adminOrderReducer,
  },
})