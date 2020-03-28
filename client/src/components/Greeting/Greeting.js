import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Icon from '../Icon/Icon';

class Greeting extends Component {
  render() {
    return (
      <div className="greeting">
        <Icon iconType='logo'/>
        <p className="greeting__description">Configure repository connection and synchronization settings</p>
        <BtnBig btnType='primary' btnText='Open settings'/>
      </div>
    );
  }
}

export default Greeting;


