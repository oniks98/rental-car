export const getFormattedPrice = (rentalPrice, currency, rate) => {
  if (rentalPrice == null) return "—";

  if (currency === "USD") {
    return `$ ${rentalPrice}`;
  }
  const converted = Math.round(rentalPrice * rate);
  return `₴ ${converted.toLocaleString("uk-UA")}`;
};
