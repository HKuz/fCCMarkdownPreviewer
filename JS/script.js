// Babel preprocessor to use JSX

var CodeInput = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.codeTextInput.value
    );
  },
  render: function() {
    return(
      <div className="col-sm-6 col-xs-12">
        <h4 className="header">Input Your Markdown Code:</h4>
        <textarea className="form-control"
          value={this.props.codeText}
          ref="codeTextInput"
          onChange={this.handleChange}
        />
      </div>
    );
  }
});


var CodeOutput = React.createClass({
  render: function() {
    return (
      <div className="col-sm-6 col-xs-12">
        <h4 className="header">Code Preview:</h4>
        <div
          className="codeOut text-left"
          dangerouslySetInnerHTML={{__html: this.props.markedOut}}
        />
      </div>
    );
  }
});


var Previewer = React.createClass({
  getInitialState: function() {
    return {
      codeText: "",
      markedOut: ""
    };
  },
  handleInput: function(codeText) {
    var markedHTML = marked(codeText, {sanitize: true});
    //console.log(markedHTML);
    this.setState({
      codeText: codeText,
      markedOut: markedHTML
    });
  },
  render: function(){
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
});

React.render(<Previewer />, document.getElementById("react-container"));

/* TEST MARKDOWN CODE
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
