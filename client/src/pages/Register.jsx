import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { theme } from "../themes";
import { mobile, tablet, fourk } from "../responsive";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { loginStart, loginFailure, loginSuccess } from "../redux/userRedux";
import alertify from "alertifyjs";

const Register = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isFree, setIsFree] = useState(false);

  const registerFirebase = async (
    dispatch,
    { email, password, displayName }
  ) => {
    console.log("Registering");
    const auth = getAuth();
    dispatch(loginStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("User created", userCredentials);
        updateProfile(userCredentials.user, {
          displayName: displayName,
        })
          .then(() => {
            dispatch(loginSuccess(userCredentials.user));
          })
          .catch((error) => {
            console.log("Error updating profile", error);
            dispatch(loginFailure(error));
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch(loginFailure());
        if (error.code === "auth/email-already-in-use") {
          alertify.error("Email is already in use by another account.");
        } else if (error.code === "auth/invalid-email") {
          alertify.error("Invalid email!");
        }
      });
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function ValidateDisplayName(displayName) {
    if (
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
        displayName
      )
    ) {
      return true;
    }
    return false;
  }

  const handleRegister = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    // if displayname or email or password is empty, do not register
    if (displayName === "" || email === "" || password === "") {
      setIsFree(true);
    } else if (!ValidateDisplayName(displayName)) {
      alertify.error("Display name must be valid!");
    } else if (!ValidateEmail(email)) {
      alertify.error("You have entered an invalid email address!");
    } else if (password.length < 6) {
      alertify.warning("Password must be at least 6 characters long!");
    } else {
      registerFirebase(dispatch, { email, password, displayName });
    }
  };

  const handlePassword = (e) => {
    if (passwordFirst === passwordConfirm) {
      setPassword(passwordFirst);
    }
  };

  useEffect(() => {
    handlePassword();
  }, [passwordFirst, passwordConfirm]);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Full Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPasswordFirst(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Agreement>
            <IsFree>
              {isFree ? (
                <span style={{ color: "red", fontSize: "16px" }}>
                  Please fill in all fields!
                </span>
              ) : null}
            </IsFree>
            <>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY.</b>
            </>
          </Agreement>
          <Button onClick={handleRegister}>JOIN US</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

// STYLES

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "100%" })}
  ${tablet({ width: "70%" })}
  ${fourk({
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const IsFree = styled.span`
  font-size: 12px;
  margin-bottom: 20px;
  color: red;
`;

const Button = styled.button`
  width: 40%;
  border: 1px solid ${theme.primaryColor};
  padding: 15px 20px;
  cursor: pointer;
  background-color: white;
  transition: all 0.5s ease;
  font-size: 20px;
  &:hover {
    background-color: ${theme.primaryColor};
    transform: scale(1.1);
    color: white;
    font-weight: 900;
  }
`;

export default Register;
