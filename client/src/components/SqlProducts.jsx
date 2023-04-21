import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SqlProduct from "./SqlProduct";
import axios from "axios";
import Loading from "./Loading";
import { mobile, tablet, laptop } from "../responsive";
import { theme } from "../themes";
import { FilterContext } from "../context/FilterContext";
import Popup from "./Popup";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useContext } from "react";
import ProductFilter from "./ProductFilter";
import ProductFilterMobile from "./ProductFilterMobile";
import { isMobile } from "react-device-detect";

const SqlProducts = () => {
  const [filter, _] = useContext(FilterContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem("page")) || 1
  );

  const limit = 20;

  const [mobileFilter, setMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

  const [price, setPrice] = useState(filter.price);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // GETTING MAX PAGE
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/sql/products/maxPage?cat=${
          filter.category
        }&color=${filter.color}&brand=${filter.brand}&price=${JSON.stringify(
          filter.price
        )}`
      )
      .then((res) => {
        setIsLoading(false);
        setMaxPage(
          Math.ceil(res.data / limit) === 0 ? 1 : Math.ceil(res.data / limit)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter.category, filter.color, filter.brand, filter.price]);

  // GETTING PRODUCTS
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    const getProductsList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/sql/products?page=${page}&limit=${limit}&cat=${
            filter.category
          }&color=${filter.color}&brand=${filter.brand}&price=${JSON.stringify(
            filter.price
          )} `,
          { cancelToken: cancelToken.token }
        );
        // setProducts(shuffle(res.data));
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.log(err);
        }
      }
    };
    console.log(filter);
    getProductsList();
  }, [page, filter.category, filter.color, filter.brand, filter.price]);

  const handlePage = (e) => {
    if (e.target.name === "previous") {
      page > 1 && setPage(page - 1);
      page > 1 && sessionStorage.setItem("page", page - 1);
    } else {
      page !== maxPage && setPage(page + 1);
      page !== maxPage && sessionStorage.setItem("page", page + 1);
    }
  };

  const handleMobileFilter = () => {
    setMobileFilter(!mobileFilter);
    console.log(mobileFilter);
  };

  return (
    <Container>
      <Products>
        {!isMobile ? (
          <ProductFilter page={page} setPage={setPage} loading={isLoading} />
        ) : (
          <>
            <PopupButton
              style={{ marginBottom: "10px" }}
              onClick={() => setButtonPopup(!buttonPopup)}
            >
              FILTERS
            </PopupButton>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <ProductFilterMobile
                page={page}
                setPage={setPage}
                isLoading={isLoading}
              />
            </Popup>
          </>
        )}
        {!isLoading ? (
          <ProductContainer>
            {products.length !== 0 ? (
              products.map((item) => <SqlProduct item={item} key={item.ADI} />)
            ) : (
              <NoFound>No matching products...</NoFound>
            )}
          </ProductContainer>
        ) : (
          <Loading />
        )}
      </Products>
      <Wrapper>
        <PageHandlers>
          <PageButton name="previous" onClick={handlePage} disabled={isLoading}>
            PREVIOUS
          </PageButton>
          <PageTitle>{page}</PageTitle>
          <PageButton name="next" onClick={handlePage} disabled={isLoading}>
            NEXT
          </PageButton>
        </PageHandlers>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ justifyContent: "center" })};
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 5;
  height: 100%;
  justify-content: center;
  ${mobile({ justifyContent: "center" })};
  ${laptop({ justifyContent: "center" })};
`;
// eslint-disable-next-line
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin: 0px 5px;
`;
// eslint-disable-next-line
const PageHandlers = styled.div`
  display: flex;
  justify-content: space-between;
`;
// eslint-disable-next-line
const PageButton = styled.button`
  width: 200px;
  border: none;
  font-weight: 200;
  font-size: 20px;
  padding: 10px;
  background-color: lightgray;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${theme.primaryColor};
    color: white;
  }
  :disabled {
    cursor: not-allowed;
    background-color: grey;
    color: ${theme.primaryColor};
    transform: scale(0.95);
  }
  ${mobile({ width: "100px", padding: "5px", fontSize: "15px" })};
`;

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 200;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.2);
    ::before {
      content: "Page ";
    }
  }
`;

const NoFound = styled.h1`
  display: flex;
  padding: 80px;
  width: 100%;
  height: 100%;
  font-weight: 200;
`;

const Products = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: fit-content;
  ${mobile({ flexDirection: "column" })};
  ${tablet({ flexDirection: "column" })};
`;

const PopupButton = styled.button`
  width: 100%;
  border: none;
  font-weight: 200;
  font-size: 20px;
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${theme.primaryColor};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #d47f7f;
    color: white;
    border: none;
  }
`;

export default SqlProducts;
