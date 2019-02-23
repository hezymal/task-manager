import { addColumn, fetchColumnList, modifyColumn, removeColumn } from "actionCreators";
import Desk from "components/Desk";
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        columns: state.column,
    };
}

const actionCreators = { 
    addColumn, 
    modifyColumn,
    removeColumn,
    fetchColumnList,
};

export default connect(mapStateToProps, actionCreators)(Desk);
