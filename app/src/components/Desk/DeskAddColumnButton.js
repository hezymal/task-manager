import React from "react";
import { Button, Card } from "react-bootstrap";
export function DeskAddColumnButton(props) {
    const { onAddColumn } = props;
    return (<div className="DeskColumn">
        <Card border="none">
            <Card.Header>
                <Button variant="outline-success" block onClick={onAddColumn}>
                    Add column
                    </Button>
            </Card.Header>
        </Card>
    </div>);
}
