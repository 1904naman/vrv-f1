import React, { useState } from 'react';
import { Table, Badge, Button, Navbar, Nav } from 'react-bootstrap';
import { Power } from 'react-bootstrap-icons';

// Mock data - You can fetch the actual user data here
const mockUser = {
  username: 'editor',
  email: 'editor@example.com',
  role: 'Editor',
  status: 'Active',
};

const UserDashboard = () => {
  const [user, setUser] = useState(mockUser);

  // Logout handler
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#" className="ms-2">
          User Dashboard
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="danger" onClick={handleLogout}>
            <Power className="me-2" />
            Logout
          </Button>
        </Nav>
      </Navbar>

      <div className="container">
        <div className="card mb-4">
          <div className="card-header">
            <h2>User Information</h2>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{user.role}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
