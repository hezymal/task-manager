import React from "react";

function buildStyle(color) {
    return color 
        ? {
            borderTop: `4px solid ${color}`,
        } : {
            paddingTop: "8px",
        };
}

export function Header(props) {
    const { title, color, children } = props;

    return (
        <div className="Header" style={buildStyle(color)}>
            <div className="Header__Title">{title}</div>
            <div className="Header__Controls">{children}</div>
        </div>
    );
}
