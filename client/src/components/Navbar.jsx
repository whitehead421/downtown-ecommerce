import { Badge } from "@material-ui/core";
import { Person, Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { logOutSuccess } from "../redux/userRedux";
import { theme } from "../themes";
import { useState } from "react";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const history = useNavigate();
  const [search, setSearch] = useState("");

  const auth = getAuth();
  const handleLogOut = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    auth.signOut();
    logOutSuccess();
    history("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <form autoComplete="off">
              <Input
                placeholder="Search"
                autocomplete="false"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    history(`/product/${search}`);
                  }
                }}
              />
            </form>
            <Search
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <Logo>
              <span className="logo1">DOWNTOWN</span>
              <span className="logo2">BOUTIQUE</span>
            </Logo>
          </Link>
        </Center>
        <Right>
          {!currentUser ? (
            <>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
              >
                <MenuItem>SIGN UP</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
              >
                <MenuItem>LOG IN</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
              >
                <MenuItem onClick={handleLogOut}>LOG OUT</MenuItem>
              </Link>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
              >
                <MenuItem>
                  <Badge
                    overlap="rectangular"
                    badgeContent={quantity}
                    variant="dot"
                    color="primary"
                  >
                    <Person color="action" />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge
                className="cart-badge"
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
                showZero={true}
              >
                <ShoppingCartOutlined color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })};

  .cart-badge:hover {
    ::after {
      content: "View Cart";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${theme.primaryColor};
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 99999;
      ${tablet({
        display: "none",
      })}
      ${mobile({
        display: "none",
      })}
    }
  }

  .MuiBadge-colorPrimary {
    background-color: ${theme.secondaryColor};
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({
    display: "none",
  })};
  ${tablet({
    display: "none",
  })};
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
  ${tablet({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })};
  ${tablet({ display: "none" })};
`;

const Input = styled.input`
  border: none;
  outline: 0px;
  background-color: transparent;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-weight: bold;
  margin-right: 5px;
  font-size: 30px;
  color: ${theme.primaryColor};
  span.logo2 {
    font-weight: 200;
  }
  ${mobile({
    padding: "10px 0px",
    fontSize: "18px",
    marginRight: "0px",
    marginTop: "-5px",
  })};
  ${tablet({
    padding: "10px 0px",
    marginTop: "-5px",
  })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ gap: "10px" })};
  ${tablet({
    justifyContent: "center",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px", textAlign: "center" })};
  ${tablet({
    textAlign: "center",
    marginLeft: "25px",
  })}
`;

export default Navbar;
