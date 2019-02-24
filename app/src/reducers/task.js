import { ADDED, FETCHED_LIST, REMOVED, MODIFIED, CHANGE } from "constants/actionTypes";
import { taskKey } from "constants/dataKeys";

function newState() {
    return {
        byIndex: [],
        indexes: {},
    };
}

function buildIndexes(tasks) {
    return tasks.reduce((result, task, index) => {
        result[task._id] = index;

        return result;
    }, {});
}

function replaceTask(tasks, task) {
    return tasks.reduce((result, tsk) => {
        if (tsk._id === task._id) {
            result.push(task);
        } else {
            result.push(tsk);
        }

        return result;
    }, []);
}

function exceptById(tasks, taskId) {
    return tasks.reduce((result, tsk) => {
        if (tsk._id !== taskId) {
            result.push(tsk);
        }

        return result;
    }, []);
}

function changeFieldByTask(tasks, taskId, key, value) {
    return tasks.reduce((result, task) => {
        if (task._id === taskId) {
            result.push({ ...task, [key]: value });
        } else {
            result.push(task);
        }

        return result;
    }, []);
}

function reducer(state, action) {
    switch (action.type) {
        case `${taskKey}.${ADDED}`: {
            const tasks = [...state.byIndex, action.payload];

            return {
                byIndex: tasks,
                indexes: buildIndexes(tasks),
            };
        }

        case `${taskKey}.${MODIFIED}`: {
            const task = action.payload;
            const tasks = replaceTask(state.byIndex, task);
            
            return {
                byIndex: tasks,
                indexes: state.indexes,
            };
        }

        case `${taskKey}.${REMOVED}`: {
            const taskId = action.payload;
            const tasks = exceptById(state.byIndex, taskId);

            return {
                byIndex: tasks,
                indexes: buildIndexes(tasks),
            };
        }

        case `${taskKey}.${FETCHED_LIST}`: {
            const tasks = action.payload;
            
            return {
                byIndex: tasks,
                indexes: buildIndexes(tasks),
            };
        }

        case `${taskKey}.${CHANGE}`: {
            const { taskId, key, value } = action.payload;
            const indexes = state.indexes;
            const changedTask = state.byIndex[indexes[taskId]];

            if (changedTask[key] !== value) {
                return {
                    byIndex: changeFieldByTask(state.byIndex, taskId, key, value),
                    indexes,
                };
            } else {
                return state;
            }
        }

        default:
            return state || newState();
    }
}

export default reducer;
