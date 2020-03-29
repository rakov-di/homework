import React, { Component } from 'react';
import BtnBig from '../BtnBig/BtnBig';
import Icon from '../Icon/Icon';

class Greeting extends Component {
  render() {
    return (
      <div className="greeting">
        <Icon type='logo'/>
        <p className="greeting__description">Configure repository connection and synchronization settings</p>
        <BtnBig type='primary' text='Open settings' onClick={this.goToSettings.bind(this)}/>
      </div>
    );
  }

  // TODO Может, расширить компонет BtnBig и сделать переход через css-ссылку
  goToSettings() {
    document.location.href = '/settings';
  }
}

export default Greeting;


