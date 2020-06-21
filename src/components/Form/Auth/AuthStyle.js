import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    auth:{
        position: 'relative',
        height:'calc(100vh - 42px)',
        overflow:'hidden'

    },
    auth_bg:{
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        img:{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
        
    },
    auth_main:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 102px)'
    },
    auth_main__form:{
        maxWidth: '550px',
        width: '100%',
        margin: '0 auto',
        zIndex: '1',
        background: '#fff',
        padding: '25px 45px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            padding: '25px 35px'
        },
    },
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
          width:'100%',
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
        '&:disabled': {
          opacity: '0.6',
          color: theme.palette.secondary.contrastText,
        },
      },
      loginLoader: {
        color: theme.palette.secondary.contrastText,
        marginLeft: '10px',
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
}))
