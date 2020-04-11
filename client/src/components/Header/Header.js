import './Header.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnHeader = cn('header');

class Header extends Component {
  render() {
    const { children, valign, type, text } = this.props;

    return (
      <header className={cnHeader()}>
        <div className={cnHeader('container', { valign })}>
          <div className={cnHeader(type)}>{text}</div>
          <div className={cnHeader('btn-group')}>
            {children}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
