import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../services/product.service.js";

export const getAll = createAsyncThunk(
  "dashboard/products",
  async (thunkAPI) => {
    try {
      const data = await ProductService.getAllProduct();
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.response.message);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const getAllByCategory = createAsyncThunk(
  "dashboard/get?category",
  async (category, thunkAPI) => {
    try {
      const data = await ProductService.getAllByCategory(category);
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.response.message);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "dashboard/products/post",
  async function (formvalues, thunkAPI) {
    try {
      const data = await ProductService.createProduct(formvalues);
      if (data.message) {
        return data;
      } else return thunkAPI.rejectWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "dashboard/products/delete",
  async (id, thunkAPI) => {
    try {
      const data = await ProductService.delProduct(id);
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.response.message);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "dashboard/products/update",
  async (
    {
      id,
      name,
      image,
      price,
      oldPrice,
      discount,
      description,
      author,
      nhaXB,
      namXB,
      soTrang,
      category,
    },
    thunkAPI
  ) => {
    try {
      const values = {
        name,
        image,
        price,
        oldPrice,
        discount,
        description,
        author,
        nhaXB,
        namXB,
        soTrang,
        category,
      };

      const data = await ProductService.updateProduct(id, values);
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.response.message);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "dashboard/products/getbyid",
  async (id, thunkAPI) => {
    try {
      const data = await ProductService.getProductById(id);
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.response.message);
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const openDialog = createAsyncThunk("/", (data) => {
  let setOpen = data;
  return setOpen;
});

export const filterProducts = createAsyncThunk("/search", (result) => {
  return result
});

const initialState = {
  message: null,
  products: null,
  setOpen: false,
  product: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.products = action.payload.products;
    },

    [getAllByCategory.fulfilled]: (state, action) => {
      state.message = null;
      state.products = action.payload.products;
    },
    [getAllByCategory.rejected]: (state, action) => {
      state.message = null;
      state.products = null;
    },

    [createProduct.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.message = action.payload.message;
    },
    [createProduct.rejected]: (state, action) => {
      state.product = null;
      state.message = action.payload.message;
    },

    [deleteProduct.fulfilled]: (state, action) => {
      state.message = action.payload.message;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.message = action.payload.message;
    },

    [openDialog.fulfilled]: (state, action) => {
      state.setOpen = action.payload;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.message = action.payload.message;
    },
    [getProductById.rejected]: (state, action) => {
      state.product = null;
      state.message = action.payload.message;
    },

    [filterProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
  },
});
// Reducer
const { reducer } = productSlice;

export default reducer;
