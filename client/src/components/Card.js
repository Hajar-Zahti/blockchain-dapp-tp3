// src/components/Card.js
import React from 'react';

export default function Card({ children, title }) {
  const style = {
    backgroundColor: '#dff9fb',
    border: '2px solid #7ed6df',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
  };

  return (
    <div style={style}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
