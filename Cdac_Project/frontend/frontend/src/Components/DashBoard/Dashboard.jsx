import React, { useState, useEffect } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
// import RoleBasedComponent from './Components/RoleBasedComponent';

function Dashboard() {
  const [userscount, setUserscount] = useState(0);
  const [coursescount, setCoursescount] = useState(0);
  const [enrolled, setEnrolled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (!authService.isAuthenticated() || !authService.hasRole('ADMIN')) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const headers = authService.getAuthHeaders();

        // Fetch all data concurrently
        const [usersResponse, coursesResponse, enrollmentsResponse] = await Promise.all([
          fetch("http://localhost:8080/api/users", { headers }),
          fetch("http://localhost:8080/api/courses", { headers }),
          fetch("http://localhost:8080/api/learning", { headers })
        ]);

        // Check if all requests were successful
        if (!usersResponse.ok || !coursesResponse.ok || !enrollmentsResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [users, courses, enrollments] = await Promise.all([
          usersResponse.json(),
          coursesResponse.json(),
          enrollmentsResponse.json()
        ]);

        setUserscount(users.length);
        setCoursescount(courses.length);
        setEnrolled(enrollments.length);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        setError('Failed to load dashboard data');
        
        // If unauthorized, redirect to login
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          authService.logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <body style={{backgroundColor:"#eee"}}>
        <SideBar current={"dashboard"}/>
        <section id="content">
          <Navbar />
          <main>
            <div style={{textAlign: 'center', marginTop: '50px'}}>Loading dashboard...</div>
          </main>
        </section>
      </body>
    );
  }

  if (error) {
    return (
      <body style={{backgroundColor:"#eee"}}>
        <SideBar current={"dashboard"}/>
        <section id="content">
          <Navbar />
          <main>
            <div style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</div>
          </main>
        </section>
      </body>
    );
  }

  return (
    <body style={{backgroundColor:"#eee"}}>
      <SideBar current={"dashboard"}/>
      <section id="content">
        <Navbar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1 id="dashboard" style={{color:'darkblue'}} >Admin Dashboard</h1>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <i className='bx bxs-group' id="i"></i>
              <span className="text">
                <h3>{userscount}</h3>
                <p>Total Users</p>
              </span>
            </li>
            <li>
              <i className='bx bx-book' id="i"></i>
              <span className="text">
                <h3>{coursescount}</h3>
                <p>Total Courses</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-calendar-check' id="i"></i>
              <span className="text">
                <h3>{enrolled}</h3>
                <p>Total Enrollment</p>
              </span>
            </li>
          </ul>
        </main>
      </section>
     </body>
  );



  
}


// function SomeComponent() {
//   return (
//     <div>
//       <RoleBasedComponent roles={['ADMIN']}>
//         <button>Admin Only Button</button>
//       </RoleBasedComponent>
      
//       <RoleBasedComponent roles={['ADMIN', 'INSTRUCTOR']}>
//         <button>Admin or Instructor Button</button>
//       </RoleBasedComponent>
//     </div>
//   );
// }

export default Dashboard;
