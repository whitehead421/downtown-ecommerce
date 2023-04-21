import { useState } from "react";
import { imageUpload, imageDelete } from "../redux/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import alertify from "alertifyjs";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageUploader = () => {
  const [productID, setProductID] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const dispatch = useDispatch();

  const handleID = (e) => {
    setProductID(e.target.value);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    const formData = new FormData();
    console.log(selectedFiles);
    formData.append("productID", productID);

    Object.entries(selectedFiles).forEach(([key, value]) => {
      formData.append("image", value);
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(
          `${Math.floor(loaded / 1024 / 1024)}mb of ${Math.floor(
            total / 1024 / 1024
          )}mb | ${percent}%`
        );

        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };

    await axios
      .post("http://localhost:5000/api/images/post", formData, options, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alertify.success(
          `${productID}` +
            " idli ürün için resimler başarılı bir şekilde yüklenmiştir."
        );
      })
      .catch((err) => {
        console.log(err);
        alertify.error(
          `${productID}` + " idli ürün için resim yüklenirken bir hata oluştu."
        );
      })
      .finally(() => {
        setUploadPercentage(100);

        setTimeout(() => {
          setIsUploading(false);
        }, 3000);
      });
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(`http://localhost:5000/api/images/${productID}`)
        .then((res) => {
          alertify.success(
            `${productID}` +
              " idli ürün için resimler başarılı bir şekilde silinmiştir."
          );
        });
    } catch (err) {
      console.log(err);
      alertify.error(
        `${productID}` + " idli ürün için resimler silinirken bir hata oluştu."
      );
      return err;
    }
  };
  return (
    <>
      <Container>
        <input
          className="input"
          type="text"
          placeholder="URUN ADI"
          id="1"
          onChange={handleID}
        />
        <input
          className="input-file"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            e.preventDefault();
            setSelectedFiles(e.target.files);
          }}
        />
        <div className="btn-divider">
          <button
            className="del-btn"
            onClick={handleDelete}
            disabled={isUploading}
          >
            VERİLEN ÜRÜN ADI İÇİN SİL
          </button>
          <button
            className="add-btn"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            VERİLEN ÜRÜN ADI İÇİN YÜKLE
          </button>
        </div>
        {isUploading && (
          <Box sx={{ width: "100%", marginTop: "20px", height: "30px" }}>
            <ProgressBar
              striped={true}
              animated={true}
              now={uploadPercentage}
              label={`${uploadPercentage}%`}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  .input {
    margin: 10px 0px;
    border: none;
    padding: 10px;
    padding-right: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    :focus {
      outline: none;
      background-color: grey;
      color: white;
    }
    ::placeholder {
      color: #e2e2e2;
    }
  }
  .input:hover {
    background-color: grey;
  }

  .input-file {
    margin: 10px 0px;
    width: 20%;
    border: none;
  }

  .input-file:hover {
    background-color: grey;
    color: white;
  }

  .btn-divider {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  button {
    background-color: #9098a0;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
    color: white;
  }
  .add-btn:hover {
    background-color: #68b34e;
    color: white;
    margin-right: 10px;
  }
  .del-btn:hover {
    background-color: #ff2e33;
    color: white;
    margin-left: 10px;
  }
`;

export default ImageUploader;
