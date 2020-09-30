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

        if (!slideOutDisplay){
            console.log("was false setting true...");
        }
        else{
            console.log("was true setting false...");
        }

        this.setState({
            cartSlideOut: !slideOutDisplay,
        })
        
    }

    render() {
        // depending on the slide out cart boolean

        if (this.state.cartSlideOut){

            return (
                <div className="slide-out-cart">
                    <h1>Hello! this is cart display!! how are you doing</h1>
                    <p onClick={this.handleClick}>x</p>
                    {this.props.cartList.map((product) => {
                        // console.log(product[1][Object.keys(product[1])]);

                        let name = Object.keys(product[1]);
                        let productInfo = product[1][Object.keys(product[1])];
                        let key = product[0];

                        return (
                        <div>
                            <p>this this this</p>
                            <Product key={key} name={name} productInfo={productInfo} />
                        </div>
                        )

                    })}
                </div> 
            )
        }
        else{
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
}

export default Cart;