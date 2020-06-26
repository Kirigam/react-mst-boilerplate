import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { RegisterFormComponent } from './components/RegisterForm';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from './../AuthStyle.js';
import { useStore } from '../../../../stores/stores';

import { PrivateRoute } from '../../../../Constants/Index';
import { useHistory } from 'react-router-dom';
import { isLoginUser } from '../../../../utils/userUtil';
import { useSnackbar } from 'notistack';

function RegisterForm() {
  const s = useStyles();
  const store = useStore();
  let history = useHistory();
  const [isLoading, setisLoading] = useState(false);

  if (isLoginUser()) {
    history.push(PrivateRoute.HOME);
  }

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(values) {
    try {
      setisLoading(true);
      const response = await store.users.register(values);
      if (!!response.status_code) {
        if (response.email) {
          infoMassege('error', response.email);
        }
        if (response.full_name) {
          infoMassege('error', response.full_name);
        }
        if (response.phone) {
          infoMassege('error', response.phone);
        }
        if (response.password1) {
          infoMassege('error', response.password1[0]);
        }
      } else {
        history.push(PrivateRoute.HOME);
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
