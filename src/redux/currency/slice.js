import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrencyRates } from "./operations";

const initialState = {
  currency: "USD",
  rate: 1,
  status: "idle",
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rate = Number(action.payload.rateSell);
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
