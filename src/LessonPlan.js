import React, {useState} from 'react';

import { useLocation } from "react-router-dom";

const LessonPlan = () => {

  const { state } = useLocation();
  const lessonPlanFromState = state.lessonPlan;

  const [lessonPlan, setLessonPlan] = useState(lessonPlanFromState);

  return (
    <div className="lesson-plan-container">
      <h1>Lesson Plan</h1>
        <textarea className="lesson-plan" value={lessonPlan} onChange={setLessonPlan} />
    </div>
  );
};

export default LessonPlan;
