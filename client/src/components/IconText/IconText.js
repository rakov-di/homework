import './IconText.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnIconText = cn('icon-text');
const cnIcon = cn('icon');

class IconText extends Component {
  render() {
    const { mixClass, icon, textPrimary, textSecondary } = this.props;

    return (
      <div className={cnIconText(null, [mixClass])}>
        <span className={cnIconText('icon', [
          cnIcon({[icon]: true})
        ])}></span>
        <span className={cnIconText('primary')}>{textPrimary}</span>
        {textSecondary && <span className={cnIconText('secondary')}>{textSecondary}</span>}
      </div>
    );
  }
}

export default IconText;
