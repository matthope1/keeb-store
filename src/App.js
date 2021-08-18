import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase from './firebase';
import 'firebase/auth';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

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
      cartObj: {},
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

    const ref = firebase.database().ref('users/')
    let numOfUsers 

    // TODO: get the current num of users, add new user according to user # 
    // increment the numOfUsers attribute in the users object
    // TODO:

    ref.on('value', (snapshot) => {
      numOfUsers = snapshot.val().numOfUsers

      console.log("write user data snapshot.val(): ", snapshot.val())
      
      // TODO: if user does not exist in users
      if(!(userId in snapshot.val())) {
        console.log("user does not exist in db")
        console.log("num of users", numOfUsers)
        // increment current num of users
        firebase.database().ref('users/').set({
          numOfUsers
        })

        firebase.database().ref('users/' + userId).set({
        // firebase.database().ref('users/').set({
          uid : userId,
        });
      } else {
        console.log("num of users", numOfUsers)
        console.log("user does exist in db")
      }
    }, (errorObject) => {
      console.log("the read failed", errorObject)
    })


  }

  readCartData(userId) {
    let cartPath = `users/${userId}/cart`;
    let cartRef = firebase.database().ref(cartPath);
    let data;

    cartRef.on('value', (snapshot) => {
      data = snapshot.val();
      console.log("read cart data", data)
    });

    return data;
  }

  writeCartData(userId, product) {
    // if there is, then copy that data and add new product
    let cartData = this.readCartData(userId);
    let cartPath = `users/${userId}/cart`;
    let userPath = `users/${userId}`
    let cart

    let id = uuidv4()

    if (cartData) {
      // console.log("Write cart data", cartData);
      // console.log("product", product)

      let numItemsInCart = cartData.numOfProducts;
      // cartData[numItemsInCart] = product
      cartData[id] = product
      cartData.numOfProducts++
      cart = cartData

      console.log("newCartData", cartData)
      firebase.database().ref(userPath).set({
        cart
      })
    }
    else {
      cart = {
        numOfProducts: 1 
      }

      cart[id] = product

      firebase.database().ref(userPath).set({
        cart
      })

      // firebase.database().ref(cartPath).set({
      //   id: product,
      //   // 0: product,
      //   numOfProducts: 1 
      // });

    }
  };

  componentDidMount() { 
    // lists that will be populated with data from firebase
    let productList = [];
    let cartList = [];
    let cartObj = {};
    let inventoryList = [];

    // TODO: uncomment and test this 
    // check to see if the user was already logged in from prev session

    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user });

    //     // console.log("user from prev session", user)

    //     // let path = `users/${this.state.user.uid}`;
    //     // const dbRef = firebase.database().ref(path);
    //     // let itemToBeAdded = JSON.parse(`{ "itemsInCart" : 0 }`);
    //     // dbRef.push(itemToBeAdded);
    //   } 
    // });
    
    const dbRef = firebase.database().ref()
    const userDbRef = firebase.database().ref('users/')

    if (!(this.state.user)) {
      auth.signInAnonymously()
      .then(() => {
        this.setState({user: auth.currentUser}, () => {
          // TODO: do we want to write user data here or read?

          // try {
          //   userDbRef.set({
          //     id: auth.currentUser.uid
          //   })
          // } catch(err) {
          //   console.log("There was an error:", err)
          // }

          this.writeUserData(this.state.user.uid);
          let cartData = this.readCartData(this.state.user.uid)
  
          // console.log("user id", this.state.user.uid)
          // console.log("cart data", cartData)
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
      });
    }


    // event listener that will fire every time there is a change in the firebase real time db
    // We don't want to reset state every time there's a change in the db
    // this will reset everyones state
    // We likely just  want to listen for changes for that particular user

    dbRef.on('value', (response) => {

      console.log("there was a change in the database: ", response)

      // for each product, entries will make an array with 2 elements
      // 0(index) being the key and 1(index) being the value
      productList =  Object.entries(response.val().products);
      inventoryList = Object.entries(response.val().inventory);

      // console.log("productList", productList)
      // console.log("inventoryList", inventoryList)

      // console.log("users", response.val().users)

      // TODO: update this to work with new cart structure

      if (this.state.user && this.state.user.uid && response.val().users && response.val().users[this.state.user.uid]) {
        cartList = response.val().users[this.state.user.uid].cart;
        cartObj = response.val().users[this.state.user.uid].cart;

        if (cartList) {
          let newList = Object.values(cartList)
          console.log("cartList", Object.values(cartList))
          console.log("cart list keys", Object.keys(cartList))

          console.log("cart list first item", cartList[Object.keys(cartList)[0]])
          // console.log(newList[0])
          cartList = newList
        } else {
          cartList = [];
        }

      } else {
        cartList = [];
      }

      this.setState({
        products: productList,
        cart: cartList,
        cartObj: cartObj,
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

    console.log("add to cart was called, product:", product);

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
      //filter the displayed products based on user input
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
