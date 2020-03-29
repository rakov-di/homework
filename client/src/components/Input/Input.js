import React, { Component } from 'react';
import Icon from '../Icon/Icon';

class Input extends Component {
  render() {
    const { display, name, id, type, plh, isRequired, pattern, onChange } = this.props;
    return (
      <div className={`input input_type_${display}`}>
        <input className="input__field"
               name={name}
               id={id}
               type={type || "text"}
               placeholder={plh}
               required={isRequired}
               pattern={pattern}
               onChange={onChange}
        />
        {display === 'block' && <Icon type='clear' mixClass='input__clear'/>}
      </div>
    );
  }
}

export default Input;
