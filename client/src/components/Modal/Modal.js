import React, { Component } from 'react';

import Form from '../Form/Form';

import './Modal.styl';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  render() {
    return (
      <div className='modal' onClick={this.handleClickModal.bind(this)}>
        <div className='modal__content'>
          <div className='modal__title'>New build</div>
          <Form formData={this.props.formData} />
        </div>
      </div>
    );
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress(e) {
    if (e.key === 'Escape') this.props.toggleModalVisibility();
  }

  handleClickModal(e) {
    if (e.target.classList.contains('modal')) {
      this.props.toggleModalVisibility()
    }
  }
}

export default Modal;

