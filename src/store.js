import { createStore } from "redux";
import { combineReducers, install } from "redux-loop";

import { appointments } from "./reducers";

const rootReducer = combineReducers({
  appointments,
});

const store = createStore(rootReducer, {}, install());

export default store;
