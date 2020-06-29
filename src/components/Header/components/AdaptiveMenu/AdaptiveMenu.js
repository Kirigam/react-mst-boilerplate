import React from 'react';
import s from './AdaptiveMenu.module.scss';
import { isLoggedIn } from '../../../../utils/general';
import { Sidebar } from '../../../Sidebar/Sidebar';

export const AdaptiveMenu = ({ isOpen }) => {
  const websiteUrl = process.env.WEBSITE_URL;

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
            {!isLoggedIn() ? (
              <>
                <Sidebar></Sidebar>
              </>
            ) : (
              // <></>
              <div className="">
                <a
                  href={websiteUrl}
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
