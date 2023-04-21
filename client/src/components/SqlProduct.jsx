import styled from "styled-components";
import { SearchOutlined, FavoriteBorderOutlined } from "@material-ui/icons";
import DiscountIcon from "@mui/icons-material/Discount";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { theme } from "../themes";
import image1 from "../images/babywear.webp";
import image2 from "../images/boywear.webp";
import image3 from "../images/girlwear.webp";
import image4 from "../images/manwear.webp";
import image7 from "../images/womenwear.webp";
import cartimg from "../images/cart-img.webp";
import { publicRequest } from "../requestMethods";
import Loading from "./Loading";
import ImageLoading from "./ImageLoading";

import { checkOfferForItem } from "../offers/OfferChecker";
import axios from "axios";

const SqlProduct = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [offers, setOffers] = useState([]);
  var img = cartimg;

  useEffect(() => {
    const getProductImages = async () => {
      try {
        setIsLoading(true);
        // eslint-disable-next-line
        await publicRequest
          .get(`/images/image/find/${item.ADI}`)
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            if (res.data === undefined) {
              setIsLoading(false);
              return;
            } else {
              setProductImages(res.data[0]);
              setIsLoading(false);
            }
          });
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    };
    getProductImages();
  }, [item.ADI]);

  const colorCount = (item) => {
    return Object.keys(item.STOCK).length;
  };

  if (productImages.length !== 0) {
    img =
      "https://localhost/api/images/image/" + productImages.replace(".png", "");
  } else {
    if (item.CATEGORY.indexOf("MEN") !== -1) {
      img = image4;
    }

    if (item.CATEGORY.indexOf("WOMEN") !== -1) {
      img = image7;
    }

    if (item.CATEGORY.indexOf("BOY") !== -1) {
      img = image2;
    }

    if (item.CATEGORY.indexOf("GIRL") !== -1) {
      img = image3;
    }

    if (item.CATEGORY.indexOf("BABY") !== -1) {
      img = image1;
    }
  }

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
      }}
      to={`/product/${item.ADI}`}
    >
      <Container>
        <Icon color="#f57676">
          <FavoriteBorderOutlined />
        </Icon>
        <div className="product-image">
          {isLoading ? (
            <ImageLoading />
          ) : (
            <>
              {checkOfferForItem(item).length !== 0 ? (
                <CampaignTag>
                  <DiscountIcon style={{ color: theme.secondaryColor }} />
                </CampaignTag>
              ) : null}
              <Image src={img} onLoad={handleImageLoaded} />
              {colorCount(item) > 1 ? (
                <div className="color-options">
                  <div className="circles">
                    <div className="gradient circle-1"></div>
                    <div className="gradient circle-2"></div>
                  </div>
                  <div className="number-of-colors">
                    <span>{colorCount(item)}</span>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
        <div className="product-details">
          <span>{item.TANIMI}</span>
          <span>{item.CATEGORY}</span>
          <span>£{item.SFIYAT}</span>
        </div>
      </Container>
    </Link>
  );
};

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  transition-delay: 70ms;
  cursor: pointer;
`;

const CampaignTag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999;
  :hover {
    cursor: pointer;
    animation: campaignTag 1s ease-in-out infinite;
    @keyframes campaignTag {
      0% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
      100% {
        transform: rotate(-10deg);
      }
    }
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.1, 0.82, 0.5, 1);
`;

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  margin: 5px;
  min-width: 280px;
  max-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 1s ease;
  overflow: hidden;

  :hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    ${Image} {
      transform: scale(1.05);
    }
  }

  .product-image {
    flex: 3;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .product-details {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 5px;
      font-size: 20px;
      font-weight: 400;
    }

    span:nth-child(2) {
      font-size: 14px;
      font-weight: 200;
    }
  }

  .color-options {
    position: absolute;
    bottom: 5px;
    right: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    background-color: white;
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 5px;

    .circles {
      flex: 1;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
    }

    .number-of-colors {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gradient {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin-left: 2px;
    }

    .circle-1 {
      background-image: linear-gradient(
        to right,
        #3023ae 0%,
        #53a0fd 48%,
        #b4ec51 101%
      );
      outline: 2px solid white;
    }

    .circle-2 {
      background-image: linear-gradient(to right, #f98cc2 20%, #fff781 101%);
      position: relative;
      right: 10px;
      outline: 2px solid white;
    }
  }
`;

const Circle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;
  color: black !important;
  a {
    color: black !important;
  }

  &:hover {
    background-color: ${(props) => props.color};
    color: white !important;
  }
`;

export default SqlProduct;
