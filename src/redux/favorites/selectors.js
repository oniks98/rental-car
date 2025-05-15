// selectors.js;
export const selectFavorites = (state) => state.favorites.items;
export const isCarFavorite = (id) => (state) =>
  state.favorites.items.includes(id);
