import React, { Component } from 'react';

class Icon extends Component {
  render() {
    return (
      <div className={`icon icon_${this.props.iconType}`}></div>
    );
  }
}

export default Icon;
