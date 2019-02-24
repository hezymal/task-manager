import { 
    addColumn, fetchColumnList, modifyColumn, removeColumn, 
    addTask, fetchTaskList, modifyTask, removeTask, changeTaskField,
} from "actionCreators";
import Desk from "components/Desk";
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        columns: state.column,
        tasks: state.task,
    };
}

const actionCreators = { 
    addColumn, fetchColumnList, modifyColumn, removeColumn,
    addTask, fetchTaskList, modifyTask, removeTask, changeTaskField,
};

export default connect(mapStateToProps, actionCreators)(Desk);
