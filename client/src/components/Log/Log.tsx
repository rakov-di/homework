import './Log.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnLog = cn('log');

type LogProps = {
  log: string
}

class Log extends Component<LogProps> {
  componentDidMount() {
    // TODO Как-то перенести это в render с сохранением ANSI-форматирования
    const log: HTMLElement | null = document.querySelector('.log');
    log && (log.innerHTML = this.props.log)
  }

  render() {
    return (
      <div className={cnLog()}>{}</div>
    );
  }
}

export default Log;
