import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dstyle.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Performance = () => {
  const [performanceData, setPerfomanceData] = useState([]);
  const [enrolledcourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = authService.getUserId();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = authService.getAuthHeaders();

        // Fetch enrolled courses
        const coursesResponse = await fetch(`http://localhost:8080/api/learning/${userId}`, {
          headers
        });
        
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch enrolled courses');
        }
        
        const courses = await coursesResponse.json();
        setEnrolledCourses(courses);

        // Fetch performance data
        const performanceResponse = await fetch(`http://localhost:8080/api/assessments/perfomance/${userId}`, {
          headers
        });
        
        if (!performanceResponse.ok) {
          throw new Error('Failed to fetch performance data');
        }
        
        const performance = await performanceResponse.json();
        setPerfomanceData(performance);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load performance data');
        
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          authService.logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  function certifiedUser(id) {
    navigate(`/certificate/${id}`);
  }

  if (loading) {
    return (
      <div className="performance-container" style={{ marginTop: '70px' }}>
        <div style={{textAlign: 'center'}}>Loading performance data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="performance-container" style={{ marginTop: '70px' }}>
        <div style={{textAlign: 'center', color: 'red'}}>{error}</div>
      </div>
    );
  }

  return (
    <div className="performance-container" style={{ marginTop: '70px' }}>
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ color: 'darkblue' }}>Courses Enrolled</h2>
        <table className="performance-table" style={{ width: '40%' }}>
          <thead>
            <tr>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {enrolledcourses.length > 0 ? (
              enrolledcourses.map((data, index) => (
                <tr key={index}>
                  <td>{data.course_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{textAlign: 'center', fontStyle: 'italic'}}>No courses enrolled</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div>
        <h2 style={{ color: 'darkblue' }}>PERFORMANCE</h2>
        <table className="performance-table" style={{ marginBottom: '40px' }}>
          <thead>
            <tr>
              <th>Courses</th>
              <th>Progress</th>
              <th>Marks</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.length > 0 ? (
              performanceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.course.course_name}</td>
                  <td className={data.marks !== 0 ? 'completed-status' : 'pending-status'}>
                    {data.marks !== 0 ? 'Completed' : 'Pending'}
                  </td>
                  <td>{data.marks}</td>
                  <td 
                    className={data.marks !== 0 ? 'completed-certificate' : 'pending-certificate'} 
                    onClick={() => data.marks !== 0 && certifiedUser(data.course.id)}
                    style={data.marks !== 0 ? {cursor: 'pointer'} : {}}
                  >
                    {data.marks !== 0 ? 'Download Certificate' : 'Not Available'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', fontStyle: 'italic'}}>
                  No assessment data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Performance;
