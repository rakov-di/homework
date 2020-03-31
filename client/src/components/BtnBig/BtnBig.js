import './BtnBig.styl';

import React, { Component } from 'react';


class BtnBig extends Component {
  render() {
    const { type, action, mixClass, text, onClick, onSubmit, disabled } = this.props;
    return (
      <button
        type={type || "button"}
        className={`btn-big btn-big_action_${action} ${mixClass || ''}`}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}>{text}</button>
    );
  }
}

export default BtnBig;
