import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitClick = (e) => {
    e.preventDefault();
    let opts = {
      'username': username,
      'password': password
    };
    fetch('/api/login',{
      method: 'POST',
      body: JSON.stringify(opts)
    }).then(r => r.json())
    .then(token => {
      if (token.access_token) {
        localStorage.setItem('access_token', token.access_token); // store access token in local storage
        window.location.href = '/home'; // load home page
      } else {
        setErrorMessage('Invalid username or password'); // set error message
      }
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here
    console.log(`Email: ${username}, Password: ${password}`);
  };

  const handleUsernameChange= (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-header">Login</h1>
      <label className="form-label" htmlFor="username">Username</label>
      <input
        className="form-input"
        type="Username"
        id="Username"
        name="Username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <label className="form-label" htmlFor="password">Password</label>
      <input
        className="form-input"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <button className="form-button" onClick={onSubmitClick} type="submit">Log In</button>
      <Link className="form-signup-link" to="/signup">Don't have an account? Sign Up</Link>
    </form>
  </div>
  
  );
};

export default LoginPage;
