import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Input from '../Input/Input';
import Label from '../Label/Label';

class Form extends Component {
  render() {
    return (
      <div className="form">
        {/*TODO Переписать header по  нормальному*/}
        {this.props.isHeader && <div className="form__header">
          <div className="form__title">Settings</div>
          <div className="form__subtitle">Configure repository connection and synchronization settings.</div>
        </div>
        }
        <div className="form__fields">
          {this.props.inputs.map((input, idx) =>
            <div key={idx} className={`form__field form__field_direction_${input.direction}`}>
              <Label htmlFor={input.id} type='default' display={input.display} text={input.labelText} isRequired={input.isRequired} />
              <Input id={input.id} display={input.display} plh={input.inputPlh} isRequired={input.isRequired} type={input.type} pattern={input.pattern}/>
              {input.labelValueText && <Label htmlFor={input.id} type='value' display={input.display} text={input.labelValueText} />}

            </div>
          )}
        </div>
        <div className="form__btn-group">
          <BtnBig type='primary' text={this.props.btns.textPrimary} mixClass='form__btn'/>
          <BtnBig type='secondary' text={this.props.btns.textSecondary} mixClass='form__btn' onClick={this.props.btns.clickSecondary}/>
        </div>
      </div>
    );
  }
}

export default Form;
