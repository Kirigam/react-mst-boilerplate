import { mergeDeepRight } from 'ramda';
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => {
  const defaultButtonStyle = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '10px 19px',
    transition: '.3s',
    '&:hover': {
      backgroundColor: '#5866a1',
    },
    '&:disabled': {
      opacity: '0.6',
      color: theme.palette.secondary.contrastText,
    },
  };
  const defaultLoaderStyle = {
    color: theme.palette.secondary.contrastText,
    marginLeft: '10px',
  };

  return {
    button: ({ button }) =>
      mergeDeepRight(defaultButtonStyle, button),
    loader: ({ loader }) =>
      mergeDeepRight(defaultLoaderStyle, loader),
  };
});
