import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  form: {
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: '1fr',
  },

  formTitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(2),
    color: '#262729',
  },

  formFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  formFooterLink: {
    textDecoration: 'none',
    color: '#5866a1',
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

  formFooterLogin: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
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
  formFooterRegisterInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: theme.spacing(2.5),
    },
  },
}));
