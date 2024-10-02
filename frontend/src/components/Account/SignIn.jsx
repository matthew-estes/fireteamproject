import React, { useState } from 'react';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('User signed in successfully');
      } else {
        console.log('Sign in failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ display: 'block', marginBottom: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ display: 'block', marginBottom: '16px' }}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;