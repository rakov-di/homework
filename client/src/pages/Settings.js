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
    },
    formStatus: null
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
        value: this.state.settings.repoName,
        labelText: 'GitHub repository',
        isRequired: true,
        isInvalid: this.state.isInputsInvalid.repoName,
        inputPlh: 'user-name/repo-name',
        onChange: this.handleInputChange.bind(this),
        onFocus: this.handleInputFocus.bind(this),
        errorMsg: 'This field can\'t be empty',
        clearInput: this.clearInput.bind(this)
      },
      {
        direction: 'column',
        name: 'buildCommand',
        id: 'command',
        display: 'block',
        value: this.state.settings.buildCommand,
        labelText: 'Build command',
        isRequired: true,
        isInvalid: this.state.isInputsInvalid.buildCommand,
        inputPlh: 'type command',
        onChange: this.handleInputChange.bind(this),
        onFocus: this.handleInputFocus.bind(this),
        errorMsg: 'This field can\'t be empty',
        clearInput: this.clearInput.bind(this)
      },
      {
        direction: 'column',
        name: 'mainBranch',
        id: 'branch',
        display: 'block',
        value: this.state.settings.mainBranch,
        labelText: 'Main branch',
        inputPlh: 'type branch',
        onChange: this.handleInputChange.bind(this),
        clearInput: this.clearInput.bind(this)
      },
      {
        direction: 'row',
        name: 'period',
        id: 'minutes',
        display: 'inline',
        value: this.state.settings.period,
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
          <Form isHeader={true} inputs={inputs} btns={btns} isFetching={this.state.isFetching} status={this.state.formStatus}/>
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    // TODO Запрашивать настройки один раз, а не какждый раз заново для каждой страницы
    api.getSettings((data) => {
      this.setState({
        settings: data
      })
    });
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

  handlePrimaryClick() {
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
      isFetching: true,
      formStatus: {}
    });

    api.updateSettings(this.state.settings, (res) => {
      this.setState({
        isFetching: false
      });

      if (res.status === 'success') {
        this.setState({
          formStatus: {
            value: res.status,
            text: 'Settings have been successfully saved.'
          }
        });
      }
      else if (res.status === 'error') {
        this.setState({
          formStatus: {
            value: res.status,
            text: 'Can\'t clone this repository.'
          }
        });
      }
    });
  }

  handleSecondaryClick() {
    document.location.href = '/start-screen';
  }

  clearInput(e) {
    const target = e.target.closest('.input').querySelector('.input__field');
    const name = target.name;
    target.value = '';

    this.setState({
      settings: {
        ...this.state.settings,
        [name]: ''
      }
    })
  }
}

export default Settings;
