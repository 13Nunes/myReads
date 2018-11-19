import React from 'react'
import image from '../../assets/images/library.jpg'
import './Banner.css';

const Banner = () => (
    <div className="banner">
        <img src={image} alt="Banner" />
        <div className="banner-caption overlay">What are you is reading now?</div>
    </div>
);

export default Banner;