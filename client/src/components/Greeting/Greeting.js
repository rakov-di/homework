import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Icon from '../Icon/Icon';

class Greeting extends Component {
  render() {
    return (
      <div className="greeting">
        <Icon type='logo'/>
        <p className="greeting__description">Configure repository connection and synchronization settings</p>
        <BtnBig type='primary' text='Open settings'/>
      </div>
    );
  }
}

export default Greeting;


