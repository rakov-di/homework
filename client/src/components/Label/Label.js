import './Label.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnLabel = cn('label');

class Label extends Component {
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
