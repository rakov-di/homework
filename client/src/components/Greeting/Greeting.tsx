import './Greeting.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_' });
const cnGreeting = cn('greeting');

type GreetingProps = {
  icon: React.ReactNode;
  btn: React.ReactNode;
}

class Greeting extends Component<GreetingProps> {
  render() {
    const { icon, btn } = this.props;

    return (
      <div className={cnGreeting()}>
        {icon}
        <p className={cnGreeting('description')}>Configure repository connection and synchronization settings</p>
        {btn}
      </div>
    );
  }
}

export default Greeting;


