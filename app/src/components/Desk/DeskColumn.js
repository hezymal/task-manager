import React from "react";
import { Button, ButtonGroup, Card, Dropdown, ListGroup } from "react-bootstrap";
import { Header } from "./Header";

export default function DeskColumn(props) {
    const { 
        column, 
        children,
        onAddTask, 
        onModifyColumn,
        onRemoveColumn,
    } = props;

    return (
        <div className="DeskColumn">
            <Card>
                <Card.Header>
                    <Header title={column.title}>
                        <Dropdown as={ButtonGroup}>
                            <Button variant="outline-success" onClick={() => onAddTask()}>
                                <i className="fas fa-plus-circle" />
                            </Button>
                            <Dropdown.Toggle variant="outline-secondary">
                                <i className="fas fa-cog" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => onModifyColumn(column._id)}>
                                    Modify column
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => onRemoveColumn(column._id)}>
                                    Remove column
                                </Dropdown.Item>
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
