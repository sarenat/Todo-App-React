import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NewBoard extends React.Component {
  render() {
    return (
      <div className="newBoard">
        <input placeholder="Name board here..." />
        <button> Create Board </button>
      </div>
    );
  }
}

class BoardSelect extends React.Component {
  render() {
    return (
      <div className="boardSelect">
        <select className="boardNames">
          <option default>Select a Board</option>
        </select>
      </div>
    );
  }
}

class AddTask extends React.Component {
  render() {
    return (
      <div className="AddTask">
        <input placeholder="Add Task Here..." />
        <button> Add Task </button>
      </div>
    );
  }
}

class NewList extends React.Component {
  render() {
    return (
      <button> New List </button>
    );
  }
}

class ListItem extends React.Component {
  handleToggleItem = () => {
    let taskNum = this.props.taskNum;
    let listNum = this.props.listNum;
    let boardNum = this.props.boardNum;

    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }

  render() {
    return (<li
      onClick={this.handleToggleItem}
      style={{textDecoration:
        this.props.isComplete ? "line-through" : "initial" }} >
      {this.props.task}</li>);
  }
}

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

class ListContainer extends React.Component {
  handleToggleItem = (taskNum, listNum, boardNum) => {
    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }

  render() {
    return (
      <div className="listContainer">
        <AddTask
          listNum={this.props.listNum}
          boardNum={this.props.boardNum}/>
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

class FilterButtons extends React.Component {
  handleViewChange = (view) => {
    this.props.handleViewChange(view);
  }

  render() {
    return (
      <div className="filterButtons">
        <button onClick={() => this.handleViewChange(0)}> All </button>
        <button onClick={() => this.handleViewChange(1)}> In-Progress Tasks </button>
        <button onClick={() => this.handleViewChange(2)}> Completed </button>
      </div>
    );
  }
}

class Board extends React.Component {
  handleToggleItem = (taskNum, listNum, boardNum) => {
    this.props.handleToggleItem(taskNum, listNum, boardNum);
  }
  handleViewChange = (view) => {
    this.props.handleViewChange(view);
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
        view={this.props.view} />
    ));

    return (
      <div className="board">
        <FilterButtons
          handleViewChange={this.handleViewChange}/>
        <NewList />
        {listContainers}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      view: 0,
      currentBoard: [[
        {
         task: "test",
         boardNum: 0,
         listNum: 0,
         taskNum: 0,
         isComplete: false
        },
        {
          task: "test1",
          boardNum: 0,
          listNum: 0,
          taskNum: 1,
          isComplete: false
        }], [
         {
          task: "test2",
          boardNum: 0,
          listNum: 1,
          taskNum: 0,
          isComplete: false
        },
        {
          task: "test3",
          boardNum: 0,
          listNum: 1,
          taskNum: 1,
          isComplete: false
        }]]
    };
  }

  toggleItem = (taskNum, listNum, boardNum) => {
    let updatedBoard = this.state.currentBoard.slice();
    console.log(updatedBoard[listNum][taskNum]);
    updatedBoard[listNum][taskNum].isComplete =
      !updatedBoard[listNum][taskNum].isComplete;
    // updatedBoard[boardNum][listNum][taskNum].isComplete =
    //   !updatedBoard[boardNum][listNum][taskNum].isComplete;
    this.setState({
      currentBoard: updatedBoard
    });
  }

  viewChange = (view) => {
    this.setState({
      view: view
    });
  }

  render() {
    return (
      <div className="app">
        <NewBoard />
        <BoardSelect /> <br />
        {/* pass boardNum={} into <Board /> */}
        <Board
          lists={this.state.currentBoard}
          handleToggleItem={this.toggleItem}
          view={this.state.view}
          handleViewChange={this.viewChange} />
      </div>
    );
  }
}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
