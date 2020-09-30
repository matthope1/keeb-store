import React, { Component } from 'react'
import firebase from './firebase';

class Cart extends Component {

    constructor(){
        super();
        this.state = {
            slideOutCart: false,
        }
    }

    handleClick = (event) => {
        event.preventDefault();

        let slideOutDisplay = this.state.slideOutCart;

        if (!slideOutDisplay){
            console.log("was false setting true...");
        }
        else{
            console.log("was true setting false...");
        }

        this.setState({
            slideOutCart: !slideOutDisplay,
        })
        
    }

    render() {
        // depending on the slide out cart boolean
        
        return (
            <div className="nav-bar__cart-icon wrapper">
                <a href="">
                    <i className="fas fa-shopping-cart" onClick={this.handleClick}></i> 
                </a>
                <p>{this.props.cartList.length}</p>
            </div>
        )
    }
}

export default Cart;