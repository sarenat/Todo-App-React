import React from 'react';

class BoardSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  }
  handleSelectBoard = () => {
    this.props.handleSelectBoard(this.state.inputValue);
  }

  render() {
    let boardNames = this.props.boardNames.map((name, index) =>
      <option key={index}>{name}</option>);

    return (
      <div className="boardSelect">
        <select
          className="boardNames"
          value={this.state.inputValue}
          onChange={this.handleChange} >
          <option default>Select a Board</option>
          {boardNames}
        </select>
        <button
          onClick={this.handleSelectBoard}> View </button>
      </div>
    );
  }
}

export default BoardSelect;
