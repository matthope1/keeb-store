import React, { Component } from 'react'
import firebase from './firebase';
import Product from './Product'

class Cart extends Component {

  constructor(){
      super();
      this.state = {
          cartSlideOut: false,
      }
  }

  handleClick = (event) => {
    event.preventDefault();
    let slideOutDisplay = this.state.cartSlideOut;
    this.setState({
      cartSlideOut: !slideOutDisplay,
    })
  }

  // TODO: we cant use the key to remove items from cart because the number of items
  // inside of the cart list will change 
  removeFromCart = (key) => {
    let cartPath = `users/${this.props.userInfo.uid}/cart`;
    let userPath = `users/${this.props.userInfo.uid}`
    let data;
    let cart;

    const cartRef = firebase.database().ref(cartPath);
    const userRef = firebase.database().ref(userPath);

    cartRef.child(key).remove();

    cartRef.on('value', (snapshot) => {
      data = snapshot.val();
      console.log("remove from cart read cart data", data)
      data.numOfProducts--
      cart = data
    });

    userRef.set({
      cart
    })
  }

  render() {
    if (this.state.cartSlideOut ){
      //slide out cart display
      let total = 0;
      return (
        <div className="slide-out-cart">
          <div className="slide-out-cart-container">
            <a href="#" className="slide-out-cart__exit-btn" onClick={this.handleClick}>x</a>
            
            {(this.props.cartList && this.props.cartList.length) && (
              <p>You have {this.props.cartList.length - 1} item(s) in your cart!</p>
            )}
            
            <hr /> 
            {/* TODO: update this to work with new cart db structure */}
            {this.props.cartList.map((product, i) => {
              // ignore product count in cart
              if (isNaN(product)) {
                // console.log(`product #: ${i}: ${product}`)
                // console.log("keys",Object.keys(product))
                console.log("values",Object.values(product));

                let name = Object.keys(product);
                let productInfo = Object.values(product)[0];
                let key = i;
                console.log("product  info", productInfo)

                total = total + parseInt(productInfo.price);

                return (
                    <div>
                        <Product removeFromCart={() => this.removeFromCart(key)} key={key} name={name} productInfo={productInfo} />
                    </div>
                )
              }
            })}
            <div className="cart-info">
                <hr/>
                <p>Your order total = ${total} </p>
            </div>
          </div> 
        </div>
      )
    }
    else {
      return (
        <div className="nav-bar__cart-icon wrapper">
          <a href="">
              <i className="fas fa-shopping-cart cart-icon" onClick={this.handleClick}></i> 
          </a>
          {/* <p>{this.props.cartList.length}</p> */}
        </div>
      )
    }
  }
}

export default Cart;