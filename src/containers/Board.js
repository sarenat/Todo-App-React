import React from 'react';
import ListContainer from './ListContainer.js';
import FilterButtons from '../functionality/FilterButtons.js';
import NewList from '../functionality/NewList.js';

class Board extends React.Component {
  handleToggleItem = (taskNum, listNum, boardNum) => {
    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }
  handleViewChange = (view) => {
    this.props.handleViewChange(view);
  }
  handleNewList = (boardNum) => {
    this.props.handleNewList(boardNum);
  }
  handleAddTask = (task) => {
    this.props.handleAddTask(task);
  }

  render() {
    let listContainers = [];
    let propsLists = this.props.lists;
    const keys = Object.keys(propsLists);
    /* Iterate through this.props.lists */
    keys.map(key => listContainers.push(
      <ListContainer
        key={key}
        listNum={key}
        boardNum={this.props.boardNum}
        taskList={propsLists[key]}
        handleToggleItem={this.handleToggleItem}
        view={this.props.view}
        handleAddTask={this.handleAddTask} />
    ));

    return (
      <div className="board">
        <FilterButtons
          handleViewChange={this.handleViewChange}/>
        <NewList
          handleNewList={this.handleNewList}
          boardNum={this.props.boardNum}/>
        {listContainers}
      </div>
    );
  }
}

export default Board;
