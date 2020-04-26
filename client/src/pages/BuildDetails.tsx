import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuildDetails, getBuildLog, addCommitToQueue } from '../redux/actions/actions';

import BtnSmall from '../components/BtnSmall/BtnSmall.tsx';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer.tsx';
import Header from '../components/Header/Header.tsx';
import Log from '../components/Log/Log';
import Main from '../components/Main/Main.tsx';
import Page from '../components/Page/Page.tsx';


type SettingsProps = {
  main: {
    settings: {
      repoName: string;
    }
  };
  curBuild: {
    commitHash: string;
    log: string;
  };
  addCommitToQueue(commitHash: string): any;
  getBuildDetails(buildId: string): any;
  getBuildLog(buildId: string): any;
  history: {
    push(url: string): any
  }   
}

class BuildDetailsClass extends Component<SettingsProps> {
  render() {
    return (
      <Page type='build-details'>
        <Header valign='top' type='repo-title' text={this.props.main.settings.repoName || ''} >
          <BtnSmall
            type='icon-text'
            icon='rebuild-before'
            text='Rebuild'
            mixClass='header__btn'
            onClick={this.handleRebuildClick.bind(this)}
          />
          <BtnSmall
            type='only-icon'
            icon='settings-before'
            text=''
            mixClass='header__btn'
            onClick={this.goToPageSettings.bind(this)}
          />
        </Header>
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

  handleRebuildClick() {
    this.props.addCommitToQueue(this.props.curBuild.commitHash);
  }

  goToPageSettings() {
    this.props.history.push('/settings');
  }
}

const mapStateToProps = (state: any) => ({
  main: state.main,
  curBuild: state.curBuild
});

const mapDispatchToProps = { getBuildDetails,  getBuildLog,  addCommitToQueue};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildDetailsClass);

