import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile, tablet } from "../responsive";
import { theme } from "../themes";

const Container = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })};
  ${tablet({ display: "none" })};
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e2e2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(arrows) => arrows.direction === "left" && "30px"};
  right: ${(arrows) => arrows.direction === "right" && "30px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-duration: 1.5s;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 88vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  padding-right: 10%;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: 800;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
  :active {
    background-color: ${theme.secondaryColor};
    color: white;
    border-color: transparent;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
