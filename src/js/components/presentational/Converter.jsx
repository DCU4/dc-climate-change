import React, { Component } from 'react';

export class Converter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isSelected: false,
      isDisabled: true
    }
  }

  handleChange() {
    const isSelected = this.state.isSelected;
    const handle = isSelected ? false : true
    const number = document.getElementById('number');
    number.value = "";

    this.setState({
      isSelected: handle
    })
  }

render() {
  const isSelected = this.state.isSelected;

  const deg = <span>&#176;</span>; // degree symbol


    return (
      <div className="converter">

      </div>

    );
  }
}