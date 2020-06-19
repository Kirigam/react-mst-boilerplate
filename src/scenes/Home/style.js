import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  mainScreen: {
    display: 'grid',
    gridTemplateColumns: ' 285px 1fr',
    height: 'calc(100vh - 40px)',
  },
  mainScreenSidebar: {
    // padding: theme.spacing(3),
    // paddingBottom: theme.spacing(1),
    display:'grid',
    gridTemplateRows: '1fr 65px'
  },
  mainScreenHero:{
    backgroundColor: '#fff',
  },
  
  //   logotypeContainer: {
  //     backgroundColor: theme.palette.primary.main,
  //     width: "60%",
  //     height: "100%",
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     [theme.breakpoints.down("md")]: {
  //       width: "50%",
  //     },
  //     [theme.breakpoints.down("md")]: {
  //       display: "none",
  //     },
  //   },

  formFooterRegister: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  formFooterRegister_info: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: theme.spacing(2.5),
    },
  },
  formFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formFooter_link: {
    textDecoration: 'none',
    color: '#5866a1',
  },
  formFooter_button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '10px 19px',
    transition: '.3s',
    '&:hover': {
      backgroundColor: '#5866a1',
      transition: '.3s',
    },
  },
  loginLoader: {
    marginRight: '10px',
  },
  googleButton: {
    '&:hover': {
      boxShadow: theme.customShadows.widget,
    },
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textTransform: 'none',
    border: 'solid 1px #dadbdc',
    borderRadius: '4px',
    color: '#6c6e75',
    fontWeight: '600',
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 24,
    backgroundColor: 'white',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 20,
    },
  },
  auth__form_footer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  authFormTitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(2),
    color: '#262729',
  },
}));
