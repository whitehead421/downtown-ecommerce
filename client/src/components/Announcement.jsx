import styled from "styled-components";
import { mobile } from "../responsive";
import { theme } from "../themes";

const color1 = theme.primaryColor;
const color2 = theme.secondaryColor;

const Container = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(props) => (props.type === "anno" ? color1 : color2)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${mobile({ fontSize: "10px" })};
`;

const Announcement = () => {
  return (
    <>
      <Container type="anno">
        FREE SHIPPING ALL OVER THE WORLD, ALL YEAR!
      </Container>
      <Container type="junior">ADULT ITEMS WILL BE UPLOADED SOON!</Container>
    </>
  );
};

export default Announcement;
