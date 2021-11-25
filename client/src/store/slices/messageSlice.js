import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducer: {
    setMessage: (state, action) => {
      return { message: action.payload}
    },
    clearMessage: () => {
      return { message: ''}
    }
  }
})

// const { reducer, actions } = messageSlice

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions

export default reducer