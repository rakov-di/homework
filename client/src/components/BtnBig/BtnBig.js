import './BtnBig.styl';

import React, { Component } from 'react';


class BtnBig extends Component {
  render() {
    const { type, mixClass, text, onClick, disabled } = this.props;
    return (
      <button className={`btn-big btn-big_type_${type} ${mixClass || ''}`} onClick={onClick} disabled={disabled}>{text}</button>
    );
  }
}

export default BtnBig;
