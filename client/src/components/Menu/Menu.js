import './Menu.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnMenu = cn('menu');

class Menu extends Component {
  render() {
    const { links, mixClass } = this.props;

    return (
      <ul className={cnMenu(null, [mixClass])}>
        {links.map((link, idx) =>
          <a key={idx} href="/" className={cnMenu('link')}>{link}</a>
        )}
      </ul>
    );
  }
}

export default Menu;
