import './Footer.styl';

import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import { withNaming } from '@bem-react/classname';
import { withTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';

const cn = withNaming({ e: '__', m: '_' });
const cnFooter = cn('footer');

class Footer extends Component {
  render() {
    const { t } = this.props;

    const items = [
      {
        text: t('support')
      },
      {
        text: t('learning')
      },
      {
        text: t('language'),
        onClick: (e) => {
          e.preventDefault();
          i18n.changeLanguage((i18n.language === 'en') ? 'ru' : 'en');
        }
      }
    ];
    return (
      <footer className={cnFooter()}>
        <div className={cnFooter('container')}>
          <Menu mixClass={cnFooter('menu')} items={items}/>
          <div className={cnFooter('copyright')}>© 2020 {t('copyright')}</div>
        </div>
      </footer>
    );
  }
}

export default withTranslation()(Footer);
