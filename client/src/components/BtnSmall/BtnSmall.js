import React, { Component } from 'react';

class BtnSmall extends Component {
  render() {
    return (
      <button className={`btn-small btn-small_type_${this.props.type} icon icon_${this.props.icon} ${this.props.mixClass || ''}`}>{this.props.text}</button>
    );
  }
}

export default BtnSmall;
