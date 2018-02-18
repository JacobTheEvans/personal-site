import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Root from "./app.js";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

let currentToken = null;

store.subscribe(()=> {
  let token = store.getState().token;
  if(token !== null && currentToken !== token) {
    window.location.href = "/#/manage"
    currentToken = token;
  }
})

ReactDOM.render(
  <Provider store={store}><Root />
  </Provider>, document.getElementById("root")
);
registerServiceWorker();

//Message to users that check console
console.log("[+] Hello I see your taking a look at my code");
console.log("[+] You might notice this warning -> Warning: Invalid argument supplied to oneOfType, expected an instance of array.");
console.log("[+] This is not an error but a know bug in Semantic-UI-React");
console.log("[+] See issue here https://github.com/Semantic-Org/Semantic-UI-React/issues/1344");
console.log("[+] If want to see the source code of this website go here: https://github.com/JacobTheEvans/personal-website-v4.git");
