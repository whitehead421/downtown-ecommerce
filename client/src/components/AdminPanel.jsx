import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import ImageUploader from "./ImageUploader";
import NoteAdder from "./NoteAdder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [panel, setPanel] = useState("");

  const checkPassword = async () => {
    await axios
      .get("http://localhost:5000/api/secret/" + password, {
        body: { password: password },
      })
      .then((response) => {
        if (response.data) {
          alertify.success("Password is correct");
          setIsLogged(true);
        } else {
          alertify.error("Password is incorrect");
        }
      });
  };

  const handlePanel = (e) => {
    setPanel(e.target.value);
  };

  return (
    <>
      <Container>
        <div className="admin-panel">
          {panel !== "" && (
            <button onClick={() => setPanel("")}>
              <ArrowBackIosNewIcon />
            </button>
          )}
          <h1 style={{ fontWeight: "200", marginTop: "20px" }}>Admin Panel</h1>
        </div>
        {!isLogged && (
          <div className="auth">
            <input
              type="password"
              placeholder="Admin Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={checkPassword}>LOG IN</button>
          </div>
        )}
      </Container>
      <AdminContainer>
        {isLogged && panel === "" ? (
          <>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Panel Seçiniz
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handlePanel}
              >
                <FormControlLabel
                  value="imageuploader"
                  control={<Radio />}
                  label="Resim Yükleme Paneli"
                />
                <FormControlLabel
                  value="noteadder"
                  control={<Radio />}
                  label="Not Ekleme Paneli"
                />
              </RadioGroup>
            </FormControl>

            <button className="logout" onClick={() => setIsLogged(false)}>
              LOG OUT
            </button>
          </>
        ) : null}
        {panel === "noteadder" && <NoteAdder />}
        {panel === "imageuploader" && <ImageUploader />}
      </AdminContainer>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;

  .logout {
    margin-top: 20px;
    background-color: #9098a0;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    color: white;
  }
  .logout:hover {
    background-color: #e74c3c;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  .admin-panel {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
    button {
      color: white;
      border: none;
      background-color: #9098aa;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    button:hover {
      background-color: #e74c3c;
    }
  }
  .auth {
    display: flex;
    flex-direction: column;
    button {
      background-color: #e2e2e2;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s ease-in-out;
    }
    button:hover {
      background-color: #a4a4a4;
    }
  }
  input {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
  }
`;

export default AdminPanel;
