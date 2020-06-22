import React from 'react';
import s from './AdaptiveMenu.module.scss';
// import { Box } from '@material-ui/core';
import { PublicRoute } from '../../../../Constants/Index';
import { isLoginUser } from '../../../../utils/userUtil';
import { Sidebar } from '../../../Sidebar/Sidebar';

export const AdaptiveMenu = ({ isOpen }) => {
  console.log(isOpen);

  return (
    <>
      {isOpen && (
        <div
          className={
            isOpen ? `${s.navbar} ${s.navbar_active}` : `${s.navbar} `
          }
        >
          <div
            className={
              isOpen ? `${s.wrap} ${s.wrapactive}` : `${s.wrap}`
            }
          >
            {!!isLoginUser() ? (
              <>
                <Sidebar></Sidebar>
              </>
            ) : (
              // <></>
              <div className="">
                <a
                  href={PublicRoute.URLWEBSITE}
                  className={s.btn_standart}
                >
                  Повернутись на головну
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
