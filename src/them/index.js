import defaultTheme from './default';

import { createMuiTheme } from '@material-ui/core';

const overrides = {
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.5rem',
      lineHeight: '1.4',
    },
    h2: {
      fontSize: '2.625rem',
      lineHeight: '1.4',
    },
    h3: {
      fontSize: '2rem',
      lineHeight: '1.4',
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: '1.4',
    },
    h5: {
      fontSize: '1.25rem',
      lineHeight: '1.4',
    },
    h6: {
      fontSize: '1.125rem',
      lineHeight: '1.4',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.4',
      textDecoration: 'none',
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.4',
      textDecoration: 'none',
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      textDecoration: 'none',
    },
    caption2: {
      fontSize: '0.625rem',
      lineHeight: '1.4',
      textDecoration: 'none',
    },
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};
