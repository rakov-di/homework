import './Page.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnPage = cn('page');

class Page extends Component {
  render() {
    return (
      <div className={cnPage({[this.props.type]: true})}>{this.props.children}</div>
    );
  }
}

export default Page;
