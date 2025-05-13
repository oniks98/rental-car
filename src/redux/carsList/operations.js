// operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { carsApi } from "../../api/carsApi";

export const getCarsList = createAsyncThunk(
  "carsList/getCarsList",
  async (
    { brand, maxPrice, minMileage, maxMileage, page = 1, pageSize = 12 },
    thunkApi
  ) => {
    try {
      const params = {};
      if (brand) params.brand = brand;
      if (maxPrice) params.maxPrice = maxPrice;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;
      params.page = page;
      params.limit = pageSize;

      const { data } = await carsApi.get(`/api/cars/`, { params });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
