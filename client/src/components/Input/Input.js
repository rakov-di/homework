import './Input.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputSetValue, inputSetValidationStatus } from '../../redux/actions/actions';

import Icon from '../Icon/Icon';

class Input extends Component {
  render() {
    const {
      display, name, id, value, type, plh,
      isRequired, isValid, pattern, errorMsg
    } = this.props;

    return (
      <div className={`input input_type_${display} ${!isValid && 'input_invalid'}`}>
        <input
          className={`input__field`}
          name={name}
          id={id}
          value={value || ''}
          type={type || "text"}
          placeholder={plh}
          required={isRequired || false}
          pattern={pattern}
          onChange={this.changeInput.bind(this)}
          onFocus={this.focusInput.bind(this)}
        />
        {display === 'block' && <Icon type='clear' mixClass='input__clear' onClick={this.clearInput.bind(this)}/>}
        <div className='input__error-msg'>{errorMsg}</div>
      </div>
    );
  }

  focusInput(e) {
    this.props.inputSetValidationStatus(e.target.name, true)
  }

  changeInput(e) {
    let { name, value } = e.target;
    if (this.props.needCheckOnNum && !this.isNum(value)) {
      value = this.props.inputs[name].value;
    }
    this.props.inputSetValue(name, value);
  }

  isNum(value) {
    return /^[0-9]*$/.test(value);
  }

  clearInput(e) {
    const target = e.target.closest('.input').querySelector('.input__field');
    const name = target.name;
    this.props.inputSetValue(name, '');
  }
}

const mapStateToProps = state => ({
  inputs: state.settings.inputs
});

const mapDispatchToProps = dispatch => ({
  inputSetValue: (name, value) => dispatch(inputSetValue(name, value)),
  inputSetValidationStatus: (name, value) => dispatch(inputSetValidationStatus(name, value))
});

export const InputConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);

