import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <ul className={`menu ${this.props.mixClass}`}>
        {this.props.links.map((link, idx) =>
          <a key={idx} href="/" className="menu__link">{link}</a>
        )}
      </ul>
    );
  }
}

export default Menu;
