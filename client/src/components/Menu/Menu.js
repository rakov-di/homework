import './Menu.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnMenu = cn('menu');

class Menu extends Component {
  render() {
    const { items, mixClass } = this.props;

    return (
      <ul className={cnMenu(null, [mixClass])}>
        {items.map((item, idx) =>
          <a key={idx} href="/" className={cnMenu('link')} onClick={item.onClick}>{item.text}</a>
        )}
      </ul>
    );
  }
}

export default Menu;
