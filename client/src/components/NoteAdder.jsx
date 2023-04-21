import styled from "styled-components";
import { theme } from "../themes";
import { useState, useEffect } from "react";
import { addNote, deleteNote } from "../redux/apiCalls";
import alertify from "alertifyjs";

const NoteAdder = () => {
  const [productID, setProductID] = useState("");
  const [note, setNote] = useState("");

  const handleID = (e) => {
    setProductID(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    if (productID === "" || note === "") {
      alertify.error("Lütfen bütün alanları doldurunuz.");
    } else {
      addNote({ productID, note })
        .then(() => {
          alertify
            .alert(
              "Downtown Admin",
              `${productID} adlı ürüne not eklendi.`,
              function () {
                window.open(
                  `http://localhost:4000/product/${productID}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            )
            .set({
              closable: true,
              movable: false,
              transition: "fade",
              labels: { ok: "Ürüne Git" },
            });
        })
        .catch((err) => {
          alertify.error("Bir hata oluştu.");
        });
    }
  };

  const handleDeleteNote = (e) => {
    if (productID !== "") {
      deleteNote(productID);
      alertify.alert(
        "Downtown Admin",
        `${productID} adlı ürünün notu silindi.`,
        function () {
          window.open(
            `http://localhost:4000/product/${productID}`,
            "_blank",
            "noopener,noreferrer"
          );
        }
      );
    } else {
      alertify.error("Lütfen product ID kısmını doldurunuz!");
    }
  };
  return (
    <>
      <Container style={{ overflowY: "scroll" }}>
        <div className="item">
          <input
            className="pid-input"
            type="text"
            placeholder="URUN ADI"
            id="1"
            onChange={handleID}
          />
        </div>
        <div className="item">
          <span>NOT</span>
        </div>
        <div className="item">
          <textarea onChange={handleNote} />
        </div>
        <div className="item">
          <div className="btn-container">
            <button className="del-btn" onClick={handleDeleteNote}>
              SİL
            </button>
            <button className="add-btn" onClick={handleAddNote}>
              EKLE
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .item {
    margin: 10px 0px;
  }
  .pid-input {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 20px;
  }
  .pid-input:hover {
    background-color: #e2e2e2;
  }
  span {
    font-size: 20px;
    font-weight: 400;
  }
  textarea {
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
      cursor: pointer;
    }
    ::-webkit-scrollbar-thumb {
      transition: all 1s ease-in-out;
      background-color: #e2e2e2;
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
      cursor: pointer;

      :hover {
        background-color: ${theme.primaryColor};
      }
    }
    :focus {
      outline: none;
      background-color: grey;
      color: white;
    }
    ::placeholder {
      color: #e2e2e2;
    }
  }

  .btn-container {
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
    margin: 0px 20px;
    width: 100px;
  }
  .add-btn:hover {
    background-color: #68b34e;
  }
  .del-btn:hover {
    background-color: #e74c3c;
  }
`;

export default NoteAdder;
