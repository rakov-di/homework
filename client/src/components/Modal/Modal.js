import React, { Component } from 'react';

import Form from '../Form/Form';

import './Modal.styl';

class Modal extends Component {
  render() {

    return (
      <div className='modal' onClick={this.handleClickModal.bind(this)}>
        <div className='modal__content'>
          <div className='modal__title'>New build</div>
          <Form inputs={this.props.inputs} btns={this.props.btns} isFetching={this.props.isFetching} />
        </div>
      </div>
    );
  }

  handleClickModal(e) {
    if (e.target.classList.contains('modal')) {
      this.props.toggleBackdropVisibility()
    }
  }
}

export default Modal;

