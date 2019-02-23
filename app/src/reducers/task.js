import { ADDED, FETCHED_LIST, REMOVED, MODIFIED } from "constants/actionTypes";
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

        default:
            return state || newState();
    }
}

export default reducer;
