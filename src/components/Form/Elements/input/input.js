import React from 'react';

import s from './input.module.css'

export const CustomInput = ({ field, form: { touched, errors },  ...props }) => (
  <div className={s.input}>
      <div className={ s.input__box}>
      <input className={`${s.input_field} ${touched[field.name] && errors[field.name] ? `${s.input__box_error}`:''} `} type="text" {...field} {...props} />
      </div>
    
    {touched[field.name] && errors[field.name] && (
      <div className={s.input_error}>{errors[field.name]}</div>
    )}
  </div>
);
