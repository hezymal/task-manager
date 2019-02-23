import React from "react";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";
import { Header } from "./Header";

export default function DeskTask(props) {
    const { task, onModifyTask, onRemoveTask } = props;

    return (
        <ListGroup.Item>
            <Header title={task.title}>
                <ButtonGroup>
                    <Button variant="outline-success" onClick={() => onModifyTask(task._id)}>
                        <i className="fas fa-pen" />
                    </Button>
                    <Button variant="outline-danger" onClick={() => onRemoveTask(task._id)}>
                        <i className="fas fa-trash" />
                    </Button>
                </ButtonGroup>
            </Header>
        </ListGroup.Item>
    );
}
