import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";


const BASE_URL = process.env.REACT_APP_BASE_URL;


const token = localStorage.getItem('token'); // Adjust based on your token storage method

export const getVegFood = createAsyncThunk('Veg', async (data) => {
    let response = await fetch(`${BASE_URL}/veg?type=${data.category||''}&search=${data.search}&page=${data.page}&limit=${data.limit}`)
    return response.json();
})

export const createItem = createAsyncThunk('create',async (item)=>{
    const response = await fetch(`${BASE_URL}/veg/create`, {
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
})

export const updateFoodItem = createAsyncThunk('update',async (item)=>{
    const response = await fetch(`${BASE_URL}/veg/update/${item._id}`, {
        method: 'PATCH',
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
})

export const getNonVegFood = createAsyncThunk('NonVeg', async (data) => {
    let response = await fetch(`${BASE_URL}/nonveg?type=${data.category||''}&search=${data.search}&page=${data.page}&limit=${data.limit}`)
    return response.json();
})

export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        isLoading: false,
        VegFood: [],
        NonVegFood: [],
        isError: false,
        msg:''
    },
    extraReducers: (builder) => {
        builder.addCase(getVegFood.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getVegFood.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VegFood = action.payload;
        });
        builder.addCase(getVegFood.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = true;
        })
        builder.addCase(getNonVegFood.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getNonVegFood.fulfilled, (state, action) => {
            state.isLoading = false;
            state.NonVegFood = action.payload;
        });
        builder.addCase(getNonVegFood.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = true;
        })
        builder.addCase(createItem.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
            swal(action.payload.msg)
        });
        builder.addCase(createItem.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = true;
        })
        builder.addCase(updateFoodItem.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateFoodItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
            swal(action.payload.msg)
        });
        builder.addCase(updateFoodItem.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = true;
        })
        

    }
})

export default foodSlice.reducer;