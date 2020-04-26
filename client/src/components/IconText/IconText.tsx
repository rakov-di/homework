import './IconText.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnIconText = cn('icon-text');
const cnIcon = cn('icon');

type IconTextProps = {
  mixClass?: string;
  icon?: string;
  textPrimary?: string;
  textSecondary?: string;
}

class IconText extends Component<IconTextProps> {
  render() {
    const { mixClass, icon, textPrimary, textSecondary } = this.props;

    return (
      <div className={cnIconText(null, [mixClass])}>
        <span className={cnIconText('icon', [
          cnIcon(icon && {[icon]: true})
        ])}></span>
        <span className={cnIconText('primary')}>{textPrimary}</span>
        {textSecondary && <span className={cnIconText('secondary')}>{textSecondary}</span>}
      </div>
    );
  }
}

export default IconText;
