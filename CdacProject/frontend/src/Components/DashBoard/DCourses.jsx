import React from "react";
import "./dstyle.css";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import authService from "../../services/authService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [isDeleted, setDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCid] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // Check if user is admin
    if (!authService.isAuthenticated() || !authService.hasRole('ADMIN')) {
      navigate('/login');
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses`, {
          headers: authService.getAuthHeaders()
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError('Failed to load courses');
        
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          authService.logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    setDeleted(false);
  }, [isDeleted, navigate]);

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders()
      });

      if (response.ok) {
        setDeleted(true);
        setCid(-1);
        console.log("Course deleted successfully");
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  function editCourse(course_id) {
    navigate(`/editCourse/${course_id}`);
  }

  function addquestions(course_id) {
    navigate(`/addquestions/${course_id}`);
  }

  if (loading) {
    return (
      <body>
        <SideBar current={"courses"} />
        <section id="content">
          <Navbar />
          <main className="t">
            <div style={{textAlign: 'center', marginTop: '50px'}}>Loading courses...</div>
          </main>
        </section>
      </body>
    );
  }

  return (
    <>
      <body>
        <SideBar current={"courses"} />
        <section id="content">
          <Navbar />
          <main className="t">
            <div className="table-data" style={{ marginTop: "-10px" }}>
              <div className="order">
                <div id="course" className="todo">
                  <div className="head" style={{ marginTop: "-100px" }}>
                    <h3 style={{color:'white'}}>Courses Management</h3>
                    <button
                      onClick={() => navigate("/addcourse")}
                      style={{
                        backgroundColor: "darkblue",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                        padding: "8px",
                        fontWeight: "500",
                      }}
                    >
                      Add Course{" "}
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
                    </button>
                  </div>
                  
                  {error && (
                    <div style={{color: 'red', textAlign: 'center', margin: '20px'}}>
                      {error}
                    </div>
                  )}
                  
                  <ul className="todo-list">
                    {courses.map((course) => (
                      <div key={course.course_id}>
                        <li className="completed" style={{ marginTop: "10px", backgroundColor:'white', color:'black' }}>
                          <p>{course.course_name}</p>
                          <div style={{ width: "200px", display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => {setOpenModal(true); setCid(course.course_id)}}
                              style={{ backgroundColor:'#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                              className="delete-button"
                            >
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>

                            <button
                              onClick={() => editCourse(course.course_id)}
                              style={{ backgroundColor:'#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                              className="edit-button"
                            >
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>
                              
                            <button 
                              onClick={() => addquestions(course.course_id)}
                              style={{
                                backgroundColor: "#457BC1",
                                borderRadius: "5px",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                fontWeight: "500",
                              }}
                            >
                              Manage Test
                            </button>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </section>
      </body>
      <Modal
        id="popup"
        open={openModal}
        onOk={() => {
          handleOk();
          deleteCourse(cid);
        }}
        onCancel={handleCancel}
        style={{padding:"10px"}}
      >
        <h3>Are you sure you want to delete this course?</h3>
      </Modal>
    </>
  );
}

export default Courses;
