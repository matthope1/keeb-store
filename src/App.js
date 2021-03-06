import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase from './firebase';
import 'firebase/auth';
import './App.css';

import Header from './Header';
import Footer from './Footer';
import Product from './Product';

// const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      inventory: [],
      orderBy: 'all',
      pageLoading: true,
      user: null,
    }

    this.writeUserData = this.writeUserData.bind(this);
    this.writeCartData = this.writeCartData.bind(this);
    this.readCartData = this.readCartData.bind(this);
  }

  writeUserData(userId) {
    firebase.database().ref('users/' + userId).set({
      uid : userId,
      // cart: [],
    });
  }

  readCartData(userId) {
    let cartRef = firebase.database().ref('users/' + userId + '/cart');
    let data;

    cartRef.on('value', (snapshot) => {
      data = snapshot.val();
    });

    return data;
  }

  writeCartData(userId, product) {
    // if there is, then copy that data and add new product

    let cartData = this.readCartData(userId);
    let cartPath;

    if (cartData) {
      // TODO: copy the data currently in cart and add new product
      console.log(cartData);
    }
    else {
      cartPath = `users/${userId}/cart`;
        firebase.database().ref(cartPath).set({
          product
      });
    }
  };

  componentDidMount() { 

    // lists that will be populated with data from firebase
    let productList = [];
    let cartList = [];
    let inventoryList = [];

    // TODO: uncomment and test this 
    // check to see if the user was already logged in from prev session
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // let path = `users/${this.state.user.uid}`;
        // const dbRef = firebase.database().ref(path);
        // let itemToBeAdded = JSON.parse(`{ "itemsInCart" : 0 }`);
        // dbRef.push(itemToBeAdded);
      } 
    });
    
    if (!(this.state.user)) {
      auth.signInAnonymously()
      .then(() => {
        this.setState({user: auth.currentUser}, function() {
          this.writeUserData(this.state.user.uid);
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
      });
    }

    const dbRef = firebase.database().ref();

    // event listener that will fire every time there is a change in the rt db
    dbRef.on('value', (response) => {

      // for each product, entries will make an array with 2 elements
      // 0(index) being the key and 1(index) being the value
      productList =  Object.entries(response.val().products);
      inventoryList = Object.entries(response.val().inventory);

      if (this.state.user.uid) {
        cartList = response.val().users[this.state.user.uid].cart;
      } else {
        cartList = [];
      }

      this.setState({
        products: productList,
        cart: cartList,
        pageLoading: false
      })
      
    });
  }

  addToCart = (product) => {
    let cartPath;
    let uid = this.state.user.uid;
    let productName = product[0];
    let productDataString = `{ "price": ${product[1].price}, "type": "${product[1].type}", "url": "${product[1].url}" }`;
    let productObj = JSON.parse(`{ "${productName}" : ${productDataString} }` );

    console.log("add to cart was called");

    if (uid) {
      cartPath = `users/${this.state.user.uid}/cart`;
      this.writeCartData(uid,productObj);
    }
    else {
      console.log("there was a problem adding to the cart");
    }
  }

  orderBySelection = (event) => {
    event.preventDefault();
    let userSelection = event.target.value;

    this.setState({
      orderBy: userSelection,
    })
  }

  handleClick = (event) => {
    event.preventDefault();
  }

  getFilteredProds = (productsList) => {
    let filteredProds = productsList.filter((product) => {
      let productInfo = product[1];
      if (productInfo.type === this.state.orderBy || this.state.orderBy === 'all') {
        return product;
      }
    })
    return filteredProds;
  }

  render (){

    if (this.state.pageLoading) {
      return (
        <div className="page-loader">
          <h1>loading...</h1>
        </div>
      )
    }
    else {

      let productsList = [...this.state.products];
      //filter the displayed produducts based on user input
      let filteredProds = this.getFilteredProds(productsList);

      return (
        <div className="App">
          <Header cartList={this.state.cart} removeFromCart={this.removeFromCart} userInfo={this.state.user}/>
          {this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>}
          <div className="header-background">
            <button><a href="#order-by">Enter store</a></button>
          </div>

          <div id="order-by" className="order-by">
            <h2>browse by: </h2>
            <button className="order-by__btn" onClick={(event) => {this.orderBySelection(event)}} value="keyboard">keyboards</button>
            <button className="order-by__btn" onClick={(event) => {this.orderBySelection(event)}} value="case">cases</button>
            <button className="order-by__btn" onClick={(event) => {this.orderBySelection(event)}} value="keycap">keycaps</button>
            <button className="order-by__btn" onClick={(event) => {this.orderBySelection(event)}} value="all">all</button>
          </div>

          <div id="products" className="products-flex wrapper">
           
            {filteredProds.map((product) => {
              return (
                <Product 
                  addToCart={() => this.addToCart(product)} 
                  key={product[0]} 
                  name={product[0]} 
                  productInfo={product[1]}
                />
              )
            })}

          </div>

          <Footer/>
        </div>
      )
    }
   
  }
}

export default App;
