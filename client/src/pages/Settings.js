import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';

class Settings extends Component {
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
      <div className='page'>
        <Header data={headerData} />
        <div className='main'>
          <div className='main__container'>
            <Form inputs={inputs} btns={btns} isHeader={true} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Settings;
