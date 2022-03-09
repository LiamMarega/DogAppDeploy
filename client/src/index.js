import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import  store  from './store';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react"
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
      <Auth0Provider
        domain="dev-dts259kg.us.auth0.com"
        clientId="2jBVhiZehYRxcXQl0vKeuvmydyQ8cy3X" redirectUri={window.location.origin}
      >
          <App />
      </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
