import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <ul className="footer__menu menu">
            <a href="/" className="menu__link">Support</a>
            <a href="/" className="menu__link">Learning</a>
          </ul>
          <div className="footer__copyright">© 2020 Dmitry Rakov</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
