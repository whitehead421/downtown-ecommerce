import styled from "styled-components";
import { useState } from "react";
import { theme } from "../themes";
import Address from "./Address";
import Payment from "./Payment";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";

const Checkout = () => {
  const [component, setComponent] = useState("address");

  const [address, setAddress] = useState("");

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "ADDRESS":
        return setComponent("address");
      case "PAYMENT":
        if (address === "" || address === undefined || address === null) {
          alertify.warning("Please select or enter an address to continue.");
        } else {
          return setComponent("payment");
        }
      default:
        return setComponent("address");
    }
  };
  return (
    <Container>
      <Wrapper>
        <div
          style={
            component === "address"
              ? {
                  fontWeight: "600",
                  boxShadow: `0px -3px 0px ${theme.secondaryColor} inset`,
                  color: theme.secondaryColor,
                }
              : null
          }
          onClick={handleClick}
        >
          ADDRESS
        </div>
        <div
          style={
            component === "payment"
              ? {
                  fontWeight: "600",
                  boxShadow: `0px -3px 0px ${theme.secondaryColor} inset`,
                  color: theme.secondaryColor,
                }
              : null
          }
          onClick={handleClick}
        >
          PAYMENT
        </div>
      </Wrapper>
      <div className="content">
        {component === "payment" ? <Payment /> : null}
        {component === "address" ? (
          <Address setCheckoutAddress={setAddress} />
        ) : null}
        {component === "address" ? (
          <button
            onClick={() => {
              address === null
                ? alertify.error("Please select an address to go payment.")
                : setComponent("payment");
            }}
          >
            GO TO PAYMENT
          </button>
        ) : null}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  div.content {
    margin: 20px 80px;
    ${mobile({ margin: "0px 0px" })}
  }
  button {
    background-color: ${theme.primaryColor};
    color: white;
    padding: 5px 10px;
    margin: 10px;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
    :active {
      background-color: ${theme.secondaryColor};
      transform: scale(0.9);
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  div {
    flex: 1;
    text-align: center;
    border: 1px solid #e2e2e2;
    transition: all 0.5s ease;
    padding: 10px;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
      box-shadow: 0px -3px 0px ${theme.primaryColor} inset;
    }
  }
`;

export default Checkout;
