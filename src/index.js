import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./redux/reducers/rootReducer.js";
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {createStore(rootReducer)}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"))
