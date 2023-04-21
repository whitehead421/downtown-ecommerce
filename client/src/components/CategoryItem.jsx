import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import catmen from "../images/categories/catmen.webp";
import catwomen from "../images/categories/catwomen.webp";
import catbaby from "../images/categories/catbaby.webp";
import catboy from "../images/categories/catboy.webp";
import catgirl from "../images/categories/catgirl.webp";
import { FilterContext } from "../context/FilterContext";
import { useContext } from "react";

const CategoryItem = ({ item }) => {
  const images = [catmen, catwomen, catboy, catgirl, catbaby];
  const [filter, setFilter] = useContext(FilterContext);

  const handleClick = () => {
    setFilter((prev) => ({
      ...prev,
      category: [item.title],
      gender: [item.title],
    }));
  };

  return (
    <Container>
      <Link to={`/products`} onClick={handleClick}>
        <Image src={images[item.img]} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  ${mobile({
    width: "100%",
    height: "15vh",
    objectPosition: "50% 35%",
  })};
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;
  &:hover ${Info} {
    opacity: 0;
  }
  ${mobile({ width: "100%" })}
`;

const Title = styled.h1`
  color: white;
  font-size: 50px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "25px", marginBottom: "10px" })}
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  ${mobile({ display: "none" })}
`;

export default CategoryItem;
