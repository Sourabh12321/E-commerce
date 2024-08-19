import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const BASE_URL = process.env.REACT_APP_BASE_URL;


export const authUserSignup = createAsyncThunk('authSignup', async (data) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
})

export const authUserLogin = createAsyncThunk('authLogin', async (data) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}) 

export const userList = createAsyncThunk('userList',async (data) =>{
    const response = await fetch(`${BASE_URL}/users?search=${data.search}&page=${data.page}&limit=${data.limit}`)

    return response.json();
})

export


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        userList:[],
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
            state.data = null;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authUserSignup.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(authUserSignup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(authUserSignup.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(authUserLogin.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(authUserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(authUserLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(userList.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(userList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.userList = action.payload;

        })
        builder.addCase(userList.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
        })

    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer;