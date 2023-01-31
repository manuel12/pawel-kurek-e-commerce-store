import React, { Component } from 'react';
import './App.scss';
import allActions from '../../actions';
import { connect } from 'react-redux';
import isDescendant from '../../helpers/isDescendant';
import Header from "../../Layouts/Header/Header.js";
import Main from "../../Layouts/Main/Main"

class App extends Component {

  constructor(){
    super()
    this.handleAppClick = this.handleAppClick.bind(this);
  }

  handleAppClick = (e) => {

    const elClass = e.target.className;
    
    if (elClass !== "show-currencies " && this.props.isCurrenciesListOpen === true) {
      this.props.closeCurrencyPicker();
    }

    if (elClass === "show-currencies " && elClass === "show-currencies dash-open" && this.props.isCurrenciesListOpen === false) {
      this.props.openCurrencyPicker();
    }

    if (elClass !== "cart-button__image" && this.props.isCartOverlayVisible && !isDescendant(e.target, "mini-cart")) {
      this.props.toggleCartOverlay();
    }

  }

  render(){

    return (
      <div className="app"
        onClick={this.handleAppClick}
      >
        <Header/>
        <Main/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleCurrencyPicker: allActions.currenciesListActions.toggleVisibility,
  openCurrencyPicker: allActions.currenciesListActions.openCurrencyPicker,
  closeCurrencyPicker: allActions.currenciesListActions.closeCurrencyPicker,
  toggleCartOverlay: allActions.cartOverlayActions.toggleCartOverlay,
}

const mapStateToProps = (state) => {
  const isCurrenciesListOpen = state.rootReducer.currenciesList;
  const isCartOverlayVisible = state.rootReducer.cartOverlay;

  return {
    isCurrenciesListOpen,
    isCartOverlayVisible,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
