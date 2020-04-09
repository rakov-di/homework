import './Main.styl';

import React, { Component } from 'react';

class Main extends Component {
  render() {
    const { children, position } = this.props;

    return (
      <div className={`main ${position}`}>
        <div className="main__container">
          {children}
        </div>
      </div>
    );
  }
}

export default Main;
