import React, { Component } from 'react';
import IconText from '../IconText/IconText';

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

class Card extends Component {

  render() {
    // TODO вынести это из рендера
    let { status, buildNumber, commitMessage, branchName, commitHash, authorName, start, duration } = this.props.build;

    start = start ? format(Date.parse(start), 'd MMM HH:s', {locale: ru}) : '--.--.--';

    if (duration) {
      const hours = Math.floor(duration / 3600000);
      duration = `${hours} ч ${Math.floor((duration - (hours * 3600000)) / 60000)} мин`
    }
    else {
      duration = '--:--';
    }
    status = status && status.toLowerCase();
    commitHash = commitHash && commitHash.slice(0, 7);


    return (
      <div className={`card card_type_common card_status_${status}`}>
        <div className="card__icon"></div>
        <div className="card__info card__info_direction_row">
          <div className="card__main">
            <div className="card__task">
              <div className="card__task-num">#{buildNumber}</div>
              <div className="card__title">{commitMessage}</div>
            </div>
            <div className="card__meta card__meta_horizontal">
              <IconText icon='code-commit' textPrimary={branchName} textSecondary={commitHash} mixClass='card__icon-text' />
              <IconText icon='user' textPrimary={authorName} mixClass='card__icon-text' />
            </div>
          </div>
          <div className="card__separator"></div>
          <div className="card__time card__time_vertical">
            <IconText icon='calendar' textPrimary={start} mixClass='card__icon-text' />
            <IconText icon='stopwatch' textPrimary={duration} mixClass='card__icon-text' />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
