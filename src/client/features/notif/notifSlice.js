import { createSlice } from '@reduxjs/toolkit';

export const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    notifSuccess(state, action) {
      state.successMessage = action.payload;
    },
    notifError(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { notifError, notifSuccess } = notifSlice.actions;

export default notifSlice.reducer;
