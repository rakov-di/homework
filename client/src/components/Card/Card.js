import React, { Component } from 'react';
import Icon from '../Icon/Icon';
import IconText from '../IconText/IconText';

class Card extends Component {
  render() {
    return (
      <div className={`card card_type_common card_status_${this.props.data.status}`}>
        <div className="card__icon"></div>
        <div className="card__info card__info_direction_row">
          <div className="card__main">
            <div className="card__task">
              <div className="card__task-num">#{this.props.data.id}</div>
              <div className="card__title">{this.props.data.title}</div>
            </div>
            <div className="card__meta card__meta_horizontal">
              <IconText icon='code-commit' textPrimary={this.props.data.branch} textSecondary={this.props.data.commitHash} mixClass='card__icon-text' />
              <IconText icon='user' textPrimary={this.props.data.author} mixClass='card__icon-text' />
            </div>
          </div>
          <div className="card__separator"></div>
          <div className="card__time card__time_vertical">
            <IconText icon='calendar' textPrimary={this.props.data.date} mixClass='card__icon-text' />
            <IconText icon='stopwatch' textPrimary={this.props.data.time} mixClass='card__icon-text' />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
