import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import MovieShow from './components/MovieShow'
import MovieSearch from './components/MovieSearch'
import PasswordForgetLink from "./components/PasswordForget";

import './App.css';

class App extends Component {
  state = {
    currentUser:{},
    isLoggedIn: false,
  };

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn:currentUser ? true : false,
    })
    console.log(currentUser);
  };

  render(){
    const{
      isLoggedIn,
      currentUser
    } = this.state;
    return (
      <div>
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' render={()=> <Login doSetCurrentUser={this.doSetCurrentUser}/>} />
        <Route exact path='/signup' render={()=> <SignUp doSetCurrentUser={this.doSetCurrentUser}/>} />
        <Route exact path='/password-forget' component={PasswordForgetLink} />
        <Route exact path='/movies/search' component={MovieSearch}/>
        <Route exact path='/movies/:id' render={()=> <MovieShow user={this.state.currentUser}/>} />
      </Switch>
    </div>
    );
  }
}

export default App;
