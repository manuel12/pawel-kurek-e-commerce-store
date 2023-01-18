import React, { Component } from 'react';
import Main from '../../Layouts/Main/Main';
import Header from '../../Layouts/Header/Header';
import './App.scss';

class App extends Component {

  render(){
    return (
      <div className="app">
        <Header/>
        <Main />
      </div>
    )
  }
}

export default App;
