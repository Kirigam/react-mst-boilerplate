import React, { useState } from 'react';
import { observer } from 'mobx-react';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from './../AuthStyle.js';
import { LoginFormComponent } from './components/LoginForm';
import { useStore } from '../../../../stores/stores';
import { useHistory } from 'react-router-dom';
import { PrivateRoute } from '../../../../Constants/Index';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { isLoginUser } from '../../../../utils/userUtil';

function LoginForm() {
  const s = useStyles();
  let history = useHistory();

  if (isLoginUser()) {
    history.push(PrivateRoute.HOME);
  }

  const store = useStore();

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
  });
  const [isLoading, setisLoading] = useState(false);

  const { vertical, horizontal, open, text } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  async function onSubmit(values) {
    try {
      setisLoading(true)
      let res = await store.users.login(values);

      if (!!res.status_code) {
        let error_text;

        if (
          res.non_field_errors ==
          'Неможливо зайти з введеними даними.'
        ) {
          error_text = 'Користувача з такими даними не існує';
        } else {
          error_text = res.non_field_errors;
        }
        setState({
          ...state,
          open: true,
          text: error_text,
        });
      } else {
        console.log('asdas');

        history.push(PrivateRoute.HOME);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">
          <AlertTitle>Помилка</AlertTitle>
          {text}
        </Alert>
      </Snackbar>

      <main className={s.auth}>
        <div className={s.auth_main}>
          <div className={s.auth_main__form}>
            <LoginFormComponent
              isLoading={isLoading}
              onSubmit={onSubmit}
            ></LoginFormComponent>
          </div>
        </div>
        <div className={s.auth_bg}>
          <img src={bg} alt="" />
        </div>
      </main>
    </>
  );
}
export default observer(LoginForm);
