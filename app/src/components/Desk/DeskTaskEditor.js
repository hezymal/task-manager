import React, { Component } from "react";
import { Button, ButtonGroup, Modal, Form, Col } from "react-bootstrap";

function newTask(columnId) {
    return {
        columnId,
        title: "",
        description: "",
        start: null,
        end: null,
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

    changeTask(key, value) {
        this.setState({
            task: {
                ...this.state.task,
                [key]: value,
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
                                onChange={e => this.changeTask("title", e.target.value)}
                                placeholder="Enter the task title"
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} xs="6">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control 
                                    type="datetime-local"
                                    value={task.start}
                                    onChange={e => this.changeTask("start", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs="6">
                                <Form.Label>End date</Form.Label>
                                <Form.Control 
                                    type="datetime-local"
                                    value={task.end}
                                    onChange={e => this.changeTask("end", e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3"
                                value={task.description}
                                onChange={e => this.changeTask("description", e.target.value)}
                                placeholder="Enter the task description"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button 
                            type="submit"
                            variant="primary" 
                            onClick={this.submitTask}
                        >
                            Submit
                        </Button>
                        <Button 
                            variant="light" 
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        );
    }
}
