import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../Components/authService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const userId = localStorage.getItem("id");
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch all courses
    axios.get("http://localhost:8080/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });


    // Fetch user's enrolled courses
    if (userId) {
      axios.get(`http://localhost:8080/api/learning/${userId}`, {
        headers: authService.getAuthHeaders()
      })
        .then((response) => {
          const enrolledIds = response.data.map(course => course.id);

          setEnrolled(enrolledIds);
        })
        .catch((error) => {
          console.error("Error fetching enrollments:", error);
        });
    }
  }, [userId, authToken]);

  const enrollCourse = (courseId) => {
    if (!authToken) {
      toast.error('You need to login to continue', {
        position: 'top-right',
        autoClose: 1000,
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const enrollRequest = {
      userId: userId,
      courseId: courseId,
    };

    axios.post(
      'http://localhost:8080/api/learning',
      enrollRequest,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }

      }
    )
      // fetch('http://localhost:8080/api/learning', {
      //   method: 'POST',
      //   headers: authService.getAuthHeaders(), 
      //   body: JSON.stringify(enrollRequest)
      // })
      .then((response) => {
        if (response.data === "Enrolled successfully") {
          toast.success('Course Enrolled successfully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });

          // Update enrolled list locally
          setEnrolled((prev) => [...prev, courseId]);

          setTimeout(() => {
            navigate(`/course/${courseId}`);
          }, 2000);
        } else {
          toast.info(response.data, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.error('Enrollment error:', error.response?.data || error.message);
        // console.log(localStorage.getItem('token'));

        toast.error('Enrollment failed. Please try again.', {
          position: 'top-right',
          autoClose: 1000,
        });
      });
  };

  return (
    <div>
      <Navbar page={"courses"} />
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.p_link} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h3 className="course-heading">
                {course.course_name.length < 8
                  ? `${course.course_name} Tutorial`
                  : course.course_name
                }
              </h3>
              <p className="course-description" style={{ color: "grey" }}>Price: Rs.{course.price}</p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div>
            {enrolled.includes(course.id) ? (
              <button
                className="enroll-button"
                style={{ color: '#F4D03F', backgroundColor: 'darkblue', fontWeight: 'bold' }}
                onClick={() => navigate("/learnings")}
              >
                Enrolled
              </button>
            ) : (
              <button className="enroll-button" onClick={() => enrollCourse(course.id)}>
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
