import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnIcon = cn('icon');

type IconProps = {
  type: string
  mixClass?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

class Icon extends Component<IconProps> {
  render() {
    const { type, mixClass, onClick} = this.props;

    return (
      <div className={cnIcon({ [type]: true}, [mixClass || ''])} onClick={onClick}></div>
    );
  }
}

export default Icon;
