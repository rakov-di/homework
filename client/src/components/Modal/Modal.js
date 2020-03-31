import React, { Component } from 'react';

import Form from '../Form/Form';

import './Modal.styl';

class Modal extends Component {
  render() {
    const { handleInputChange, handleInputFocus, isErrorOnFormSubmit, handlePrimaryClick, toggleBackdropVisibility } = this.props;
    const inputs = [
      {
        direction: 'column',
        name: 'commitHash',
        id: 'commitHash',
        display: 'block',
        labelText: 'Enter the commit hash which you want to build.',
        inputPlh: 'Commit hash',
        onChange: handleInputChange,
        onFocus: handleInputFocus
      }
    ];

    const btns = {
      primary: {
        text: 'Run build',
        onClick: handlePrimaryClick
      },
      secondary: {
        text: 'Cancel',
        onClick: toggleBackdropVisibility
      }
    };

    return (
      <div className='modal' onClick={this.handleClickModal.bind(this)}>
        <div className='modal__content'>
          <div className='modal__title'>New build</div>
          <Form inputs={inputs} btns={btns} isErrorOnFormSubmit={isErrorOnFormSubmit} />
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

