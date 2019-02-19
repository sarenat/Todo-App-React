import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ListItem = (props) => (
  <li
    onClick={props.onClick}
    style={{textDecoration: props.isComplete ? "line-through" : "initial"}}
  > {props.task} </li>
)

// class List extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   /* App will pass taskList and view. */
//
// }

class App extends React.Component {
  state = {
    taskList: [[]],
    inputValue: "",
    view: 0,
    listNum: 0
  }

  addTodo = () => {
    if (this.state.inputValue.trim()) {
      let updatedTaskList = this.state.taskList.slice();
      updatedTaskList[this.state.listNum].push({
        task: this.state.inputValue,
        isComplete: false,
        itemListNum: this.state.listNum
      });
      this.setState({taskList: updatedTaskList, inputValue: ""});
    }
  }

  checked = (itemListNum, index) => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList[itemListNum][index].isComplete = !updatedTaskList[itemListNum][index].isComplete;
    this.setState({taskList: updatedTaskList});
  }

  updateView = (viewNum) => { this.setState({view: viewNum}); }

  newList = () => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList.push([]);

    let newListNum = this.state.listNum+1;
    this.setState({listNum: newListNum, taskList: updatedTaskList});
  }

  render() {
    console.log(this.state);

    return (
      <div className="todoApp">
        <button onClick={() => this.updateView(0)}>All Tasks</button>
        <button onClick={() => this.updateView(1)}>In-Progress Tasks</button>
        <button onClick={() => this.updateView(2)}>Completed Tasks</button>

        <br></br><br></br>

        <input
          value={this.state.inputValue}
          onChange={change => {
            this.setState({inputValue: change.target.value})
          }}
        />
        <button onClick={this.addTodo}>Add Task</button>
        <button onClick={this.newList}>New List</button>

        <ul>
          {/* I tried putting this section into it's own function. Why didn't it work? */}
          {this.state.taskList[0].map((todo, index) => {
              var returnValue = <ListItem
                                  key={index}
                                  task={todo.task}
                                  isComplete={todo.isComplete}
                                  itemListNum={todo.itemListNum}
                                  onClick={() => {this.checked(todo.itemListNum, index)}}
                                />
              if(this.state.view === 0) {
                return returnValue
              } else if (this.state.view === 1 && !todo.isComplete) {
                return returnValue
              } else if (this.state.view === 2 && todo.isComplete) {
                return returnValue
              }
            })
          }
        </ul>
      </div>
    );
  }
}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
