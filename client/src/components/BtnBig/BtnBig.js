import './BtnBig.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class BtnBigClass extends Component {
  render() {
    const { type, action, mixClass, text, onClick, onSubmit } = this.props; // из родителя
    const isDisabled = this.props.isFetching; // из redux
    return (
      <button
        type={type || "button"}
        className={`btn-big btn-big_action_${action} ${mixClass || ''}`}
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

