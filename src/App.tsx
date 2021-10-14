import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Preloader } from "./components";
import { AppState } from "./redux";
import { AppRouter } from "./routers/AppRouter";

export const App: React.FC<AppProps> = ({ store, persistor }) => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </StrictMode>
);

type AppProps = {
  store: Store<AppState>;
  persistor: Persistor;
};
