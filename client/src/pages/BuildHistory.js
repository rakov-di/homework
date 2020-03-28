import React, { Component } from 'react';
import CardList from '../components/CardList/CardList';
import Backdrop from '../components/Backdrop/Backdrop';

class BuildHistory extends Component {

  render(props) {
    return (
      <>
        <CardList />
        {/*TODO Возможно, по клику стоит создавать Бэкдроп с нуля, а не показывать заранее созданный*/}
        {this.props.isBackdropShown && <Backdrop toggleBackdropVisibility={this.props.toggleBackdropVisibility}/>}
      </>
    )
  }
}

export default BuildHistory;
