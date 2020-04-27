import './Label.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnLabel = cn('label');

type LabelProps = {
  type: 'block' | 'inline';
  display: string;
  htmlFor: string;
  text: string;
  isRequired: boolean;
}

class Label extends Component<LabelProps> {
  render() {
    const { type, display, htmlFor, text, isRequired } = this.props;

    return (
      <label className={cnLabel({ [type]: true, type: display})} htmlFor={htmlFor}>{text}
        {isRequired && <span className={cnLabel('required')}>*</span>}
      </label>
    );
  }
}

export default Label;
