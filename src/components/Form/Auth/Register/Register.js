import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { Snackbar } from '@material-ui/core';
import { RegisterFormComponent } from './RegisterForm';
import getStyle from '../AuthStyle';

import { Alert, AlertTitle } from '@material-ui/lab';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import { useStore } from '../../../../stores/stores';
import routes from '../../../../constants/routes';


function RegisterForm() {
  const store = useStore();
  const history = useHistory();
  const [state, setState] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'right',
    text: '',
  });

  const s = getStyle();
  const { open, text } = state;

  const handleClose = () => setState({ ...state, open: false });

  async function onSubmit(values) {
    if (values.password1 && values.email) {
      let results = await store.users.register(values);
      if (!!results.status_code) {
        setState({ ...state, open: true, text: results.email });
      } else {
        history.push(routes.HOME);
      }
    }
  }

  return (
    <main className={s.auth}>
      <div className={s.auth_main}>
        <div className={s.auth_main__form}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
          >
            <Alert severity="error">
              <AlertTitle>Помилка</AlertTitle>
              {text}
            </Alert>
          </Snackbar>
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
  );
}
export default observer(RegisterForm);
