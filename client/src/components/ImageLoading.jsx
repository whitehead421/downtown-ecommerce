import React from "react";
import styled from "styled-components";

const ImageLoading = () => {
  return (
    <Container>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: loader 3s infinite;
  transition: all 1s ease-in-out;
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }

  @keyframes loader {
    0% {
      background-color: rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.1);
    }
    50% {
      background-color: rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.1);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export default ImageLoading;
