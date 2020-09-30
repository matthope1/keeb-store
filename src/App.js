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
      products: [],
      cart: [],
    }
  }

  componentDidMount() {
    // variable that holds a reference to our database
    const dbRef = firebase.database().ref();

    // lists that will be populated with data from firebase
    let productList = [];
    let cartList = [];

    // event listener that will fire every time there is a change
    // in the firebase db
    dbRef.on('value', (response) => {

      // for each product, entries will make an array with 2 elements
      // 0(index) being the key and 1(index) being the value
      productList =  Object.entries(response.val().products);

      if (response.val().cart){
        cartList = Object.entries(response.val().cart);
      } 
      else {
        cartList = [];
      }

      this.setState({
        products: productList,
        cart: cartList
      })
    });
  }

  addToCart = (product) => {
    const dbRef = firebase.database().ref('cart/');

    let productName = product[0];
    let productDataString = `{ "price": ${product[1].price}, "type": "${product[1].type}", "url": "${product[1].url}" }`;
    let productDataObj = (productDataString);

    let itemToBeAdded = JSON.parse(`{ "${productName}" : ${productDataObj} }` )

    dbRef.push(itemToBeAdded);
  }

  deleteFromCart = (product) => {
    const dbRef = firebase.database().ref('cart/')

    // dbRef.remove()
  }

  handleClick = (event) => {
    event.preventDefault();

    console.log("handleClick function called");
  }

  render (){
    return (
      <div className="App">
        <Header cartList={this.state.cart} />
        <div className="header-background">
          <button onClick={this.handleClick}>Enter store</button>
        </div> 

        <div className="products-flex wrapper">
          {this.state.products.map((product) => {
            return (
              <Product 
                addToCart={() => this.addToCart(product)} 
                deleteFromCart = {() => this.deleteFromCart(product)} 
                key={product[0]} 
                name={product[0]} 
                productInfo={product[1]}
              />
            )
          })}
        </div>

        <Footer/>
      </div>
    );
  }
}

export default App;
