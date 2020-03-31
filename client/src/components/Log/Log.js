import './Log.styl';

import React, { Component } from 'react';

class Log extends Component {
  componentDidMount() {
    // TODO Как-то перенести это в render
    document.querySelector('.log').innerHTML = this.props.log
  }

  render() {
    return (
      <div className='log'>{}</div>
    );
  }
}

export default Log;
