import React, { Component } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class Page extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Page;
