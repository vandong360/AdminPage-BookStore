import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//react-redux here
import { Provider } from "react-redux";
import store from "./store/store.js";


ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

//tai lieu Redux
//https://magz.techover.io/2020/03/09/react-co-react-context-api-roi-ban-con-dung-redux-khong/
