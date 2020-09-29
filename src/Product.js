import React, { Component } from 'react'

class Product extends Component {

    render() {

        const  name  = this.props.name;
        const { price, type, url } = this.props.productInfo;

        return (
            <div className="product" >
                <h1>{ name } { price } </h1>    
                <img className="img" src={url} alt=""/>
                <button onClick={this.props.addToCart}> Add to cart</button>
                {/* TODO: add an add to cart button 
                    bind it to a function that will
                    update the cart state with the new product
                 */}
            </div>
        )
    }
}

export default Product;