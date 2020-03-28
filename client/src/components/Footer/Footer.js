import React, { Component } from 'react';
import Menu from '../Menu/Menu';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <Menu mixClass='footer__menu' links={['Support','Learning']}/>
          <div className="footer__copyright">© 2020 Dmitry Rakov</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
