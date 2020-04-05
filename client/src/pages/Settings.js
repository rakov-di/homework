import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputSetValue, inputSetValidationStatus, updateSettings } from '../redux/actions/actions';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';


class SettingsClass extends Component {
  render() {
    const { repoName, buildCommand, mainBranch, period } = this.props.inputs;
    const headerData = {
      title: {
        valign: 'center',
        type: 'title',
        text: 'School CI server',
      },
      btns: []
    };

    const formData = {
      isHeader: true,
      inputs: [
        {
          direction: 'column',
          name: 'repoName',
          id: 'repo',
          display: 'block',
          value: repoName.value,
          labelText: 'GitHub repository',
          isRequired: true,
          isValid: repoName.isValid,
          inputPlh: 'user-name/repo-name',
          errorMsg: 'This field can\'t be empty',
        },
        {
          direction: 'column',
          name: 'buildCommand',
          id: 'command',
          display: 'block',
          value: buildCommand.value,
          labelText: 'Build command',
          isRequired: true,
          isValid: buildCommand.isValid,
          inputPlh: 'type command',
          errorMsg: 'This field can\'t be empty',
        },
        {
          direction: 'column',
          name: 'mainBranch',
          id: 'branch',
          display: 'block',
          value: mainBranch.value,
          labelText: 'Main branch',
          inputPlh: 'type branch',
          isValid: mainBranch.isValid,
        },
        {
          direction: 'row',
          name: 'period',
          id: 'minutes',
          display: 'inline',
          value: period.value,
          labelText: 'Synchronize every',
          labelValueText: 'minutes',
          pattern: '^[0-9]*$',
          isValid: period.isValid,
          needCheckOnNum: true
        }
      ],
      btns: {
        primary: {
          text: 'Save',
          onClick: this.handlePrimaryClick.bind(this)
        },
        secondary: {
          text: 'Cancel',
          onClick: this.handleSecondaryClick.bind(this)
        }
      }
    };

    return (
      <Page>
        <Header data={headerData} />
        <Main>
          <Form formData={formData} />
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    const inputs = this.props.inputs;
    const { settings } = this.props.app;
    Object.keys(inputs).map((name) => {
      this.props.inputSetValue(name, settings[name]);
    })
  }

  handlePrimaryClick() {
    const { repoName, buildCommand, mainBranch, period } = this.props.inputs;

    if (!repoName.value) {
      this.props.inputSetValidationStatus('repoName', false);
      return;
    }
    if (!buildCommand.value) {
      this.props.inputSetValidationStatus('buildCommand', false);
      return;
    }

    const newSettings = {
      repoName: repoName.value,
      buildCommand: buildCommand.value,
      mainBranch: mainBranch.value,
      period: period.value,
    };

    this.props.updateSettings(newSettings);
  }

  handleSecondaryClick() {
    document.location.href = '/start-screen';
  }
}

const mapStateToProps = state => ({
  app: state.app,
  inputs: state.inputs,
});

const mapDispatchToProps = dispatch => ({
  inputSetValue: (name, value) => dispatch(inputSetValue(name, value)),
  inputSetValidationStatus: (name, status) => dispatch(inputSetValidationStatus(name, status)),
  updateSettings: (name) => dispatch(updateSettings(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsClass);
