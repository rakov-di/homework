import React, { Component } from 'react';

import BtnBig from '../components/BtnBig/BtnBig.tsx';
import BtnSmall from '../components/BtnSmall/BtnSmall';
import Footer from '../components/Footer/Footer';
import Greeting from '../components/Greeting/Greeting';
import Header from '../components/Header/Header';
import Icon from '../components/Icon/Icon';
import Main from '../components/Main/Main';
import Page from '../components/Page/Page';

type StartScreenProps = {
  history: {
    push(url: string): any
  }
}

class StartScreen extends Component<StartScreenProps> {

  render() {
    return (
        <Page type='start-screen'>
          <Header valign='center' type='title' text='School CI server'>
            <BtnSmall
              type='icon-text'
              icon='settings-before'
              text='Settings'
              mixClass='header_btn'
              onClick={this.goToPageSettings.bind(this)}
            />
          </Header>
          <Main position='main_center'>
            <Greeting
              icon ={<Icon type='logo'/> }
              btn = {<BtnBig action='primary' text='Open settings' onClick={this.goToPageSettings.bind(this)}/>}
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

export default StartScreen;
