import React, {useState} from 'react';

import { useLocation } from "react-router-dom";

const LessonPlan = () => {

  const { state } = useLocation();
  const lessonPlanFromState = state.lessonPlan;

  const [lessonPlan, setLessonPlan] = useState(lessonPlanFromState);
  return (
    <div className = "background-container">
      <div className="lesson-plan-container" style={{ textAlign: 'center', }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src="/images/circle_logo.jpg" 
              alt="Planify Logo"
              style={{ width: '10%' }}
            />
        </div>
          <div >
            <h1 style={{ fontWeight: 'bold', fontSize: '24px'}}>Lesson Plan</h1>
          </div>
          <textarea 
            className="lesson-plan"
            value={lessonPlan} 
            onChange={setLessonPlan} 
            style = {{padding: "10px", borderRadius: "5px", width: '70%', height: "500px", resize: "vertical", marginTop: "20px",  }}/>
      </div>
    </div>
  );
};

export default LessonPlan;
