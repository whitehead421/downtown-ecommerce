import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 426px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 426px) and (max-width: 768px) {
      ${props}
    }
  `;
};

export const laptop = (props) => {
  return css`
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      ${props}
    }
  `;
};

export const fourk = (props) => {
  return css`
    @media only screen and (min-width: 1440px) and (max-width: 2560px) {
      ${props}
    }
  `;
};
