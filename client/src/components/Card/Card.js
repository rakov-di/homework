import React, { Component } from 'react';
import IconText from '../IconText/IconText';

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnCard = cn('card');

class Card extends Component {

  render() {
    // TODO вынести это из рендера
    let { id, status, buildNumber, commitMessage, branchName, commitHash, authorName, start, duration } = this.props.build;

    start = start ? format(Date.parse(start), 'd MMM HH:s', {locale: ru}) : '––––––––––';

    if (duration) {
      const hours = Math.floor(duration / 3600000);
      duration = `${hours} ч ${Math.floor((duration - (hours * 3600000)) / 60000)} мин`
    }
    else {
      duration = '––––––––––';
    }
    status = status && status.toLowerCase();
    commitHash = commitHash && commitHash.slice(0, 7);

    return (
      <div className={cnCard({ type: 'common', status, })} onClick={this.handleCardClick.bind(this)} data-id={id}>
        <div className={cnCard('icon')}></div>
        <div className={cnCard('info', { direction: 'row'})}>
          <div className={cnCard('main')}>
            <div className={cnCard('task')}>
              <div className={cnCard('task-num')}>#{buildNumber}</div>
              <div className={cnCard('title')}>{commitMessage}</div>
            </div>
            <div className={cnCard('meta', { horizontal: true})}>
              <IconText icon='code-commit' textPrimary={branchName} textSecondary={commitHash} mixClass={cnCard('icon-text')} />
              <IconText icon='user' textPrimary={authorName} mixClass={cnCard('icon-text')} />
            </div>
          </div>
          <div className={cnCard('separator')}></div>
          <div className={cnCard('time', { vertical: true })}>
            <IconText icon='calendar' textPrimary={start} mixClass={cnCard('icon-text')} />
            <IconText icon='stopwatch' textPrimary={duration} mixClass={cnCard('icon-text')} />
          </div>
        </div>
      </div>
    );
  }

  handleCardClick = (e) => {
    document.location.href = `/build/${e.currentTarget.dataset.id}`
  }
}

export default Card;
