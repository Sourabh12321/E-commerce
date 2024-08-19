import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const token = localStorage.getItem('token'); // Adjust based on your token storage method

// Thunks for placing an order
export const placeOrder = createAsyncThunk('order/placeOrder', async (orderDetails) => {
    const response = await fetch(`${BASE_URL}/order/place`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetails)
    });

    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});

export const updateOrderStatus = createAsyncThunk('order/updateStatus', async (orderDetails) => {
    const response = await fetch(`${BASE_URL}/order/update/${orderDetails.orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({status:orderDetails.status})
    });

    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});

// Thunks for fetching orders (if needed)
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const response = await fetch(`${BASE_URL}/order/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});

export const fetchAllOrders = createAsyncThunk('order/all', async () => {
    const response = await fetch(`${BASE_URL}/order/orders/all`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (data.msg === "Please Log In First") {
        localStorage.clear();
    }

    return data;
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId) => {
    const response = await fetch(`${BASE_URL}/order/cancel/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: false,
        orders: [],
        orderDetails: null,
        isError: false,
        msg: '',
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
            state.msg = action.payload.msg;
            swal(action.payload.msg)
        });
        builder.addCase(placeOrder.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
        });
        builder.addCase(fetchAllOrders.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(cancelOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            const cancelledOrder = action.payload.order;
            state.orders = state.orders.map(order => 
                order._id === cancelledOrder._id ? cancelledOrder : order
            );
        });
        builder.addCase(cancelOrder.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
            swal(action.payload.msg)
        });
        builder.addCase(updateOrderStatus.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default orderSlice.reducer;
