import React, { Component } from 'react'

class Product extends Component {

    render() {

        const  name  = this.props.name;
        const { price, type, url } = this.props.productInfo;

        return (
            <div className="product" >
                <h1>{ name} { price } </h1>    
                <img class="img" src={url} alt=""/>
            </div>
        )
    }
}

export default Product;