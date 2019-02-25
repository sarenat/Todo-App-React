import React from 'react';

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

export default FilterButtons;
