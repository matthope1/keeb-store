import React, { Component } from 'react'

class Product extends Component {

  render() {
    const  name  = this.props.name;
    const { price, type, url } = this.props.productInfo;

    // if this product has an add to cart prop
    // then give it an add to cart buttton
    if (this.props.addToCart) {
      return (
        <div className="product">
          <h1>{ name }  ${ price } </h1>    
          <img className="img" src={url} alt={type} />
          <button onClick={this.props.addToCart}> Add to cart</button>
        </div>
      )
    } else {
      return (
        <div className="product">
          <h1>{ name }  ${ price } </h1>    
          <img className="img" src={url} alt={type} />
          <button onClick={this.props.removeFromCart}> Remove from cart</button>
        </div>
      )
    }
  }
}

export default Product;