import './CardList.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnCardList = cn('card-list');

class CardList extends Component {
  render() {
    return (
      <div className={cnCardList()}>
        {this.props.children}
      </div>
    );
  }
}

export default CardList;


