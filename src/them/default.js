// import tinycolor from "tinycolor2";

const primary = '#494a4e';
const secondary = '#2e408a';
const warning = '#faad14';
const success = '#2fa372';
const info = '#9013FE';

export default {
  palette: {
    primary: {
      main: primary,
      // contrastText: "#6c6e76",
    },
    secondary: {
      main: secondary,
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
    },
    success: {
      main: success,
    },
    info: {
      main: info,
    },
    text: {
      primary: '#6c6e75',
      secondary: '#5866a1',
    },
    background: {
      default: '#f9fafa',
    },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '0 5px',
      },
    },
    MuiMenuItem: {
      root: {
        lineHeight: '1',
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },


   
  },
};
