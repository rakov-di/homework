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
    const { inputs } = this.props.settings;
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
          value: inputs.repoName.value,
          labelText: 'GitHub repository',
          isRequired: true,
          isValid: inputs.repoName.isValid,
          inputPlh: 'user-name/repo-name',
          errorMsg: 'This field can\'t be empty',
        },
        {
          direction: 'column',
          name: 'buildCommand',
          id: 'command',
          display: 'block',
          value: inputs.buildCommand.value,
          labelText: 'Build command',
          isRequired: true,
          isValid: inputs.buildCommand.isValid,
          inputPlh: 'type command',
          errorMsg: 'This field can\'t be empty',
        },
        {
          direction: 'column',
          name: 'mainBranch',
          id: 'branch',
          display: 'block',
          value: inputs.mainBranch.value,
          labelText: 'Main branch',
          inputPlh: 'type branch',
          isValid: inputs.mainBranch.isValid,
        },
        {
          direction: 'row',
          name: 'period',
          id: 'minutes',
          display: 'inline',
          value: inputs.period.value,
          labelText: 'Synchronize every',
          labelValueText: 'minutes',
          pattern: '^[0-9]*$',
          isValid: inputs.period.isValid,
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
    const { inputs } = this.props.settings;
    const { settings } = this.props.app;
    Object.keys(inputs).map((name) => {
      this.props.inputSetValue(name, settings[name]);
    })
  }

  handlePrimaryClick() {
    const { inputs } = this.props.settings;

    if (!inputs.repoName.value) {
      this.props.inputSetValidationStatus('repoName', false);
      return;
    }
    if (!inputs.buildCommand.value) {
      this.props.inputSetValidationStatus('buildCommand', false);
      return;
    }

    const newSettings = {
      repoName: inputs.repoName.value,
      buildCommand: inputs.buildCommand.value,
      mainBranch: inputs.mainBranch.value,
      period: inputs.period.value,
    };

    this.props.updateSettings(newSettings);
  }

  handleSecondaryClick() {
    document.location.href = '/start-screen';
  }
}

const mapStateToProps = state => ({
  app: state.app,
  settings: state.settings,
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
