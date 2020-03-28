import React, { Component } from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import history from '../../history';

import Header from '../Header/Header';
import StartScreen from '../../pages/StartScreen';
import Settings from '../../pages/Settings';
import BuildHistory from '../../pages/BuildHistory';
import BuildDetails from '../../pages/BuildDetails';
import Footer from '../Footer/Footer';

class Page extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        {/*TODO Переписать по нормальному*/}
        <main className={`main ${window.location.pathname === '/start-screen' && 'main_center'}`}>
          <div className="main__container">
            <Router history={history}>
              <Switch>
                <Route exact path='/' component={StartScreen} />
                <Route path='/start-screen' component={StartScreen} />
                <Route path='/settings' component={Settings} />
                <Route path='/build-history' component={BuildHistory} />
                <Route path='/build-details' component={BuildDetails} />
              </Switch>
            </Router>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Page;
