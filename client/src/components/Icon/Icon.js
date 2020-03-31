import React, { Component } from 'react';

class Icon extends Component {
  render() {
    const { type, mixClass, onClick} = this.props;

    return (
      <div className={`icon icon_${type} ${mixClass || ''}`} onClick={onClick}></div>
    );
  }
}

export default Icon;
