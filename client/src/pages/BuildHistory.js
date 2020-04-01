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
    isModalShown: false,
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
          onClick: this.toggleModalVisibility.bind(this)
        },
        {
          type: 'only-icon',
          icon: 'settings-before',
          text: '',
          onClick: this.goToPageSettings.bind(this)
        }
      ]
    };

    const inputs = [
      {
        direction: 'column',
        name: 'commitHash',
        id: 'commitHash',
        display: 'block',
        value: this.state.commitHash,
        labelText: 'Enter the commit hash which you want to build.',
        inputPlh: 'Commit hash',
        onChange: this.handleInputChange.bind(this),
        onFocus: this.handleInputFocus.bind(this),
        isInvalid: this.state.isErrorOnFormSubmit,
        errorMsg: 'There is no commit with such hash',
        clearInput: this.clearInput.bind(this)
      }
    ];

    const btns = {
      primary: {
        text: 'Run build',
        onClick: this.handlePrimaryClick.bind(this)
      },
      secondary: {
        text: 'Cancel',
        onClick: this.toggleModalVisibility.bind(this)
      }
    };

    return (
      <Page>
        <Header data={headerData} isModalShown = {this.state.isModalShown} />
        <Main>
          <CardList builds={this.state.builds}/>
          {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
          {this.state.isModalShown && <Modal inputs={inputs} btns={btns} isFetching={this.state.isFetching} toggleModalVisibility={this.toggleModalVisibility.bind(this)}/>}
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
      .catch(err => console.error(err.message));
  }

  handleInputFocus(e) {
    this.setState({
      isErrorOnFormSubmit: false
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const value = target.value;
    this.setState({
      commitHash: value
    });
  }

  handlePrimaryClick() {
    this.setState({
      isFetching: true
    });

    api.addCommitToQueue(this.state.commitHash)
      .then(res => {
        const build = this.state.builds.find(build => build.commitHash === this.state.commitHash);
        document.location.href = `/build/${build.id}`;
      })
      .catch(err => {
        this.setState({
          isErrorOnFormSubmit: true
        });
      })
      .finally(() => {
        this.setState({
          isFetching: false
        });
      })
  }

  toggleModalVisibility() {
    this.setState({
      isModalShown: !this.state.isModalShown,
      isErrorOnFormSubmit: false,
      commitHash: ''
    });
  }

  goToPageSettings() {
    document.location.href = '/settings'
  }

  clearInput(e) {
    this.setState({
      commitHash: ''
    })
  }
}

export default BuildHistory;
