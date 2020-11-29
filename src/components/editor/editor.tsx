import React from "react";
import AceEditor from "react-ace";
import { Callbacks } from "../../App";

import "./editor.css";

import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/css";

const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];


themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

interface EditorProps {
    value: string,
    callbacks: Callbacks
}

interface EditorState {
    theme: string,
}

export default class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            theme: "monokai",
        }
        this.setTheme = this.setTheme.bind(this);
    }

    setTheme(theme: string) {
        this.setState({
            theme: theme
        });
    }

    render() {
        let commands = [{
            name: "format",
            bindKey: {
                win: "Ctrl-Space",
                mac: "Command-Space"
            },
            exec: this.props.callbacks.format
        }, {
            name: "save",
            bindKey: {
                win: "Ctrl-Shift-Space",
                mac: "Command-Shift-Space"
            },
            exec: this.props.callbacks.save
        },
        ];
        return (
            <AceEditor 
                placeholder="source code" 
                mode="html" 
                theme = {this.state.theme}
                onChange={this.props.callbacks.change}
                name = "editor"
                editorProps={{$blockScrolling: true}}
                value={this.props.value}
                commands = {commands}
                width="45vw"
                height="85vh"
                enableBasicAutocompletion enableLiveAutocompletion enableSnippets wrapEnabled
            />
        );
    }
}