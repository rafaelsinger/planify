import React from 'react';

import { useLocation } from "react-router-dom";

const LessonPlan = () => {

  const { state } = useLocation();
  const { lessonPlan } = state

  return (
    <div className="lesson-plan-container">
      <h1>Lesson Plan</h1>
      {error ? (
        <div className="error">{`Error: ${error}`}</div>
      ) : (
        <textarea className="lesson-plan" value={lessonPlan} onChange={handleLessonPlanChange} />
      )}
    </div>
  );
};

export default LessonPlan;
