import React, { Component } from 'react';
import IconText from '../IconText/IconText';

class Card extends Component {
  render() {
    let { buildNumber, commitMessage, branchName, commitHash, authorName, status, date, time } = this.props.build;
    date = date || '--.--.--';
    time = time || '--:--';
    status = status.toLowerCase();
    commitHash = commitHash.slice(0, 7);
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
            <IconText icon='calendar' textPrimary={date} mixClass='card__icon-text' />
            <IconText icon='stopwatch' textPrimary={time} mixClass='card__icon-text' />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
