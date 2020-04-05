import './css/style.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurSettings } from './redux/actions/actions';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import StartScreen from './pages/StartScreen';
import Settings from './pages/Settings';
import BuildHistory from './pages/BuildHistory';
import BuildDetails from './pages/BuildDetails';
import Loader from './components/Loader/Loader';


class App extends Component {
  render() {
    const { fetchEnded, settings } = this.props.app;

    return (
      <Router history={history}>
        {(fetchEnded) ? (
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

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  getCurSettings: () => dispatch(getCurSettings())
});

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
