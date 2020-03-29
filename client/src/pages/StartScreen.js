import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Greeting from '../components/Greeting/Greeting';
import Footer from '../components/Footer/Footer';

class StartScreen extends Component {

  render() {
    const headerData = {
      titleValign: 'center',
      titleType: 'title',
      titleText: 'School CI server',
      btns: [
        {
          type: 'icon-text',
          icon: 'settings-before',
          text: 'Settings'
        }
      ]
    };

    return (
      <Page>
        <Header data={headerData} />
        <Main position='main_center'>
          <Greeting />
        </Main>
        <Footer />
      </Page>
    )
  }
}

export default StartScreen;
