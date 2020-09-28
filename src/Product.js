import React, { Component } from 'react'

class Product extends Component {

    render() {

        const  name  = this.props.name;
        const { price, type, url } = this.props.productInfo;

        return (
            <div>
                <h1>{ name} { price } </h1>    
                <img src={url} alt=""/>
                {/* <h2>{ price } </h2> */}
            </div>
        )
    }
}

export default Product;