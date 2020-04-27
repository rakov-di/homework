import './BtnBig.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnBtnBig = cn('btn-big');

type BtnBigProps = {
  type?: 'submit' | 'reset' | 'button';
  action?: 'primary' | 'secondary';
  mixClass?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFetching?: boolean;
}

class BtnBigClass extends Component<BtnBigProps> {
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

type BtnBigState = {
  main: {
    isFetching: boolean
  }
};

const mapStateToProps = (state: BtnBigState) => ({
  isFetching: state.main.isFetching,
});

export default connect(
  mapStateToProps
)(BtnBigClass);

