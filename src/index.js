import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    taskList: [],
    inputValue: "",
    view: 0
  }

  addTodo = () => {
    if (this.state.inputValue.trim()) {
      let updatedTaskList = this.state.taskList.slice();
      updatedTaskList.push({
        task: this.state.inputValue,
        isComplete: false
      });
      this.setState({taskList: updatedTaskList, inputValue: ""});
    }
  }

  checked = (index) => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList[index].isComplete = !updatedTaskList[index].isComplete;
    this.setState({taskList: updatedTaskList});
  }

  updateView = (viewNum) => {
    this.setState({view: viewNum});
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

        <ul>
          {/* I tried putting this section into it's own function. Why didn't it work? */
            this.state.taskList.map((todo, index) => {
              var returnValue = <List
                                  key={index}
                                  task={todo.task}
                                  isComplete={todo.isComplete}
                                  onClick={() => {this.checked(index)}}
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

/* This function is declared outside of the class because it doesn't change anything
 * that has to do with the class App. Place filtering here. */
const List = (props) => (
  <li
    onClick={props.onClick}
    style={{textDecoration: props.isComplete ? "line-through" : "initial"}}
  > {props.task} </li>
)

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
