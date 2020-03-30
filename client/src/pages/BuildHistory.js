import React, { Component } from 'react';

import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import CardList from '../components/CardList/CardList';
import Modal from '../components/Modal/Modal';
import Footer from '../components/Footer/Footer';

import { api } from '../api.js'

class BuildHistory extends Component {
  state = {
    isFetching: false,
    isBackdropShown: false,
    commitHash: '',
    builds: []
  };

  render() {
    const headerData = {
      titleValign: 'top',
      titleType: 'repo-title',
      titleText: 'philip1967/my-awesome-repo',
      btns: [
        {
          type: 'icon-text',
          icon: 'run-before',
          text: 'Run build',
          onClick: this.toggleBackdropVisibility.bind(this)
        },
        {
          type: 'only-icon',
          icon: 'settings-before',
          text: ''
        }
      ]
    };

    return (
      <Page>
        <Header data={headerData} isBackdropShown = {this.state.isBackdropShown} />
        <Main>
          <CardList builds={this.state.builds}/>
          {/*TODO Возможно, по клику стоит создавать Modal с нуля, а не показывать заранее созданный*/}
          {this.state.isBackdropShown && <Modal handleInputChange={this.handleInputChange.bind(this)}
                                                handlePrimaryClick={this.handlePrimaryClick.bind(this)}
                                                toggleBackdropVisibility={this.toggleBackdropVisibility.bind(this)}
          />}
        </Main>
        <Footer />
      </Page>
    )
  }

  componentDidMount() {
    window.history.pushState(null, document.title, `${window.location.origin}/build-history`);

    api.getBuildsList((builds) => {
      this.setState({
        builds: builds
      })
    });
  }



  handleInputChange(e) {
    const { target } = e;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlePrimaryClick() {
    this.setState({
      isFetching: true
    });

    api.addCommitToQueue(this.state.commitHash, () => {
      this.setState({
        isFetching: false
      });

      debugger
      const build = this.state.builds.find(build => build.commitHash === this.state.commitHash);
      document.location.href = `/build/${build.id}`;
    });
  }

  toggleBackdropVisibility() {
    this.setState({
      isBackdropShown: !this.state.isBackdropShown
    });
  }
}

export default BuildHistory;
