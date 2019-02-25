import React from 'react';

class NewList extends React.Component {
  handleNewList = () => {
    let boardNum = this.props.boardNum;
    this.props.handleNewList(boardNum);
  }

  render() {
    return (
      <button onClick={this.handleNewList}> New List </button>
    );
  }
}

export default NewList;
