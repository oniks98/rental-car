import { createSlice } from "@reduxjs/toolkit";
import { getCarsList } from "./operations";

const initialState = {
  cars: [],
  totalCars: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "carsList",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCarsList.fulfilled, (state, { payload }) => {
        const isFirstPage = state.currentPage === 1;
        const alreadyLoadedLastPage = state.cars.length >= state.totalCars;

        if (isFirstPage) {
          state.cars = payload.cars;
        } else {
          if (!alreadyLoadedLastPage) {
            state.cars = [...state.cars, ...payload.cars];
          }
        }

        state.totalCars = payload.totalCars;
        state.totalPages = payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getCarsList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const CarsListReducer = carsSlice.reducer;
export const { setCurrentPage } = carsSlice.actions;
