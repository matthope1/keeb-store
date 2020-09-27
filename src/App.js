import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }


  componentDidMount() {
    // variable that holds a reference to our database
    const dbRef = firebase.database().ref();
  }

  render (){
    return (
        <div className="App">
          
        </div>
      );
  }
}

export default App;
