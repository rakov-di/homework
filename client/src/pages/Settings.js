import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';

import { api } from '../api.js'

class Settings extends Component {
  state = {
    isFetching: false,
    settings: {},
    isInputsInvalid: {
      repoName: false,
      buildCommand: false,
    }
  };

  render() {
    const headerData = {
      title: {
        valign: 'center',
        type: 'title',
        text: 'School CI server',
      },
      btns: []
    };

    const inputs = [
      {
        direction: 'column',
        name: 'repoName',
        id: 'repo',
        display: 'block',
        labelText: 'GitHub repository',
        isRequired: true,
        isInvalid: this.state.isInputsInvalid.repoName,
        inputPlh: 'user-name/repo-name',
        onChange: this.handleInputChange.bind(this),
        onFocus: this.handleInputFocus.bind(this),
        errorMsg: 'This field can\'t be empty'
      },
      {
        direction: 'column',
        name: 'buildCommand',
        id: 'command',
        display: 'block',
        labelText: 'Build command',
        isRequired: true,
        isInvalid: this.state.isInputsInvalid.buildCommand,
        inputPlh: 'type command',
        onChange: this.handleInputChange.bind(this),
        onFocus: this.handleInputFocus.bind(this),
        errorMsg: 'This field can\'t be empty'
      },
      {
        direction: 'column',
        name: 'mainBranch',
        id: 'branch',
        display: 'block',
        labelText: 'Main branch',
        inputPlh: 'type branch',
        onChange: this.handleInputChange.bind(this)
      },
      {
        direction: 'row',
        name: 'period',
        id: 'minutes',
        display: 'inline',
        labelText: 'Synchronize every',
        labelValueText: 'minutes',
        pattern: '^[0-9]*$',
        onChange: this.handleInputChange.bind(this),
        onInput: this.checkIsNum.bind(this)
      }
    ];

    const btns = {
      primary: {
        text: 'Save',
        onClick: this.handlePrimaryClick.bind(this)
      },
      secondary: {
        text: 'Cancel',
        onClick: this.handleSecondaryClick.bind(this)
      }
    };

    return (
      <Page>
        <Header data={headerData} />
        <Main>
          <Form isHeader={true} inputs={inputs} btns={btns} isFetching={this.state.isFetching} />
        </Main>
        <Footer />
      </Page>
    )
  }

  checkIsNum(e) {
    let val = e.target.value;
    const isNum = /^[0-9]*$/.test(val);
    if (!isNum) e.target.value = val.slice(0, -1);
  }

  handleInputFocus(e) {
    const { target } = e;
    const name = target.name;

    this.setState({
      isInputsInvalid: {
        ...this.state.isInputsInvalid,
        [name]: false
      }
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const value = target.value;
    const name = target.name;

    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    });
  }

  handlePrimaryClick(e) {
    if (!this.state.settings.repoName) {
      this.setState({
        isInputsInvalid: {
          ...this.state.isInputsInvalid,
          repoName: true
        }
      });
      return;
    }
    if (!this.state.settings.buildCommand) {
      this.setState({
        isInputsInvalid: {
          ...this.state.isInputsInvalid,
          buildCommand: true
        }
      });
      return;
    }

    this.setState({
      isFetching: true
    });

    api.updateSettings(this.state.settings, () => {
      this.setState({
        isFetching: false
      });
    });
  }

  handleSecondaryClick() {
    document.location.href = '/start-screen';
  }
}

export default Settings;
