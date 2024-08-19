import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slice/auth'
import foodSlice from './slice/food';
import cartSlice from './slice/cart';
import orderSlice from './slice/order';


export const store = configureStore({
    reducer:{
        auth: authSlice,
        food:foodSlice,
        cart:cartSlice,
        order:orderSlice
    }
});


