import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  seting: {
    padding: 0,
    backgroundColor: '#f9fafa !important',
    lineHeight: '1',
    color: '#5866a1',
    fontSize: '14px',
    fontWeight: 600,
    transition:'.3s',
    '&:hover': {
      color: '#828cb9',
      transition:'.3s',
      transform:'rotate(0deg)',
      '& .MuiButton-startIcon': {
        transform:'rotate(45deg)',
        transition:'.6s',
        color: '#828cb9',
      }
      
    },
  },
}));
