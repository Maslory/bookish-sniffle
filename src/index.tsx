import React from "react";
import ReactDOM from "react-dom";
import "./style/style.sass";
import App from "./app/app";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import mySagas from "./app/store/sagas";
import { createStore, combineReducers, applyMiddleware } from "redux";
import initialState from "./app/store/InitialState";
import {
  array_case,
  request,
  array_todo,
  selectId,
  request_addTodo,
  request_changeTodo,
  request_removeTodo,
  edit_todo,
  request_checkTodo
} from "./app/reducers/reducers";

const sagaMiddleware = createSagaMiddleware();

const logger = (store: { getState: () => any }) => (
  next: (arg0: any) => any
) => (action: { type: any }) => {
  let result
  console.groupCollapsed("dispatching", action.type);
  console.log("prev state", store.getState());
  console.log("action", action);
  result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
};
const saver = (store: any) => (next: (arg0: any) => any) => (action: any) => {
  let result = next(action);
  // localStorage['redux-store'] = JSON.stringify(store.getState())
  return result;
};

const storeFactory = (state = initialState) =>
  applyMiddleware(sagaMiddleware, logger, saver)(createStore)(
    combineReducers({
      array_case,
      request,
      array_todo,
      selectId,
      request_addTodo,
      request_changeTodo,
      request_removeTodo,
      edit_todo,
      request_checkTodo
    }),
    // (localStorage['redux-store']) ?
    //     JSON.parse(localStorage['redux-store']) :
    state
  );

const store = storeFactory();
sagaMiddleware.run(mySagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
