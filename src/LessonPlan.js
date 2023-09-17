import React, {useState} from 'react';

import { useLocation } from "react-router-dom";

const LessonPlan = () => {

  const { state } = useLocation();
  const lessonPlanFromState = state.lessonPlan;

  const [lessonPlan, setLessonPlan] = useState(lessonPlanFromState);

  return (
    <div className="lesson-plan-container flex-col items-center justify-center">
      <h1>Lesson Plan</h1>
        <textarea className="lesson-plan w-4/5 h-4/5 my-4" style={{"height": "90vh"}}value={lessonPlan} onChange={setLessonPlan} />
    </div>
  );
};

export default LessonPlan;
