import React, { Component } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class Page extends Component {
  state = {
    isBackdropShown: false

  };
  render() {
    return (
      <div className="page">
        <Header toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)} />
        <Main isBackdropShown = {this.state.isBackdropShown} toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)} />
        <Footer />
      </div>
    );
  }

  toggleBackdropVisibility = (e) => {
    this.setState({
      isBackdropShown: !this.state.isBackdropShown
    });
  }
}

export default Page;
