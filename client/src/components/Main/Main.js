import './Main.styl';

import React, { Component } from 'react';

import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnMain = cn('main');

class Main extends Component {
  render() {
    const { children, position } = this.props;

    return (
      <div className={cnMain(null, [position])}>
        <div className={cnMain('container')}>
          {children}
        </div>
      </div>
    );
  }
}

export default Main;
