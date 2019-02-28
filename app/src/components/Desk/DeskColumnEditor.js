import React, { Component } from "react";
import { Button, ButtonGroup, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Header } from "./Header";

function newColumn() {
    return {
        title: "",
        color: "#00ff00",
    };
}

export default class DeskColumnEditor extends Component {
    constructor(props) {
        super(props);

        this.changeColumn = this.changeColumn.bind(this);
        this.submitColumn = this.submitColumn.bind(this);

        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            column: state.column || props.column || newColumn(),
        };
    }

    changeColumn(key, value) {
        const newColumn = {
            ...this.state.column,
            [key]: value,
        };

        this.setState({ column: newColumn });
    }

    submitColumn(e) {
        e.preventDefault();

        this.props.onSubmit(this.state.column);
        this.props.onCancel();
    }
    
    render() {
        const { column } = this.state;
        const { onCancel } = this.props;

        return (
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Header 
                        title={column._id 
                            ? `Modify column: ${column.title}`
                            : "Creating column"}
                    >
                        <ButtonGroup>
                            <Button 
                                variant="light"
                                size="sm"
                                onClick={() => onCancel()}
                            >
                                <i className="fas fa-times" />
                            </Button>
                        </ButtonGroup>
                    </Header>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form onSubmit={this.submitColumn}>
                        <Form.Group>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={column.title}
                                onChange={e => this.changeColumn("title", e.target.value)} 
                                placeholder="Enter the column title"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Color
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={column.color || "#00ff00"}
                                    onChange={e => this.changeColumn("color", e.target.value)} 
                                    placeholder="Enter the column color"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text style={{ width: "40px", backgroundColor: column.color || "#00ff00" }}>
                                        {" "}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button 
                            variant="outline-primary" 
                            onClick={this.submitColumn}
                        >
                            Submit
                        </Button>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </ListGroup.Item>
            </ListGroup>
        );
    }
}
