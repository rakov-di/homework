import './css/style.styl';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurSettings } from './redux/actions/actions';
import './utils/i18n/i18n';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import StartScreen from './pages/StartScreen';
import Settings from './pages/Settings';
import BuildHistory from './pages/BuildHistory';
import BuildDetails from './pages/BuildDetails';
import Loader from './components/Loader/Loader';


class AppClass extends Component {
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

const mapStateToProps = state => ({
  main: state.main
});

const mapDispatchToProps = { getCurSettings };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppClass);
