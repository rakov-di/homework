import React, { Component } from 'react';
import BtnSmall from '../BtnSmall/BtnSmall';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValignment: ['center', 'top'],
      titleType: ['title', 'repo-title'],
      titleText: ['School CI server', 'philip1967/my-awesome-repo'],
      buttonName: ['Settings', 'Run build', 'Rebuild'],
      buttonIcon: ['settings', 'play', 'rebuild'],
      display: true
    }
  }

  render() {
    let titleValign, titleType, titleText, btns;
    let location = window.location.pathname;
    const { toggleBackdropVisibility } = this.props;

    switch (location) {
      case '/':
      case '/start-screen':
        titleValign = 'center';
        titleType = 'title';
        titleText = 'School CI server';
        btns = [
          {
            type: 'icon-text',
            icon: 'settings-before',
            text: 'Settings'
          }
        ];
        break;
      case '/settings':
        titleValign = 'center';
        titleType = 'title';
        titleText = 'School CI server';
        btns = [];
        break;
      case '/build-history':
        titleValign = 'top';
        titleType = 'repo-title';
        titleText = 'philip1967/my-awesome-repo';
        btns = [
          {
            type: 'icon-text',
            icon: 'run-before',
            text: 'Run build',
            onClick: toggleBackdropVisibility
          },
          {
            type: 'only-icon',
            icon: 'settings-before',
            text: ''
          }
        ];
        break;
      case '/build-details':
        titleValign = 'top';
        titleType = 'repo-title';
        titleText = 'philip1967/my-awesome-repo';
        btns = [
          {
            type: 'icon-text',
            icon: 'rebuild-before',
            text: 'Rebuild'
          },
          {
            type: 'only-icon',
            icon: 'settings-before',
            text: ''
          }
        ];
        break;
      default:
        break;
    }

    return (
      <header className="header">
        <div className={`header__container header__container_valign_${titleValign}`}>
          <div className={`header__${titleType}`}>{titleText}</div>
          <div className="header__btn-group">
            {btns.map((btn, idx) =>
              <BtnSmall key={idx}
                        type={btn.type}
                        icon={btn.icon}
                        text={btn.text}
                        mixClass='header__btn'
                        onClick={btn.onClick}
              />
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
