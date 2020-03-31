import './Header.styl';

import React, { Component } from 'react';
import BtnSmall from '../BtnSmall/BtnSmall';

class Header extends Component {
  render() {
    const { data } = this.props;

    return (
      <header className="header">
        <div className={`header__container header__container_valign_${data.title.valign}`}>
          <div className={`header__${data.title.type}`}>{data.title.text}</div>
          <div className="header__btn-group">
            {data.btns.map((btn, idx) =>
              <BtnSmall
                key={idx}
                type={btn.type}
                icon={btn.icon}
                text={btn.text}
                mixClass='header__btn'
                onClick={btn.onClick}
              />
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
