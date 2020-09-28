import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

import Header from './Header';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
    }
  }

  componentDidMount() {
    // variable that holds a reference to our database

    const dbRef = firebase.database().ref();

    // add an event listenter that will fire every time there
    // is a change in the db

    // this event listener takes a callback function which we will user to get our data
    // from the databse and call that data 'response'

    let productsData = [];
    let cartData = [];
    //TODO: parse the db query so that you get a list of product objects
    dbRef.on('value', (response) => {

      let productObjects = response.val().products;        
      //TODO: needs your love an attention
      productsData =  Object.entries(productObjects).forEach(product => {
        console.log(product, productObjects[product]);
      })
    
      console.log("done...");
      productsData.push(response.val().products);
      cartData.push(response.val().cart);

      // console.log(productsData);
      // console.log(cartData);

      this.setState({
        products: productsData,
        cart: cartData
      })
    });

  }

  render (){
    return (
      <div className="App">
        {/* components list */}
        <Header/>
        <div className="header-background">
          <button>Enter store</button>
        </div> 

        <Footer/>
      </div>
    );
  }
}

export default App;
