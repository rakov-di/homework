import './Main.styl';

import React, { Component } from 'react';

import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnMain = cn('main');

type MainProps = {
  children: React.ReactNode;
  position?: 'center'
}

class Main extends Component<MainProps> {
  render() {
    const { children, position } = this.props;

    return (
      <div className={cnMain(position && {[position]: true})}>
        <div className={cnMain('container')}>
          {children}
        </div>
      </div>
    );
  }
}

export default Main;
