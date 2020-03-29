import React, { Component } from 'react';

import Header from '../components/Header/Header';
import CardList from '../components/CardList/CardList';
import Backdrop from '../components/Backdrop/Backdrop';
import Footer from '../components/Footer/Footer';

class BuildHistory extends Component {
  state = {
    isBackdropShown: false
  };

  render() {
    const headerData = {
      titleValign: 'top',
      titleType: 'repo-title',
      titleText: 'philip1967/my-awesome-repo',
      btns: [
        {
          type: 'icon-text',
          icon: 'run-before',
          text: 'Run build',
          onClick: this.toggleBackdropVisibility.bind(this)
        },
        {
          type: 'only-icon',
          icon: 'settings-before',
          text: ''
        }
      ]
    };

    return (
      <div className='page'>
        <Header data={headerData} isBackdropShown = {this.state.isBackdropShown} />
        <div className='main'>
          <div className='main__container'>
            <CardList />
            {/*TODO Возможно, по клику стоит создавать Бэкдроп с нуля, а не показывать заранее созданный*/}
            {this.state.isBackdropShown && <Backdrop toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)}/>}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  toggleBackdropVisibility = (e) => {
    this.setState({
      isBackdropShown: !this.state.isBackdropShown
    });
  }
}

export default BuildHistory;
