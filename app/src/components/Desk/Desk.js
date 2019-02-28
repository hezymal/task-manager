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

        this.onTaskDragStart = this.onTaskDragStart.bind(this);
        this.onTaskDragEnd = this.onTaskDragEnd.bind(this);
        this.onColumnDragEnter = this.onColumnDragEnter.bind(this);

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
            draggingTaskId: 0,
            draggedColumnId: 0,
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

    onTaskDragStart(taskId) {
        this.setState({ draggingTaskId: taskId });
    }

    onTaskDragEnd() {
        const { draggingTaskId, draggedColumnId } = this.state;

        this.props.changeTaskField(draggingTaskId, "columnId", draggedColumnId);

        const tasks = this.props.tasks;
        const taskIndex = tasks.indexes[draggingTaskId];
        const task = { ...tasks.byIndex[taskIndex], columnId: draggedColumnId };
        this.props.modifyTask(task);

        this.setState({ draggingTaskId: 0, draggedColumnId: 0 });
    }

    onColumnDragEnter(columnId) {
        this.setState({ draggedColumnId: columnId });
    }

    render() {
        const { 
            columnEditor, 
            taskEditor, 
            draggedColumnId,
            draggingTaskId,
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
                <div className="Desk__Content">
                    {columns.byIndex.map(column => {
                        const columnTasks = tasks.byIndex.filter(task => task.columnId === column._id);
                        const progress = getProgressValue(tasks.byIndex, columnTasks);
                        const draggingTask = draggingTaskId ? tasks.byIndex[tasks.indexes[draggingTaskId]] : null;

                        return (
                            <DeskColumn 
                                key={column._id}
                                column={column}
                                progress={progress}
                                onModifyColumn={this.showColumnEditor} 
                                onRemoveColumn={removeColumn}
                                onAddTask={() => this.showTaskEditor(0, column._id)}
                                onDragEnter={this.onColumnDragEnter}
                            >
                                {columnTasks.map(task => 
                                    <DeskTask
                                        key={task._id}
                                        task={task}
                                        dragging={task._id === draggingTaskId}
                                        onModifyTask={this.showTaskEditor}
                                        onRemoveTask={removeTask}
                                        onDragStart={this.onTaskDragStart}
                                        onDragEnd={this.onTaskDragEnd}
                                    />
                                )}

                                {draggingTask && 
                                draggedColumnId === column._id && 
                                draggedColumnId !== draggingTask.columnId && (
                                    <DeskTask
                                        key="dragging"
                                        task={draggingTask}
                                        dragging
                                    />
                                )}
                            </DeskColumn>
                        );
                    })}

                    <DeskAddColumnButton 
                        onAddColumn={this.showColumnEditor} 
                    />
                </div>
                {(columnEditor.show || taskEditor.show) && (
                    <div className="Desk__Sidebar">    
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
                )}
            </div>
        );
    }
}

export default Desk;
