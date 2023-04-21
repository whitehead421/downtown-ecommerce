import React from "react";
import { Slide } from "react-slideshow-image";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import Loading from "./Loading";
import ImageLoading from "./ImageLoading";
import image1 from "../images/babywear.webp";
import image2 from "../images/boywear.webp";
import image3 from "../images/girlwear.webp";
import image4 from "../images/manwear.webp";

import "./TestSlider.css";

const zoomOutProperties = {
  duration: 10000,
  transitionDuration: 800,
  infinite: true,
  indicators: true,
  arrows: true,
};

const TestSlider = ({ productID, setCartImg }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const getProductImages = async () => {
      try {
        setIsLoading(true);
        await publicRequest
          .get("/images/image/find/" + productID)
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            if (res !== undefined) {
              setProductImages(
                res.data.map(
                  (image) =>
                    "https://localhost/api/images/image/" +
                    image.replace(".png", "")
                )
              );
              setCartImg(
                "https://localhost/api/images/image/" +
                  res.data[0].replace(".png", "")
              );
              setIsLoading(false);
            } else {
              setProductImages([image1, image2, image3, image4]);
              setIsLoading(false);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.log("YOUR ERROR IS:", err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (productID !== undefined) {
      getProductImages();
    }
  }, [productID]);

  if (isLoading || productImages.length === 0) {
    return <ImageLoading />;
  }
  return (
    <div className="fixer">
      <div className="slide-container">
        {productImages.length !== 1 ? (
          <Slide scale={0.4} {...zoomOutProperties}>
            {productImages.map((each, index) => (
              <img
                key={index}
                style={{
                  width: "100%",
                  maxWidth: 800,
                  height: "auto",
                  maxHeight: 500,
                  objectFit: "contain",
                }}
                src={each}
              />
            ))}
          </Slide>
        ) : (
          <Slide scale={0.4} {...zoomOutProperties}>
            {productImages.map((each, index) => (
              <img
                key={index}
                style={{
                  width: "100%",
                  maxWidth: 800,
                  height: "auto",
                  maxHeight: 500,
                  objectFit: "contain",
                }}
                src={each}
              />
            ))}
          </Slide>
        )}
      </div>
    </div>
  );
};

export default TestSlider;
