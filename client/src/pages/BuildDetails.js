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
    curBuildLog: ''
  };

  render() {
    const headerData = {
      titleValign: 'top',
      titleType: 'repo-title',
      titleText: 'philip1967/my-awesome-repo',
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
          text: ''
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
    Promise.all([
      api.getBuildDetails(buildId),
      api.getBuildLog(buildId)
    ]).then(([build, log]) => {
      this.setState({
        curBuild: build.data.data,
        curBuildLog: convert.toHtml(log.data)
    })
    });
  }

  // TODO унифицировать с аналогичной функцией в BuildHistory
  handleRebuildClick() {
    api.addCommitToQueue(this.state.curBuild.commitHash, () => {
      document.location.href = `/build/${this.state.curBuild.id}`;
    });
  }
}

export default BuildDetails;

