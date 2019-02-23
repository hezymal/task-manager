import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function newColumn() {
    return {
        title: "",
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

    changeColumn(e) {
        const newColumn = {
            ...this.state.column,
            title: e.target.value,
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
            <Modal 
                show 
                centered 
                onHide={() => onCancel()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {column._id 
                            ? `Modify ${column.title} column` 
                            : "Creating column"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitColumn}>
                        <Form.Group>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={column.title}
                                onChange={this.changeColumn} 
                                placeholder="Enter the column title"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={this.submitColumn}
                    >
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
