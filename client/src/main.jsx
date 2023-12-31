import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-g02lzidkp63hhxsq.us.auth0.com"
      clientId="2zR4gtBb4UW5kRmrCQyV196AQkiN4o0A"
      authorizationParams={{
        redirect_uri: "https://real-estate-homz.vercel.app",
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
