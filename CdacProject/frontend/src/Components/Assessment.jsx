// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { faBackward } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Modal } from 'antd';
// import axios from 'axios';
// import authService from '../Components/authService';

// function YourComponent() {

//   const location = useLocation();
//   const navigate=useNavigate();
//   const courseId = location.pathname.split("/")[2];
//   const [test, setTest] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("id"));
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [correctCount, setCorrectCount] = useState(0); 
//   const [openModal, setOpenModal] = useState(false);
//   const[totalQsns , SetTotalQsns] = useState(0);
//   useEffect(() => {
//     fetch(`http://localhost:8080/api/questions/${courseId}`, {
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth header
//   }})
//       .then(res => res.json())
//       .then(res => {
//         setTest(res);
//         SetTotalQsns(res.length)
//         setSelectedAnswers(new Array(res.length).fill(false));
//       })
//       .catch(error => console.error("Error fetching data:", error));
//   }, [courseId]);
//   const handleRadioChange = (questionIndex, selectedOption) => {
//     const updatedSelectedAnswers = [...selectedAnswers];
//     const qsn = test[questionIndex];
//     if(qsn.answer === selectedOption){
//         setCorrectCount(correctCount+1);
//         updatedSelectedAnswers[questionIndex]=true;
//     }else if(updatedSelectedAnswers[questionIndex]===true){
//         setCorrectCount(correctCount-1);
//         updatedSelectedAnswers[questionIndex]=false;
//     }
//     setSelectedAnswers(updatedSelectedAnswers);
// };

// const handleMarks = () =>{
//   const data = {
//     courseId: courseId, 
//     userId: localStorage.getItem("id"),  
//     marks: (correctCount/totalQsns)*100 
//   }
//   axios.post(`http://localhost:8080/api/assessments/add/${userId}/${courseId}`, data, {
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth header
//   }
// })
//   .then(response => {
//     console.log('Request successful:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }


//  const showModal = () => {
//   setOpenModal(true);
// };

// const handleOk = () => {
//   setOpenModal(false);
// };

// const handleCancel = () => {
//   setOpenModal(false);
// };

// let message = '';

//   if (correctCount === 5) {
//     message = 'Awesome 😎';
//   } else if (correctCount >= 3) {
//     message = 'Good 😊';
//   } else {
//     message = 'Poor 😒';
//   }

//   return (
//     <div className="assessment-container">
//       <div style={{display:'flex'}}>
//       <button type="submit" id="backbtn" className="submit-button" onClick={()=>navigate(`/course/${courseId}`)}  ><FontAwesomeIcon  icon={faBackward}/></button>  
//       <h1 className="assessment-title" style={{backgroundColor:'darkblue',marginLeft:'440px',width:'26%',color:"white",borderRadius:"25px",marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>Assessment Questions</h1></div>
//       <div className="assessment-form">
//         {test.map((question, index) => (
//           <div key={question.no} style={{padding:"10px",backgroundColor:"rgb(454, 225, 180)",marginTop:"10px" , borderRadius:"18px"}}>
//             <h3>{""+question.question}</h3>
//             <label className="option">
//               <input
//                 type="checkbox"
//                 name={`question_${question.no}`}
//                 value={question.option1}
//                 onChange={() => handleRadioChange(index, question.option1)}
//                 style={{marginLeft:"20px"}}
//                 required
//               /> {question.option1}
//             </label>
//             <label className="option">
//               <input
//                 type="checkbox"
//                 name={`question_${question.no}`}
//                 value={question.option2}
//                 onChange={() => handleRadioChange(index, question.option2)}
//                 style={{marginLeft:"20px"}}
//               /> {question.option2}
//             </label>
//             <label className="option">
//               <input
//                 type="checkbox"
//                 name={`question_${question.no}`}
//                 value={question.option3}
//                 onChange={() => handleRadioChange(index, question.option3)}
//                 style={{marginLeft:"20px"}}
//               /> {question.option3}
//             </label>
//             <label className="option">
//               <input
//                 type="checkbox"
//                 name={`question_${question.no}`}
//                 value={question.option4}
//                 onChange={() => handleRadioChange(index, question.option4)}
//                 style={{marginLeft:"20px"}}
//               /> {question.option4}
//             </label>
//           </div>
//         ))}
//         <div style={{padding: '20px 0 0 0 '}}>
//           {/* <p>Correct Answers: {correctCount}</p> */}
//           <button onClick={()=>navigate(0)} className="submit-button" style={{marginLeft:"30px",padding:"5px 15px"}}>Reset</button>
//           <button onClick= {()=>{handleMarks();setOpenModal(true)}}
//           className="submit-button11" >Submit</button>
//         </div>
//       </div>
//       <Modal
//         id="poppup"
//         open={openModal}
//         onOk={
//           ()=>{
//             handleOk();
//           }}
//         onCancel={handleCancel}
//         style={{padding:"10px"}}
//       >
        
//         <h2 style={{color:'darkblue'}}>Assessment Result</h2>
//         <h1 style={{textAlign:"center"}}>{message}</h1>
//         <h3 style={{display:'flex',justifyContent:'center'}}>You scored {(correctCount/totalQsns)*100} %</h3>
        
//       </Modal>
//     </div>
//   );
// }

// export default YourComponent;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import axios from 'axios';
import authService from '../Components/authService';

function YourComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[2];
  const [test, setTest] = useState([]);
  const userId = localStorage.getItem("id");
  
  // FIXED: Changed from array to object to store selected answers properly
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0); 
  const [openModal, setOpenModal] = useState(false);
  const [totalQsns, SetTotalQsns] = useState(0);
  console.log("Token:", localStorage.getItem("token"));

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${courseId}`, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        ...authService.getAuthHeaders(),
    "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        setTest(res);
        SetTotalQsns(res.length);
        // FIXED: Initialize selectedAnswers as empty object
        setSelectedAnswers({});
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [courseId]);

  // FIXED: Complete rewrite of radio change handler
  const handleRadioChange = (questionIndex, selectedOption) => {
    const question = test[questionIndex];
    const questionId = question.no || questionIndex; // Use question.no as unique identifier
    
    // Get previous selection for this question
    const previousSelection = selectedAnswers[questionId];
    
    // Update selected answers
    const updatedSelectedAnswers = {
      ...selectedAnswers,
      [questionId]: selectedOption
    };
    
    setSelectedAnswers(updatedSelectedAnswers);
    
    // Calculate correct count
    let newCorrectCount = 0;
    
    // Count all correct answers
    Object.keys(updatedSelectedAnswers).forEach(qId => {
      const questionIdx = test.findIndex(q => (q.no || test.indexOf(q)) == qId);
      if (questionIdx !== -1) {
        const q = test[questionIdx];
        if (q.answer === updatedSelectedAnswers[qId]) {
          newCorrectCount++;
        }
      }
    });
    
    setCorrectCount(newCorrectCount);
  };

  const handleMarks = () => {
    const data = {
      courseId: courseId, 
      userId: localStorage.getItem("id"),  
      marks: totalQsns > 0 ? (correctCount / totalQsns) * 100 : 0 // FIXED: Added safety check
    }
    
    axios.post(`http://localhost:8080/api/assessments/add/${userId}/${courseId}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('Request successful:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // FIXED: Updated message calculation
  let message = '';
  const percentage = totalQsns > 0 ? (correctCount / totalQsns) * 100 : 0;

  if (percentage === 100) {
    message = 'Awesome 😎';
  } else if (percentage >= 60) {
    message = 'Good 😊';
  } else {
    message = 'Poor 😒';
  }

  return (
    <div className="assessment-container">
      <div style={{display:'flex'}}>
        <button 
          type="submit" 
          id="backbtn" 
          className="submit-button" 
          onClick={() => navigate(`/course/${courseId}`)}
        >
          <FontAwesomeIcon icon={faBackward}/>
        </button>  
        <h1 
          className="assessment-title" 
          style={{
            backgroundColor:'darkblue',
            marginLeft:'440px',
            width:'26%',
            color:"white",
            borderRadius:"25px",
            marginBottom:'10px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          Assessment Questions
        </h1>
      </div>
      
      <div className="assessment-form">
        {test.map((question, index) => {
          const questionId = question.no || index;
          return (
            <div 
              key={questionId} 
              style={{
                padding:"10px",
                backgroundColor:"rgb(454, 225, 180)",
                marginTop:"10px", 
                borderRadius:"18px"
              }}
            >
              <h3>{question.question}</h3>
              
              {/* FIXED: Changed from checkbox to radio buttons for single selection */}
              <label className="option">
                <input
                  type="radio"
                  name={`question_${questionId}`}
                  value={question.option1}
                  checked={selectedAnswers[questionId] === question.option1}
                  onChange={() => handleRadioChange(index, question.option1)}
                  style={{marginLeft:"20px"}}
                /> {question.option1}
              </label>
              
              <label className="option">
                <input
                  type="radio"
                  name={`question_${questionId}`}
                  value={question.option2}
                  checked={selectedAnswers[questionId] === question.option2}
                  onChange={() => handleRadioChange(index, question.option2)}
                  style={{marginLeft:"20px"}}
                /> {question.option2}
              </label>
              
              <label className="option">
                <input
                  type="radio"
                  name={`question_${questionId}`}
                  value={question.option3}
                  checked={selectedAnswers[questionId] === question.option3}
                  onChange={() => handleRadioChange(index, question.option3)}
                  style={{marginLeft:"20px"}}
                /> {question.option3}
              </label>
              
              <label className="option">
                <input
                  type="radio"
                  name={`question_${questionId}`}
                  value={question.option4}
                  checked={selectedAnswers[questionId] === question.option4}
                  onChange={() => handleRadioChange(index, question.option4)}
                  style={{marginLeft:"20px"}}
                /> {question.option4}
              </label>
            </div>
          );
        })}
        
        <div style={{padding: '20px 0 0 0 '}}>
          <button 
            onClick={() => navigate(0)} 
            className="submit-button" 
            style={{marginLeft:"30px",padding:"5px 15px"}}
          >
            Reset
          </button>
          <button 
            onClick={() => {handleMarks(); setOpenModal(true)}}
            className="submit-button11"
          >
            Submit
          </button>
        </div>
      </div>
      
      <Modal
        id="poppup"
        open={openModal}
        onOk={() => {
          handleOk();
        }}
        onCancel={handleCancel}
        style={{padding:"10px"}}
      >
        <h2 style={{color:'darkblue'}}>Assessment Result</h2>
        <h1 style={{textAlign:"center"}}>{message}</h1>
        <h3 style={{display:'flex',justifyContent:'center'}}>
          You scored {totalQsns > 0 ? Math.round((correctCount/totalQsns)*100) : 0}%
        </h3>
      </Modal>
    </div>
  );
}

export default YourComponent;