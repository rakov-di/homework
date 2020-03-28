import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Input from '../Input/Input';
import Label from '../Label/Label';

class Form extends Component {
  render() {
    const inputs = [
      {
        id: 'repo',
        display: 'block',
        labelType: 'default',
        labelText: 'GitHub repository',
        isRequired: true,
        inputPlh: 'user-name/repo-name'
      },
      {
        id: 'command',
        display: 'block',
        labelType: 'default',
        labelText: 'Build command',
        isRequired: false,
        inputPlh: 'type command'
      },
      {
        id: 'branch',
        display: 'block',
        labelType: 'default',
        labelText: 'Main branch',
        isRequired: false,
        inputPlh: 'type branch'
      }
    ];

    return (
      <div className="form">
        <div className="form__header">
          <div className="form__title">Settings</div>
          <div className="form__subtitle">Configure repository connection and synchronization settings.</div>
        </div>
        <div className="form__fields">
          {inputs.map(input =>
            <div className="form__field form__field_direction_column">
              <Label htmlFor={input.id} type='default' display={input.display} text={input.labelText} isRequired={input.isRequired} />
              <Input id={input.id} display={input.display} plh={input.inputPlh} isRequired={input.isRequired} />
            </div>
          )}
          <div className="form__field form__field_direction_row">
            <Label htmlFor='minutes' type='default' display='inline' text='Synchronize every' />
            <Input id='minutes' display='inline' maxLength='3' />
            <Label htmlFor='minutes' type='value' display='inline' text='minutes' />
          </div>
        </div>
        <div className="form__btn-group">
          <BtnBig type='primary' text='Save' mixClass='form__btn'/>
          <BtnBig type='secondary' text='Cancel' mixClass='form__btn'/>
        </div>
      </div>
    );
  }
}

export default Form;
