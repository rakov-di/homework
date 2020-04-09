import './Greeting.styl';

import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Icon from '../Icon/Icon';

class Greeting extends Component {
  render() {
    const { icon, btn } = this.props;

    return (
      <div className="greeting">
        {icon}
        <p className="greeting__description">Configure repository connection and synchronization settings</p>
        {btn}
      </div>
    );
  }
}

export default Greeting;


