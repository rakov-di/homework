import './Log.styl';

import React, { Component } from 'react';

class Log extends Component {
  render() {
    return (
      <pre className='log'>{this.props.log}</pre>
    );
  }
}

export default Log;
