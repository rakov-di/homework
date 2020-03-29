import React, { Component } from 'react';

import Form from '../Form/Form';

import './Modal.styl';

class Modal extends Component {
  render() {
    const { handleInputChange, handlePrimaryClick, toggleBackdropVisibility } = this.props;
    const inputs = [
      {
        direction: 'column',
        name: 'commitHash',
        id: 'commitHash',
        display: 'block',
        labelText: 'Enter the commit hash which you want to build.',
        inputPlh: 'Commit hash',
        onChange: handleInputChange
      }
    ];

    const btns = {
      primary: {
        text: 'Run build',
        cb: handlePrimaryClick
      },
      secondary: {
        text: 'Cancel',
        cb: toggleBackdropVisibility
      }
    };

    return (
      <div className='modal'>
        <div className='modal__content'>
          <div className='modal__title'>New build</div>
          <Form inputs={inputs} btns={btns} />
        </div>
      </div>
    );
  }
}

export default Modal;

