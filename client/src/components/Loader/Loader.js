import './Loader.styl';

import React, { Component } from 'react';

import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnLoader = cn('loader');

class Loader extends Component {
  render() {
    return (
      <div className={cnLoader()}></div>
    );
  }
}

export default Loader;
