import * as React from "react";
import { render } from "react-dom";
import WebFont from "webfontloader";

import { App } from "./App";
import { Preloader } from "./components";
import "normalize.css/normalize.css";
import "react-phone-input-2/lib/style.css";
import { createAppStore, onAuthStateChanged } from "./redux";
import "../styles/style.scss";
import firebase from "./services/firebase";

WebFont.load({
  google: {
    families: ["Tajawal"],
  },
});

const { store, persistor } = createAppStore();
const root = document.getElementById("app");

// Render the preloader on initial load
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateChanged.done({ result: user }));
  } else {
    store.dispatch(onAuthStateChanged.failed({ error: "Failed to authenticate" }));
  }
  // then render the app after checking the auth state
  render(<App store={store} persistor={persistor} />, root);
});

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
