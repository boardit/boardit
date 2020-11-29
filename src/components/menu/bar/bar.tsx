import React from "react";
import "./bar.css";
import { Callbacks } from "../../../App";
import { ItemOptions, Item } from "../item/item";

interface BarProps {
    callbacks: Callbacks
}

interface BarState {
    // nothing
}


export default class Bar extends React.Component<BarProps, BarState> {
    createItem(text: string, onClick: any) {
        return {
            text,
            onClick
        };
    }

    render() {
        const items: ItemOptions[] = [
            this.createItem("Save", this.props.callbacks.save),
            this.createItem("Format", this.props.callbacks.format)
        ];

        return (
            <div className="menubar">
                {items.map(item => <Item text={item.text} onClick={item.onClick} />)}
            </div>
        );
    }
}