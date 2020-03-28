import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

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
              <Route exact path='/' component={Greeting} />
              <Route path='/start-screen' component={Greeting} />
              <Route path='/settings' component={Form} />
              {/*<Route path='/build_history' component={BuildHistory} />*/}
              {/*<Route path='/build_details' component={BuildDetails} />*/}
            </Switch>
          </Router>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
