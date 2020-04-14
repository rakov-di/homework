import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputSetValue, inputSetValidationStatus, updateSettings } from '../redux/actions/actions';

import BtnBig from '../components/BtnBig/BtnBig';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import Header from '../components/Header/Header';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Main from '../components/Main/Main';
import Page from '../components/Page/Page';


class SettingsClass extends Component {
  render() {
    const { repoName, buildCommand, mainBranch, period } = this.props.inputs;

    const inputs = [
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
    ];

    return (
      <Page type='settings'>
        <Header valign='center' type='title' text='School CI server' />
        <Main>
          <Form
            isHeader={true}
            inputs={inputs.map((input, idx) =>
                <div key={input.id} className={`form__field form__field_direction_${input.direction}`}>
                  <Label
                    htmlFor={input.id}
                    type='default'
                    display={input.display}
                    text={input.labelText}
                    isRequired={input.isRequired}
                  />
                  <Input
                    name={input.name}
                    id={input.id}
                    display={input.display}
                    value={input.value}
                    plh={input.inputPlh}
                    isRequired={input.isRequired}
                    isValid={input.isValid || null}
                    type={input.type}
                    pattern={input.pattern || null}
                    errorMsg={input.errorMsg}
                    needCheckOnNum={input.needCheckOnNum}
                  />
                   {input.labelValueText && <Label
                     htmlFor={input.id}
                     type='value'
                     display={input.display}
                     text={input.labelValueText}
                   />}
                </div>
            )}
            btns={
              <>
                <BtnBig
                  action='primary'
                  text='Save'
                  mixClass='form__btn'
                  onClick={this.handlePrimaryClick.bind(this)}
                />
                <BtnBig
                  action='secondary'
                  text='Cancel'
                  mixClass='form__btn'
                  onClick={this.goToPageStartScreen.bind(this)}
                />
              </>
            }
          />
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    const inputs = this.props.inputs;
    const { settings } = this.props.main;
    Object.keys(inputs).map((name) => this.props.inputSetValue(name, settings[name]));
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

  goToPageStartScreen() {
    this.props.history.push('/start-screen');
  }
}

const mapStateToProps = state => ({
  main: state.main,
  inputs: state.inputs,
});

const mapDispatchToProps = { inputSetValue, inputSetValidationStatus, updateSettings };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsClass);
