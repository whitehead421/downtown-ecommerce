import styled from "styled-components";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { sqlPublicRequest } from "../requestMethods";
import { addProduct, updateProductQuantity } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../data";
import { mobile } from "../responsive";
import { theme } from "../themes";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import Popup from "../components/Popup";
import { getNote } from "../redux/apiCalls";

import TestSlider from "../components/TestSlider";
import NoFound from "../components/NoFound";

import cartimg from "../images/cart-img.webp";

const SqlProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2].replace("%20", " ");
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  // const [productImages, setProductImages] = useState([]);
  const [cartImg, setCartImg] = useState(cartimg);

  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(0);
  const [sizeTable, setSizeTable] = useState({});
  const [note, setNote] = useState("");

  const dispatch = useDispatch();

  const lastSeenItems = JSON.parse(sessionStorage.getItem("lastseen"));

  useEffect(() => {
    if (product.ADI !== null) {
      sessionStorage.setItem("lastseen", JSON.stringify(lastSeenItems));
    }
  }, [product]);

  const history = useNavigate();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setIsLoading(true);
        // eslint-disable-next-line
        const res = await sqlPublicRequest
          .get("/products/find/" + id)
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            if (res.data !== "") {
              setProduct(
                JSON.parse(
                  res.data[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
                )[0]
              );
            }
          });
      } catch (err) {
        history("/");
      }
    };
    getSingleProduct();
  }, [id]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        getNote(id).then((res) => {
          if (res[0] !== undefined) {
            setNote(res[0].note);
          } else {
            setNote("");
          }
        });
      } catch (err) {
        history("/");
      }
    };
    getNotes();
  }, [id]);

  useEffect(() => {
    const getSizeTable = async () => {
      try {
        // eslint-disable-next-line
        const res = await sqlPublicRequest
          .get("/products/sizetable/" + id)
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            setSizeTable(res.data);
            setIsLoading(false);
          });
      } catch (err) {
        history("/");
      }
    };
    getSizeTable();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      if (amount === 0) {
        alertify.warning("Please select a size.");
      }
      quantity < amount && setQuantity(quantity + 1);
    }
  };

  const cartProducts = useSelector((state) => state.cart.products);

  const isInCart = () => {
    var inCart = false;
    // eslint-disable-next-line
    cartProducts.map((item, index) => {
      if (
        item.ADI === product.ADI &&
        item.color === color &&
        item.size === size
      ) {
        inCart = true;
      }
    });
    return inCart;
  };

  const handleClick = () => {
    if (quantity === 0) {
      alertify.warning("Please select a size.");
    } else if (isInCart()) {
      // eslint-disable-next-line
      cartProducts.map((item, index) => {
        if (
          item.ADI === product.ADI &&
          item.color === color &&
          item.size === size
        ) {
          Object.keys(product.STOCK).forEach((key) => {
            if (
              key === color &&
              product.STOCK[key][size] >= item.quantity + quantity
            ) {
              dispatch(
                updateProductQuantity({
                  index: index,
                  newQuantity: item.quantity + quantity,
                })
              );
              alertify.success("Product updated successfully.");
            } else {
              alertify.error("There is not enough stock."); //TODO : stock kontrolu yapılacak
            }
          });
        }
      });
    } else {
      dispatch(
        addProduct({
          ADI: product.ADI,
          SFIYAT: product.SFIYAT,
          TANIMI: product.TANIMI,
          CATEGORY: product.CATEGORY,
          quantity,
          color,
          size,
          img: cartImg,
        })
      );
      alertify.success("Product added to cart.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  var img = cartimg;

  if (product.CATEGORY?.indexOf("MEN") !== -1) {
    img = "https://i.hizliresim.com/obxy5kw.png";
  }

  if (product.CATEGORY?.indexOf("WOMEN") !== -1) {
    img = "https://i.hizliresim.com/53mneq2.png";
  }

  if (product.CATEGORY?.indexOf("BOY") !== -1) {
    img = "https://i.hizliresim.com/ossllt1.png";
  }

  if (product.CATEGORY?.indexOf("GIRL") !== -1) {
    img = "https://i.hizliresim.com/8pdkjie.png";
  }

  if (product.CATEGORY?.indexOf("BABY") !== -1) {
    img = "https://i.hizliresim.com/fj6qxwm.png";
  }

  const sizeArray = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "-",
    "2XL",
    "XXXL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
  ];

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <TestSlider setCartImg={setCartImg} productID={product.ADI} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.ADI}</Title>
          <Desc>{product.TANIMI}</Desc>
          <Desc>{product.CATEGORY}</Desc>
          {note !== "" || note !== undefined ? (
            <Desc style={{ fontSize: "15px", fontStyle: "italic" }}>
              {note}
            </Desc>
          ) : null}
          <Price>£ {product.SFIYAT}</Price>
          <SizeTableBtn onClick={() => setButtonPopup(true)}>
            SIZE TABLE
          </SizeTableBtn>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>SIZE GUIDE</h3>
            <h4>
              {product.TANIMI} {product.CATEGORY}
            </h4>

            {Object.keys(sizeTable).map((key, index) => (
              <div className="one-size" id={index} key={index}>
                <span className="size-detail">
                  {key === "-" ? "One Size" : key}
                </span>
                <span className="size-detail">
                  {sizeTable[key] === "" ? "No info" : sizeTable[key] + '"'}
                </span>
              </div>
            ))}
          </Popup>
          <FilterContainer>
            {product.STOCK &&
              Object.entries(product.STOCK).map(([key, value], index) => {
                return (
                  <>
                    <Filter>
                      <FilterTitle key={index}>{key}</FilterTitle>
                      {/* <FilterColor
                        key={key + index}
                        color={key}
                        onClick={() => setColor(key)}
                      /> */}

                      <FilterSelect
                        onChange={(e) => {
                          let stock = e.target.value.split(",");
                          setColor(key);
                          setSize(stock[0]);
                          setAmount(stock[1]);
                        }}
                        defaultValue={"Select size"}
                      >
                        <FilterSizeOption disabled>
                          Select size
                        </FilterSizeOption>
                        {Object.entries(value).map((stock, index) => {
                          const left =
                            stock[1] === 1 ? "(" + stock[1] + " left)" : "";
                          const soldout = stock[1] === 0 ? "(sold out)" : "";
                          return (
                            <FilterSizeOption
                              value={stock}
                              style={
                                soldout === "(sold out)"
                                  ? {
                                      color: "red",
                                      textAlign: "center",
                                      fontWeight: "bold",
                                    }
                                  : { textAlign: "center" }
                              }
                              key={index}
                            >
                              {sizeArray.includes(stock[0]) ? null : "AGE"}{" "}
                              {stock[0] === "-" ? "One Size" : stock[0]} {left}{" "}
                              {soldout}
                            </FilterSizeOption>
                          );
                        })}
                      </FilterSelect>
                    </Filter>
                  </>
                );
              })}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Remove
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => handleQuantity("inc")}
                />
              </div>

              <Button onClick={handleClick}>ADD TO CART</Button>
            </AmountContainer>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    flexDirection: "column",
    padding: "20px",
    alignItems: "center",
    textAlign: "center",
  })};
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "0px 10px", display: "flex", alignItems: "center" })};
`;

const Title = styled.h1`
  font-weight: 200;
  margin-bottom: 10px;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
// eslint-disable-next-line
const FilterContainer = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  float: right;
  ${mobile({ justifyContent: "center", alignItems: "center" })};
`;

// eslint-disable-next-line
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px 5px;
  border: 0.5px solid lightgrey;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

// eslint-disable-next-line
const FilterTitle = styled.span`
  font-size: 15px;
  font-weight: 200;
`;

const FilterSelect = styled.select`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 15px;
  font-weight: 200;
  margin-right: 10px;
  text-align: center;
  margin: 10px 0px;
`;

const FilterSizeOption = styled.option`
  text-decoration-line: underline;
  padding: 5px;
  font-size: 15px;
  font-weight: 200;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  })};
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })};
`;

const Amount = styled.span`
  width: 120px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid ${theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-size: 30px;
`;

const Button = styled.button`
  margin-left: 20px;
  padding: 15px;
  border: 1px solid ${theme.primaryColor};
  background-color: white;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  font-weight: 700;
  &:hover {
    background-color: ${theme.primaryColor};
    color: white;
  }
  ${mobile({ marginLeft: "0px", marginTop: "10px" })};
`;

const SizeTableBtn = styled.button`
  margin-top: 10px;
  padding: 15px;
  width: 20%
  border: 1px solid ${theme.primaryColor};
  background-color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  font-weight: 700;
  &:hover {
    background-color: ${theme.primaryColor};
    color: white;
  }
`;

export default SqlProduct;
