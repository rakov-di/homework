import './Main.styl';

import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className={`main ${this.props.position}`}>
        <div className="main__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;
