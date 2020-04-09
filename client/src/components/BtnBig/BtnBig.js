import './BtnBig.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnBtnBig = cn('btn-big');

class BtnBigClass extends Component {
  render() {
    const { type, action, mixClass, text, onClick, onSubmit } = this.props; // из родителя
    const isDisabled = this.props.isFetching; // из redux
    return (
      <button
        type={type || "button"}
        className={`${cnBtnBig({ action })} ${mixClass || ''}`}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={isDisabled}>{text}</button>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.main.isFetching,
});

export default connect(
  mapStateToProps
)(BtnBigClass);

