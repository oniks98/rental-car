import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCarDetails } from "./operations";

const initialState = {
  isCarDetailsLoading: false,
  isCarDetailsError: null,
  carDetails: null,
};

const slice = createSlice({
  name: "carDetails",
  initialState,
  reducers: {
    setCarDetails(state, action) {
      state.carDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarDetails.fulfilled, (state, { payload }) => {
        state.carDetails = payload;
      })
      .addMatcher(isAnyOf(getCarDetails.pending), (state) => {
        state.isCarDetailsLoading = true;
        state.isCarDetailsError = null;
      })
      .addMatcher(isAnyOf(getCarDetails.fulfilled), (state) => {
        state.isCarDetailsLoading = false;
      })
      .addMatcher(isAnyOf(getCarDetails.rejected), (state, { payload }) => {
        state.isCarDetailsLoading = false;
        state.isCarDetailsError = payload;
      });
  },
});

export const CarDetailsReducer = slice.reducer;
export const { setCarDetails } = slice.actions;
