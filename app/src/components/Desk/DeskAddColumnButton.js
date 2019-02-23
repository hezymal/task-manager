import React from "react";
import { Button, Card } from "react-bootstrap";

export default function DeskAddColumnButton(props) {
    const { onAddColumn } = props;
    
    return (
        <div className="DeskColumn">
            <Card border="none">
                <Card.Header>
                    <Button 
                        block 
                        variant="outline-secondary" 
                        onClick={() => onAddColumn()}
                    >
                        Add column
                    </Button>
                </Card.Header>
            </Card>
        </div>
    );
}
