import React, { useState } from 'react';
import { Modal, Button, Form, Table, Badge, Navbar, Nav } from 'react-bootstrap';
import { Plus, Pencil, Trash, Power } from 'react-bootstrap-icons';

// Mock data
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', status: 'Active' },
  { id: 2, username: 'editor', email: 'editor@example.com', role: 'Editor', status: 'Active' },
];

const mockRoles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete', 'user_management'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [roles, setRoles] = useState(mockRoles);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  // Logout handler
  const handleLogout = () => {
    window.location.href = '/';
  };

  // User Management Handlers
  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowUserModal(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setShowUserModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Role Management Handlers
  const handleAddRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    setShowRoleModal(false);
  };

  // Modals for User Management
  const UserModal = () => {
    const [formData, setFormData] = useState(
      editingUser || { username: '', email: '', role: '', status: 'Active' }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      editingUser ? handleEditUser(formData) : handleAddUser(formData);
      setEditingUser(null);
    };

    return (
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  // Modals for Role Management
  const RoleModal = () => {
    const [roleData, setRoleData] = useState(
      editingRole || { name: '', permissions: [] }
    );

    const handleRoleSubmit = (e) => {
      e.preventDefault();
      handleAddRole(roleData);
    };

    return (
      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRoleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={roleData.name}
                onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Permissions</Form.Label>
              <Form.Check
                type="checkbox"
                label="Read"
                onChange={() =>
                  setRoleData({
                    ...roleData,
                    permissions: roleData.permissions.includes('read')
                      ? roleData.permissions.filter((perm) => perm !== 'read')
                      : [...roleData.permissions, 'read'],
                  })
                }
                checked={roleData.permissions.includes('read')}
              />
              <Form.Check
                type="checkbox"
                label="Write"
                onChange={() =>
                  setRoleData({
                    ...roleData,
                    permissions: roleData.permissions.includes('write')
                      ? roleData.permissions.filter((perm) => perm !== 'write')
                      : [...roleData.permissions, 'write'],
                  })
                }
                checked={roleData.permissions.includes('write')}
              />
              <Form.Check
                type="checkbox"
                label="Delete"
                onChange={() =>
                  setRoleData({
                    ...roleData,
                    permissions: roleData.permissions.includes('delete')
                      ? roleData.permissions.filter((perm) => perm !== 'delete')
                      : [...roleData.permissions, 'delete'],
                  })
                }
                checked={roleData.permissions.includes('delete')}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  return (
    <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#" className="ms-2">
          Admin Dashboard
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="danger" onClick={handleLogout}>
            <Power className="me-2" />
            Logout
          </Button>
        </Nav>
      </Navbar>

      <div className="container">
        {/* User Management */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>User Management</h2>
            <Button variant="success" onClick={() => setShowUserModal(true)}>
              <Plus className="me-2" />
              Add User
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => {
                        setEditingUser(user);
                        setShowUserModal(true);
                      }}
                    >
                      <Pencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Role Management */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>Role Management</h2>
            <Button variant="success" onClick={() => setShowRoleModal(true)}>
              <Plus className="me-2" />
              Add Role
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {UserModal()}
      {RoleModal()}
    </div>
  );
};

export default AdminDashboard;
