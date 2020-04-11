import './Modal.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnModal = cn('modal');

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  render() {
    return (
      <div className={cnModal()} onClick={this.handleClickModal.bind(this)}>
        <div className={cnModal('content')}>
          <div className={cnModal('title')}>New build</div>
          {this.props.children}
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
    if (e.key === 'Escape') this.props.closeModal();
  }

  handleClickModal(e) {
    if (e.target.classList.contains('modal')) {
      this.props.closeModal()
    }
  }
}

export default Modal;

