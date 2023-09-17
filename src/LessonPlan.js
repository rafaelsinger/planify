import React, {useEffect} from 'react';

import { useLocation } from "react-router-dom";

const LessonPlan = () => {
  const [lessonPlan, setLessonPlan] = React.useState();
  const [error, setError] = React.useState();

  const getLessonPlan = () => {
    const location = useLocation();
    setLessonPlan(location.state.lessonPlan);
  };

  useEffect(() => {
    getLessonPlan();
  }, []);

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
