import React from 'react';

import InputMask from "react-input-mask";
import './inputMask.css'

export const CustomInputMask = ({ field,  form: { touched, errors },  ...props }) => (
  <div className="input">
      <div className={`input__box  `}>
      <InputMask className={`input_field ${touched[field.name] && errors[field.name] ? 'input__box_error':''} `} type="text" {...field} {...props} />
      </div>
    
    {touched[field.name] && errors[field.name] && (
      <div className="input_error">{errors[field.name]}</div>
    )}
  </div>
);
