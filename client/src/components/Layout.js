// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ title, children }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#001f54', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h2>{title}</h2>
      </header>

      <main style={{ padding: '20px' }}>
        {children}
      </main>

      <footer style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#001f54', textDecoration: 'none' }}>⬅ Retour à l’accueil</Link>
      </footer>
    </div>
  );
}
