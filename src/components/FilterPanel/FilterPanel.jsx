import { useState, useMemo, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../redux/carsBrands/selectors";
import { getBrandsList } from "../../redux/carsBrands/operations";
import css from "./FilterPanel.module.css";

const FilterPanel = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const prices = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  useEffect(() => {
    dispatch(getBrandsList());
  }, [dispatch]);

  const handleSearchClick = () => {
    const filters = {};
    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedPrice) filters.rentalPrice = String(selectedPrice);
    if (mileageFrom) filters.minMileage = mileageFrom;
    if (mileageTo) filters.maxMileage = mileageTo;

    onSearch(filters);
  };

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedPrice(null);
    setMileageFrom("");
    setMileageTo("");
    onSearch({});
  };

  const isDisabled = useMemo(
    () =>
      !selectedBrand &&
      !selectedPrice &&
      !mileageFrom.trim() &&
      !mileageTo.trim(),
    [selectedBrand, selectedPrice, mileageFrom, mileageTo]
  );

  const uniqueBrands = useMemo(() => Array.from(new Set(brands)), [brands]);
  const uniquePrices = useMemo(() => prices.sort((a, b) => a - b), []);

  return (
    <div className={css.panel}>
      <div className={css.selects}>
        {/* Brand */}
        <div className={css.selectGroup}>
          <label className={css.label}>Car brand</label>
          <Listbox value={selectedBrand} onChange={setSelectedBrand}>
            {({ open }) => (
              <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
                <ListboxButton className={css.selectBtn}>
                  {selectedBrand || "Choose a brand"}
                </ListboxButton>
                <ListboxOptions className={css.options}>
                  {uniqueBrands.map((brand) => (
                    <ListboxOption key={brand} value={brand}>
                      {({ selected }) => (
                        <div
                          className={`${css.dropdownItem} ${
                            selected ? css.dropdownItemActive : ""
                          }`}
                        >
                          {brand}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            )}
          </Listbox>
        </div>

        {/* Price */}
        <div className={css.selectGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <Listbox value={selectedPrice} onChange={setSelectedPrice}>
            {({ open }) => (
              <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
                <ListboxButton className={css.selectBtn}>
                  {selectedPrice ? `$${selectedPrice}` : "Choose a price"}
                </ListboxButton>
                <ListboxOptions className={css.options}>
                  {uniquePrices.map((price) => (
                    <ListboxOption key={price} value={price}>
                      {({ selected }) => (
                        <div
                          className={`${css.dropdownItem} ${
                            selected ? css.dropdownItemActive : ""
                          }`}
                        >
                          ${price}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            )}
          </Listbox>
        </div>

        {/* Mileage */}
        <div className={css.selectGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.inputGroup}>
            <input
              className={css.mileageInput}
              type="number"
              placeholder="From"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
            />
            <input
              className={css.mileageInput}
              type="number"
              placeholder="To"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <button
          className={css.searchBtn}
          onClick={handleSearchClick}
          disabled={isDisabled}
        >
          Search
        </button>
        <button
          className={css.resetBtn}
          onClick={handleReset}
          disabled={isDisabled}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
