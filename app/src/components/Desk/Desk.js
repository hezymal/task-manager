import React, { Component } from "react";
import "./Desk.css";
import DeskColumn from "./DeskColumn";
import DeskColumnEditor from "./DeskColumnEditor";
import DeskTask from "./DeskTask";
import DeskTaskEditor from "./DeskTaskEditor";
import DeskAddColumnButton from "./DeskAddColumnButton";

function getProgressValue(tasks, columnTasks) {
    const columnTasksCount = columnTasks.length || 0;
    const tasksCount = tasks.length || 0;

    const progress = {
        count: columnTasksCount,
        totals: tasksCount,
        value: Math.floor(columnTasksCount / tasksCount * 100),
    };

    return progress;
}

class Desk extends Component {
    constructor(props) {
        super(props);

        this.showColumnEditor = this.toggleColumnEditor.bind(this, true);
        this.hideColumnEditor = this.toggleColumnEditor.bind(this, false);

        this.showTaskEditor = this.toggleTaskEditor.bind(this, true);
        this.hideTaskEditor = this.toggleTaskEditor.bind(this, false);

        this.state = {
            columnEditor: {
                show: false,
                columnId: 0,
            },
            taskEditor: {
                show: false,
                taskId: 0,
                columnId: 0,
            },
        };
    }

    componentDidMount() {
        this.props.fetchColumnList();
        this.props.fetchTaskList();
    }

    toggleColumnEditor(show, columnId = 0) {
        this.setState({
            columnEditor: { show, columnId }
        });
    }

    toggleTaskEditor(show, taskId = 0, columnId = 0) {
        this.setState({
            taskEditor: { show, taskId, columnId }
        });
    }

    render() {
        const { 
            columnEditor, 
            taskEditor, 
        } = this.state;

        const { 
            columns, 
            addColumn, 
            modifyColumn, 
            removeColumn,

            tasks,
            addTask,
            modifyTask,
            removeTask,
        } = this.props;

        return (
            <div className="Desk">
                {columns.byIndex.map(column => {
                    const columnTasks = tasks.byIndex.filter(task => task.columnId === column._id);
                    const progress = getProgressValue(tasks.byIndex, columnTasks);

                    return (
                        <DeskColumn 
                            key={column._id}
                            column={column}
                            progress={progress}
                            onModifyColumn={this.showColumnEditor} 
                            onRemoveColumn={removeColumn}
                            onAddTask={() => this.showTaskEditor(0, column._id)}
                        >
                            {columnTasks.map(task => 
                                <DeskTask
                                    key={task._id}
                                    task={task}
                                    onModifyTask={this.showTaskEditor}
                                    onRemoveTask={removeTask}
                                />    
                            )}
                        </DeskColumn>
                    );
                })}

                <DeskAddColumnButton 
                    onAddColumn={this.showColumnEditor} 
                />
                
                {columnEditor.show && (
                    <DeskColumnEditor
                        column={columnEditor.columnId ? columns.byIndex[columns.indexes[columnEditor.columnId]] : null}
                        onSubmit={columnEditor.columnId ? modifyColumn : addColumn}
                        onCancel={this.hideColumnEditor}
                    />
                )}

                {taskEditor.show && (
                    <DeskTaskEditor 
                        task={taskEditor.taskId ? tasks.byIndex[tasks.indexes[taskEditor.taskId]] : null}
                        columnId={taskEditor.columnId}
                        onSubmit={taskEditor.taskId ? modifyTask : addTask}
                        onCancel={this.hideTaskEditor}
                    />
                )}
            </div>
        );
    }
}

export default Desk;
