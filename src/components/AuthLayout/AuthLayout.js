import React from 'react';

import s from './AuthLayout.module.scss';
import bg from '../../assetc/img/bg_fonts_1.jpg';


export default function AuthLayout({ children }) {
  return (
    <main className={s.auth}>
      <div className={s.auth_main}>
        <div className={s.auth_main_form}>{children}</div>
      </div>
      <div className={s.auth_bg}>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
