// selectors.js;
export const selectCars = (state) => state.carsList.cars;
export const selectIsLoading = (state) => state.carsList.isLoading;
export const selectError = (state) => state.carsList.error;
export const selectCurrentPage = (state) => state.carsList.currentPage;
export const selectTotalPages = (state) => state.carsList.totalPages;
export const selectTotalCars = (state) => state.carsList.totalCars;
