import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  MainTitle: {
    color: '#26272a',
  },
  SubMainTitle: {
    color: '#262729',
  },
  seting: {
    padding: 0,
    backgroundColor: '#f9fafa !important',
    lineHeight: '1',
    color: '#5866a1',
    fontSize: '14px',
    fontWeight: 600,
    transition:'.3s',
    marginTop:'8px',
    textTransform:'none',
    '&:hover': {
      color: '#828cb9',
      transition:'.3s',
    //   transform:'rotate(0deg)',
      '& .MuiButton-startIcon': {
        // transform:'rotate(45deg)',
        transition:'.6s',
        color: '#828cb9',
      }
      
    },
  },
  FormOrderStart:{
      display:"grid",
      gridGap:'16px'
  },

  card:{
    display:'inline-block',
    padding:"20px 25px"
  },

  cardTitle:{
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom:'10px',
    lineHeight: '1.5',
    color: '#262729'
  },
  cardName:{
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '1.71',
    color: '#6c6e75'
  },
  cardMail:{
    fontSize: '14px',
    lineHeight: '1.71',
    color: '#6c6e75'
  },
  cardLinkMail:{
      marginTop:'14px',
      
  }




}));
