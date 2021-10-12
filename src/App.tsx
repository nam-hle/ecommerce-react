import PropType from "prop-types";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Preloader } from "./components/common";
import AppRouter from "./routers/AppRouter";

const App = ({ store, persistor }: { store: any; persistor: any }) => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </StrictMode>
);

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired,
};

export default App;
