import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

import Header from './Header';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }


  componentDidMount() {
    // variable that holds a reference to our database

    //TODO:
    // const dbRef = firebase.database().ref();

  }

  render (){
    return (
        <div className="App">
          {/* components list */}
          <Header/>



          <Footer/>
        </div>
      );
  }
}

export default App;
