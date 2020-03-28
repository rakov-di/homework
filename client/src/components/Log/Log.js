import React, { Component } from 'react';

class Log extends Component {
  render() {
    return (
      <div className='log'>{this.props.log}</div>
    );
  }
}

export default Log;
