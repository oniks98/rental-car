import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyRates } from "../../api/currencyApi";

export const fetchCurrencyRates = createAsyncThunk(
  "currency/fetchRates",
  async (_, thunkAPI) => {
    try {
      const data = await getCurrencyRates();
      return data.usdRate;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
