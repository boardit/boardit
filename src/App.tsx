import React from 'react';

//import logo from './components/icons/logo.svg';

import Editor from './components/editor/editor';
import './App.css';
import Preview from './components/preview/preview';

interface AppState {
  text: string
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {text: "<section>Section 1</section><section>Section 2</section>"};
    this.changeText = this.changeText.bind(this);
  }

  changeText(newText: any) {
    this.setState({text: newText});
  }

  render() {
    return (
      <div className="App">
        <Editor initial={this.state.text} callback={this.changeText} />
        <Preview content={this.state.text} />
      </div>
    );
  }
}

export default App;
