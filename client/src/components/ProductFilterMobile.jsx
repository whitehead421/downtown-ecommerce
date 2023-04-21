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
import { Box, Slider } from "@material-ui/core";

const ProductFilter = ({ page, setPage }) => {
  const [filter, setFilter] = useContext(FilterContext);
  const [price, setPrice] = useState(FilterContext.price);
  const [filterVisible, setFilterVisible] = useState(false);
  const [genderFilterVisible, setGenderFilterVisible] = useState(true);
  const [juniorFilterVisible, setJuniorFilterVisible] = useState(true);
  const [categoryFilterVisible, setCategoryFilterVisible] = useState(false);
  const [brandFilterVisible, setBrandFilterVisible] = useState(false);
  const [colorFilterVisible, setColorFilterVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [filterComponent, setFilterComponent] = useState("");

  const handleCategory = (e) => {
    setPage(1);
    sessionStorage.setItem("page", 1);

    if (e.target.name === "radio-buttons-group") {
      handleRemoveFilters();
      setFilter((prev) => ({
        ...prev,
        category: [e.target.value],
        gender: [e.target.value],
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

  const handleFilterComponent = (e) => {
    setFilterComponent(e.target.id);
    console.log(e.target.id);
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
    <div
      style={{
        marginTop: "50px",
        border: "1px solid #eee",
        padding: "10px",
      }}
    >
      <FilterContainer>
        {filter.category.length !== 0 ||
        filter.color.length !== 0 ||
        filter.brand.length !== 0 ||
        filter.price.min !== 0 ||
        filter.price.max !== 190 ? (
          <AppliedFilterContainer onClick={handleRemoveFilters}>
            <div className="applied-filter">
              <span>REMOVE FILTERS</span>
            </div>
          </AppliedFilterContainer>
        ) : null}
        <Filter>
          <div className="dropdown" onClick={handleFilterComponent} id="gender">
            <span className="filter-title">GENDER</span>
            {filterComponent === "gender" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {filterComponent === "gender" ? (
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
            onClick={handleFilterComponent}
            id="category"
          >
            <span className="filter-title">CATEGORY</span>
            {filterComponent === "category" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {filterComponent === "category" ? (
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
          <div className="dropdown" onClick={handleFilterComponent} id="color">
            <span className="filter-title">COLOR</span>
            {filterComponent === "color" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {filterComponent === "color" ? (
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
          <div className="dropdown" onClick={handleFilterComponent} id="brand">
            <span className="filter-title">BRAND</span>
            {filterComponent === "brand" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>
          {filterComponent === "brand" ? (
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
          <div className="dropdown" onClick={handleFilterComponent} id="price">
            <span className="filter-title">PRICE</span>
            {filterComponent === "price" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </div>

          {filterComponent === "price" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Slider
                value={value}
                max={190}
                onChange={handleChange}
                valueLabelDisplay="auto"
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
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  .applied-filter {
    margin: 30px 0px;
    margin-left: 5px;
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    transition: all 0.3s ease-in-out;

    :hover {
      cursor: pointer;
      background-color: #d47f7f;
      color: white;
      border: none;
    }
  }
`;

const Filter = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 5px;
  .dropdown {
    display: flex;
    justify-content: space-between;
    z-index: 10000;
  }
`;

const AppliedFilterContainer = styled.div``;

export default ProductFilter;
