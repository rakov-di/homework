import React, { Component } from 'react';
import Icon from '../Icon/Icon';

class Input extends Component {
  render() {
    return (
      <div className={`input input_type_${this.props.display}`}>
        <input className="input__field"
               id={this.props.id}
               type="text"
               placeholder={this.props.plh}
               required={this.props.isRequired}
               maxLength={this.props.maxLength}
        />
        {this.props.display === 'block' && <Icon type='clear' mixClass='input__clear'/>}
      </div>
    );
  }
}

export default Input;
