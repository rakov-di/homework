import React, { Component } from 'react';

import Header from '../components/Header/Header';
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
      <div className='page'>
        <Header data={headerData} />
        <div className='main main_center'>
          <div className='main__container'>
            <Greeting />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default StartScreen;
