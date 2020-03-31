import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import CardList from '../components/CardList/CardList';
import Modal from '../components/Modal/Modal';
import Footer from '../components/Footer/Footer';

import { api } from '../api.js'

class BuildHistory extends Component {
  state = {
    isFetching: false,
    isBackdropShown: false,
    commitHash: '',
    builds: [],
    settings: {},
    isErrorOnFormSubmit: false
  };

  render() {
    const headerData = {
      title: {
        valign: 'top',
        type: 'repo-title',
        text: this.state.settings.repoName || ''
      },
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
          text: '',
          onClick: this.goToPageSettings.bind(this)
        }
      ]
    };

    return (
      <Page>
        <Header data={headerData} isBackdropShown = {this.state.isBackdropShown} />
        <Main>
          <CardList builds={this.state.builds}/>
          {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
          {this.state.isBackdropShown && <Modal handleInputChange={this.handleInputChange.bind(this)}
                                                handleInputFocus={this.handleInputFocus.bind(this)}
                                                isErrorOnFormSubmit={this.state.isErrorOnFormSubmit}
                                                handlePrimaryClick={this.handlePrimaryClick.bind(this)}
                                                toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)}
          />}
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    window.history.pushState(null, document.title, `${window.location.origin}/build-history`);

    // Запрашиваем getSettings, чтобы получить имя репозитория (для вывода в Header)
    Promise.all([
      api.getSettings(),
      api.getBuildsList()
    ])
      .then(([settings, builds]) => {
        this.setState({
          settings: settings.data.data,
          builds: builds.data.data
        })
      })
      .catch(err => console.error(err));

  }

  handleInputFocus(e) {
    this.setState({
      isErrorOnFormSubmit: false
    });
  }

  handleInputChange(e) {
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

    api.addCommitToQueue(this.state.commitHash, (result) => {
      this.setState({
        isFetching: false
      });
      if (result.status === 'ok') {
        const build = this.state.builds.find(build => build.commitHash === this.state.commitHash);
        document.location.href = `/build/${build.id}`;
      }
      else if (result.status === 'error') {
        this.setState({
          isErrorOnFormSubmit: true
        });
      }
    });
  }

  toggleBackdropVisibility() {
    this.setState({
      isBackdropShown: !this.state.isBackdropShown,
      isErrorOnFormSubmit: false
    });
  }

  goToPageSettings() {
    document.location.href = '/settings'
  }
}

export default BuildHistory;
