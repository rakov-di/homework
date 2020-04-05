import './Form.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import BtnBig from '../BtnBig/BtnBig';
import { InputConnected } from '../Input/Input';
import Label from '../Label/Label';

class FormClass extends Component {
  render() {
    const { isHeader, inputs, btns } = this.props.formData; // из родителя
    const { isFetching, formStatus } = this.props.app; // из redux

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
              <Label
                htmlFor={input.id}
                type='default'
                display={input.display}
                text={input.labelText}
                isRequired={input.isRequired}
              />
              <InputConnected
                name={input.name}
                id={input.id}
                display={input.display}
                value={input.value}
                plh={input.inputPlh}
                isRequired={input.isRequired}
                isValid={input.isValid || null}
                type={input.type}
                pattern={input.pattern || null}
                errorMsg={input.errorMsg}
                needCheckOnNum={input.needCheckOnNum}
              />
              {input.labelValueText && <Label
                                        htmlFor={input.id}
                                        type='value'
                                        display={input.display}
                                        text={input.labelValueText}
                                      />}
            </div>
          )}
        </div>
        <div className="form__btn-group">
          <BtnBig
            action='primary'
            text={btns.primary.text}
            mixClass='form__btn'
            onClick={btns.primary.onClick} />
          <BtnBig
            action='secondary'
            text={btns.secondary.text}
            mixClass='form__btn'
            onClick={btns.secondary.onClick} />
        </div>
        {!isFetching && formStatus && <div className={`form__${formStatus.value}-msg`}>{formStatus.text}</div>}
      </form>
    );
  }
}


const mapStateToProps = state => ({
  app: state.app,
});

export default connect(
  mapStateToProps
)(FormClass);
