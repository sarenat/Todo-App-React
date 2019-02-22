import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItem extends React.Component {
  handleToggleIsComplete = (listNum, taskNum) => {
    this.props.toggleIsComplete(listNum, taskNum);
  }

  render() {
    return (
      <li
        style={{textDecoration: this.props.isComplete ? 'strike-through' : 'initial'}}
        onClick={() => this.handleToggleIsComplete(
          this.props.listNum, this.props.taskNum)}>
        {this.props.task}
      </li>
    );
  }
}

class List extends React.Component {
  handleToggleIsComplete = (listNum, taskNum) => {
    this.props.toggleIsComplete(listNum, taskNum);
  }

  render() {
    const taskList = this.props.taskList.map((todo, index) =>
      <ListItem
        task={todo.task}
        key={index}
        taskNum={index}
        listNum={todo.listNum}
        isComplete={todo.isComplete}
        toggleIsComplete={this.handleToggleIsComplete}
      />
    );

    return (
      <div className="List">
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    }
  }

  addTask = (listNum, input) => {
    var task = {
      task: input,
      listNum: listNum,
      isComplete: false
    };
    this.props.handleAddTask(task);
    this.setState({
      inputValue: ""
    })
  }

  render() {
    return (
      <div className="AddTask">
        <input
          placeholder="Add task here..."
          value={this.state.inputValue}
          onChange={e => {
            this.setState({inputValue: e.target.value})
          }}/>
        <button onClick={() => {
          this.addTask(this.props.listNum,
            this.state.inputValue)}}> Add Task </button>
      </div>
    );
  }
}

class ListContainer extends React.Component {
  handleAddTask = task => {
    this.props.addTask(task);
  }
  handleToggleIsComplete = (listNum, taskNum) => {
    this.props.toggleIsComplete(listNum, taskNum);
  }

  render() {
    return (
      <div className="ListContainer">
        <AddTask
          listNum={this.props.listNum}
          handleAddTask={this.handleAddTask} />
        <List
          taskList={this.props.taskList}
          toggleIsComplete={this.handleToggleIsComplete} />
      </div>
    );
  }
}

class FilterButtons extends React.Component {
  render() {
    return (
      <div className="FilterButtons">
        <button> All </button>
        <button> In-Progress Tasks </button>
        <button> Completed </button>
      </div>
    );
  }
}

class NewList extends React.Component {
  handleNewList = () => {
    this.props.addNewList();
  }

  render() {
    return (
      <button onClick={() => this.handleNewList()}> New List </button>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      view: 0
    };
  }

  addTask = (task) => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList[task.listNum].push(task);
    this.setState({
      taskList: updatedTaskList,
    });
  }

  addNewList = () => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList.push([]);
    this.setState({
      taskList: updatedTaskList
    });
  }

  toggleIsComplete = (listNum, taskNum) => {
    let updatedTaskList = this.state.taskList.slice();
    let updatedTask = updatedTaskList[listNum][taskNum];
    updatedTask.isCompleted = !updatedTask.isCompleted;
    this.setState({
      taskList: updatedTaskList});
  }

  render() {
    console.log(this.state.taskList);

    const lists = this.state.taskList.map((list, index) =>
      <ListContainer
        key={index}
        taskList={list}
        listNum={index}
        addTask={this.addTask}
        toggleIsComplete={this.toggleIsComplete} />
    );

    return (
      <div className="App">
        <FilterButtons view={this.state.view} />
        <NewList addNewList={this.addNewList} />
        <br /> {/* why doesn't this work?? */}
        {lists}
      </div>
    );
  }
}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
