import './Input.styl';

import React, { Component } from 'react';
import Icon from '../Icon/Icon';

class Input extends Component {
  state = {
    value: this.props.value
  };
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
        {display === 'block' && <Icon type='clear' mixClass='input__clear' onClick={this.clearInput.bind(this)}/>}
      </div>
    );
  }

  clearInput(e) {
    // TODO Подумать, нормально ли это?
    e.target.closest('.input').querySelector('.input__field').value = '';
  }
}

export default Input;
