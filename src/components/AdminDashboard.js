import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');

    const fetchUsers = () => {
        fetch('/admin/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
        })
        .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
        } else {
            console.log("Failed to remove token.");
        }
    };

    const handleEdit = (userId, username) => {
        setEditingUserId(userId);
        setEditUsername(username);
        setEditPassword('');
    };

    const handleSaveEdit = () => {
        fetch(`/admin/users/${editingUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username: editUsername, password: editPassword })
        }).then(() => {
            fetchUsers();
            setEditingUserId(null);
        });
    };

    const handleDelete = (userId) => {
        fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            fetchUsers();
        });
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {editingUserId === user._id ? (
                            <div>
                                <input value={editUsername} onChange={e => setEditUsername(e.target.value)} />
                                <input type="password" placeholder="Change password (optional)" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={() => setEditingUserId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>Username:</strong> {user.username} 
                                <button onClick={() => handleEdit(user._id, user.username)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                                <br />
                                <strong>Email:</strong> {user.email} <br />
                                <strong>Full Name:</strong> {user.fullName} <br />
                                <strong>Profile Picture:</strong> {user.profile.profilePicture || "Not set"} <br />
                                <strong>Bio:</strong> {user.profile.bio || "Not provided"} <br />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
