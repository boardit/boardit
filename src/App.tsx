import React from 'react';

//import logo from './components/icons/logo.svg';
import './App.css';

import Editor from './components/editor/editor';
import Preview from './components/preview/preview';
import Bar from "./components/menu/bar/bar";

import save from "./lib/saver/saver";
import beautify from "./lib/beautify/index";
import createHTML from './lib/createHTML/createHTML';

interface AppState {
  text: string,
  version: string
}

export interface Callbacks {
  change: any,
  save: any,
  format: any
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {text: "<section>Section 1</section><section>Section 2</section>", version: "error"};
    this.changeText = this.changeText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.formatText = this.formatText.bind(this);
    this.setVersion = this.setVersion.bind(this);
  }

  changeText(newText: string) {
    this.setState({text: newText});
  }

  setVersion(version: string) {
    this.setState({version})
  }

  saveText() {
    const filename = "boardit.html";
    let text = this.state.text;
    createHTML(text, this.state.version).then((text) =>  {
      console.log(text);
      save(filename, text);
    });
  }

  formatText() {
    let text = this.state.text;
    this.setState({text: beautify(text, null, null, null)});
  }

  render() {
    let callbacks: Callbacks = {
      change: this.changeText,
      save: this.saveText,
      format: this.formatText
    }

    return (
      <div> 
        <Bar callbacks={callbacks}/>
        <div className="App">
          <Editor value={this.state.text} callbacks={callbacks} />
          <Preview content={this.state.text} versionCallback={this.setVersion}/>
        </div>
      </div>
    );
  }
}

export default App;
