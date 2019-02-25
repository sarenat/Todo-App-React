import React from 'react';
import './App.css';
import Board from './containers/Board.js';
import NewBoard from './functionality/NewBoard.js';
import BoardSelect from './functionality/BoardSelect.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardNames: [],
      currentBoard: null,
      currentBoardNum: null,
      boards: [],
      view: 0,
    };
  }

  toggleItem = (taskNum, listNum, boardNum) => {
    let updatedBoards = this.state.boards.slice();
    updatedBoards[boardNum][listNum][taskNum].isComplete =
      !updatedBoards[boardNum][listNum][taskNum].isComplete;
    this.setState({
      boards: updatedBoards
    });
  }

  viewChange = (view) => {
    this.setState({
      view: view
    });
  }

  selectBoard = (boardName) => {
    let boardNames = this.state.boardNames.slice();
    let index = boardNames.indexOf(boardName);
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

  newList = (boardNum) => {
    let updatedBoards = this.state.boards.slice();
    updatedBoards[boardNum].push([]);
    this.setState({
      boards: updatedBoards
    });
  }

  addTask = (task) => {
    let updatedBoards = this.state.boards.slice();
    updatedBoards[task.boardNum][task.listNum].push(task);
    this.setState({
      boards: updatedBoards
    });
  }

  createBoard = (boardName) => {
    let updatedBoards = this.state.boards.slice();
    updatedBoards.push([]);

    let duplicate = false;
    let boardNames = this.state.boardNames.slice();
    for (var i = 0; i < boardNames.length; i++) {
      if (boardName === boardNames[i]) {
        duplicate = true;
        break;
      }
    }

    if (duplicate === false) {
      let updatedBoardNames = this.state.boardNames.slice();
      updatedBoardNames.push(boardName);
      this.setState({
        boards: updatedBoards,
        boardNames: updatedBoardNames
      });
    } else alert("Internet Wizard says: please use another name.");
  }

  render() {
    // console.log(this.state);

    let currentBoard = [];
    const board = <Board
                    boardNum={this.state.currentBoardNum}
                    lists={this.state.currentBoard}
                    handleToggleItem={this.toggleItem}
                    view={this.state.view}
                    handleViewChange={this.viewChange}
                    handleNewList={this.newList}
                    handleAddTask={this.addTask} />;
    if (this.state.currentBoard === null) {
      currentBoard = null;
    } else { currentBoard = board; }

    return (
      <div className="app">
        <NewBoard
          handleCreateBoard={this.createBoard}/>
        <BoardSelect
          handleSelectBoard={this.selectBoard}
          boardNames={this.state.boardNames} /> <br />
          {currentBoard}
      </div>
    );
  }
}

export default App;
