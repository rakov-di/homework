import React, { Component } from 'react';

class BtnBig extends Component {
  render() {
    return (
      <button className={`btn-big btn-big_type_${this.props.type} ${this.props.mixClass || ''}`}>{this.props.text}</button>
    );
  }
}

export default BtnBig;
