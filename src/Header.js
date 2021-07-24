import React, { Component } from 'react';
import Cart from './Cart';

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-bar wrapper">
            <div className="logo">
              <img className="img" src="http://matthopecodes.com/project-five-assets/keebStoreLogo.png" alt="logo"/>
            </div>
            <ul className="nav-bar__links">
              <h1>keeb-store</h1>
            </ul>
            <Cart cartList={this.props.cartList} userInfo={this.props.userInfo} />
          </div>
        </nav>
      </div>
    )
  }
}

export default  Header;