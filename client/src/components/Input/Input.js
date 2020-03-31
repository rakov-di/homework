import './Input.styl';

import React, { Component } from 'react';
import Icon from '../Icon/Icon';

class Input extends Component {
  state = {
    value: this.props.value
  };
  render() {
    const { display, name, id, type, plh, isRequired, isInvalid, pattern, onInput, onChange, onFocus, errorMsg } = this.props;
    return (
      <div className={`input input_type_${display} ${isInvalid && 'input_invalid'}`}>
        <input className={`input__field`}
               name={name}
               id={id}
               type={type || "text"}
               placeholder={plh}
               required={isRequired}
               pattern={pattern}
               onChange={onChange}
               onInput={onInput}
               onFocus={onFocus}
        />
        {display === 'block' && <Icon type='clear' mixClass='input__clear' onClick={this.clearInput.bind(this)}/>}
        <div className='input__error-msg'>{errorMsg}</div>
      </div>
    );
  }

  clearInput(e) {
    // TODO Подумать, нормально ли это?
    e.target.closest('.input').querySelector('.input__field').value = '';
  }
}

export default Input;
