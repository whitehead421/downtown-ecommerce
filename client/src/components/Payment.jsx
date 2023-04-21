import styled from "styled-components";
import { theme } from "../themes";
import { useDispatch, useSelector } from "react-redux";
import { laptop, mobile, tablet } from "../responsive";
import { WhatsApp } from "@material-ui/icons";
import { getOneAddress } from "../redux/apiCalls";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { saveOrder } from "../redux/apiCalls";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [address, setAddress] = useState("");
  // eslint-disable-next-line
  const dispatch = useDispatch();

  const handleOrder = (e) => {
    const order = {
      userId: user.uid,
      products: cart.products,
      amount: cart.total,
      address: address,
      department: e.target.value,
    };
    console.log(order);
    saveOrder(order, dispatch); //TODO important to save order in database
  };

  useEffect(() => {
    const addressFunction = async () => {
      // eslint-disable-next-line
      const res = await getOneAddress(cart.address)
        .then((res) => {
          setAddress(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    addressFunction();
  }, [cart.address]);

  const totalQuantity = cart.products.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const orderMessageAdult = `https://wa.me/+901234567890?text=Hello, I would like to order the following products:%0AOrder Details%0A%0AName: ${
    user.displayName
  }%0AAddress:%0A${
    address !== ""
      ? address.address.replace(/\n/g, "%0A")
      : "Address could not be found!"
  }%0A%0AOrder Summary%0A ${cart.products
    .map((item) => {
      return `${item.quantity} ${item.ADI} - ${
        item.size === "-" ? "One Size" : item.size
      } - ${item.color} - £ ${item.SFIYAT} %0A`;
    })
    .join("")}%0ATotal: £ ${cart.total}`;

  const orderMessageJunior = `https://wa.me/+901234567890?text=Hello, I would like to order the following products:%0AOrder Details%0A%0AName: ${
    user.displayName
  }%0AAddress:%0A${
    address !== ""
      ? address.address.replace(/\n/g, "%0A")
      : "Address could not be found!"
  }%0A%0AOrder Summary%0A ${cart.products
    .map((item) => {
      return `${item.quantity} ${item.ADI} - ${
        item.size === "-" ? "One Size" : item.size
      } - ${item.color} - £ ${item.SFIYAT} %0A`;
    })
    .join("")}%0ATotal: £ ${cart.total}`;

  return (
    <Container>
      <div className="container">
        <div className="top-container">PAYMENT SECTION</div>
        <div className="payment-content">
          <div className="product-content">
            {cart.products?.map((product, index) => (
              <Product>
                <ProductDetails>
                  <Details>
                    <ProductName>{product.TANIMI}</ProductName>
                    <ProductCat>{product.CATEGORY}</ProductCat>
                    <ProductColorText>{product.color}</ProductColorText>
                    <span>
                      {product.size === "-" ? "One Size" : product.size}
                    </span>
                    <span>£ {product.SFIYAT}</span>
                    <span
                      style={{
                        color: "white",
                        backgroundColor: theme.secondaryColor,
                      }}
                    >
                      x{product.quantity}
                    </span>
                  </Details>
                </ProductDetails>
              </Product>
            ))}
          </div>
        </div>
        <hr />
        <div className="summary-container">
          <div className="address-container">
            <span className="title">{address.addressTitle}</span>
            <span>{user.displayName.toUpperCase()}</span>
            <span className="content">{address.address}</span>
          </div>
          <div className="price-container">
            <span className="title">SUMMARY</span>
            <span>
              {totalQuantity} {totalQuantity > 1 ? "ITEMS" : "ITEM"}
            </span>
            <span>
              {cart.quantity} {cart.quantity > 1 ? "PRODUCTS" : "PRODUCT"}
            </span>
            <span>TOTAL £ {cart.total}</span>
          </div>
        </div>
        <div className="order-confirm-container">
          <a href={orderMessageAdult} target="_blank" rel="noopener noreferrer">
            <button
              className="order-confirm-btn"
              value="DOWNTOWN BOUTIQUE"
              onClick={handleOrder}
            >
              <WhatsApp />
              DOWNTOWN BOUTIQUE
            </button>
          </a>
          <a href={orderMessageJunior}>
            <button
              className="order-confirm-btn-junior"
              value="DOWNTOWN JUNIOR"
              onClick={handleOrder}
            >
              <WhatsApp />
              DOWNTOWN JUNIOR
            </button>
          </a>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
  flex-direction: column;
  border-radius: 5px;
  ${mobile({ margin: "0px" })}
  .top-container {
    display: flex;
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 24px;
    background-color: ${theme.secondaryColor};
    color: white;
    ${mobile({ width: "auto" })}
  }
  .payment-content {
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    ${mobile({ width: "auto" })}
  }
  .product-content {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({})}
  }

  a {
    text-decoration: none;
  }

  .order-confirm-container {
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({
      width: "auto",
      flexDirection: "column",
    })}
    ${tablet({
      columnGap: "10px",
    })}
    ${laptop({
      columnGap: "10px",
    })}
    button {
      background-color: #25d366;
      color: white;
      border: none;
      height: 60px;
      border-radius: 5px;
      padding: 20px;
      font-size: 16px;
      align-items: center;
      cursor: pointer;
      display: flex;
      transition: all 1s ease-in-out;
      ${mobile({
        width: "100%",
        height: "auto",
        margin: "10px 0px",
      })}
      ${tablet({
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "60px",
      })}
      ${laptop({
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "60px",
      })}
      .MuiSvgIcon-root {
        font-size: 20px;
        margin-right: 5px;
        ${mobile({ width: "100%", display: "none" })}
      }
    }
    button.order-confirm-btn-junior:hover {
      background: linear-gradient(
        135deg,
        #3997ef 0%,
        #f9cb59 20%,
        #12d446 40%,
        #ed838c 60%,
        #dc2838 80%,
        #c42edb 100%
      );
      transform: scale(1.03);
    }
    button.order-confirm-btn:hover {
      //whatsapp theme colors background make
      background-color: #1f9156;
      transform: scale(1.03);
    }
  }

  .summary-container {
    display: flex;
    margin: 20px;
    gap: 10px;
    ${tablet({ columnGap: "20px" })}
    ${mobile({ flexDirection: "column" })}
  }
  .address-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    .content {
      white-space: pre-wrap;
    }
  }
  .price-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
  }

  span {
    margin-bottom: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid #e2e2e2;
  }

  hr {
    width: 100%;
    margin-top: 10px;
    border: 0.5px solid ${theme.secondaryColor};
  }
`;

// burayı ekledim
const Product = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  flex: 1;
  margin: 10px;
  text-align: center;
  align-items: center;
  ${mobile({
    flexDirection: "column",
    borderBottom: "1px solid lightgray",
    marginBottom: "20px",
  })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div`
  font-size: 20px;
  white-space: pre-wrap;
  overflow-y: auto;
  ${mobile({ marginBottom: "10px", fontWeight: "500" })}
`;

const ProductCat = styled.span`
  margin-bottom: 10px;
`;

const ProductColorText = styled.span`
  ${mobile({ display: "block" })}
`;

export default Payment;
