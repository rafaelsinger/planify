import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { subjects, curriculum, learningApproaches, learningStyles } from "./dropdowns";
import "./form.css"
import axios from 'axios';
import { constructPrompt } from "./constructPrompt";

const initialValues = {
  grade: "",
  subject: "",
  curriculum: "",
  state: "",
  district: "",
  learningApproach: "",
  learningStyle: "",
  topic: "",
  time: "",
  numberOfClasses: "",
};

const requiredFields = [
  "grade",
  "subject",
  "state",
  "learningApproach",
  "learningStyle",
  "topic",
  "time",
  "numberOfClasses",
];

const validate = (values) => {
  const errors = {};
  for (const reqField of requiredFields) {
    if (!values[reqField]) {
      errors[reqField] = "Required";
    }
  }
  //! need further form validation
  return errors;
};

const onSubmit = async (values, {setSubmitting}) => {
    const prompt = constructPrompt(values);
    try{
        // console.log('in try');
        const response = await axios.post('http://localhost:3001/gpt-response', {prompt: prompt});
        console.log(response);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
    // try {
    //     const response = await axios.post('/api/route', {prompt});
    //     console.log('OpenAI API Response:', response.data);
    // } catch (error) {
    //     console.error('Error querying OpenAI:', error);
    // }

    setSubmitting(false);
};

const FormInput = () => (
<div className = "background-container">
  
  <div className="w-2/5 mx-auto">
    <Formik
      initialValues={initialValues}
    //   validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col" > 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/images/planify_logo.jpg" 
              alt="Planify Logo"
              style={{ width: '70%' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Generate a Lesson Plan!</p>
          </div>
          <Field type="text" name="grade" placeholder='Grade (K-12)' className='my-2' />
          <ErrorMessage name="grade" component="div" />

                  {/* Dropdown menu */}
        <Field as="select" name="subject" className='my-2'>
        <option value="" label="Select Subject" />
        {subjects.map((subject, index) => (
            <option key={index} value={subject} label={subject} />
        ))}
      </Field>
      <ErrorMessage name="subject" component="div" />
    
      {/* needs to be conditionally rendered if subject was touched/no errors*/}
      <Field as="select" name="curriculum" className='my-2'>
        <option value="" label="Select Standardized Curriculum (Optional)" />
        {curriculum.map((curriculum, index) => (
            <option key={index} value={curriculum} label={curriculum} />
        ))}
      </Field>
      <ErrorMessage name="curriculum" component="div" />

      <Field type="text" name="state" placeholder='State' className='my-2' />
      <ErrorMessage name="state" component="div" />

      {/* conditionally render after state */}
      <Field type="text" name="district" placeholder='District' className='my-2' />
      <ErrorMessage name="district" component="div" />

      <Field type="text" name="totalTopicTime" placeholder='Total Topic Time' className='my-2' />
      <ErrorMessage name="totalTopicTime" component="div" />

      <Field type="text" name="classTime" placeholder='Class Time' className='my-2' />
      <ErrorMessage name="classTime" component="div" />

      <Field type="text" name="numberOfClasses" placeholder='Number Of Classes' className='my-2' />
      <ErrorMessage name="numberOfClasses" component="div" />

      <Field as="select" name="learningApproach" className='my-2'>
        <option value="" label="Learning Approach" />
        {learningApproaches.map((learningApproach, index) => (
            <option key={index} value={learningApproach} label={learningApproach} />
        ))}
      </Field>
      <ErrorMessage name="learningApproach" component="div" />

      <Field as="select" name="learningStyle" className='my-2'>
        <option value="" label="Learning Style" />
        {learningStyles.map((learningStyle, index) => (
            <option key={index} value={learningStyle} label={learningStyle} />
        ))}
      </Field>
      <ErrorMessage name="learningStyle" component="div" />
      
      <Field as="textarea" name="topic" placeholder='Topic' className='my-2' />
      <ErrorMessage name="topic" component="div" />
          
          {/* shouldn't be able to resize textarea */}  
            <button type="submit" disabled={isSubmitting} className='text-white resize-none bg-blue-500 rounded-xl p-2' style={{ marginTop: '15px' }}>
              Generate
            </button>
          
        </Form>
      )}
    </Formik>
  </div>
</div> 
);

export default FormInput;