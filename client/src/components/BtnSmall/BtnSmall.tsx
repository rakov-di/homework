import './BtnSmall.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnBtnSmall = cn('btn-small');
const cnIcon = cn('icon');

type BtnSmallProps = {
  type?: string;
  icon?: string;
  mixClass?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

class BtnSmall extends Component<BtnSmallProps> {
  render() {
    const { type, icon, mixClass, text, onClick} = this.props;

    return (
      <button
        className={cnBtnSmall({ type }, [
          mixClass || '',
          cnIcon({[icon || '']: true})
        ])}
        onClick={onClick}>{text}
      </button>
    );
  }
}

export default BtnSmall;
