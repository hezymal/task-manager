import React from "react";
export function Header({ title, children }) {
    return (<div className="Header">
        <div className="Header__Title">{title}</div>
        <div className="Header__Controls">{children}</div>
    </div>);
}
