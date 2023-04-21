import React from "react";
import styled from "styled-components";
import image1 from "../images/1.webp";
import image2 from "../images/2.webp";
import { mobile, tablet } from "../responsive";

const Farfetch = () => {
  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <img src={image2} height="80%" style={{ marginTop: "60px" }} />
        </ImageContainer>
        <TextContainer>
          <h3>EXTRA 20% OFF SALE, PLUS FREE SHIPPING</h3>
          <p>
            Don't miss out on the DOWNTOWN sale, now with an extra 20% off plus
            free shipping. Selected items for a limited time only; discount
            automatically applied at checkout
          </p>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 88vh;
  padding: 20px;
  align-items: center;
  ${mobile({ height: "100%" })}
  ${tablet({ height: "100%" })}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  img {
    ${mobile({ width: "100%" })}
    ${tablet({ width: "80%" })}
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  text-align: center;
  h3 {
    margin: 30px;
    font-size: 60px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    ${mobile({ fontSize: "25px", margin: "10px" })}
    ${tablet({ fontSize: "25px", margin: "10px" })}
  }
  p {
    margin: 30px;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    ${mobile({ fontSize: "16px", margin: "10px" })}
    ${tablet({ fontSize: "16px", margin: "10px" })}
  }
`;

export default Farfetch;
