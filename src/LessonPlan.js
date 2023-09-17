import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LessonPlan = () => {
  const [lessonPlan, setLessonPlan] = useState(''); // State to store the lesson plan text
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    // Fetch the lesson plan from the server when the component mounts
    const fetchLessonPlan = async () => {
      try {
        // Make an Axios POST request to your server
        const response = await axios.post('http://localhost:3001/gpt-response', {
          userAssistant: ["Generate a lesson plan for AP Mathematics about Integration for 12th graders."] // Or whatever prompt you want to send
        });

        // Update the `lessonPlan` state with the received data
        setLessonPlan(response.data.messageContent);

      } catch (error) {
        // Handle any errors
        setError(error.message);
      }
    };

    fetchLessonPlan();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <div className="lesson-plan-container">
      <h1>Lesson Plan</h1>
      {error ? (
        <div className="error">{`Error: ${error}`}</div>
      ) : (
        <pre className="lesson-plan">{lessonPlan}</pre>
      )}
    </div>
  );
};

export default LessonPlan;
