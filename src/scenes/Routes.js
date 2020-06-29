import React, { useState } from 'react';

import { isLoggedIn } from '../utils/general';
import { publicRoutes, privateRoutes } from '../constants/routes';
import { useHistory, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import RegisterForm from './Register/Register';
import MainScreen from './Home/Home';
import { Headers } from '../components/Header/Header';
import s from './Home/Home.module.scss';

export const Router = () => {
  const history = useHistory();
  const currentLocation = history.location.pathname;
  const [isOpen, SetOpen] = useState({ open: false });

  function OpenMenu() {
    SetOpen({ open: !isOpen.open });
  }

  if (!isLoggedIn() && currentLocation !== publicRoutes.REGISTER) {
    history.push(publicRoutes.LOGIN);
  }

  return (
    <div className={isOpen.open ? `${s.isOverflov}` : ''}>
      <Headers isOpen={isOpen} OpenMenu={OpenMenu} />
      <Switch>
        <Route path={publicRoutes.LOGIN} component={Login}></Route>
        <Route
          path={publicRoutes.REGISTER}
          component={RegisterForm}
        ></Route>
        <Route
          path={privateRoutes.HOME}
          component={MainScreen}
        ></Route>
      </Switch>
    </div>
  );
}
