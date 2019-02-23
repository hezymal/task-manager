import { ADD, FETCH_LIST, MODIFY, REMOVE } from "constants/actionTypes";
import { columnKey } from "constants/dataKeys";

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
