import React, { Component } from 'react';

import Modal from '../Modal/Modal';

import './Backdrop.styl';

class Backdrop extends Component {
  render() {
    return (
      <div className='backdrop'>
        <Modal callbacks={this.props}/>
      </div>
    );
  }
}

export default Backdrop;



