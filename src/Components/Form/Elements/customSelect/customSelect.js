import React from 'react';
// import useStyles from '.';
import Select from 'react-select';


export const CustomSelect = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  //   const s = useStyles();

  return (
    <>
      <div>
        <label htmlFor="color">Topic</label>
        <Select
          id="color"
          options={options} 
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {touched[field.name] && errors[field.name] && (
          <div className="input_error">{errors[field.name]}</div>
        )}
        {/* {!!this.props.error && this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>
            {this.props.error}
          </div>
        )} */}
      </div>
    </>
  );
};
