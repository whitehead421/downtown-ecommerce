import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { initializeApp } from "firebase/app";
import { FilterProvider } from "./context/FilterContext";

const firebaseConfig = {
  apiKey: "AIzaSyCgBc5N7swsb1ai4XhKdLLS4WZj92OcY4M",
  authDomain: "downtown-boutique.firebaseapp.com",
  projectId: "downtown-boutique",
  storageBucket: "downtown-boutique.appspot.com",
  messagingSenderId: "358250723681",
  appId: "1:358250723681:web:f2a286b391ab7a3eebad20",
  measurementId: "G-WQDH3WH31D",
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <FilterProvider>
        <App />
      </FilterProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
