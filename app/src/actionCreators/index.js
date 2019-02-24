import { ADD, FETCH_LIST, MODIFY, REMOVE, CHANGE } from "constants/actionTypes";
import { columnKey, taskKey } from "constants/dataKeys";

export function addColumn(column) {
    return {
        type: `${columnKey}.${ADD}`,
        payload: column,
    };
}

export function modifyColumn(column) {
    return {
        type: `${columnKey}.${MODIFY}`,
        payload: column,
    };
}

export function removeColumn(columnId) {
    return {
        type: `${columnKey}.${REMOVE}`,
        payload: columnId,
    };
}

export function fetchColumnList() {
    return { 
        type: `${columnKey}.${FETCH_LIST}`,
    };
}

export function addTask(task) {
    return {
        type: `${taskKey}.${ADD}`,
        payload: task,
    };
}

export function modifyTask(task) {
    return {
        type: `${taskKey}.${MODIFY}`,
        payload: task,
    };
}

export function removeTask(taskId) {
    return {
        type: `${taskKey}.${REMOVE}`,
        payload: taskId,
    };
}

export function fetchTaskList() {
    return { 
        type: `${taskKey}.${FETCH_LIST}`,
    };
}

export function changeTaskField(taskId, key, value) {
    return {
        type: `${taskKey}.${CHANGE}`,
        payload: { taskId, key, value },
    };
}
