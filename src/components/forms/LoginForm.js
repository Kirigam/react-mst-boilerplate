import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Button as MaterialButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
import { Formik, Field, Form } from 'formik';

import Button from '../Button/Button';
import { CustomInput } from '../../components/Form/Elements/input/input';

import useStyle from './style';
import { publicRoutes } from '../../constants/routes';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/validations';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({
  email: emailValidation(),
  password: passwordValidation(),
});

export function LoginForm({ onSubmit, isLoading }) {
  const s = useStyle({ isLoading });

  return (
    <>
      <Box>
        <Typography variant="h3" className={s.formTitle}>
          Логін
        </Typography>
      </Box>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <Field
            placeholder="E-mail"
            name="email"
            id="email"
            type="text"
            component={CustomInput}
          />
          <Field
            placeholder="Пароль"
            name="password"
            id="password"
            type="password"
            component={CustomInput}
          />

          <Box className={s.formFooter}>
            <Link className={s.formFooterLink} to="#">
              <Typography variant="body2">Забули пароль</Typography>
            </Link>
            <Button
              type="submit"
              text="Увійти"
              isLoading={isLoading}
            />
          </Box>
        </Form>
      </Formik>

      <Box display="flex" justifyContent="center">
        <MaterialButton size="large" className={s.googleButton}>
          Увійти через Gmail
        </MaterialButton>
      </Box>
      <Box className={s.formFooterLogin}>
        <Typography variant="body1" color="textPrimary">
          Ще не зареєcторовані
        </Typography>
        <Box ml={1}>
          <Link
            to={publicRoutes.REGISTER}
            style={{ textDecoration: 'none', color: '#5866a1' }}
          >
            <Typography
              variant="body2"
              style={{ textTransform: 'initial' }}
            >
              Зареєструватися
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

LoginForm.propTypes = {
  isLoading: bool,
  onSubmit: func.isRequired,
};

LoginForm.defaultProps = { isLoading: false };
