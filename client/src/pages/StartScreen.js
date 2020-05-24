import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import BtnBig from '../components/BtnBig/BtnBig';
import BtnSmall from '../components/BtnSmall/BtnSmall';
import Footer from '../components/Footer/Footer';
import Greeting from '../components/Greeting/Greeting';
import Header from '../components/Header/Header';
import Icon from '../components/Icon/Icon';
import Main from '../components/Main/Main';
import Page from '../components/Page/Page';

class StartScreen extends Component {

  render() {
    const { t } = this.props;

    return (
        <Page type='start-screen'>
          <Header valign='center' type='title' text={t('ciServer')}>
            <BtnSmall
              type='icon-text'
              icon='settings-before'
              text={t('settings')}
              mixClass='header_btn'
              onClick={this.goToPageSettings.bind(this)}
            />
          </Header>
          <Main position='main_center'>
            <Greeting
              icon ={<Icon type='logo'/> }
              btn = {<BtnBig action='primary' text={t('openSettings')} onClick={this.goToPageSettings.bind(this)}/>}
            />
          </Main>
          <Footer />
        </Page>
    )
  }

  goToPageSettings() {
    this.props.history.push('/settings');
  }
}

export default withTranslation()(StartScreen);
