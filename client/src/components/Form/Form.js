import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Input from '../Input/Input';
import Label from '../Label/Label';

class Form extends Component {
  render() {
    const { isHeader, inputs, btns, isFetching } = this.props;
    return (
      <div className="form">
        {/*TODO Переписать header послойно, а не целиком*/}
        {isHeader && <div className="form__header">
          <div className="form__title">Settings</div>
          <div className="form__subtitle">Configure repository connection and synchronization settings.</div>
        </div>
        }
        <div className="form__fields">
          {inputs.map((input, idx) =>
            <div key={idx} className={`form__field form__field_direction_${input.direction}`}>
              <Label htmlFor={input.id} type='default' display={input.display} text={input.labelText} isRequired={input.isRequired} />
              <Input name={input.name} id={input.id} display={input.display} plh={input.inputPlh} isRequired={input.isRequired} type={input.type} pattern={input.pattern} onChange={input.onChange} />
              {input.labelValueText && <Label htmlFor={input.id} type='value' display={input.display} text={input.labelValueText} />}

            </div>
          )}
        </div>
        <div className="form__btn-group">
          <BtnBig type='primary' text={btns.primary.text} mixClass='form__btn' onClick={btns.primary.cb} disabled={isFetching} />
          <BtnBig type='secondary' text={btns.secondary.text} mixClass='form__btn' onClick={btns.secondary.cb} disabled={isFetching} />
        </div>
      </div>
    );
  }
}

export default Form;
