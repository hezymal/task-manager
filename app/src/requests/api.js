import axios from "axios";

export function addColumn(newColumn) {
    return axios.post("/column/add", newColumn);
}

export function modifyColumn(column) {
    return axios.put("/column/modify", column);
}

export function removeColumn(columnId) {
    return axios.delete(`/column/remove/${columnId}`);
}

export function fetchColumnList() {
    return axios.get("/column/list");
}
