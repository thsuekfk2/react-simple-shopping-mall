import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

let defaltState = [
  { id: 0, name: "멋진스티커", quan: 2 },
  { id: 1, name: "예쁜스티커", quan: 4 },
];

function reducer(state = defaltState, action) {
  let copy = [...defaltState];
  if (action.type === "수량증가") {
    copy[0].quan++;
    return copy;
  } else if (action.type === "수량감소") {
    let copyQuan = copy[0].quan;
    0 >= copyQuan ? (copyQuan = 0) : copy[0].quan--;

    return copy;
  } else return state;
}
let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
