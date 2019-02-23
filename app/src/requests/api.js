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

export function addTask(newTask) {
    return axios.post("/task/add", newTask);
}

export function modifyTask(task) {
    return axios.put("/task/modify", task);
}

export function removeTask(taskId) {
    return axios.delete(`/task/remove/${taskId}`);
}

export function fetchTaskList() {
    return axios.get("/task/list");
}
