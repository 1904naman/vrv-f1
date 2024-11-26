// components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is 'User'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock user creation logic (replace with API calls for production)
    const newUser = { email, password, role };
    console.log('New User Created:', newUser);

    alert(`Account created for ${email} with role: ${role}`);

    // Redirect based on role
    if (role === 'Admin') {
      navigate('/admin-dashboard');
    } else if (role === 'User') {
      navigate('/user-dashboard');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to Login page
  };

  return (
    <div style={{ backgroundColor: 'lightblue', height: '100vh', margin: 0 }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>RBAC</h1>
        <button 
          onClick={handleLoginRedirect} 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </nav>

      {/* Centered Signup Form */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 50px)', // Subtract navbar height
      }}>
        <div style={{
          backgroundColor: 'lightgreen',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button 
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
