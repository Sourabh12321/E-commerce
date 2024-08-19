import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const token = localStorage.getItem('token'); // Adjust based on your token storage method

// Thunks for fetching and managing cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();

    // if (data.msg === "Please Log In First") {
    //     localStorage.clear();
    // }

    return data;
});

export const addItemToCart = createAsyncThunk('cart/add', async (item) => {

    const response = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    });
    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});


export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (itemId) => {
    const response = await fetch(`${BASE_URL}/cart/delete/${itemId}`, {
        method: 'DELETE'
    });
    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isLoading: false,
        cartItems: [],
        msg :'',
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        });
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(addItemToCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
            swal(action.payload.msg)
            state?.cartItems?.push(action.payload.msg);

        });
        builder.addCase(addItemToCart.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            // state.msg = action.payload.msg;
        });
        builder.addCase(removeItemFromCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = state?.cartItems?.filter(item => item._id !== action.payload.data._id);
        });
        builder.addCase(removeItemFromCart.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default cartSlice.reducer;
