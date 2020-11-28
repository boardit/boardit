import React from "react";
import AceEditor from "react-ace";
import beautify from "../../lib/beautify/index";
import save from "../../lib/saver/saver";

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


interface EditorState {
    value: string,
        theme: string,
}

export default class Editor extends React.Component < any, EditorState > {
    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.initial,
            theme: "monokai",
        }
        this.setTheme = this.setTheme.bind(this);
        this.onChange = this.onChange.bind(this);
        this.beautify = this.beautify.bind(this);
        this.save = this.save.bind(this);
    }

    setTheme(theme: string) {
        this.setState({
            theme: theme
        });
    }

    beautify() {
        let text = this.state.value;
        let beautyText = beautify(text, null, null, null);
        this.setState({
            value: beautyText
        });
    }

    save() {
        save("boardit.html", this.state.value);
    }

    onChange(newValue: string) {
        this.setState({
            value: newValue
        });
        this.props.callback(newValue);
    }

    render() {
        let commands = [{
            name: "beautify",
            bindKey: {
                win: "Ctrl-Space",
                mac: "Command-Space"
            },
            exec: this.beautify
        }, {
            name: "save",
            bindKey: {
                win: "Ctrl-Shift-Space",
                mac: "Command-Shift-Space"
            },
            exec: this.save
        },
        ];
        return ( <
            AceEditor placeholder = "source code"
            mode = "html"
            theme = {
                this.state.theme
            }
            onChange = {
                this.onChange
            }
            name = "UNIQUE_ID_OF_DIV"
            editorProps = {
                {
                    $blockScrolling: true
                }
            }
            value = {
                this.state.value
            }
            enableBasicAutocompletion enableLiveAutocompletion enableSnippets wrapEnabled commands = {
                commands
            }
            />
        );
    }
}