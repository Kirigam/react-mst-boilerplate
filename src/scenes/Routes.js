import React, { useState } from 'react';

import { isLoginUser } from '../utils/userUtil';
import { PublicRoute, PrivateRoute } from '../Constants/Index';
import { useHistory, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/Form/Auth/Login/Login';
import RegisterForm from '../Components/Form/Auth/Register/Register';
import MainScreen from './Home/Home';
import { Headers } from '../Components/Header/Header';
import s from './Home/Home.module.scss';
// import { BrowserRouter, Switch, Route } from "react-router-dom";

export const Router = () => {
  let history = useHistory();

  const [isOpen, SetOpen] = useState({ open: false });
  function OpenMenu() {
    SetOpen({ open: !isOpen.open });
  }
 

  if (!isLoginUser()) {
    console.log(window.location.pathname );
    
    if (window.location.pathname != '/auth/register') {
      history.push(PublicRoute.LOGIN);
    }
  }

  return (
    <>
      <div className={isOpen.open ? `${s.isOverflov}` : null}>
        <Headers isOpen={isOpen} OpenMenu={OpenMenu}></Headers>
        <Switch>
          <Route
            path={PublicRoute.LOGIN}
            component={LoginForm}
          ></Route>
          <Route
            path={PublicRoute.REGISTER}
            component={RegisterForm}
          ></Route>
          <Route
            path={PrivateRoute.HOME}
            component={MainScreen}
          ></Route>
        </Switch>
      </div>
    </>
  );
};
export default Router;
