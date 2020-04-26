import './Footer.styl';

import React, { Component } from 'react';
import Menu from '../Menu/Menu.tsx';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnFooter = cn('footer');

class Footer extends Component {
  render() {
    return (
      <footer className={cnFooter()}>
        <div className={cnFooter('container')}>
          <Menu mixClass={cnFooter('menu')} links={['Support','Learning']}/>
          <div className={cnFooter('copyright')}>© 2020 Dmitry Rakov</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
