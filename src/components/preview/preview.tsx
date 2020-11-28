import React from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

interface PreviewProps {
    content: string
}

export default class Preview extends React.Component<PreviewProps> {
    componentDidMount() {
        let deck = new Reveal();
        deck.initialize();

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