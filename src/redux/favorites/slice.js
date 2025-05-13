import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((favId) => favId !== id);
      } else {
        state.items.push(id);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const FavoritesReducer = favoritesSlice.reducer;
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
