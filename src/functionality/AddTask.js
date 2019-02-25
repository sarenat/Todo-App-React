import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleAddTask = () => {
    if (this.state.inputValue.trim().length) {
      let listNum = this.props.listNum;
      let boardNum = this.props.boardNum;
      let inputValue = this.state.inputValue;
      var task = {
        task: inputValue,
        listNum: listNum,
        boardNum: boardNum,
        isComplete: false
      };
      this.props.handleAddTask(task);
      this.setState({
        inputValue: ""
      });
    }
  }

  render() {
    return (
      <div className="AddTask">
        <input
          placeholder="Add Task Here..."
          value={this.state.inputValue}
          onChange={e => this.setState({
            inputValue: e.target.value})} />
        <button
          onClick={this.handleAddTask}> Add Task </button>
      </div>
    );
  }
}

export default AddTask;
