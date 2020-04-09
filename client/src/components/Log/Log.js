import './Log.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnLog = cn('log');

class Log extends Component {
  componentDidMount() {
    // TODO Как-то перенести это в render
    document.querySelector('.log').innerHTML = this.props.log
  }

  render() {
    return (
      <div className={cnLog()}>{}</div>
    );
  }
}

export default Log;
