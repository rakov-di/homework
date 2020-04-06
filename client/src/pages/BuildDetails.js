import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuildDetails, getBuildLog, addCommitToQueue } from '../redux/actions/actions';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Card from '../components/Card/Card';
import Log from '../components/Log/Log';
import Footer from '../components/Footer/Footer';



class BuildDetailsClass extends Component {
  render() {
    const headerData = {
      title: {
        valign: 'top',
        type: 'repo-title',
        text: this.props.main.settings.repoName || ''
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
          <Card build={this.props.curBuild} />
          {this.props.curBuild.log && <Log log={this.props.curBuild.log} />}
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    const buildId = window.location.pathname.split('/').reverse()[0];

    this.props.getBuildDetails(buildId);
    this.props.getBuildLog(buildId);
  }

  handleRebuildClick(e) {
    this.props.addCommitToQueue(this.props.curBuild.commitHash)
  }

  goToPageSettings() {
    document.location.href = '/settings'
  }
}

const mapStateToProps = state => ({
  main: state.main,
  curBuild: state.curBuild
});

const mapDispatchToProps = dispatch => ({
  getBuildDetails: (buildId) => dispatch(getBuildDetails(buildId)),
  getBuildLog: (buildId) => dispatch(getBuildLog(buildId)),
  addCommitToQueue: (buildId) => dispatch(addCommitToQueue(buildId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildDetailsClass);

