import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { selectBrands } from "../../redux/carsBrands/selectors";
import { getBrandsList } from "../../redux/carsBrands/operations";
import { setCurrency } from "../../redux/currency/slice";
import { fetchCurrencyRates } from "../../redux/currency/operations";
import { selectCurrency, selectRate } from "../../redux/currency/selectors";
import css from "./FilterPanel.module.css";
import clsx from "clsx";

const FilterPanel = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const currency = useSelector(selectCurrency);
  const rate = useSelector(selectRate);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [mileageFrom, setMileageFrom] = useState(null);
  const [mileageTo, setMileageTo] = useState(null);

  useEffect(() => {
    dispatch(getBrandsList());
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const handleSearchClick = () => {
    const filters = {};
    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedPrice) filters.rentalPrice = selectedPrice;
    if (mileageFrom) filters.minMileage = mileageFrom;
    if (mileageTo) filters.maxMileage = mileageTo;

    onSearch(filters);
  };

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedPrice(null);
    setMileageFrom(null);
    setMileageTo(null);
    onSearch({});
  };

  const isDisabled =
    !selectedBrand &&
    !selectedPrice &&
    mileageFrom === null &&
    mileageTo === null;

  const uniqueBrands = Array.from(new Set(brands));
  const uniquePrices = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const formatPrice = (usd) => {
    if (currency === "USD") {
      return `$ ${usd}`;
    } else {
      const uahValue = Math.round(usd * rate);
      return `₴ ${uahValue.toLocaleString()}`;
    }
  };

  return (
    <div className={css.panel}>
      <div className={css.selects}>
        <div className={css.currencySwitcher}>
          <button
            className={clsx(css.currencyBtn, {
              [css.active]: currency === "USD",
            })}
            onClick={() => dispatch(setCurrency("USD"))}
          >
            $ USD
          </button>
          <button
            className={clsx(css.currencyBtn, {
              [css.active]: currency === "UAH",
            })}
            onClick={() => dispatch(setCurrency("UAH"))}
          >
            ₴ UAH
          </button>
        </div>

        <div className={css.selectGroup}>
          <label className={css.label}>Car brand</label>
          <Listbox value={selectedBrand} onChange={setSelectedBrand}>
            {({ open }) => (
              <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
                <ListboxButton className={css.selectBtn}>
                  {selectedBrand || "Choose a brand"}
                </ListboxButton>
                <ListboxOptions as="ul" className={css.options}>
                  {uniqueBrands.map((brand) => (
                    <ListboxOption as="li" key={brand} value={brand}>
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

        <div className={css.selectGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <Listbox value={selectedPrice} onChange={setSelectedPrice}>
            {({ open }) => (
              <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
                <ListboxButton className={css.selectBtn}>
                  {selectedPrice
                    ? formatPrice(selectedPrice)
                    : "Choose a price"}
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
                          {formatPrice(price)}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            )}
          </Listbox>
        </div>

        <div className={css.selectGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.inputGroup}>
            <input
              className={css.mileageInput}
              type="text"
              inputMode="numeric"
              placeholder="From"
              value={mileageFrom !== null ? mileageFrom.toLocaleString() : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const number = raw ? Number(raw) : null;
                setMileageFrom(number);
              }}
            />
            <input
              className={css.mileageInput}
              type="text"
              inputMode="numeric"
              placeholder="To"
              value={mileageTo !== null ? mileageTo.toLocaleString() : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const number = raw ? Number(raw) : null;
                setMileageTo(number);
              }}
            />
          </div>
        </div>

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
