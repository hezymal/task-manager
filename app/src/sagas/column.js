import { ADD, ADDED, FETCHED_LIST, FETCH_LIST, MODIFY, REMOVE, REMOVED, MODIFIED } from "constants/actionTypes";
import { columnKey } from "constants/dataKeys";
import { call, put, takeLatest } from "redux-saga/effects";
import { addColumn, fetchColumnList, modifyColumn, removeColumn } from "requests/api";

function* add(action) {
    const column = action.payload;
    const response = yield call(addColumn, column);
    
    yield put({
        type: `${columnKey}.${ADDED}`,
        payload: response.data.payload,
    });
}

function* modify(action) {
    const column = action.payload;
    const response = yield call(modifyColumn, column);
    
    yield put({
        type: `${columnKey}.${MODIFIED}`,
        payload: response.data.payload,
    });
}

function* remove(action) {
    const columnId = action.payload;
    const response = yield call(removeColumn, columnId);
    
    yield put({
        type: `${columnKey}.${REMOVED}`,
        payload: response.data.payload,
    });
}

function* fetchList() {
    const response = yield call(fetchColumnList);
    
    yield put({
        type: `${columnKey}.${FETCHED_LIST}`,
        payload: response.data.payload,
    });
}

function* watcher() {
    yield takeLatest(`${columnKey}.${ADD}`, add);
    yield takeLatest(`${columnKey}.${MODIFY}`, modify);
    yield takeLatest(`${columnKey}.${REMOVE}`, remove);
    yield takeLatest(`${columnKey}.${FETCH_LIST}`, fetchList);
}

export default watcher;
