import React from "react";
import { ProgressBar, Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Popover, Card, ListGroup } from "react-bootstrap";
import { Header } from "./Header";

export default function DeskColumn(props) {
    const { 
        column, 
        progress,
        children,
        onAddTask, 
        onModifyColumn,
        onRemoveColumn,
        onDragEnter,
    } = props;

    return (
        <div className="DeskColumn">
            <Card>
                <Card.Header>
                    <Header title={column.title}>
                        <ButtonGroup>
                            <Button 
                                variant="outline-success"
                                size="sm"
                                onClick={() => onAddTask()}
                            >
                                <i className="fas fa-plus-circle" />
                            </Button>
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
                                                    onClick={() => onModifyColumn(column._id)}
                                                >
                                                    <i className="fas fa-pen" />
                                                </Button>
                                                <Button 
                                                    variant="outline-danger"
                                                    onClick={() => onRemoveColumn(column._id)}
                                                >
                                                    <i className="fas fa-trash" />
                                                </Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Popover>
                                }
                            >
                                <Button variant="outline-secondary" size="sm">
                                    <i className="fas fa-cog" />
                                </Button>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </Header>
                </Card.Header>
                <Card.Body 
                    onDragEnter={() => onDragEnter(column._id)}
                >
                    {progress.value ? (
                        <ProgressBar>
                            <ProgressBar 
                                now={progress.value}
                                label={`${progress.count} of ${progress.totals}`}
                                striped
                                style={{ backgroundColor: column.color }} 
                            />
                        </ProgressBar>
                    ) : (
                        <div className="DeskColumnEmptyTasks">
                            Empty
                        </div>
                    )}
                    <ListGroup>
                        {children}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}
