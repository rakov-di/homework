import './Input.styl';

import React, { Component } from 'react';
import Icon from '../Icon/Icon';

class Input extends Component {
  render() {
    const {
      display, name, id, type, plh, isRequired, isInvalid, pattern,
      onInput, onChange, onFocus, errorMsg, clearInput
    } = this.props;

    return (
      <div className={`input input_type_${display} ${isInvalid && 'input_invalid'}`}>
        <input
          className={`input__field`}
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
        {display === 'block' && <Icon type='clear' mixClass='input__clear' onClick={clearInput}/>}
        <div className='input__error-msg'>{errorMsg}</div>
      </div>
    );
  }
}

export default Input;
