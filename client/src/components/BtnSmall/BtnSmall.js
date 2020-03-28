import React, { Component } from 'react';

class BtnSmall extends Component {
  render() {
    const { type, icon, mixClass, text, onClick} = this.props;
    return (
      <button className={`btn-small btn-small_type_${type} icon icon_${icon} ${mixClass || ''}`} onClick={onClick}>{text}</button>
    );
  }
}

export default BtnSmall;
