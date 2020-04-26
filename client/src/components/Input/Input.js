import './Input.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputSetValue, inputSetValidationStatus } from '../../redux/actions/actions';

import Icon from '../Icon/Icon.tsx';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnInput = cn('input');

class InputClass extends Component {
  render() {
    const {
      display, name, id, value, type, plh,
      isRequired, isValid, pattern, errorMsg
    } = this.props;

    return (
      <div className={`${cnInput({ type: display, })} ${!isValid && cnInput({ invalid: true })}`}>
        <input
          className={cnInput('field')}
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
        {display === 'block' && <Icon type='clear' mixClass={cnInput('clear')} onClick={this.clearInput.bind(this)}/>}
        <div className={cnInput('error-msg')}>{errorMsg}</div>
      </div>
    );
  }

  focusInput(e) {
    this.props.inputSetValidationStatus(e.target.name, true)
  }

  changeInput(e) {
    let { name, value } = e.target;
    if (this.props.needCheckOnNum && !this.isNum(value)) {
      value = value.slice(0, -1); // TODO не работает, есди вставить букву МЕЖДУ цифрами
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
    this.props.inputSetValidationStatus(name, true);
  }
}


const mapDispatchToProps = { inputSetValue, inputSetValidationStatus };

export default connect(
  null,
  mapDispatchToProps
)(InputClass);

