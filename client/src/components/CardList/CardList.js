import './CardList.styl';

import React, { Component } from 'react';

class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        {this.props.children}
      </div>
    );
  }
}

export default CardList;


