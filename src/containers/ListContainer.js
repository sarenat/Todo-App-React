import React from 'react';
import AddTask from '../functionality/AddTask.js';
import List from './List.js';

class ListContainer extends React.Component {
  handleToggleItem = (taskNum, listNum, boardNum) => {
    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }
  handleAddTask = (task) => {
    this.props.handleAddTask(task);
  }

  render() {
    return (
      <div className="listContainer">
        <AddTask
          listNum={this.props.listNum}
          boardNum={this.props.boardNum}
          handleAddTask={this.handleAddTask} />
        <List
          listNum={this.props.listNum}
          boardNum={this.props.boardNum}
          taskList={this.props.taskList}
          handleToggleItem={this.handleToggleItem}
          view={this.props.view} />
      </div>
    );
  };
}

export default ListContainer;
