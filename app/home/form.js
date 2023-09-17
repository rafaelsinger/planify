"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { subjects, curriculum, learningApproaches, learningStyles } from "./dropdowns";
import "./form.css"

const initialValues = {
  grade: "",
  subject: "",
  curriculum: "",
  state: "",
  district: "",
  learningApproach: "",
  learningStyle: "",
  topic: "",
};

const requiredFields = [
  "grade",
  "subject",
  "state",
  "learningApproach",
  "learningStyle",
  "topic",
];

const validate = (fields) => {
  const errors = {};
  for (const reqField of requiredFields) {
    if (!fields[reqField]) {
      errors[reqField] = "Required";
    }
  }
  //! need further form validation
  return errors;
};

const onSubmit = ({ fields, setSubmitting }) => {
    console.log(fields);
  //!API REQUEST HERE
};

const FormInput = () => (
  <div className="w-2/5 mx-auto">
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col" > 
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
          <button type="submit" disabled={isSubmitting} className='text-white resize-none bg-blue-500 rounded-xl p-2'>
            Generate
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormInput;
