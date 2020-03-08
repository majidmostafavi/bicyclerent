import { createStore } from "redux";
import allReducers from "../reducers/index";
import {preLoad} from "./preLoad";

const store = createStore(allReducers);
preLoad(store);

export default store;
