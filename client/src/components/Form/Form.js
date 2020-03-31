import './Form.styl';

import React, { Component } from 'react';

import BtnBig from '../BtnBig/BtnBig';
import Input from '../Input/Input';
import Label from '../Label/Label';

class Form extends Component {
  render() {
    const { isHeader, inputs, btns, isFetching, isErrorOnFormSubmit} = this.props;
    return (
      <form className="form">
        {/*TODO Переписать header послойно, а не целиком*/}
        {isHeader && <div className="form__header">
          <div className="form__title">Settings</div>
          <div className="form__subtitle">Configure repository connection and synchronization settings.</div>
        </div>
        }
        <div className="form__fields">
          {inputs.map((input, idx) =>
            <div key={idx} className={`form__field form__field_direction_${input.direction}`}>
              <Label htmlFor={input.id}
                     type='default'
                     display={input.display}
                     text={input.labelText}
                     isRequired={input.isRequired}
              />
              <Input name={input.name}
                     id={input.id}
                     display={input.display}
                     plh={input.inputPlh}
                     isRequired={input.isRequired || null}
                     isInvalid={input.isInvalid || null}
                     type={input.type}
                     pattern={input.pattern || null}
                     onInput={input.onInput || null}
                     onChange={input.onChange}
                     onFocus={input.onFocus || null}
              />
              {input.labelValueText && <Label htmlFor={input.id}
                                              type='value'
                                              display={input.display}
                                              text={input.labelValueText}
              />}
            </div>
          )}
        </div>
        <div className="form__btn-group">
          <BtnBig action='primary'
                  text={btns.primary.text}
                  mixClass='form__btn'
                  onClick={btns.primary.onClick}
                  disabled={isFetching} />
          <BtnBig action='secondary'
                  text={btns.secondary.text}
                  mixClass='form__btn'
                  onClick={btns.secondary.onClick}
                  disabled={isFetching} />
          {isErrorOnFormSubmit && <div className='form__error-msg'>There is no commit with such hash.</div>}
        </div>
      </form>
    );
  }
}

export default Form;
