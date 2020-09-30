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

    // let prodList = [];
    // let cList = [];

    // this event listener takes a callback function which we will user to get our data
    // from the databse and call that data 'response'

    dbRef.on('value', (response) => {

      // entries returns an array of antry
      // entry[0] is the key, entry[1] is the value

      productList =  Object.entries(response.val().products);

      // if cart has items 
      if (response.val().cart){
        cartList = Object.entries(response.val().cart);
        
        // this is how you access blackcase: ...
        // console.log(cartList[0][1]);
      } 
      else {
        cartList = [];
      }

      this.setState({
        products: productList,
        cart: cartList

        // products: prodList,
        // cart: cList 
      })
    });
  }

  addToCart = (product) => {
    const dbRef = firebase.database().ref('cart/');

    let productName = product[0];
    let productDataString = `{ "price": ${product[1].price}, "type": "${product[1].type}", "url": "${product[1].url}" }`;
    let productDataObj = (productDataString);

    // an object created with string literal
    let itemToBeAdded = JSON.parse(`{ "${productName}" : ${productDataObj} }` )

    // console.log("itemtobeadded",itemToBeAdded);

    // push to db

    dbRef.push(itemToBeAdded);
  }

  handleClick = (event) => {
    event.preventDefault();

    console.log("handleClick function called");
  }

  render (){
    return (
      <div className="App">
        <Header cartList={this.state.cart} handleClick={this.handleClick} />
        <div className="header-background">
          <button onClick={this.handleClick}>Enter store</button>
        </div> 

        <div className="products-flex wrapper">
          {this.state.products.map((product) => {
            return (
              <Product addToCart={() => this.addToCart(product)} key={product[0]} name={product[0]} productInfo={product[1]} />
            )
          })}
        </div>

         <div className="cartDisplay">
          <h1>Hello! this is cart display!! how are you doing</h1>
          {this.state.cart.map((product) => {
            console.log(product[1][Object.keys(product[1])]);

            let name = Object.keys(product[1]);
            let productInfo = product[1][Object.keys(product[1])];
            let key = product[0];

            // TODO:
            // structure the product data so that It can be sent to a product component
            // using props

          //     return (
          //       <div>
          //         <p>{Object.keys(product[1])}</p>
          //         <p>{product[1].price} {product[1].type} {product[1].url}</p>
          //         {/* <p>{Object.values(product[1])}</p> */}
          //       </div>
          //     )

            return (
              <div>
                <p>this this this</p>
                <Product key={key} name={name} productInfo={productInfo} />
              </div>
            )

          })}
        </div> 

        <Footer/>
      </div>
    );
  }
}

export default App;
