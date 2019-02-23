import React from "react";
import { Button, Modal } from "react-bootstrap";
export function DeskTaskEditor({ hide }) {
    return (<Modal show centered onHide={hide}>
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
    </Modal>);
}
