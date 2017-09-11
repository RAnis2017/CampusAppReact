import React, { Component } from 'react';
import './App.css';
import {fbapp} from './index.js';
import Login from './components/Login';
import Logout from './components/Logout';
import {Switch , Route} from 'react-router-dom'
class App extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/logout' component={Logout}/>
      </Switch>
    );
  }
}

export default App;
