import React from 'react';

import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import AuthLayout from '../../components/AuthLayout/AuthLayout';
import { RegisterForm } from '../../components/forms/RegisterForm';

import { useStore } from '../../stores/stores';
import { privateRoutes } from '../../constants/routes';

function Register() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    auth: { registerUser },
  } = useStore();

  const onSubmit = async (values) => {
    await registerUser.run(values);

    if (registerUser.isError) {
      return enqueueSnackbar(registerUser.errorMessage, {
        variant: 'error',
      });
    }

    return history.push(privateRoutes.HOME);
  };

  return (
    <AuthLayout>
      <RegisterForm
        isLoading={registerUser.inProgress}
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}
export default observer(Register);
