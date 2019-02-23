import { ADD, ADDED, FETCHED_LIST, FETCH_LIST, MODIFY, REMOVE, REMOVED, MODIFIED } from "constants/actionTypes";
import { taskKey } from "constants/dataKeys";
import { call, put, takeLatest } from "redux-saga/effects";
import { addTask, fetchTaskList, modifyTask, removeTask } from "requests/api";

function* add(action) {
    const task = action.payload;
    const response = yield call(addTask, task);
    
    yield put({
        type: `${taskKey}.${ADDED}`,
        payload: response.data.payload,
    });
}

function* modify(action) {
    const task = action.payload;
    const response = yield call(modifyTask, task);
    
    yield put({
        type: `${taskKey}.${MODIFIED}`,
        payload: response.data.payload,
    });
}

function* remove(action) {
    const taskId = action.payload;
    const response = yield call(removeTask, taskId);
    
    yield put({
        type: `${taskKey}.${REMOVED}`,
        payload: response.data.payload,
    });
}

function* fetchList() {
    const response = yield call(fetchTaskList);
    
    yield put({
        type: `${taskKey}.${FETCHED_LIST}`,
        payload: response.data.payload,
    });
}

function* watcher() {
    yield takeLatest(`${taskKey}.${ADD}`, add);
    yield takeLatest(`${taskKey}.${MODIFY}`, modify);
    yield takeLatest(`${taskKey}.${REMOVE}`, remove);
    yield takeLatest(`${taskKey}.${FETCH_LIST}`, fetchList);
}

export default watcher;
