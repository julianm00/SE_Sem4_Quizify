import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./tailwind.css";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
