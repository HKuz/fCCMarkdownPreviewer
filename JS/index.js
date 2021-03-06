require('../CSS/input.scss');

var React = require('react');
var ReactDOM = require('react-dom');


class CodeInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.refs.codeTextInput.value
    );
  }

  render() {
    return (
      <div className="col-sm-6 col-xs-12">
        <h2 className="header">Input Your Markdown Code:</h2>
        <textarea className="form-control"
          value={this.props.codeText}
          ref="codeTextInput"
          onChange={this.handleChange}
        />
      </div>
    );
  }
};


class CodeOutput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6 col-xs-12">
        <h2 className="header">Code Preview:</h2>
        <div
          className="codeOut text-left"
          dangerouslySetInnerHTML={{__html: this.props.markedOut}}
        />
      </div>
    );
  }
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeText: "",
      markedOut: ""
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(codeText) {
    var markedHTML = marked(codeText, {sanitize: true});
    //console.log(markedHTML);
    this.setState({
      codeText: codeText,
      markedOut: markedHTML
    });
  }

  render() {
    return (
      <div className="row text-center">
        <CodeInput
          codeText={this.state.codeText}
          onUserInput={this.handleInput}
        />
        <CodeOutput
          markedOut={this.state.markedOut}
        />
      </div>
    );
  }
};


ReactDOM.render(
  <App />,
  document.getElementById("react-container")
);

/*
TEST MARKDOWN CODE:
Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
`monospace`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*
*/


