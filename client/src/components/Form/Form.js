import './Form.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormClass extends Component {
  render() {
    const { isHeader, inputs, btns } = this.props;
    const { isFetching, formStatus } = this.props.main; // из redux

    return (
      <form className="form">
        {/*TODO Переписать header послойно, а не целиком*/}
        {isHeader && <div className="form__header">
          <div className="form__title">Settings</div>
          <div className="form__subtitle">Configure repository connection and synchronization settings.</div>
        </div>
        }
        <div className="form__fields">
          {inputs}
        </div>
        <div className="form__btn-group">{btns}</div>
        {!isFetching && formStatus && <div className={`form__${formStatus.value}-msg`}>{formStatus.text}</div>}
      </form>
    );
  }
}


const mapStateToProps = state => ({
  main: state.main,
});

export default connect(
  mapStateToProps
)(FormClass);
