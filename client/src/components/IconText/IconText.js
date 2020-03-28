import React, { Component } from 'react';

class IconText extends Component {
  render() {
    return (
      <div className={`icon-text ${this.props.mixClass}`}>
        <span className={`icon-text__icon icon icon_${this.props.icon}`}></span>
        <span className="icon-text__primary">{this.props.textPrimary}</span>
        {this.props.textSecondary && <span className="icon-text__secondary">{this.props.textSecondary}</span>}
      </div>
    );
  }
}

export default IconText;
