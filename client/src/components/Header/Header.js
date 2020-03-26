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
    let location = '/build-details';

    switch (location) {
      case '/start-screen':
        titleValign = 'center';
        titleType = 'title';
        titleText = 'School CI server';
        btns = [
          {
            btnType: 'icon-text',
            btnIcon: 'settings-before',
            btnText: 'settings'
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
            btnType: 'icon-text',
            btnIcon: 'run-before',
            btnText: 'Run build'
          },
          {
            btnType: 'only-icon',
            btnIcon: 'settings-before',
            btnText: ''
          }
        ];
        break;
      case '/build-details':
        titleValign = 'top';
        titleType = 'repo-title';
        titleText = 'philip1967/my-awesome-repo';
        btns = [
          {
            btnType: 'icon-text',
            btnIcon: 'rebuild-before',
            btnText: 'Rebuild'
          },
          {
            btnType: 'only-icon',
            btnIcon: 'settings-before',
            btnText: ''
          }
        ];
        break;
      default:
        break;
    }

    return (
      <div className={`header__container header__container_valign_${titleValign}`}>
        <div className={`header__${titleType}`}>{titleText}</div>
        <div className="header__btn-group">
          {btns.map((btn) =>
            <BtnSmall btnType={btn.btnType} btnIcon={btn.btnIcon} btnText={btn.btnText}/>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
