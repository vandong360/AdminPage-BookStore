import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productSlice";
import messageReducer from './slices/messageSlice';

const reducer = {
  auth: authReducer,
  products: productsReducer,
  message: messageReducer
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;


//folder tree: 
    //slides
    //thunks
    //selectors

// or normal way:
    //actions
    //reducers
    //types
    