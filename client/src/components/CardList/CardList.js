import './CardList.styl';

import React, { Component } from 'react';
import Card from '../Card/Card';
import BtnSmall from '../BtnSmall/BtnSmall';

class CardList extends Component {
  render() {
    const cards = [
      {
        id: 1368,
        title: 'add documentation for postgres scaler',
        status: 'done',
        branch: 'master',
        commitHash: '9c9f0b9',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        time: '1 ч 20 мин'
      },
      {
        id: 1369,
        title: 'add documentation for postgres scaler',
        status: 'fail',
        branch: 'master',
        commitHash: '9c9f0b9',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        time: '1 ч 20 мин'
      },
      {
        id: 1370,
        title: 'add documentation for postgres scaler',
        status: 'wait',
        branch: 'master',
        commitHash: '9c9f0b9',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        time: '1 ч 20 мин'
      },
      {
        id: 1371,
        title: 'add documentation for postgres scaler',
        status: 'done',
        branch: 'master',
        commitHash: '9c9f0b9',
        author: 'Philip Kirkorov Ivanov Petrov Vodkin Maria Ketana Duglas Adams Calm Down And Keep Coding',
        date: '21 янв, 03:06',
        time: '1 ч 20 мин'
      },
    ];
    return (
      <div className="card-list">
        {cards.map(card =>
          <Card key={card.id} data={card} />
        )}
        <BtnSmall type='only-text' text='Show more' mixClass='card-list__show-more'/>
      </div>
    );
  }
}

export default CardList;


