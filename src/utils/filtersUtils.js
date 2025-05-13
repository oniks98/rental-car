export const getUniqueBrands = (cars) => {
  const brands = cars.map((c) => c.brand);
  return [...new Set(brands)].sort();
};

export const getUniquePrices = (cars) => {
  const prices = cars.map((c) => Number(c.rentalPrice));
  return [...new Set(prices)].sort((a, b) => a - b);
};

export const getMileageRange = (cars) => {
  const mileages = cars.map((c) => c.mileage);
  return {
    minMileage: Math.min(...mileages),
    maxMileage: Math.max(...mileages),
  };
};
