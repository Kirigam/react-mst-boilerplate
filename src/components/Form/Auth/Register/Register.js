import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { Snackbar } from '@material-ui/core';
import { RegisterFormComponent } from './RegisterForm';
import useStale from '../AuthStyle';

import { Alert, AlertTitle } from '@material-ui/lab';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';


function RegisterForm() {
  const [state, setState] = useState({
    open: false,
    text: '',
  });

  const s = useStale();
  const { open, text } = state;

  const handleClose = () => setState({ ...state, open: false });

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
          <RegisterFormComponent onSubmit={() => false}/>
        </div>
      </div>
      <div className={s.auth_bg}>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
export default observer(RegisterForm);
