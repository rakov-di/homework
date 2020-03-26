import React, { Component } from 'react';

class BtnSmall extends Component {
  render() {
    return (
      <button className={`header__btn btn-small btn-small_type_${this.props.btnType} icon icon_${this.props.btnIcon}`}>{this.props.btnText}</button>
    );
  }
}

export default BtnSmall;
