import React from "react";
import { Button, Card } from "react-bootstrap";

export default function DeskAddColumnButton(props) {
    const { onAddColumn } = props;
    
    return (
        <div className="DeskColumn">
            <Card border="light">
                <Card.Body>
                    <Button 
                        block 
                        variant="outline-success" 
                        onClick={() => onAddColumn()}
                    >
                        Add column
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
