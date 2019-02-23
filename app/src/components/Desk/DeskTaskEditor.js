import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function newTask(columnId) {
    return {
        columnId,
        title: "",
    };
}

export default class DeskTaskEditor extends Component {
    constructor(props) {
        super(props);

        this.submitTask = this.submitTask.bind(this);
        this.changeTask = this.changeTask.bind(this);

        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            task: state.task || props.task || newTask(props.columnId),
        };
    }

    submitTask(e) {
        e.preventDefault();

        this.props.onSubmit(this.state.task);
        this.props.onCancel();
    }

    changeTask(e) {
        const newTitle = e.target.value;

        this.setState({
            task: {
                ...this.state.task,
                title: newTitle,
            },
        });
    }

    render() {
        const { task } = this.state;
        const { onCancel } = this.props;

        return (
            <Modal show centered onHide={() => onCancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {task._id 
                            ? `Modify task: ${task.title}`
                            : "Creating task"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitTask}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                value={task.title}
                                onChange={this.changeTask}
                                placeholder="Enter the task title"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.submitTask}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => onCancel()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
