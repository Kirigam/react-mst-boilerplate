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
  const [isLoading, setisLoading] = useState(false);

  if (isLoginUser()) {
    history.push(PrivateRoute.HOME);
  }

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
  });
  const [errorForm, seterrorForm] = useState({});

  const { vertical, horizontal, open, text } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  

  async function onSubmit(values) {
    try {
      setisLoading(true)
      const response = await store.users.register(values);
      if (!!response.status_code) {
        if (response.email) {
          setState({ ...state, open: true, text: response.email });
        }
        if (response.full_name) {
          setState({
            ...state,
            open: true,
            text: response.full_name,
          });
        }
        if (response.phone) {
          setState({ ...state, open: true, text: response.phone });
        }
      } else {
        history.push(PrivateRoute.HOME);
      }
      setisLoading(false)
    } catch (error) {
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
            <RegisterFormComponent
              isLoading={isLoading}
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
