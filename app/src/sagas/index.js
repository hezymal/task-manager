import { all } from "redux-saga/effects";
import column from "./column";

function* rootSaga() {
    yield all([
        column(),
    ]);
}

export default rootSaga;
