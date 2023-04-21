import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mobile, tablet, fourk } from "../responsive";
import { theme } from "../themes";

// import getAuth
import {
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  stateFix,
} from "../redux/userRedux";
import { useEffect } from "react";

const Login = () => {
  const provider = new FacebookAuthProvider();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stateFix());
  }, [dispatch]);

  const loginFirebase = async (dispatch, { username, password }) => {
    const auth = getAuth();
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredentials) => {
        console.log("Logged in");
        console.log(userCredentials.user);
        dispatch(loginSuccess(userCredentials.user));
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  };

  const loginFacebookFirebase = async (dispatch) => {
    const auth = getAuth();
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        console.log("Logged in");
        console.log(userCredentials);
        dispatch(loginSuccess(userCredentials.user));
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  };
  //TODO USERNAME TO EMAIL
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    loginFirebase(dispatch, { username, password });
    console.log("Logged in");
  };

  const handleFacebookLogin = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    loginFacebookFirebase(dispatch);
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Email"
            maxLength="50"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            minLength={6}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
            <Button onClick={handleLogin} disabled={isFetching}>
              LOG IN
            </Button>
            <FButton onClick={handleFacebookLogin} disabled={isFetching}>
              LOG IN WITH FACEBOOK
            </FButton>
          </ButtonContainer>
          {error && <Error>Something went wrong!</Error>}
          <Link to="/register">
            <Links>Forgot your password?</Links>
          </Link>
          <Link to="/register">
            <Links>Create a new account and join us!</Links>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/816531/pexels-photo-816531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "100%" })};
  ${tablet({ width: "60%" })};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 30%;
  border: 1px solid ${theme.primaryColor};
  padding: 15px 15px;
  cursor: pointer;
  background-color: white;
  transition: all 0.5s ease;
  font-size: 20px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${theme.primaryColor};
    transform: scale(1.03);
    color: white;
    font-weight: 900;
    margin-left: 5px;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Links = styled.span`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  color: ${theme.primaryColor};
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  font-size: 15px;
  margin: 10px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// make facebook button with styled-components with icon
const FButton = styled.button`
  width: 50%;
  border: 1px solid ${theme.primaryColor};
  transition: all 0.5s ease;
  margin-bottom: 10px;
  font-size: 15px;
  height: auto;
  background-color: #4267b2;
  color: white;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #2d5a8e;
  }
`;

export default Login;
