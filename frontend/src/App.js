import React from "react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store/index";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <h1>1212</h1>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
