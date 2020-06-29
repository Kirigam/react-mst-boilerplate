import React from 'react';

import './input.css'

export const CustomInput = ({ field,  form: { touched, errors },  ...props }) => (
  <div className="input">
      <div className={`input__box  `}>
      <input className={`input_field ${touched[field.name] && errors[field.name] ? 'input__box_error':''} `} type="text" {...field} {...props} />
      </div>
    
    {touched[field.name] && errors[field.name] && (
      <div className="input_error">{errors[field.name]}</div>
    )}
  </div>
);
