import './Header.styl';

import React, { Component } from 'react';
import BtnSmall from '../BtnSmall/BtnSmall';

class Header extends Component {
  render() {
    const { children, valign, type, text } = this.props;

    return (
      <header className="header">
        <div className={`header__container header__container_valign_${valign}`}>
          <div className={`header__${type}`}>{text}</div>
          <div className="header__btn-group">
            {children}
            {/*{data.btns.map((btn, idx) =>*/}
            {/*  <BtnSmall*/}
            {/*    key={idx}*/}
            {/*    type={btn.type}*/}
            {/*    icon={btn.icon}*/}
            {/*    text={btn.text}*/}
            {/*    mixClass='header__btn'*/}
            {/*    onClick={btn.onClick}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
