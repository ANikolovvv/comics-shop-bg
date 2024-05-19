import React, { useEffect, useState } from "react";
import {
  Button,
  FormHelperText,
  Input,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";
import { filteredData } from "../../../helpers/filtered";
import {
  buttonTitleStyles,
  buttonsBoxStyles,
  containerStyles,
  errorTextStyles,
  inputStyles,
  pageSearchStyle,
  submitButtonStyles,
} from "./searchStyles";

const Search = ({ comics, updateParentState, setSearch }) => {
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [errors, setErrors] = useState({});
  const [prices, setPrices] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (comics.length !== 0) {
      const sortedPrices = [...comics].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      const sortedYears = [...comics].sort((a, b) => a.year - b.year);

      setPrices(sortedPrices);
      setYears(sortedYears);
    }
  }, [comics]);

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
    
  };

  const searchHendler = (e) => {
    e.preventDefault();
    if ((!price && !year) || errors.priceHaveError || errors.yearHaveError) {
      alert(
        "Please address the following issues before submitting: fill in the required information for the Price and Year fields, as they cannot be left empty. Additionally, you must fill in at least one of these fields"
      );
    } else {
      setErrors({});
      const data = filteredData(comics, price, year);
      setPrice("");
      setYear("");
      setSearch(true);
      updateParentState(data);
    }
  };

  const handleReset = () => {
    updateParentState(comics);
  };

  const handleBlur = (event, type) => {
    const number = Number(event.target.value);

    switch (type) {
      case "Price":
        setErrors((state) => ({
          ...state,
          priceHaveError:
            number < prices[0].price ||
            number > prices[prices.length - 1].price,
        }));
        break;

      case "Year":
        setErrors((state) => ({
          ...state,
          yearHaveError:
            number < years[0].year || number > years[years.length - 1].year,
        }));
        break;

      default:
        setErrors({});
        break;
    }
  };

  return (
    <Box sx={pageSearchStyle}>
      <Button size="small" sx={buttonTitleStyles} onClick={handleToggleSearch}>
        Search
        <AiOutlineDown size={18} style={{ margin: "5px" }} color="#1976d2" />
      </Button>
      {toggleSearch && comics.length !== 0 && (
        <Box
          method="POST"
          component="form"
          sx={containerStyles}
          noValidate
          autoComplete="off"
          onSubmit={searchHendler}
        >
          <FormControl size="small" variant="standard" sx={{ color: "white" }}>
            <InputLabel sx={{ color: "white" }} htmlFor="number">
              Price
            </InputLabel>
            <Input
              sx={inputStyles}
              type="number"
              placeholder={`Prices ${prices[0].price}$ to ${
                prices[prices.length - 1].price
              }$ `}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={(e) => handleBlur(e, "Price")}
            />

            <FormHelperText id="component-error-min-price" sx={errorTextStyles}>
              {errors.priceHaveError
                ? `Price must be between ${prices[0].price} and  ${
                    prices[prices.length - 1].price
                  }`
                : ""}
            </FormHelperText>
          </FormControl>

          <FormControl size="small" variant="standard" sx={{ color: "white" }}>
            <InputLabel sx={{ color: "white" }} htmlFor="number">
              Year
            </InputLabel>
            <Input
              sx={inputStyles}
              type="number"
              placeholder={`Year ${years[0].year} and ${
                years[years.length - 1].year
              }`}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={(e) => handleBlur(e, "Year")}
            />

            <FormHelperText id="component-error-min-year" sx={errorTextStyles}>
              {errors.yearHaveError
                ? `Year must be between ${years[0].year} and ${
                    years[years.length - 1].year
                  } `
                : ""}
            </FormHelperText>
          </FormControl>
          <Box sx={buttonsBoxStyles}>
            <Button type="submit" size="small" sx={submitButtonStyles}>
              Search
            </Button>
            <Button
              type="button"
              size="small"
              sx={submitButtonStyles}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
