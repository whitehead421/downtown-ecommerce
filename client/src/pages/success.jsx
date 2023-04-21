import styled from "styled-components";
import { theme } from "../themes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.primaryColor};
  color: white;
  font-weight: 600;
  font-size: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Success = () => {
  return <Container>SUCCES</Container>;
};

export default Success;
