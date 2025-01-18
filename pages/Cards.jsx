"use client";
import React, { useRef, useEffect } from 'react';
import './cards.css';

const Cards = () => {
  const cardImageRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure this runs only on the client side

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      cardImageRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardImageRefs.current.includes(el)) {
      cardImageRefs.current.push(el);
    }
  };

  return (
    <div className="card-container">
      {[...Array(4)].map((_, index) => (
        <div className="card" key={index}>
          <div className="card-image" ref={addToRefs}></div>
          <div className="card-content">
            <h3 className="card-title">Parallax Card Title</h3>
            <p className="card-description">
              This card has a parallax effect where the background image moves at
              a different speed than the content.
            </p>
            <button className="card-button">Read More</button>
          </div>
          <div className="glass-pieces">
            <div className="glass-piece-1"></div>
            <div className="glass-piece-2"></div>
            <div className="glass-piece-3"></div>
            <div className="glass-piece-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
