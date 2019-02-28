import React from "react";
import { Button, Card } from "react-bootstrap";

export default function DeskAddColumnButton(props) {
    const { onAddColumn } = props;
    
    return (
        <div className="DeskAddColumnButton">
            <Button 
                block 
                variant="outline-success" 
                onClick={() => onAddColumn()}
            >
                Add column
            </Button>
        </div>
    );
}
