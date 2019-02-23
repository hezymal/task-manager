import { combineReducers } from "redux";
import column from "./column";
import task from "./task";

const reducers = combineReducers({
    column,
    task,
});

export default reducers;
