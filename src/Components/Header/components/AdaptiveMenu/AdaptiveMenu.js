import React from 'react';
import s from './AdaptiveMenu.module.scss';
// import { Box } from '@material-ui/core';
import { PublicRoute } from '../../../../Constants/Index';
import { isLoginUser } from '../../../../utils/userUtil';
import { Sidebar } from '../../../Sidebar/Sidebar';

export const AdaptiveMenu = ({ isOpen }) => {
  //  console.log(!!isLoginUser());

  return (
    <>
      <div className={ isOpen ? `${s.navbar}` : `${s.navbar} ${s.navbar_active}` }>
        <div
          className={
            isOpen ? `${s.wrap}` : `${s.wrap} ${s.wrapactive}`
          }
        >
          {!!isLoginUser() ? (
            <>
              <div className="">
                <a
                  href={PublicRoute.URLWEBSITE}
                  className={s.btn_standart}
                >
                  Повернутись на головну
                </a>
              </div>
            </>
          ) : (
            <></>
            // <Sidebar></Sidebar>
          )}
        </div>
      </div>
    </>
  );
};
