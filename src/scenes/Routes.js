import React from 'react';

import { isLoginUser } from '../utils/userUtil';
import { PublicRoute, PrivateRoute } from '../Constants/Index';
import { useHistory, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/Form/Auth/Login/Login';
import RegisterForm from '../Components/Form/Auth/Register/Register';
import { MainScreen } from './Home/Home';

// import { BrowserRouter, Switch, Route } from "react-router-dom";

export const Router = () => {
  let history = useHistory();

  if (!isLoginUser()) {
    history.push(PublicRoute.LOGIN);
  }

  return (
    <Switch>
     
      <Route path={PublicRoute.LOGIN} component={LoginForm}></Route>
      <Route
        path={PublicRoute.REGISTER}
        component={RegisterForm}
      ></Route>
       <Route  path={PrivateRoute.HOME} component={MainScreen}></Route>

    </Switch>
  );
};
export default Router;
