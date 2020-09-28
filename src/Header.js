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
                            <li><a href="">Home</a></li>
                            <li><a href="">Store</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                        <Cart/>
                   </div>
                </nav>
            </div>
        )
    }
}

export default  Header;