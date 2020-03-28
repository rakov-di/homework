import React from 'react';
// import logo from './logo.svg';
// import './App.css';
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
          <Greeting />
          <Form />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
