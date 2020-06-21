import React from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import { isLoggedIn } from '../utils/general';
import routes from '../constants/routes';

import LoginForm from '../components/Form/Auth/Login/Login';
import RegisterForm from '../components/Form/Auth/Register/Register';

export function Routes() {
  const history = useHistory();

  if (!isLoggedIn()) {
    history.push(routes.LOGIN);
  }

  return (
    <Switch>
      <Route exact path={routes.HOME} />
      <Route path={routes.LOGIN} component={LoginForm} />
      <Route path={routes.REGISTER} component={RegisterForm} />
    </Switch>
  );
}
