import styled from "styled-components";
import {
  FlightTakeoff,
  AccountCircle,
  Favorite,
  LocationOn,
  Settings,
} from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Orders from "../components/Orders";
import Account from "../components/Account";
import Address from "../components/Address";
import Wishlist from "../components/Wishlist";
import { theme } from "../themes";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { mobile, tablet } from "../responsive";
import AdminPanel from "../components/AdminPanel";
import { useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [component, setComponent] = useState("orders");
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async () => {
    await axios
      .get("http://localhost:5000/api/secret/admin/" + user.uid)
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setIsAdmin(true);
        }
      });
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "Account":
        return setComponent("account");
      case "Orders":
        return setComponent("orders");
      case "Addresses":
        return setComponent("addresses");
      case "Wishlist":
        return setComponent("wishlist");
      case "Admin Panel":
        return setComponent("adminpanel");
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Profile - Downtown Boutique</title>
      </Helmet>
      <Announcement />
      <Navbar />
      <Wrapper>
        <div className="divone" onClick={handleClick}>
          <ul>
            <li>
              <FlightTakeoff /> <span>Orders</span>
            </li>
            <li>
              <LocationOn /> <span>Addresses</span>
            </li>
            <li>
              <Favorite /> <span>Wishlist</span>
            </li>
            {isAdmin && (
              <li>
                <Settings /> <span>Admin Panel</span>
              </li>
            )}
          </ul>
        </div>
        <div className="divtwo">
          {component === "orders" ? <Orders /> : null}
          {component === "addresses" ? <Address /> : null}
          {component === "wishlist" ? <Wishlist /> : null}
          {component === "adminpanel" ? <AdminPanel /> : null}
        </div>
      </Wrapper>
    </Container>
  );
};

// STYLES

const Container = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 80px;
  ${mobile({
    flexDirection: "column",
    margin: "20px 0",
  })};
  .divone {
    flex: 1;
    text-align: center;
    height: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    ${mobile({ width: "100%", border: "none" })};

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      ${mobile({ paddingInlineStart: "0px" })};
      li {
        width: 60%;
        padding: 20px;
        font-size: 20px;
        font-weight: 300;
        color: black;
        background-color: #fafafa;
        margin: 3px 0px;
        display: flex;
        border-radius: 10px;
        ${tablet({ width: "70%" })};

        span {
          margin-left: 10px;
        }
        transition: all 0.5s ease;
        &:hover {
          background-color: ${theme.secondaryColor};
          color: white;

          cursor: pointer;
        }
      }
    }
  }
  .divtwo {
    flex: 4;
    text-align: center;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    margin: 0px 10px;
    ${mobile({ justifyContent: "center", alignItems: "center" })};
  }
`;
export default Profile;
