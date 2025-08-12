import React, { useEffect, useState } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (!authService.isAuthenticated() || !authService.hasRole('ADMIN')) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          headers: authService.getAuthHeaders()
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError('Failed to load users');
        
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          authService.logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return (
      <body style={{backgroundColor:"#eee"}}>
        <SideBar current={"user"}/>
        <section id="content">
          <Navbar />
          <main>
            <div style={{textAlign: 'center', marginTop: '50px'}}>Loading users...</div>
          </main>
        </section>
      </body>
    );
  }

  return (
    <body style={{backgroundColor:"#eee"}}>
      <SideBar current={"user"}/>
      <section id="content">
        <Navbar />
        <main>
          <div className="table-data" style={{marginTop:"-10px"}}>
            <div className="order">
              <div className="head">
                <h3>Users Management</h3>
              </div>
              
              {error && (
                <div style={{color: 'red', textAlign: 'center', margin: '20px'}}>
                  {error}
                </div>
              )}
              
              <table id="user" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>Username</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Phone Number</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Role</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Profession</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>{user.username}</td>
                      <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                      <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.phno}</td>
                      <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: user.role === 'ADMIN' ? '#dc3545' : user.role === 'INSTRUCTOR' ? '#fd7e14' : '#28a745',
                          color: 'white'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.profession}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}

export default Users;
