import React from "react";

const Filters = ({
  brands,
  prices,
  mileageRange,
  filters,
  onChange,
  onSearch,
}) => {
  return (
    <div className="filters">
      <select
        value={filters.brand}
        onChange={(e) => onChange("brand", e.target.value)}
      >
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={filters.maxPrice}
        onChange={(e) => onChange("maxPrice", e.target.value)}
      >
        <option value="">Choose a price</option>
        {prices.map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="From"
        value={filters.minMileage || ""}
        onChange={(e) => onChange("minMileage", e.target.value)}
        min={mileageRange.minMileage}
      />

      <input
        type="number"
        placeholder="To"
        value={filters.maxMileage || ""}
        onChange={(e) => onChange("maxMileage", e.target.value)}
        max={mileageRange.maxMileage}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default Filters;
