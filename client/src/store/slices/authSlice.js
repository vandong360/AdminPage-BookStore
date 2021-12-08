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


export const getAllUser = createAsyncThunk(
  "dashboard/users/",
  async (thunkAPI) => {
    try {
      const data = await AuthService.getAllUser();
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

export const deleteUser = createAsyncThunk(
  "dashboard/users/delete",
  async (id, thunkAPI) => {
    try {
      const data = await AuthService.delUser(id);
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


const userToken = localStorage.getItem(LOCAL_STORAGE_ADMIN_TOKEN);
const username = localStorage.getItem(LOCAL_STORAGE_ADMIN_NAME);

const initialState = userToken
  ? { isAuthenticated: true, userToken, username, message: null, allUser: null}
  : { isAuthenticated: false, userToken: null, username: null, message: null, allUser: null};

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

    [getAllUser.fulfilled]: (state, action) => {
      state.allUser = action.payload.users;
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.message = action.payload.message;
    },
    [deleteUser.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

// Reducer
const { reducer } = authSlice;

export default reducer
