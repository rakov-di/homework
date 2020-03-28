import React, { Component } from 'react';

import Modal from '../Modal/Modal';

import './Backdrop.styl';

class Backdrop extends Component {
  render() {
    return (
      <div className='backdrop'>
        <Modal toggleBackdropVisibility={this.props.toggleBackdropVisibility}/>
      </div>
    );
  }
}

export default Backdrop;



