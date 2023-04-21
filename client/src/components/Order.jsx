import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { theme } from "../themes";
import { mobile, tablet, laptop } from "../responsive";

const Order = ({ order }) => {
  const receiver = useSelector((state) => state.user.currentUser.displayName);

  const itemCount = order.products.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const productCount = order.products.length;

  const date = new Date(order.createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString("en", { month: "long" });
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <Container>
      <Info>
        <span className="collider">
          <span className="title">Order Date</span>
          <span className="content">{day + " " + month + " " + year}</span>
          <span className="content">
            {parseInt(hour) < 10 ? "0" + hour : hour}
            {":"}
            {parseInt(minute) < 10 ? "0" + minute : minute}
          </span>
        </span>
        <span className="collider">
          <span className="title">Order Summary</span>
          <span className="content">
            {itemCount > 1 ? `${itemCount} Items` : `${itemCount} Item`},{" "}
            {itemCount > 1
              ? `${productCount} Products`
              : `${productCount} Product`}
          </span>
        </span>
        <span className="collider">
          <span className="title">Receiver</span>
          <span className="content">{receiver}</span>
        </span>
        <span className="collider">
          <span className="title">Order Amount</span>
          <span className="content">£ {order.amount}</span>
        </span>
        <button>Order Details</button>
      </Info>
      <Products>
        <div className="status">
          <span className="status">{order.status.toUpperCase()}</span>
          <span>
            {order.status === "pending" ? "Payment waiting" : "Delivered"}
          </span>
        </div>
        <div className="products">
          {order.products.map((product) => (
            <span>
              <img src={product.img} width="75" height="100" alt="" />
            </span>
          ))}
        </div>
      </Products>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(230, 230, 230);
  ${mobile({
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  })}
  span {
    margin: 10px;
    text-align: start;
    ${mobile({
      textAlign: "center",
    })}
  }
  span.title {
    margin: 0 10px;
    font-weight: 400;
  }
  span.content {
    margin: 0 10px;
    font-weight: 200;
  }
  span.collider {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    ${mobile({
      display: "flex",
      justifyContent: "center",
    })}
  }
  button {
    background-color: ${theme.primaryColor};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;
    outline: none;
    transition: 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
    ${mobile({
      margin: "10px 0",
    })}
  }
`;

const Products = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e2e2e2;
  justify-content: space-between;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  })}
  div {
    display: flex;
    width: 100%;
    height: auto;
    margin: 10px;
    padding: 10px;
  }

  div.status {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span.status {
      margin: 5px;
      font-weight: 600;
      font-size: 20px;
      color: ${theme.primaryColor};
    }
  }
  div.products {
    display: flex;
    flex-wrap: wrap;
    flex: 5;
    ${mobile({
      display: "flex",
      justifyContent: "center",
    })}
    span {
      margin-right: 10px;
    }
    img {
      margin: 10px 0px;
      border: 1px solid #e2e2e2;
    }
  }
`;

export default Order;
