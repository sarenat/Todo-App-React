import React from 'react';
import ListItem from './ListItem.js'

class List extends React.Component {
  handleToggleItem = (taskNum, listNum, boardNum) => {
    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }

  render() {
    let tasks = [];
    let propsTaskList = this.props.taskList;
    const keys = Object.keys(propsTaskList);
    /* Iterate through this.props.taskList */
    keys.map(key => {
      let view = this.props.view;
      let listItem = <ListItem
                        key={key}
                        taskNum={key}
                        listNum={this.props.listNum}
                        boardNum={this.props.boardNum}
                        task={propsTaskList[key].task}
                        isComplete={propsTaskList[key].isComplete}
                        handleToggleItem={this.handleToggleItem} />
      if (view === 0) {
        tasks.push(listItem);
      } else if (view === 1 && !propsTaskList[key].isComplete) {
        tasks.push(listItem);
      } else if (view === 2 && propsTaskList[key].isComplete) {
        tasks.push(listItem);
      }
      return 0;
    });

    return (
      <div className="list">
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
}

export default List;
