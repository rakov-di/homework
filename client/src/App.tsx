import './css/style.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurSettings } from './redux/actions/actions';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import StartScreen from './pages/StartScreen.tsx';
import Settings from './pages/Settings.tsx';
import BuildHistory from './pages/BuildHistory.tsx';
import BuildDetails from './pages/BuildDetails.tsx';
import Loader from './components/Loader/Loader';

type AppProps = {
  main: {
    isFetchEnded: boolean;
    settings: any;
  };
  getCurSettings(): any;
}

class AppClass extends Component<AppProps, any> {
  render() {
    const { isFetchEnded, settings } = this.props.main;

    return (
      <Router history={history}>
        {(isFetchEnded) ? (
          <Switch>
            <Route exact path='/' component={settings.repoName ? BuildHistory : StartScreen} />
            <Route path='/start-screen' component={settings.repoName ? BuildHistory : StartScreen} />
            <Route path='/settings' component={Settings} />
            <Route path='/build-history' component={BuildHistory} />
            <Route path='/build/:buildId' component={BuildDetails} />
          </Switch>
        ) : (
          <Loader />
        )}
      </Router>
    );
  }

  componentDidMount() {
    this.props.getCurSettings();
  }
}

const mapStateToProps = (state: any) => ({
  main: state.main
});

const mapDispatchToProps = { getCurSettings };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppClass);
