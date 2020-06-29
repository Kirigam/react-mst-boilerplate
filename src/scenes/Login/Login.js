import React from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AuthLayout from '../../components/AuthLayout/AuthLayout';
import { LoginForm } from '../../components/forms/LoginForm';

import { useStore } from '../../stores/stores';
import { privateRoutes } from '../../constants/routes';

function Login() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    auth: { loginUser },
  } = useStore();

  const onSubmit = async (values) => {
    await loginUser.run(values);

    if (loginUser.isError) {
      return enqueueSnackbar(loginUser.errorMessage, {
        variant: 'error',
      });
    }

    return history.push(privateRoutes.HOME);
  };

  return (
    <AuthLayout>
      <LoginForm
        isLoading={loginUser.inProgress}
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}

export default observer(Login);
