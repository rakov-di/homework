import React, { Component } from 'react';

import Form from '../Form/Form';

import './Modal.styl';

class Modal extends Component {
  render() {
    const inputs = [
      {
        direction: 'column',
        id: 'commitHash',
        display: 'block',
        labelText: 'Enter the commit hash which you want to build.',
        inputPlh: 'Commit hash'
      }
    ];

    const btns = {
      textPrimary: 'Run build',
      textSecondary: 'Cancel',
      clickSecondary: this.props.toggleBackdropVisibility
    };

    return (
      <div className='modal'>
        <div className='modal__title'>New build</div>
        <Form inputs={inputs} btns={btns}/>
      </div>
    );
  }
}

export default Modal;

