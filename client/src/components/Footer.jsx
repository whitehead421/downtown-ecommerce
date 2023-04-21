import { Email, Facebook, Instagram, Map, Phone } from "@material-ui/icons";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { theme } from "../themes";

const Container = styled.div`
  display: flex;
  border-top: 2px ridge ${theme.primaryColor};
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  })};
  ${tablet({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  })};
`;

const Left = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  padding: 20px;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: all 0.3s ease-in-out;
  :hover {
    cursor: pointer;
    content: "XXX";
    background-color: #000;
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 20px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ justifyContent: "center" })};
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({
    justifyContent: "center",
  })};
  ${tablet({
    justifyContent: "center",
  })};
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>DOWNTOWN</Logo>
        <Desc>
          We are serving the best products for you all over the world!
        </Desc>
        <SocialContainer>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>About</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>My Account</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Map style={{ marginRight: "10px" }} />
          İzmir, Turkey
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +90 123 456 7890 - ADULT
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +90 123 456 7890 - JUNIOR
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: "10px" }} />
          contact@downtownboutique.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
