import React from "react";
import { useUserContext } from "./UserContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "./images/logo.jpg";
import c1 from "./images/c1.jpg";
import c2 from "./images/html.png";
import c3 from "./images/sql.jpg";
import c4 from "./images/python.jpg";
import c5 from "./images/java.png";
import c6 from "./images/css.png";
import "./css/style.css";
import {
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "./header and footer/Footer";

function Home() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  return (
    <div>
      <Navbar page={"home"} />
      <div>
        <section id="home">
          <h2>Enhance your future with LearnSphere</h2>
          <p>
            {" "}
            LearnSphere is a comprehensive online learning platform that structures its educational content into a sequence of well-organized modules and lessons. Each module may include engaging video lectures, detailed text-based materials, and interactive assessment tests—designed to enhance the overall learning experience.
          </p>
          {/* <div className="btn">
            <a className="blue" href="#">
              Learn More
            </a>
            <a className="yellow" href="#">
              Visit Courses
            </a>
          </div> */}
        </section>
        {/* <section id="features">
          <h1>Awesome Features</h1>
          <p>Chance to enhance yourself</p>
          <div className="fea-base">
            <div className="fea-box">
              <FontAwesomeIcon icon={faGraduationCap} className="i" />
              <h3>Scholarship Facility</h3>
              <p>Originality is the essence of true scholarship. </p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faStar} className="i" />
              <h3>Valuable Courses</h3>
              <p>
                Online education is like a rising tide, it's going to lift all
                boats.{" "}
              </p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faAward} className="i" />
              <h3>Global Certification</h3>
              <p>
                A certificate without knowledge is like a gun without bullets in
                your hand.{" "}
              </p>
            </div>
          </div>
        </section> */}
        <section id="course">
          <h1>Our Free Courses Videos on Youtube</h1>
          <p>10,000+ enrolled</p>
          <div className="course-box">
            <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUraC_7FKVJ-zMJkRj691EnqP" >

              {/* ... (Course content here) */}
              <div className="courses">
                {/* <img src={i1} alt="" /> */}
                <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>Core Java Programming - Basic to Advanced</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>

                </div>

                {/* <div className="cost">$49.99</div> */}
              </div>
            </a>

            <div className="courses">
              <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUrZ6JanWJxxrFgfTBiz8sfzG">
                {/* <img src={i2} alt="" /> */}
                <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>Advance Java CDAC Full Course</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>
                </div>
                {/* <div className="cost">$49.99</div> */}
              </a>
            </div>
            <div className="courses">
              <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUrZSHUvm0K9QXu1khVHhf12t">
                <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
                {/* <img src={i3} alt="" /> */}
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>.NET Full CDAC Module</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>
                </div>
                {/* <div className="cost">$49.99</div> */}
              </a>
            </div>

            <div className="courses">
              {/* <img src={i4} alt="" /> */}
              <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
              <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUrYgOEBhEw8dfOM3kj47bCMd">
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>DBT - Database and MongoDB</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>
                </div>
                {/* <div className="cost">$49.99</div> */}
              </a>
            </div>
            <div className="courses">
              {/* <img src={i5} alt="" /> */}
              <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
              <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUraq2MDSxTIGBBw7QRfetefO">
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>Operating System and Shell Scripting</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>
                </div>
                {/* <div className="cost">$49.99</div> */}
              </a>
            </div>
            <div className="courses">
              {/* <img src={i6} alt="" /> */}
              <img src="https://media.assettype.com/thebridgechronicle%2F2021-02%2Fd097e2de-8327-4b1b-90dd-357d3262bb0a%2Fthebridgechronicle_import_s3fs_public_news_story_cover_images_2cdac_2.jpg?rect=0%2C0%2C747%2C420&w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85" alt="" />
              <a href="https://www.youtube.com/playlist?list=PLAtXfkpkEUrZ1y1ajhftholUFLrZDPHaD">
                <div className="details">
                  <p>Updated 12/07/25</p>
                  <h6>DSA - Data Structures and Algorithms</h6>
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                    ))}
                    <p>(239)</p>
                  </div>
                </div>
                {/* <div className="cost">$49.99</div> */}
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
}
export default Home;
