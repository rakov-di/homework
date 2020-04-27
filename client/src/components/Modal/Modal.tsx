import './Modal.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnModal = cn('modal');

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
}

class Modal extends Component<ModalProps> {
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
    document.addEventListener("keydown", this.handleKeyPress.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress.bind(this), false);
  }

  handleKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.props.closeModal();
  }

  handleClickModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if ((e.target as HTMLDivElement).classList.contains('modal')) {
      this.props.closeModal()
    }
  }
}

export default Modal;

