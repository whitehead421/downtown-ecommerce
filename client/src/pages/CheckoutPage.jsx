import { Helmet } from "react-helmet";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Checkout from "../components/Checkout";
import styled from "styled-components";
import { useState } from "react";

const CheckoutPage = () => {
  return (
    <Container>
      <Helmet>
        <title>Checkout - Downtown Boutique</title>
      </Helmet>
      <Announcement />
      <Navbar />
      <Checkout />
    </Container>
  );
};

const Container = styled.div``;

export default CheckoutPage;
