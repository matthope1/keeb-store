import React, { Component } from 'react'

class Product extends Component {
    //TODO:
    // product and everthing that it contains
    // should be able to resize depending on its container
    // products should look good in the cart side display
    // and the collections page

    // a product will either be displayed in a collection
    // or in the cart

    // depending on that the button should add it to cart or remove it from the cart
    // we could use conditional rendering to solve this

    render() {

        const  name  = this.props.name;
        const { price, type, url } = this.props.productInfo;


        if (this.props.addToCart) {
            return (
                <div className="product" >
                    <h1>{ name } { price } </h1>    
                    <img className="img" src={url} alt=""/>
                    <button onClick={this.props.addToCart}> Add to cart</button>
                </div>
            )

        } else {
            return (
                <div className="product" >
                    <h1>{ name } { price } </h1>    
                    <img className="img" src={url} alt=""/>
                    <button onClick={this.props.removeFromCart}> Remove from cart</button>
                </div>
            )
        }

    }
}

export default Product;