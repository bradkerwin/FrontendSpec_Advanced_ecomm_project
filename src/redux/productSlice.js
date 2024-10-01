import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',

    async () => {
        const response = await fetch('http://127.0.0.1:5000/products')
        if (!response.ok) {
            throw new Error('failed to fetch products')
        }

        const products = await response.json()
        return products
    }
)

export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export default productSlice.reducer