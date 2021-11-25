import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from './messageSlice'
import AuthService from '../../services/auth.service.js';
import { LOCAL_STORAGE_ADMIN_TOKEN, LOCAL_STORAGE_ADMIN_NAME } from "../../services/constants";

export const register = createAsyncThunk(
  'auth/admin/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, password)

      if (response.success) {
        return response;
      } else return thunkAPI.rejectWithValue(response);

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message))
      return thunkAPI.rejectWithValue()
    }
  }
)

export const login = createAsyncThunk(
  "auth/admin/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if (data.success) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log('failure')
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const logout = createAsyncThunk('logout', async () => {
  await AuthService.logout(LOCAL_STORAGE_ADMIN_TOKEN, LOCAL_STORAGE_ADMIN_NAME);
})

const userToken = localStorage.getItem(LOCAL_STORAGE_ADMIN_TOKEN);
const username = localStorage.getItem(LOCAL_STORAGE_ADMIN_NAME);

const initialState = userToken
  ? { isAuthenticated: true, userToken, username, message: null }
  : { isAuthenticated: false, userToken: null, username: null, message: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.message = null;
    },
    [register.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.username = null;
      state.message = action.payload.message;
    },
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.message = null; 
    },
    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.username = null;
      state.message = action.payload.message;
    },
    [logout.fulfilled]: (state) => {
      state.isAuthenticated = false; 
      state.userToken = null;
      state.username = null;
    },
  }
})

// Reducer
const { reducer } = authSlice;

export default reducer
