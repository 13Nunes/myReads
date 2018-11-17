import React, { Component } from 'react';
import Header from '../../components/Header/Header';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        Página Home
      </div>
    );
  }
}

export default Home;
