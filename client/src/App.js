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
import Footer from './components/Footer/Footer';
import './css/style.styl';

function App() {
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

export default App;
