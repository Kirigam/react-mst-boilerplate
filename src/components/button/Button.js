import React from 'react';
import { F } from 'ramda';
import { string, func, object, bool, shape } from 'prop-types';
import {
  CircularProgress,
  Button as MaterialButton,
} from '@material-ui/core';

import useStyle from './style';

function Button({
  text,
  onClick,
  isLoading,
  isDisabled,
  buttonProps,
  loaderProps,
  buttonStyles,
}) {
  const s = useStyle(buttonStyles);
  return (
    <MaterialButton
      onClick={onClick}
      className={s.button}
      disabled={isDisabled || isLoading}
      {...buttonProps}
    >
      {text}
      {isLoading && (
        <CircularProgress
          className={s.loader}
          {...loaderProps}
        />
      )}
    </MaterialButton>
  );
}

Button.propTypes = {
  text: string.isRequired,
  onClick: func,
  isLoading: bool,
  isDisabled: bool,
  buttonStyle: shape({
    button: object,
    loader: object,
  }),
  buttonProps: object,
  loaderProps: object,
};
Button.defaultProps = {
  onClick: F,
  isLoading: false,
  isDisabled: false,
  buttonStyles: {
    button: {},
    loader: {},
  },
  buttonProps: {},
  loaderProps: {},
};

export default Button;
