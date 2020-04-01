import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Card from '../components/Card/Card';
import Log from '../components/Log/Log';
import Footer from '../components/Footer/Footer';

import { api } from '../api.js'

import Convert from 'ansi-to-html';

const convert = new Convert({fg: '#000', bg: '#000'});

class BuildDetails extends Component {
  state = {
    curBuild: {
      id: null,
      buildNumber: null,
      commitMessage: null,
      branchName: null,
      commitHash: null,
      authorName: null,
      status: null,
      start: null,
      duration: null
    },
    curBuildLog: '',
    settings: {}
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
          icon: 'rebuild-before',
          text: 'Rebuild',
          onClick: this.handleRebuildClick.bind(this)
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
        <Header data={headerData} />
        <Main>
          <Card build={this.state.curBuild} />
          {this.state.curBuildLog && <Log log={this.state.curBuildLog} />}
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    const buildId = window.location.pathname.split('/').reverse()[0];

    // Запрашиваем getSettings, чтобы получить имя репозитория (для вывода в Header)
    Promise.all([
      api.getSettings(),
      api.getBuildDetails(buildId),
      api.getBuildLog(buildId)
    ])
      .then(([settings, build, log]) => {
        this.setState({
          settings: settings.data.data,
          curBuild: build.data.data,
          curBuildLog: convert.toHtml(log.data)
        })
      })
      .catch(error => console.error(error.message))
  }

  handleRebuildClick() {
    api.addCommitToQueue(this.state.curBuild.commitHash)
      .then(() => {
        document.location.href = `/build/${this.state.curBuild.id}`;
      })
      .catch(error => console.error(error.message));
  }

  goToPageSettings() {
    document.location.href = '/settings'
  }
}

export default BuildDetails;

