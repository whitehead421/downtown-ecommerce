import dotenv from "dotenv";
import { Helmet } from "react-helmet";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile, tablet, laptop } from "../responsive";
import { Delete, ShoppingCartOutlined } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { emptyCart, removeFromCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { colors } from "../data";
import { theme } from "../themes";
import alertify from "alertifyjs";
import { calculateDiscount } from "../offers/OfferChecker";

dotenv.config();

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  // eslint-disable-next-line
  const [product, setProduct] = useState([]);
  const [offerObject, setOfferObject] = useState({ discount: 0, offers: {} });
  let history = useNavigate();
  const dispatch = useDispatch();

  const handleEmpty = () => {
    dispatch(emptyCart());
    history("/");
  };

  const handleRemove = (a) => {
    dispatch(removeFromCart(a));
    history("/cart");
  };

  const handleCheckout = () => {
    if (user === null) {
      alertify.warning("You must be logged in to go checkout.");
    } else if (cart.length === 0) {
      alertify.error("Your cart is empty");
    } else if (cart.total < 35) {
      alertify.warning(
        "Please add more items to your cart to exceed the 35 pound limit."
      );
    } else {
      history("/checkout");
    }
  };

  console.log(calculateDiscount(cart.products));

  useEffect(() => {
    setOfferObject(calculateDiscount(cart.products));
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Cart - Downtown Boutique</title>
      </Helmet>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/" style={{ textDecoration: "none" }}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopButton type="filled" onClick={handleEmpty}>
            EMPTY BAG
          </TopButton>
        </Top>
        {cart.products.length !== 0 ? (
          <Bottom>
            <Info>
              {cart.products?.map((product, index) => (
                <Product key={index}>
                  <ProductID>{index + 1}</ProductID>
                  <ProductDetails>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>{product.ADI}</b>
                      </ProductName>
                      <ProductCat>
                        <b>CATEGORY:</b> {product.CATEGORY}
                      </ProductCat>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <ProductColor color={product.color} />
                        <ProductColorText>{product.color}</ProductColorText>
                      </div>
                      <ProductSize>
                        <b>Size: </b>{" "}
                        {product.size === "-" ? "One Size" : product.size}
                      </ProductSize>
                      <ProductSinglePrice>
                        <b>Price:</b> £ {product.SFIYAT}
                      </ProductSinglePrice>
                    </Details>
                  </ProductDetails>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Icon
                        onClick={() => {
                          setProduct([product, index + 1]);
                          handleRemove([product, index + 1]);
                        }}
                      >
                        <Delete />
                      </Icon>
                    </ProductAmountContainer>

                    <ProductPrice>
                      £ {product.SFIYAT * product.quantity}
                    </ProductPrice>
                  </PriceDetails>
                </Product>
              ))}
            </Info>
            <Summary>
              <div className="top-section">
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemText>£ {cart.total}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Fee</SummaryItemText>
                  <SummaryItemText color="green">FREE</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Total Discount</SummaryItemText>
                  <SummaryItemText color="red">
                    £ {offerObject.discount}
                  </SummaryItemText>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemText>
                    £ {cart.total - offerObject.discount}
                  </SummaryItemText>
                </SummaryItem>
                <hr />
                {Object.keys(offerObject.offers).map((offer, index) => (
                  <SummaryItem type="offers">
                    <SummaryItemText>Offer Applied</SummaryItemText>
                    <SummaryItemText key={index}>{offer}</SummaryItemText>
                  </SummaryItem>
                ))}
              </div>
              <div className="bottom-section">
                <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
              </div>
            </Summary>
          </Bottom>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e0e0e0",
              borderRadius: "3px",
              padding: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#D2042D",
                color: "white",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartOutlined />
            </div>

            <h3 style={{ flex: "6", textAlign: "center", fontWeight: "400" }}>
              Your cart is empty
            </h3>
          </div>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ justifyContent: "center" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.5s ease;
  &:hover {
    background: ${(props) => props.type === "filled" && theme.primaryColor};
    transform: scale(1.1);
  }
  ${mobile({
    marginRight: "10px",
    height: "60px",
    display: "flex",
    alignItems: "center",
  })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  align-items: center;
  ${mobile({
    flexDirection: "column",
    borderBottom: "1px solid lightgray",
    marginBottom: "20px",
  })}
`;

const ProductID = styled.div`
  width: 20px;
  display: flex;
  font-weight: 600;
  font-size: 30px;
  text-align: center;
  margin-right: 20px;
  ${mobile({ display: "none" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  })}
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  ${mobile({ width: "100px", height: "100px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProductCat = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border: 0.5px solid black;
  border-radius: 50%;
  background-color: ${(props) =>
    colors.map((color) => (color.title === props.color ? color.color : ""))};
  ${mobile({ display: "none" })}
`;

const ProductColorText = styled.span`
  ${mobile({ display: "block" })}
`;

const ProductSize = styled.span``;

const ProductSinglePrice = styled.span``;

const PriceDetails = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: auto;
  ${tablet({ height: "55vh" })}
  ${laptop({ height: "55vh" })}
`;

const Icon = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 40px;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
`;

const SummaryTitle = styled.h1`
  font-size: 30px;
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.color === "red" && "line-through"};
`;

const Button = styled.button`
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: white;
  border: 2px solid ${theme.primaryColor};
  color: ${theme.primaryColor};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${theme.primaryColor};
    color: white;
    scroll-margin-left: 35px;
  }
  ${tablet({ height: "50px" })}
  ${laptop({ height: "50px" })}
`;

export default Cart;
