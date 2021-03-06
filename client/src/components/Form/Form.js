import './Form.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnForm = cn('form');

class FormClass extends Component {
  render() {
    const { isHeader, inputs, btns } = this.props;
    const { isFetching, formStatus } = this.props.main; // из redux

    return (
      <form className={cnForm()}>
        {/*TODO Переписать header послойно, а не целиком*/}
        {isHeader && <div className={cnForm('header')}>
          <div className={cnForm('title')}>Settings</div>
          <div className={cnForm('subtitle')}>Configure repository connection and synchronization settings.</div>
        </div>
        }
        <div className={cnForm('fields')}>
          {inputs}
        </div>
        <div className={cnForm('btn-group')}>{btns}</div>
        {!isFetching && formStatus && <div className={cnForm(`${formStatus.value}-msg`)}>{formStatus.text}</div>}
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
