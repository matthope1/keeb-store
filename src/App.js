import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

import Header from './Header';
import Footer from './Footer';
import Product from './Product';

class App extends Component {
  constructor() {
    super();
    this.state = {

      // each element of products is an array with 2 indexes
      // the first index being the name the products
      // the second index being the information on the product
      products: [],
      cart: [],
    }
  }

  componentDidMount() {
    // variable that holds a reference to our database

    const dbRef = firebase.database().ref();

    // add an event listenter that will fire every time there
    // is a change in the db

    let productList = [];
    let cartList = [];

    // this event listener takes a callback function which we will user to get our data
    // from the databse and call that data 'response'

    dbRef.on('value', (response) => {

      // entries returns an array of antry
      // entry[0] is the key, entry[1] is the value

      productList =  Object.entries(response.val().products);
      cartList = Object.entries(response.val().cart);

      // console.log(productList);
      this.setState({
        products: productList,
        cart: cartList
      })
    });

  }

  render (){
    return (
      <div className="App">
        <Header/>
        <div className="header-background">
          <button>Enter store</button>
        </div> 

        <div className="products-flex wrapper">
          {this.state.products.map((product) => {
            return (
              <Product key={product[0]} name={product[0]} productInfo={product[1]} />
            )
          })}
        </div>

        <Footer/>
      </div>
    );
  }
}

export default App;
