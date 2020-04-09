import './Header.styl';

import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { children, valign, type, text } = this.props;

    return (
      <header className="header">
        <div className={`header__container header__container_valign_${valign}`}>
          <div className={`header__${type}`}>{text}</div>
          <div className="header__btn-group">
            {children}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
