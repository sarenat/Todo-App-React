import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItem extends React.Component {
  handleToggleItem = (listNum, taskNum) => {
    this.props.toggleItem(listNum, taskNum);
  }

  render() {
    return (
      <li
        style={{textDecoration: this.props.isComplete ?
          'line-through' : 'initial'}}
        onClick={() => this.handleToggleItem(
          this.props.listNum, this.props.taskNum)} >
        {this.props.task}
      </li>
    );
  }
}

class List extends React.Component {
  handleToggleItem = (listNum, taskNum) => {
    this.props.toggleItem(listNum, taskNum);
  }

  render() {
    let view = this.props.view;
    let todoList = this.props.taskList.slice();
    let updatedTaskList = [];

    /* Filter through todoList with respect to view */
    todoList.forEach((task) => {
      if (view === 1 && !task.isComplete) {
        updatedTaskList.push(task);
      } else if (view === 2 && task.isComplete) {
        updatedTaskList.push(task);
      } else if (view === 0) {
        updatedTaskList.push(task);
      }
    });

    const taskList = updatedTaskList.map((todo, index) =>
      <ListItem
        task={todo.task}
        key={index}
        taskNum={index}
        listNum={todo.listNum}
        isComplete={todo.isComplete}
        toggleItem={this.handleToggleItem}
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
    if (this.state.inputValue.trim().length) {
      var task = {
        task: input,
        listNum: listNum,
        isComplete: false
      };
      this.props.handleAddTask(task);
    }
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
          }} />
        <button onClick={() => {
          this.addTask(this.props.listNum,
            this.state.inputValue)}} > Add Task </button>
      </div>
    );
  }
}

class ListContainer extends React.Component {
  handleAddTask = task => {
    this.props.addTask(task);
  }
  handleToggleItem = (listNum, taskNum) => {
    this.props.toggleItem(listNum, taskNum);
  }

  render() {
    return (
      <div className="ListContainer">
        <AddTask
          listNum={this.props.listNum}
          handleAddTask={this.handleAddTask} />
        <List
          view={this.props.view}
          taskList={this.props.taskList}
          toggleItem={this.handleToggleItem} />
      </div>
    );
  }
}

class FilterButtons extends React.Component {
  handleChangeView = (view) => {
    this.props.changeState(view);
  }

  render() {
    return (
      <div className="FilterButtons">
        <button
          onClick={() => this.handleChangeView(0)}> All </button>
        <button
          onClick={() => this.handleChangeView(1)}> In-Progress Tasks </button>
        <button
          onClick={() => this.handleChangeView(2)}> Completed </button>
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

  toggleItem = (listNum, taskNum) => {
    let updatedTaskList = this.state.taskList.slice();
    let updatedTask = updatedTaskList[listNum][taskNum];
    updatedTask.isComplete = !updatedTask.isComplete;
    this.setState({
      taskList: updatedTaskList});
  }

  changeState = (view) => {
    this.setState({
      view: view
    })
  }

  render() {
     console.log("state: ", this.state);

    const lists = this.state.taskList.map((list, index) =>
      <ListContainer
        key={index}
        taskList={list}
        view={this.state.view}
        listNum={index}
        addTask={this.addTask}
        toggleItem={this.toggleItem} />
    );

    return (
      <div className="App">
        <FilterButtons
          changeState={this.changeState} />
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
