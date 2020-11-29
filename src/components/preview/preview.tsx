import React from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

interface PreviewProps {
    content: string,
    versionCallback: any
}

interface PreviewState {
    reveal: any,
    content: string
}

export default class Preview extends React.Component<PreviewProps, PreviewState> {
    componentDidMount() {
        let reveal = new Reveal();
        reveal.initialize();
        this.setState({reveal: reveal, content: this.props.content});
        this.props.versionCallback(reveal.VERSION);
    }

    componentDidUpdate() {
        // TODO is there a better way to do this?
        let content = this.props.content;
        if (this.state.content !== content) {
            this.setState({content})
            this.state.reveal.toggleOverview();
            this.state.reveal.toggleOverview();
            //this.state.reveal.sync();
        }
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="/node_modules/reveal.js/dist/reveal.css" />
                <link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/black.css" />
                <div className="reveal" style={{position: "absolute", left: "50%", top: 0, width: "50%", height: "80%"}}>
                    <div className="slides" dangerouslySetInnerHTML={{__html: this.props.content}} />
                </div> 
            </div>
        );
    }
}