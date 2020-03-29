import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import CardList from '../components/CardList/CardList';
import Modal from '../components/Modal/Modal';
import Footer from '../components/Footer/Footer';

import { api } from '../api.js'

class BuildHistory extends Component {
  state = {
    isFetching: false,
    isBackdropShown: false,
    commitHash: ''
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
      <Page>
        <Header data={headerData} isBackdropShown = {this.state.isBackdropShown} />
        <div className='main'>
          <div className='main__container'>
            <CardList />
            {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
            {this.state.isBackdropShown && <Modal handleInputChange={this.handleInputChange.bind(this)}
                                                  handlePrimaryClick={this.handlePrimaryClick.bind(this)}
                                                  toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)}
            />}
          </div>
        </div>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    window.history.pushState(null, document.title, `${window.location.origin}/build-history`);
  }

  handleInputChange(e) {
    debugger
    const { target } = e;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlePrimaryClick() {
    this.setState({
      isFetching: true
    });

    api.addCommitToQueue(this.state.commitHash, () => {
      this.setState({
        isFetching: false
      });
      document.location.href = '/build-details/';
    });
  }

  toggleBackdropVisibility() {
    this.setState({
      isBackdropShown: !this.state.isBackdropShown
    });
  }
}

export default BuildHistory;
