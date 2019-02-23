import React from "react";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";
import { Header } from "./Header";

export function DeskTask({ title, edit }) {
    return (<ListGroup.Item>
        <Header title={title}>
            <ButtonGroup>
                <Button variant="outline-success" onClick={edit}>
                    <i className="fas fa-pen" />
                </Button>
            </ButtonGroup>
        </Header>
    </ListGroup.Item>);
}
