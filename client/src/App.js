import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './css/style.styl';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header__container header__container_valign_center">
          <div className="header__title">School CI server</div>
          <button className="btn-small btn-small_type_icon-text icon icon_settings-before">Settings</button>
        </div>
      </header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
