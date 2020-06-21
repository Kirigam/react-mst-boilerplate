import React from 'react';
import { observer } from 'mobx-react';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from '../AuthStyle.js';
import { ForgotPasswordForm } from './componets/ForgotPasswordForm';

function ForgotPassword() {
  const s = useStyles();

  return (
    <>
      <main className={s.auth}>
        <div className={s.auth_main}>
          <div className={s.auth_main__form}>
            <ForgotPasswordForm />
          </div>
        </div>
        <div className={s.auth_bg}>
          <img src={bg} alt="" />
        </div>
      </main>
    </>
  );
}
export default observer(ForgotPassword);
