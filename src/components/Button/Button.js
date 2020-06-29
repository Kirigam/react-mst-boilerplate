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
  buttonStyles,
  ...buttonProps
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
      {isLoading && <CircularProgress size={18} className={s.loader} />}
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
};
Button.defaultProps = {
  onClick: F,
  isLoading: false,
  isDisabled: false,
  buttonStyles: {
    button: {},
    loader: {},
  },
};

export default Button;
