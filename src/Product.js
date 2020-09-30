import React, { Component } from 'react'

class Product extends Component {
    //TODO:
    // product and everthing that it contains
    // should be able to resize depending on its container
    // products should look good in the cart side display
    // and the collections page

    render() {

        const  name  = this.props.name;
        const { price, type, url } = this.props.productInfo;

        return (
            <div className="product" >
                <h1>{ name } { price } </h1>    
                <img className="img" src={url} alt=""/>
                <button onClick={this.props.addToCart}> Add to cart</button>
            </div>
        )
    }
}

export default Product;