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

class BoardSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      boards: ["First Board", "Second Board", "Third Board"]
    };
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  }
  handleSelectBoard = () => {
    this.props.handleSelectBoard(
      this.state.boards.indexOf(this.state.inputValue)
    );
  }

  render() {
    return (
      <div className="boardSelect">
        <select
          className="boardNames"
          value={this.state.inputValue}
          onChange={this.handleChange} >
          <option default>Select a Board</option>
          <option>First Board</option>
          <option>Second Board</option>
          <option>Third Board</option>
        </select>
        <button
          onClick={this.handleSelectBoard}> Select </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: [],
      currentBoardNum: null,
      boards: [[[
      {
       task: "firstBoard firstList: test",
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
      }],
      [{
       task: "firstBoard secondList: test2",
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
      }]],
      [[{
       task: "secondBoard firstList: test4",
       boardNum: 0,
       listNum: 1,
       taskNum: 0,
       isComplete: false
      },
      {
        task: "test5",
        boardNum: 0,
        listNum: 1,
        taskNum: 1,
        isComplete: false
      }],
      [{
       task: "secondBoard secondList: test5",
       boardNum: 0,
       listNum: 1,
       taskNum: 0,
       isComplete: false
      },
      {
        task: "test6",
        boardNum: 0,
        listNum: 1,
        taskNum: 1,
        isComplete: false
      }]],
      [[{
       task: "thirdBoard firstList: test4",
       boardNum: 0,
       listNum: 1,
       taskNum: 0,
       isComplete: false
      },
      {
        task: "test5",
        boardNum: 0,
        listNum: 1,
        taskNum: 1,
        isComplete: false
      }],
      [{
       task: "thirdBoard secondList: test5",
       boardNum: 0,
       listNum: 1,
       taskNum: 0,
       isComplete: false
      },
      {
        task: "test6",
        boardNum: 0,
        listNum: 1,
        taskNum: 1,
        isComplete: false
      }]]],
      view: 0,
    };
  }

  toggleItem = (taskNum, listNum, boardNum) => {
    let updatedBoard = this.state.boards.slice();
    console.log(updatedBoard[listNum][taskNum], updatedBoard[listNum][taskNum].isComplete);
    updatedBoard[boardNum][listNum][taskNum].isComplete =
      !updatedBoard[boardNum][listNum][taskNum].isComplete;
    this.setState({
      boards: updatedBoard
    });
  }

  viewChange = (view) => {
    this.setState({
      view: view
    });
  }

  selectBoard = (index) => {
    if (index === -1) {
      return null;
    } else {
        let boards = this.state.boards.slice();
        let updatedCurrentBoard = boards[index];
        this.setState({
          currentBoardNum: index,
          currentBoard: updatedCurrentBoard
        });
      }
  }

  render() {
    console.log(this.state);

    return (
      <div className="app">
        <NewBoard />
        <BoardSelect
          handleSelectBoard={this.selectBoard} /> <br />
        <Board
          boardNum={this.state.currentBoardNum}
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
