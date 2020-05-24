import './Greeting.styl';

import React, { Component } from 'react';
import { withNaming } from '@bem-react/classname';
import { withTranslation } from 'react-i18next';

const cn = withNaming({ e: '__', m: '_' });
const cnGreeting = cn('greeting');

class Greeting extends Component {
  render() {
    const { t } = this.props;
    const { icon, btn } = this.props;

    return (
      <div className={cnGreeting()}>
        {icon}
        <p className={cnGreeting('description')}>{t('descriptionSettings')}</p>
        {btn}
      </div>
    );
  }
}

export default withTranslation()(Greeting);


