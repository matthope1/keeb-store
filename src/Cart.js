import React, { Component } from 'react'
import firebase from './firebase';

class Cart extends Component {

    // componentDidMount() {
    //     const dbRef = firebase.database().ref();
    // }

    render() {
        return (
            <div className="nav-bar__cart-icon wrapper">
                <a href="">
                    <i className="fas fa-shopping-cart"></i> 
                </a>
            </div>
        )
    }
}

export default Cart;