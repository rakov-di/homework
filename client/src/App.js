import './css/style.styl';

import React, { Component } from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import StartScreen from './pages/StartScreen';
import Settings from './pages/Settings';
import BuildHistory from './pages/BuildHistory';
import BuildDetails from './pages/BuildDetails';
import Loader from './components/Loader/Loader';

import { api } from './api.js';

class App extends Component {
  state = {
    fetchEnded: false,
    settings: null
  };

  render() {
    return (
      <Router history={history}>
        {(this.state.fetchEnded) ? (
          <Switch>
            <Route exact path='/' component={this.state.settings ? BuildHistory : StartScreen} />
            <Route path='/start-screen' component={this.state.settings ? BuildHistory : StartScreen} />
            <Route path='/settings' component={Settings} />
            <Route path='/build-history' component={BuildHistory} />
            <Route path='/build-details' component={BuildDetails} />
          </Switch>
        ) : (
          <Loader />
        )}
      </Router>
    );
  }

  componentDidMount() {
    api.getSettings((data) => {
      this.setState({
        fetchEnded: true,
        settings: data.data
      })
    });
  }
}

export default App;
