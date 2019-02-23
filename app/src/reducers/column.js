import { ADDED, FETCHED_LIST, REMOVED, MODIFIED } from "constants/actionTypes";
import { columnKey } from "constants/dataKeys";

function newState() {
    return {
        byIndex: [],
        indexes: {},
    };
}

function buildIndexes(columns) {
    return columns.reduce((result, col, index) => {
        result[col._id] = index;

        return result;
    }, {});
}

function replaceColumn(columns, column) {
    return columns.reduce((result, col) => {
        if (col._id === column._id) {
            result.push(column);
        } else {
            result.push(col);
        }

        return result;
    }, []);
}

function exceptById(columns, columnId) {
    return columns.reduce((result, col) => {
        if (col._id !== columnId) {
            result.push(col);
        }

        return result;
    }, []);
}

function reducer(state, action) {
    switch (action.type) {
        case `${columnKey}.${ADDED}`: {
            const columns = [...state.byIndex, action.payload];

            return {
                byIndex: columns,
                indexes: buildIndexes(columns),
            };
        }

        case `${columnKey}.${MODIFIED}`: {
            const column = action.payload;
            const columns = replaceColumn(state.byIndex, column);
            
            return {
                byIndex: columns,
                indexes: state.indexes,
            };
        }

        case `${columnKey}.${REMOVED}`: {
            const columnId = action.payload;
            const columns = exceptById(state.byIndex, columnId);

            return {
                byIndex: columns,
                indexes: buildIndexes(columns),
            };
        }

        case `${columnKey}.${FETCHED_LIST}`: {
            const columns = action.payload;
            
            return {
                byIndex: columns,
                indexes: buildIndexes(columns),
            };
        }

        default:
            return state || newState();
    }
}

export default reducer;
