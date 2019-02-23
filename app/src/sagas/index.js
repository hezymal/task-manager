import { all } from "redux-saga/effects";
import column from "./column";
import task from "./task";

function* rootSaga() {
    yield all([
        column(),
        task(),
    ]);
}

export default rootSaga;
