import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.task}
      </li>
    );
  }
}

class List extends React.Component {
  render() {
    const taskList = this.props.taskList.map(todo =>
      <ListItem task={todo} />
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
  render() {
    return (
      <div className="AddTask">
        <input placeholder="Add task here..." />
        <button> Add Task </button>
      </div>
    );
  }
}

class ListContainer extends React.Component {
  render() {
    return (
      <div className="ListContainer">
        <AddTask />
        <List taskList={this.props.taskList}/>
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
  render() {
    return (
      <button> New List </button>
    );
  }
}

class App extends React.Component {
  render() {
    const taskList=[
      ["sleep", "homework", "todo list"],
      ["wake up", "work", "nothing"]
    ];
    const lists = taskList.map(list =>
      <ListContainer taskList={list} />
    );

    return (
      <div className="App">
        <FilterButtons />
        <NewList />
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
