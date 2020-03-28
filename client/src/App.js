import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import StartScreen from './pages/StartScreen';
import Settings from './pages/Settings';
import BuildHistory from './pages/BuildHistory';
import BuildDetails from './pages/BuildDetails';

import Header from './components/Header/Header';
import Greeting from './components/Greeting/Greeting';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import './css/style.styl';

function App() {
  return (
    <div className="page">
      <Header />
      <main className="main main_center">
        <div className="main__container">
          <Router history={history}>
            <Switch>
              <Route exact path='/' component={StartScreen} />
              <Route path='/start-screen' component={StartScreen} />
              <Route path='/settings' component={Settings} />
              <Route path='/build_history' component={BuildHistory} />
              <Route path='/build_details' component={BuildDetails} />
            </Switch>
          </Router>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
