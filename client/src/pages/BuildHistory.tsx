import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal, getBuildsList, addCommitToQueue } from '../redux/actions/actions.ts';
import { History } from 'history';

import BtnBig from '../components/BtnBig/BtnBig.tsx';
import BtnSmall from '../components/BtnSmall/BtnSmall.tsx';
import CardList from '../components/CardList/CardList.tsx';
import Footer from '../components/Footer/Footer.tsx';
import Header from '../components/Header/Header.tsx';
import Form from '../components/Form/Form.tsx';
import Input from '../components/Input/Input.tsx';
import Label from '../components/Label/Label.tsx';
import Main from '../components/Main/Main.tsx';
import Modal from '../components/Modal/Modal.tsx';
import Page from '../components/Page/Page.tsx';
import Card from '../components/Card/Card.tsx';

type BuildHistoryState = {
  main: {
    settings: Settings;
    builds: any;
  },
  inputs: {
    commitHash: {
      value: string;
      isValid: boolean;
    }
  },
  modal: {
    isModalShown: boolean
  }
}

type BuildHistoryDispatch = {
  openModal(): void;
  closeModal(): void;
  getBuildsList(): void;
  addCommitToQueue(commitHash: string): void;
}

type BuildHistoryProps = BuildHistoryState & BuildHistoryDispatch & { history : History }

class BuildHistoryClass extends Component<BuildHistoryProps> {
  render() {
    const { main, inputs, modal } = this.props;
    const { settings, builds } = main;
    const { commitHash } = inputs;
    const { isModalShown } = modal;

    return (
      <Page type='build-history'>
        <Header valign='top' type='repo-title' text={settings.repoName || ''} >
          <BtnSmall
            type='icon-text'
            icon='rebuild-before'
            text='Rum build'
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
            {builds.map((build: { id: string }) =>
              <Card key={build.id} build={build} />
            )}
            <BtnSmall type='only-text' text='Show more' mixClass='card-list__show-more'/>
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
                    text='Enter the commit hash which you want to build.'
                  />
                  <Input
                    name='commitHash'
                    id='commitHash'
                    display='block'
                    value={commitHash.value}
                    plh='Commit hash'
                    isValid={commitHash.isValid}
                    errorMsg='There is no commit with such hash'
                  />
                </div>
              ]}
              btns={
                <>
                  <BtnBig
                    action='primary'
                    text='Run build'
                    mixClass='form__btn'
                    onClick={this.handlePrimaryClick.bind(this)}
                  />
                  <BtnBig
                    action='secondary'
                    text='Cancel'
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

const mapStateToProps = (state: BuildHistoryState) => ({
  main: state.main,
  inputs: state.inputs,
  modal: state.modal,
});

const mapDispatchToProps = { getBuildsList, closeModal, openModal, addCommitToQueue };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildHistoryClass);
