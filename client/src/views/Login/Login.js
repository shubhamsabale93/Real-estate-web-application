import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/postLogin`, {
      email: email,
      password: password,
    });

    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);

      localStorage.setItem('currentUser', JSON.stringify(response.data.data));

      toast.loading('Redirecting to dashboard...');

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else {
      toast.error(response.data.message);
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    button: {
      padding: '10px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    link: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#007bff',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Login</h1>

      <form style={styles.form}>
        <input
          type='email'
          placeholder='Email'
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='button' onClick={loginNow} style={styles.button}>
          Login
        </button>
      </form>

      <Link to='/signup' style={styles.link}>
        Contact With Shubham
      </Link>

      <Toaster />
    </div>
  );
}

export default Login;
