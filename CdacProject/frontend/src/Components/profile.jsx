import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImgUpload from "./ImgUpload";
import Performance from "./DashBoard/Performance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import authService from "../services/authService";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    async function fetchUserDetails() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/current",
          {
            headers: authService.getAuthHeaders()
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            authService.logout();
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch user details.");
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar page={"profile"} />
        <div style={{textAlign: 'center', marginTop: '50px'}}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar page={"profile"} />
        <div style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar page={"profile"} />
      <div className="profile-card" id="pbg" style={{ marginTop: '3%' }}>
        <ImgUpload onChange={handleImageChange} src={profileImage} />
        <h2 className="profile-name">{userDetails?.username}</h2>
        
        <div style={{ marginTop: '20px' }}>
          <h4>Role: </h4>
          <p className="profile-role" style={{color: 'blue', fontWeight: 'bold'}}>
            {userDetails?.role}
          </p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4>Email: </h4>
          <p className="profile-email">{userDetails?.email}</p>
        </div>
        
        <div>
          <h4>Phone Number: </h4>
          <p className="profile-phno">{userDetails?.phno}</p>
        </div>
        
        <div>
          <h4>Gender: </h4>
          <p className="profile-gender">{userDetails?.gender}</p>
        </div>
        
        <div>
          <h4>Date of Birth: </h4>
          <p className="profile-dob">{userDetails?.dob}</p>
        </div>
        
        <div>
          <h4>Profession: </h4>
          <p className="profile-profession">{userDetails?.profession}</p>
        </div>
        
        {userDetails?.role !== 'ADMIN' && (
          <div>
            <h4>Learning courses: </h4>
            <p className="profile-phno">{userDetails?.learningCourses?.length || 0}</p>
          </div>
        )}
        
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {userDetails?.linkedin_url && (
            <a
              href={userDetails.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: '15px',
                color: '#0077B5',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s ease',
              }}
            >
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" style={{ fontSize: '38px' }} />
            </a>
          )}
          
          {userDetails?.github_url && (
            <a
              href={userDetails.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'darkviolet',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s ease',
              }}
            >
              <FontAwesomeIcon icon={faGithub} className="social-icon" style={{ fontSize: '38px' }} />
            </a>
          )}
        </div>
      </div>
      
      {/* Only show performance for non-admin users */}
      {userDetails?.role !== 'ADMIN' && <Performance />}
    </div>
  );
}

export default Profile;