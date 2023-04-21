import SqlProductList from "./pages/SqlProductList";
import Home from "./pages/Home";
import SqlProduct from "./pages/SqlProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Announcement from "./components/Announcement";
import NoFound from "./components/NoFound";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from "./redux/apiCalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { emptyCart } from "./redux/cartRedux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import alertify from "alertifyjs";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        alertify.success("Logged in successfully!");
      } else {
        logOut(dispatch);
        dispatch(emptyCart());
        alertify.warning("Logged out.");
      }
    });
  }, []);
  sessionStorage.setItem("lastseen", JSON.stringify([]));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Announcement />
              <Navbar />
              <NoFound />
            </>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="products" element={<SqlProductList />}>
          <Route path=":category" element={<SqlProductList />} />
        </Route>
        <Route path="product/:id" element={<SqlProduct />} />
        <Route
          path="register"
          element={user ? <Navigate to="/" replace={true} /> : <Register />}
        />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="login"
          element={user ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            user && cart.total >= 35 ? (
              <CheckoutPage />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route path="navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
