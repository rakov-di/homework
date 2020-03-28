import React, { Component } from 'react';

class BtnBig extends Component {
  render() {
    return (
      <button className={`header__btn btn-big btn-big_type_${this.props.btnType}`}>{this.props.btnText}</button>
    );
  }
}

export default BtnBig;
