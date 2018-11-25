// Basic
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Assets
import './Header.css';
import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} className="logo" alt="Logo" />
        <div className="menu">
          <Link to="/">Home</Link> | <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

export default Header;
