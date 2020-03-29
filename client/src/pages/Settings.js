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
    settings: {}
  };

  render() {
    const headerData = {
      titleValign: 'center',
      titleType: 'title',
      titleText: 'School CI server',
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
        inputPlh: 'user-name/repo-name',
        onChange: this.handleInputChange.bind(this)
      },
      {
        direction: 'column',
        name: 'buildCommand',
        id: 'command',
        display: 'block',
        labelText: 'Build command',
        isRequired: true,
        inputPlh: 'type command',
        onChange: this.handleInputChange.bind(this)
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
        type: 'number',
        pattern: '[0-9]{,3}',
        onChange: this.handleInputChange.bind(this)
      }
    ];
    //TODO Сделать нормальную валидацию в input

    const btns = {
      primary: {
        text: 'Save',
        cb: this.handlePrimaryClick.bind(this)
      },
      secondary: {
        text: 'Cancel',
        cb: this.handleSecondaryClick.bind(this)
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
