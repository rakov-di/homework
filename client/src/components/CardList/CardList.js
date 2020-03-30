import './CardList.styl';

import React, { Component } from 'react';
import Card from '../Card/Card';
import BtnSmall from '../BtnSmall/BtnSmall';

class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        {this.props.builds.map(build =>
          <Card key={build.id} build={build} />
        )}
        <BtnSmall type='only-text' text='Show more' mixClass='card-list__show-more'/>
      </div>
    );
  }
}

export default CardList;


