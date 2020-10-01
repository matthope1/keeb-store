import React, { Component } from 'react';
import firebase from './firebase';
import 'firebase/auth';
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
      inventory: [],
      orderBy: 'all',
      pageLoading: true,
    }
  }

  componentDidMount() {
    // variable that holds a reference to our database
    const dbRef = firebase.database().ref();


    //TODO: 

    // firebase.auth().signInAnonymously().catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;

    //   console.log(errorCode);
    //   console.log(errorMessage);
    // }); 


    // firebase.auth().onAuthStateChanged( (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     console.log(uid);
    //     this.setState({
    //       uid: uid,
    //     })

    //     // we want each user to have their own cart
    //     dbRef.child('cart').push(uid);
    //     dbRef.child('cart').child(uid).push(this.state.cart);



    //   }
    //   else {
    //     console.log('signed out');
    //   }
    // });





    // lists that will be populated with data from firebase
    let productList = [];
    let cartList = [];
    let inventoryList = [];

    // event listener that will fire every time there is a change
    // in the firebase db
    dbRef.on('value', (response) => {


      // TODO: 

      // const data = response.val();

      // if (data) {
      //   console.log(data);
      //   let user = data.cart[this.state.uid]; 
      //   console.log("printing user data");
      //   for (let key in user) {
      //     console.log(key, user[key]);
      //   }
      // }

      // for each product, entries will make an array with 2 elements
      // 0(index) being the key and 1(index) being the value
      productList =  Object.entries(response.val().products);
      inventoryList = Object.entries(response.val().inventory);
    
      if (response.val().cart){
        cartList = Object.entries(response.val().cart);
      } 
      else {
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
    const dbRef = firebase.database().ref('cart/');

    let productName = product[0];
    let productDataString = `{ "price": ${product[1].price}, "type": "${product[1].type}", "url": "${product[1].url}" }`;
    let productDataObj = (productDataString);

    let itemToBeAdded = JSON.parse(`{ "${productName}" : ${productDataObj} }` );

    dbRef.push(itemToBeAdded);
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

    // console.log("handleClick function called");
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

      let filteredProds = productsList.filter((product) => {
        let productInfo = product[1];

        if (productInfo.type == this.state.orderBy || this.state.orderBy == 'all') {
          return product;
        }
      })

      return (
        <div className="App">
          <Header cartList={this.state.cart} removeFromCart={this.removeFromCart}/>
          <div className="header-background">
            <button onClick={this.handleClick}>Enter store</button>
          </div> 

          <div className="orderBy">
            <h2>browse by: </h2>
            <button onClick={(event) => {this.orderBySelection(event)}} value="keyboard">keyboards</button>
            <button onClick={(event) => {this.orderBySelection(event)}} value="case">cases</button>
            <button onClick={(event) => {this.orderBySelection(event)}} value="keycap">keycaps</button>
            <button onClick={(event) => {this.orderBySelection(event)}} value="all">all</button>
          </div>

          <div className="products-flex wrapper">
           
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
