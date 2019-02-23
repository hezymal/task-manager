import React, { Component } from "react";
import "./Desk.css";
import DeskColumn from "./DeskColumn";
import DeskColumnEditor from "./DeskColumnEditor";
import { DeskTask } from "./DeskTask";
import { DeskTaskEditor } from "./DeskTaskEditor";
import { DeskAddColumnButton } from "./DeskAddColumnButton";

function newEditorState() {
    return {
        show: false,
        id: 0,
    };
}

class Desk extends Component {
    constructor(props) {
        super(props);

        this.toggleColumnEditor = this.toggleEditor.bind(this, "columnEditor");

        this.state = {
            columnEditor: newEditorState(),
            taskEditor: newEditorState(),
        };
    }

    componentDidMount() {
        this.props.fetchColumnList();
    }

    toggleEditor(editorKey, show, id = 0) {
        this.setState({
            [editorKey]: { show, id }
        });
    }

    render() {
        const { columnEditor } = this.state;
        const { columns, addColumn, modifyColumn, removeColumn } = this.props;

        return (
            <div className="Desk">
                {columns.byIndex.map(column =>
                    <DeskColumn 
                        key={column._id}
                        column={column}
                        onModifyColumn={(columnId) => this.toggleColumnEditor(true, columnId)} 
                        onRemoveColumn={removeColumn}
                        onAddTask={() => {}}
                    />
                )}

                <DeskAddColumnButton 
                    onAddColumn={() => this.toggleColumnEditor(true)} 
                />
                
                {columnEditor.show && (
                    <DeskColumnEditor
                        column={columnEditor.id ? columns.byIndex[columns.indexes[columnEditor.id]] : null}
                        onSubmit={columnEditor.id ? modifyColumn : addColumn}
                        onCancel={() => this.toggleColumnEditor(false)}
                    />
                )}

                {/* {taskEditorShowed && (
                    <DeskTaskEditor 
                        hide={() => this.setState({ taskEditorShowed: true })}
                    />
                )} */}
            </div>
        );
    }
}

export default Desk;
