import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  font-weight: 200;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .loading {
    font-size: 84px;
    font-family: "Urbanist", sans-serif;
    font-weight: 800;
    text-align: center;
    ${mobile({ fontSize: "48px", marginTop: "30px" })};
    span {
      display: inline-block;
      margin: 0 -0.05em;
    }
  }
  .loading03 {
    span {
      margin: 0 -0.075em;
      animation: loading03 0.7s infinite alternate;
    }
  }
  @keyframes loading03 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;

const Loading = () => {
  return (
    <Loader>
      <div className="loading loading03">
        <span>D</span>
        <span>O</span>
        <span>W</span>
        <span>N</span>
        <span>T</span>
        <span>O</span>
        <span>W</span>
        <span>N</span>
      </div>
    </Loader>
  );
};

export default Loading;
