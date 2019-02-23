import React from "react";
import { Button, ButtonGroup, OverlayTrigger, Popover, ListGroup, ButtonToolbar } from "react-bootstrap";
import { Header } from "./Header";

export default function DeskTask(props) {
    const { task, onModifyTask, onRemoveTask } = props;

    return (
        <ListGroup.Item>
            <Header title={task.title}>
                <OverlayTrigger 
                    trigger="click" 
                    placement="bottom" 
                    rootClose
                    overlay={
                        <Popover>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button 
                                        variant="outline-primary"
                                        onClick={() => onModifyTask(task._id)}
                                    >
                                        <i className="fas fa-pen" />
                                    </Button>
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => onRemoveTask(task._id)}
                                    >
                                        <i className="fas fa-trash" />
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Popover>
                    }
                >
                    <Button variant="light" size="sm">
                        <i className="fas fa-ellipsis-h" />
                    </Button>
                </OverlayTrigger>
            </Header>
        </ListGroup.Item>
    );
}
