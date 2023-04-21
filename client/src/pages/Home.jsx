import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
// import Products from "../components/Products";
import Slider from "../components/Slider";
import Farfetch from "../components/Farfetch";
import { Helmet } from "react-helmet";

const Container = styled.div`
  overflow: hidden;
`;

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Downtown Boutique</title>
      </Helmet>
      <Announcement />
      <Navbar />
      {/* <Farfetch /> */}
      <Slider />
      <Categories />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
