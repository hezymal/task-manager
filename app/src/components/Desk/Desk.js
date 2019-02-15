import React, { Component } from "react";
import { DropdownButton, Dropdown, Modal, ButtonGroup, ListGroup, Card, Form, InputGroup, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import "./Desk.css";

function Header({ title, children }) {
    return (
        <div className="Header">
            <div className="Header__Title">{title}</div>
            <div className="Header__Controls">{children}</div>
        </div>
    );
}

function DeskColumn({ title, addTask, openOptions, children }) {
    return (
        <div className="DeskColumn">
            <Card border="dark">
                <Card.Header>
                    <Header title={title}>
                        <Dropdown as={ButtonGroup}>
                            <Button 
                                variant="outline-success"
                                onClick={addTask}
                            >
                                <i className="fas fa-plus-circle" />
                            </Button>
                            <Dropdown.Toggle 
                                variant="outline-secondary"
                            >
                                <i className="fas fa-cog" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Header>
                </Card.Header>
                <ListGroup>
                    {children}
                </ListGroup>
            </Card>
        </div>
    );
}

function DeskAddColumn() {
    return (
        <div className="DeskColumn">
            <InputGroup>
                <FormControl placeholder="Column name" />
                <InputGroup.Append>
                    <Button variant="outline-success">
                        <i className="fas fa-plus-circle" />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}

function DeskTask({ title, edit }) {
    return (
        <ListGroup.Item>
            <Header title={title}>
                <ButtonGroup>
                    <Button 
                        variant="outline-success"
                        onClick={edit}
                    >
                        <i className="fas fa-pen" />
                    </Button>
                </ButtonGroup>
            </Header>
        </ListGroup.Item>
    );
}

function DeskTaskEditor({ hide }) {
    return (
        <Modal show centered onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Task #1</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

class Desk extends Component {
    constructor(props) {
        super(props);

        this.editTask = this.editTask.bind(this);

        this.state = {
            tasks: [
                { id: 1, title: "Task #1" },
                { id: 2, title: "Task #2" },
                { id: 3, title: "Task #3" },
                { id: 4, title: "Task #4" },
                { id: 5, title: "Task #5" },
            ],
            showTaskEditor: false,
        };
    }

    editTask(show) {
        this.setState({ showTaskEditor: show });
    }

    render() {
        const { showTaskEditor, tasks } = this.state;

        return (
            <div className="Desk">
                <DeskColumn
                    title="Column #1"
                    addTask={() => this.editTask(true)}
                    openOptions={() => {}}
                >
                    {tasks.map(task => 
                        <DeskTask 
                            key={task.id} 
                            title={task.title}
                            edit={() => this.editTask(true)}
                        />
                    )}
                </DeskColumn>

                <DeskAddColumn />

                {showTaskEditor && (
                    <DeskTaskEditor 
                        hide={() => this.editTask(false)} 
                    />
                )}
            </div>
        );
    }
}

export default Desk;
