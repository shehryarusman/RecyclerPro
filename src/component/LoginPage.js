import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-header">Login</h1>
      <label className="form-label" htmlFor="email">Email</label>
      <input
        className="form-input"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
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
      <button className="form-button" type="submit">Sign In</button>
      <Link className="form-signup-link" to="/signup">Don't have an account? Sign Up</Link>
    </form>
  </div>
  
  );
};

export default LoginPage;
