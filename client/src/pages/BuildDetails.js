import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuildDetails, getBuildLog, addCommitToQueue } from '../redux/actions/actions';
import { withTranslation } from 'react-i18next';

import BtnSmall from '../components/BtnSmall/BtnSmall';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Log from '../components/Log/Log';
import Main from '../components/Main/Main';
import Page from '../components/Page/Page';


class BuildDetailsClass extends Component {
  render() {
    const { t } = this.props;

    return (
      <Page type='build-details'>
        <Header valign='top' type='repo-title' text={this.props.main.settings.repoName || ''} >
          <BtnSmall
            type='icon-text'
            icon='rebuild-before'
            text={t('rebuild')}
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

const mapStateToProps = state => ({
  main: state.main,
  curBuild: state.curBuild
});

const mapDispatchToProps = { getBuildDetails,  getBuildLog,  addCommitToQueue};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(BuildDetailsClass));

