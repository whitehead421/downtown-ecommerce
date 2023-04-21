import styled from "styled-components";
import React from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20vh 0vh;
  font-weight: 100;
  font-size: 40px;
`;

const NoFound = () => {
  return <Container>You've found a page that doesn't exist.</Container>;
};

export default NoFound;
