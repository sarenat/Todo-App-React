import React from 'react';

class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleCreateBoard = () => {
    if (this.state.inputValue.trim().length) {
      this.props.handleCreateBoard(this.state.inputValue);
    }
    this.setState({
      inputValue: ""
    });
  }

  render() {
    return (
      <div className="newBoard">
        <input
          placeholder="Name board here..."
          value={this.state.inputValue}
          onChange={e => this.setState({
            inputValue: e.target.value})} />
        <button
          onClick={this.handleCreateBoard}> Create Board </button>
      </div>
    );
  }
}

export default NewBoard;
