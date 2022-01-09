import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let defaltState = [
  { id: 1111, name: "멋진스티커", quan: 2 },
  { id: 22222, name: "예쁜스티커", quan: 4 },
];

function reducer2(state = true, action) {
  if (action.type === "닫기") {
    return false;
  } else {
    return state;
  }
}

function reducer(state = defaltState, action) {
  if (action.type === "장바구니담기") {
    let foundIndex = state.findIndex((a) => {
      return a.id === action.payload.id;
    });

    if (foundIndex >= 0) {
      //이미 배열에 있어
      let copy = [...state];
      if (action.payload.quan !== "") {
        //input 빈값이 아니야
        copy[foundIndex].quan = action.payload.quan;

        return copy;
      } else {
        //input 빈값이야

        copy[foundIndex].quan++;
        return copy;
      }
    } else {
      //배열에 없어서 새로 push

      let copy = [...state];
      if (action.payload.quan !== "") {
        //input 빈값이 아니야
        copy.push(action.payload);

        return copy;
      } else {
        //input 빈값이야
        action.payload.quan++;
        copy.push(action.payload);
        return copy;
      }
    }
  } else if (action.type === "수량증가") {
    let copy = [...state];
    copy[action.payload.id].quan++;
    return copy;
  } else if (action.type === "수량감소") {
    let copy = [...state];
    let copyQuan = copy[action.payload.id].quan;
    0 >= copyQuan ? (copyQuan = 0) : copy[action.payload.id].quan--;
    return copy;
  } else if (action.type === "삭제") {
    let copy = [...state];
    copy.splice(action.payload.index, 1);
    return copy;
  } else {
    return state;
  }
}
let store = createStore(combineReducers({ reducer, reducer2 }));

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
