// import React, { useEffect, useState } from "react";

// const Feedback = (props) => {
//   const [feedback, setFeedback] = useState("");

//   const courseId = props.courseid;

//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/feedbacks/${courseId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const firstThreeFeedbacks = data.slice(0, 3);
//         setFeedbacks(firstThreeFeedbacks);
//       })
//       .catch((error) => console.error("Error:", error));
//   }, [courseId]);

//   const sendFeedback = () => {
//     if (feedback === "" && !courseId) {
//       alert("Please enter feedback to submit");
//     } else {
//       fetch("http://localhost:8080/api/feedbacks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ comment: feedback, course_id: courseId }),
//       })
//         .then((response) => {
//           console.log(response);
//           setFeedback("");
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };

//   useEffect(() => {}, [feedback]);

//   return (
//     <div className="feedback-main">
//       <div className="get-input">
//         <label htmlFor="email">Your Feedback</label>
//         <input
//           type="text"
//           className="form-control"
//           style={{ width: "100%", marginRight: "50px" }}
//           onChange={(e) => setFeedback(e.target.value)}
//           value={feedback}
//         />
//         <button
//           onClick={sendFeedback}
//           style={{
//             marginTop: "5px",
//             padding: "5px",
//             backgroundColor: "darkviolet",
//             borderRadius: "5px",
//             color: "white",
//           }}
//         >
//           Submit
//         </button>
//       </div>
//       <div className="feedback-list">
//         <h3>Recent Feedbacks:</h3>
//         <ul>
//           {feedbacks.map((item, index) => (
//             <li key={index}>{item.comment}</li>
//           ))}
//         </ul>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default Feedback;

import React, { useEffect, useState } from "react";
import authService from '../Components/authService'; // Added import for auth service

const Feedback = (props) => {
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(""); // Added error state

  const courseId = props.courseid;

  // FIXED: Added error handling and auth headers to fetch feedbacks
  useEffect(() => {
    if (!courseId) return; // Don't fetch if no courseId

    fetch(`http://localhost:8080/api/feedbacks/${courseId}`, {
      headers: authService.getAuthHeaders() // Added auth headers
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        return res.json();
      })
      .then((data) => {
        // FIXED: Added safety check for data
        const firstThreeFeedbacks = Array.isArray(data) ? data.slice(0, 3) : [];
        setFeedbacks(firstThreeFeedbacks);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to load feedbacks");
      });
  }, [courseId]);

  // FIXED: Complete rewrite of sendFeedback function with proper validation and error handling
  const sendFeedback = async () => {
    // Validation
    if (!feedback.trim()) {
      alert("Please enter feedback to submit");
      return;
    }

    if (!courseId) {
      alert("Course ID is missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/feedbacks", {
        method: "POST",
        headers: {
          ...authService.getAuthHeaders(), // Added auth headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: feedback,
          course_id: courseId
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // 🔍 show raw error
        console.error('Server error response:', errorText);
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      console.log('Feedback submitted successfully:', result);

      // FIXED: Clear feedback and update the feedbacks list
      setFeedback("");

      // Add the new feedback to the beginning of the list
      const newFeedback = {
        comment: feedback,
        course_id: courseId
        // You might want to add timestamp or user info here
      };

      setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks].slice(0, 3));

      // Show success message
      alert("Feedback submitted successfully!");

    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-main">
      <div className="get-input">
        <label htmlFor="feedback-input">Your Feedback</label>
        <input
          id="feedback-input" // Added id for accessibility
          type="text"
          className="form-control"
          style={{ width: "100%", marginRight: "50px" }}
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
          placeholder="Share your thoughts about this course..." // Added placeholder
          disabled={loading} // Disable input while loading
        />

        {/* FIXED: Added loading state and disabled button during submission */}
        <button
          onClick={sendFeedback}
          disabled={loading || !feedback.trim()} // Disable if loading or no feedback
          style={{
            marginTop: "5px",
            padding: "5px 15px", // Increased padding
            backgroundColor: loading ? "#ccc" : "darkviolet",
            borderRadius: "5px",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* FIXED: Added error message display */}
        {error && (
          <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
            {error}
          </div>
        )}
      </div>

      <div className="feedback-list">
        <h3>Recent Feedbacks:</h3>

        {/* FIXED: Added loading and empty state handling */}
        {feedbacks.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            No feedbacks yet. Be the first to share your thoughts!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {feedbacks.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  // backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  borderLeft: "3px solid darkviolet"
                }}
              >
                {item.comment}
                {/* You can add more details like timestamp or user name here */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
    </div>
  );
};

export default Feedback;