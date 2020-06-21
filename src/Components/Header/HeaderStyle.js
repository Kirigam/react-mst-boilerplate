import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  phone: {
    textDecoration: 'none',
    fontWeight: '600',
  },
  phoneText: {
    fontWeight: '600',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSelect: {
    border: 'none !important',
    '&:before,&:hover:before': {
      border: 'none !important',
    },
    '&:after,&:hover:after': {
      border: 'none !important',
    },
  },
  headerButton: {
    borderRadius: '4px',
    border: 'solid 1px #dadbdc',
    padding: '6px 16px',
    marginLeft: '15px',

    textDecoration: 'none',
    color: '#494a4e',
    "&:hover":{
      
        borderColor: '#556f99',
        transition: '.3s'
       
    },
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  HamburgerSlider: {
    padding: '0  !important',
    paddingLeft: ' 15px !important',
    outline: 'none !important',
    display:'none !important',
    '@media (max-width: 768px)': {
      display: 'block !important',
    },
  },
}));
