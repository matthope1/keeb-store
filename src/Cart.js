import React, { Component } from 'react'
import firebase from './firebase';

class Cart extends Component {

    render() {
        return (

            <div className="nav-bar__cart-icon wrapper">
                <a href="">
                    <i className="fas fa-shopping-cart"></i> 
                </a>
                <p>{this.props.cartList.length}</p>
            </div>
        )
    }
}

export default Cart;