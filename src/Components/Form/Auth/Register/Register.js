import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { RegisterFormComponent } from './components/RegisterForm';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from './../AuthStyle.js';
import { useStore } from '../../../../stores/stores';
import { Snackbar } from '@material-ui/core';

import { Alert, AlertTitle } from '@material-ui/lab';
import { PrivateRoute } from '../../../../Constants/Index';
import { useHistory } from 'react-router-dom';
import { isLoginUser } from '../../../../utils/userUtil';

function RegisterForm() {
  const s = useStyles();
  const store = useStore();
  let history = useHistory();

  if (isLoginUser()) {
    history.push(PrivateRoute.HOME);
  }

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
  });

  const { vertical, horizontal, open, text } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  async function onSubmit(values) {
    if (values.password1 && values.email) {
      // let results = await store.users.register(values);
      // store.users.setUser(results.data.user);
      // console.log(store);

      // if (!!results.status_code) {
      //   setState({ ...state, open: true, text: results.email });
      // } else {
      //   history.push(PrivateRoute.HOME);
      // }




      await store.users.register(values)
      .then((results) => {
        window.localStorage.setItem('userId', results.data.user.id);
        window.localStorage.setItem('user_info', JSON.stringify(results.data.user));
        history.push(PrivateRoute.HOME); 
      })
      .catch((error) => {
        console.log(error );
        let error_text;
        if (!!error.response.data.status_code) {
          // console.log('wqeqw' );
          
          setState({
            ...state,
            open: true,
            text: error_text,
          });
        } else {
         
        }
      });
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
            <RegisterFormComponent
              isLoading={store.users.isLoading}
              onSubmit={onSubmit}
            ></RegisterFormComponent>
          </div>
        </div>
        <div className={s.auth_bg}>
          <img src={bg} alt="" />
        </div>
      </main>
    </>
  );
}
export default observer(RegisterForm);
