// top navigattion bar

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth(); // Access global state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Send user back to login page
  };

  return (
    <nav style={styles.nav}>
      <h2 style={{ margin: 0 }}>🏥 MedCare </h2>
      
      <div>
        {user ? (
          // IF LOGGED IN: Show Role and Logout Button
          <div style={styles.menu}>
            <span style={{ marginRight: '15px' }}>
              Logged in as: <strong>{user.role.toUpperCase()}</strong>
            </span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </div>
        ) : (
          // IF LOGGED OUT: Show Login Link
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

// --- BASIC STYLES (So it doesn't look broken) ---
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    marginBottom: '20px'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  button: {
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#007bff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  }
};

// 👇 THIS IS THE LINE YOUR APP WAS MISSING
export default Navbar;
