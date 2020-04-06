import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuildsList, modalVisibilityToggle, addCommitToQueue } from '../redux/actions/actions';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import CardList from '../components/CardList/CardList';
import Modal from '../components/Modal/Modal';
import Footer from '../components/Footer/Footer';


class BuildHistoryClass extends Component {
  render() {
    const { settings, builds } = this.props.main;
    const { commitHash } = this.props.inputs;
    const { isModalShown } = this.props.modal;
    const headerData = {
      title: {
        valign: 'top',
        type: 'repo-title',
        text: settings.repoName || ''
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

    const formData = {
      isHeader: false,
      inputs: [
        {
          direction: 'column',
          name: 'commitHash',
          id: 'commitHash',
          display: 'block',
          value: commitHash.value,
          labelText: 'Enter the commit hash which you want to build.',
          inputPlh: 'Commit hash',
          // onChange: this.handleInputChange.bind(this),
          // onFocus: this.handleInputFocus.bind(this),
          isValid: commitHash.isValid,
          errorMsg:  'There is no commit with such hash',
          // clearInput: this.clearInput.bind(this)
        }
      ],
      btns: {
        primary: {
          text: 'Run build',
          onClick: this.handlePrimaryClick.bind(this)
        },
        secondary: {
          text: 'Cancel',
          onClick: this.toggleModalVisibility.bind(this)
        }
      }
    };

    return (
      <Page>
        <Header data={headerData} />
        <Main>
          <CardList builds={builds}/>
          {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
          {isModalShown && <Modal formData={formData} toggleModalVisibility={this.toggleModalVisibility.bind(this)}/>}
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
    this.setState({
      isFetching: true
    });
    this.props.addCommitToQueue(this.props.inputs.commitHash.value);
  }

  toggleModalVisibility() {
    this.props.modalVisibilityToggle(!this.props.modal.isModalShown);
  }

  goToPageSettings() {
    document.location.href = '/settings'
  }
}

const mapStateToProps = state => ({
  main: state.main,
  inputs: state.inputs,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  getBuildsList: () => dispatch(getBuildsList()),
  modalVisibilityToggle: (name, status) => dispatch(modalVisibilityToggle(name, status)),
  addCommitToQueue: (commitHash) => dispatch(addCommitToQueue(commitHash)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildHistoryClass);
