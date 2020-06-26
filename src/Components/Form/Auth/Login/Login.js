import React, { useState } from 'react';
import { observer } from 'mobx-react';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from './../AuthStyle.js';
import { LoginFormComponent } from './components/LoginForm';
import { useStore } from '../../../../stores/stores';
import { useHistory } from 'react-router-dom';
import { PrivateRoute } from '../../../../Constants/Index';
import { isLoginUser } from '../../../../utils/userUtil';
import { useSnackbar } from 'notistack';

function LoginForm() {
  const s = useStyles();
  let history = useHistory();

  if (isLoginUser()) {
    history.push(PrivateRoute.HOME);
  }

  const store = useStore();

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }
  const { enqueueSnackbar } = useSnackbar();
 
  const [isLoading, setisLoading] = useState(false);
 
  async function onSubmit(values) {
    try {
      setisLoading(true);
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
        infoMassege('error', error_text);
      } else {
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
