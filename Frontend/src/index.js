import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/Store";
import { Provider } from "react-redux";
import App from "./App";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
