import { useState, useContext } from "react";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@material-ui/icons";
import { FilterContext } from "../context/FilterContext";
import { theme } from "../themes";
import { subCategories, colors, brands } from "../data";
import alertify from "alertifyjs";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Slider } from "@material-ui/core";

const ProductFilter = ({ page, setPage, isLoading }) => {
  const [filter, setFilter] = useContext(FilterContext);
  const [filterVisible, setFilterVisible] = useState(false);
  const [genderFilterVisible, setGenderFilterVisible] = useState(true);
  const [juniorFilterVisible, setJuniorFilterVisible] = useState(true);
  const [categoryFilterVisible, setCategoryFilterVisible] = useState(false);
  const [brandFilterVisible, setBrandFilterVisible] = useState(false);
  const [colorFilterVisible, setColorFilterVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategory = (e) => {
    setPage(1);
    sessionStorage.setItem("page", 1);

    if (e.target.name === "radio-buttons-group") {
      handleRemoveFilters();
      setFilter((prev) => ({
        ...prev,
        category: [e.target.value],
        gender: [e.target.value], //TODO KONTROL EDILECEK CONTEXTTE DE ARRAY OLMASI GEREKIYOR MUDIYE
      }));
    } else {
      if (e.target.checked) {
        setFilter((prev) => ({
          ...prev,
          category: [
            ...filter.category.filter(
              (cat) => !["MEN", "WOMEN", "BOY", "GIRL", "BABY"].includes(cat)
            ),
            e.target.value,
          ],
        }));
      } else {
        setFilter((prev) => ({
          ...prev,
          category: filter.category.filter((cat) => cat !== e.target.value),
        }));
      }
    }
  };

  const handleColor = (e) => {
    setPage(1);
    sessionStorage.setItem("page", 1);
    if (e.target.checked) {
      setFilter((prev) => ({
        ...prev,
        color: [...filter.color, e.target.value],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        color: filter.color.filter((color) => color !== e.target.value),
      }));
    }
  };

  const handleRemoveFilters = () => {
    setPage(1);
    sessionStorage.setItem("page", 1);
    setFilter((prev) => ({
      category: [],
      color: [],
      brand: [],
      price: { min: 0, max: 190 },
      gender: "",
    }));
  };

  const handleBrand = (e) => {
    setPage(1);
    sessionStorage.setItem("page", 1);
    if (e.target.checked) {
      setFilter((prev) => ({
        ...prev,
        brand: [...filter.brand, e.target.value],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        brand: filter.brand.filter((brand) => brand !== e.target.value),
      }));
    }
  };

  const [value, setValue] = useState([
    filter.price.min || 0,
    filter.price.max || 190,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrice = () => {
    setPage(1);
    sessionStorage.setItem("page", 1);
    setFilter((prev) => ({
      ...prev,
      price: { min: value[0], max: value[1] },
    }));
  };

  return (
    <div>
      <FilterContainer>
        {filter.category.length === 0 &&
        filter.color.length === 0 &&
        filter.brand.length === 0 ? null : (
          <AppliedFilterContainer onClick={handleRemoveFilters}>
            <div className="applied-filter">
              <span>REMOVE FILTERS</span>
            </div>
          </AppliedFilterContainer>
        )}
        <Filter>
          <div
            className="dropdown"
            onClick={() => setGenderFilterVisible(!genderFilterVisible)}
          >
            <span className="filter-title">GENDER</span>
            {genderFilterVisible ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {genderFilterVisible ? (
            <FormGroup>
              <FormControl>
                <RadioGroup
                  name="radio-buttons-group"
                  onChange={handleCategory}
                >
                  <FormControlLabel
                    disabled={isLoading}
                    value="MEN"
                    checked={filter.gender?.includes("MEN")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: `${theme.secondaryColor}`,
                          },
                        }}
                      />
                    }
                    label="MEN"
                  />
                  <FormControlLabel
                    disabled={isLoading}
                    value="WOMEN"
                    checked={filter.gender?.includes("WOMEN")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: `${theme.secondaryColor}`,
                          },
                        }}
                      />
                    }
                    label="WOMEN"
                  />
                  <FormControlLabel
                    disabled={isLoading}
                    value="BOY"
                    checked={filter.gender?.includes("BOY")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: `${theme.secondaryColor}`,
                          },
                        }}
                      />
                    }
                    label="BOY"
                  />
                  <FormControlLabel
                    disabled={isLoading}
                    value="GIRL"
                    checked={filter.gender?.includes("GIRL")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: `${theme.secondaryColor}`,
                          },
                        }}
                      />
                    }
                    label="GIRL"
                  />
                  <FormControlLabel
                    disabled={isLoading}
                    value="BABY"
                    checked={filter.gender?.includes("BABY")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: `${theme.secondaryColor}`,
                          },
                        }}
                      />
                    }
                    label="BABY"
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
          ) : null}
        </Filter>
        <Filter>
          <div
            className="dropdown"
            onClick={() => setCategoryFilterVisible(!categoryFilterVisible)}
          >
            <span className="filter-title">CATEGORY</span>
            {categoryFilterVisible ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {categoryFilterVisible ? (
            <FormGroup>
              {filter.gender !== ""
                ? subCategories
                    .find((c) => c.title === filter.gender[0])
                    .fields?.map((category, index) => (
                      <FormControlLabel
                        disabled={isLoading}
                        key={index}
                        control={
                          <Checkbox
                            checked={filter.category.includes(category.query)}
                            onChange={handleCategory}
                            key={index}
                            name="category"
                            value={category.query}
                            sx={{
                              "&.Mui-checked": {
                                color: `${theme.secondaryColor}`,
                              },
                            }}
                          />
                        }
                        label={category.title}
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            fontFamily: "Urbanist",
                          },
                        }}
                      />
                    ))
                : "Please select a gender."}
            </FormGroup>
          ) : null}
        </Filter>
        <Filter>
          <div
            className="dropdown"
            onClick={() => setColorFilterVisible(!colorFilterVisible)}
          >
            <span className="filter-title">COLOR</span>
            {colorFilterVisible ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {colorFilterVisible ? (
            <FormGroup>
              {colors.map((color, index) => (
                <FormControlLabel
                  disabled={isLoading}
                  key={index}
                  control={
                    <Checkbox
                      checked={filter.color.includes(color.title)}
                      onChange={handleColor}
                      key={index}
                      value={color.title}
                      sx={{
                        "&.Mui-checked": {
                          color: `${theme.secondaryColor}`,
                        },
                      }}
                    />
                  }
                  label={color.option}
                  sx={{
                    "&.MuiFormControlLabel-root": {
                      fontFamily: "Urbanist",
                    },
                  }}
                />
              ))}
            </FormGroup>
          ) : null}
        </Filter>
        <Filter>
          <div
            className="dropdown"
            onClick={() => setBrandFilterVisible(!brandFilterVisible)}
          >
            <span className="filter-title">BRAND</span>
            {brandFilterVisible ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {brandFilterVisible ? (
            <FormGroup>
              {brands.map((brand, index) => (
                <FormControlLabel
                  disabled={isLoading}
                  key={index}
                  control={
                    <Checkbox
                      checked={filter.brand.includes(brand.option)}
                      onChange={handleBrand}
                      key={index}
                      value={brand.option}
                      sx={{
                        "&.Mui-checked": {
                          color: `${theme.secondaryColor}`,
                        },
                      }}
                    />
                  }
                  label={brand.title}
                />
              ))}
            </FormGroup>
          ) : null}
        </Filter>
        <Filter>
          <div
            className="dropdown"
            onClick={() => setPriceFilterVisible(!priceFilterVisible)}
          >
            <span className="filter-title">PRICE</span>
            {priceFilterVisible ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>

          {priceFilterVisible ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
              className="price-filter"
            >
              <Slider
                value={value}
                max={190}
                onChange={handleChange}
                valueLabelDisplay="off"
                disabled={isLoading}
                style={{
                  color: `${theme.secondaryColor}`,
                }}
              />
              <span
                style={{
                  fontFamily: "Urbanist",
                  fontSize: "1.2rem",
                }}
              >
                {`£${value[0]} - £${value[1]}`}
              </span>
              <button
                style={{
                  backgroundColor: `${theme.secondaryColor}`,
                  color: "white",
                  width: "100%",
                  border: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handlePrice}
              >
                Apply
              </button>
            </div>
          ) : null}
        </Filter>
      </FilterContainer>
    </div>
  );
};

const AppliedFilterContainer = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid lightgray;
  width: 100%;
  .applied-filter {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    span {
      font-size: 15px;
      font-weight: 400;
      margin-left: 10px;
      align-items: center;
      text-align: center;
    }
  }
  .applied-filter:hover {
    background-color: rgba(170, 0, 0, 0.5);
    color: white;
    font-weight: 600;
  }
`;

const Filter = styled.div`
  display: flex;
  width: 200px;
  padding: 10px;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 0.5px solid lightgray;

  .dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  span.filter-title {
    font-size: 20px;
    font-weight: 600;
  }
  ${tablet({ border: "none" })};
`;

const FilterContainer = styled.div`
  height: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0px 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  align-items: center;
  ${tablet({ flexDirection: "row" })};
`;

export default ProductFilter;
