import React from "react";
import "./item.css";

export interface ItemOptions {
    text: string,
    onClick: any
}

interface ItemState {
    // nothing
}

export class Item extends React.Component<ItemOptions, ItemState> {
    render() {
        return (
            <div className="menu-item" onClick={this.props.onClick}>
                <p>{this.props.text}</p>
            </div>
        );
    }
}