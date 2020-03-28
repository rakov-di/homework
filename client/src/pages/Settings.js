import React, { Component } from 'react';
import Form from '../components/Form/Form';

class Settings extends Component {
  render() {
    const inputs = [
      {
        direction: 'column',
        id: 'repo',
        display: 'block',
        labelText: 'GitHub repository',
        isRequired: true,
        inputPlh: 'user-name/repo-name'
      },
      {
        direction: 'column',
        id: 'command',
        display: 'block',
        labelText: 'Build command',
        inputPlh: 'type command'
      },
      {
        direction: 'column',
        id: 'branch',
        display: 'block',
        labelText: 'Main branch',
        inputPlh: 'type branch'
      },
      {
        direction: 'row',
        id: 'minutes',
        display: 'inline',
        labelText: 'Synchronize every',
        labelValueText: 'minutes',
        maxLength: 3
      }
    ];

    const btns = {
      textPrimary: 'Save',
      textSecondary: 'Cancel'
    };

    return (
      <Form inputs={inputs} btns={btns} isHeader={true} />
    )
  }
}

export default Settings;
