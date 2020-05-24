import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal, getBuildsList, addCommitToQueue } from '../redux/actions/actions';
import { withTranslation } from 'react-i18next';

import BtnBig from '../components/BtnBig/BtnBig';
import BtnSmall from '../components/BtnSmall/BtnSmall';
import CardList from '../components/CardList/CardList';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Main from '../components/Main/Main';
import Modal from '../components/Modal/Modal';
import Page from '../components/Page/Page';
import Card from '../components/Card/Card';


class BuildHistoryClass extends Component {
  render() {
    const { t } = this.props;
    const { settings, builds } = this.props.main;
    const { commitHash } = this.props.inputs;
    const { isModalShown } = this.props.modal;

    return (
      <Page type='build-history'>
        <Header valign='top' type='repo-title' text={settings.repoName || ''} >
          <BtnSmall
            type='icon-text'
            icon='rebuild-before'
            text={t('runBuild')}
            mixClass='header__btn'
            onClick={this.props.openModal}
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
          <CardList>
            {builds.map(build =>
              <Card key={build.id} build={build} />
            )}
            <BtnSmall type='only-text' text={t('showMore')} mixClass='card-list__show-more'/>
          </CardList>
          {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
          {isModalShown && <Modal closeModal={this.props.closeModal}>
            <Form
              isHeader={false}
              inputs={[
                <div key='commitHash' className={`form__field form__field_name_commit-hash form__field_direction_column`}>
                  <Label
                    htmlFor='commitHash'
                    type='default'
                    display='block'
                    text={t('descriptionNewBuild')}
                  />
                  <Input
                    name='commitHash'
                    id='commitHash'
                    display='block'
                    value={commitHash.value}
                    plh={t('commitHash')}
                    isValid={commitHash.isValid}
                    errorMsg={t('errorHash')}
                  />
                </div>
              ]}
              btns={
                <>
                  <BtnBig
                    action='primary'
                    text={t('runBuild')}
                    mixClass='form__btn'
                    onClick={this.handlePrimaryClick.bind(this)}
                  />
                  <BtnBig
                    action='secondary'
                    text={t('cancel')}
                    mixClass='form__btn'
                    onClick={this.props.closeModal}
                  />
                </>
              }
            />
          </Modal>}
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    window.history.pushState(null, document.title, `${window.location.origin}/build-history`);
    this.props.getBuildsList();
  }

  handlePrimaryClick() {
    this.props.addCommitToQueue(this.props.inputs.commitHash.value);
  }

  goToPageSettings() {
    this.props.history.push('/settings');
  }
}

const mapStateToProps = state => ({
  main: state.main,
  inputs: state.inputs,
  modal: state.modal,
});

const mapDispatchToProps = { getBuildsList, closeModal, openModal, addCommitToQueue };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(BuildHistoryClass));
