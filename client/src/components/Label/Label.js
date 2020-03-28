import React, { Component } from 'react';

class Label extends Component {
  render() {
    return (
      <label className={`label label_${this.props.type} label_type_${this.props.display}`} htmlFor={this.props.htmlFor}>{this.props.text}
        {this.props.isRequired && <span className="label__required">*</span>}
      </label>
    );
  }
}

export default Label;
