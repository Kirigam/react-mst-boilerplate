import React from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
import { Formik, Field, Form } from 'formik';

import { CustomInput } from '../../Elements/input/input';

import getStyle from '../AuthStyle';
import routes from '../../../../constants/routes';
import {
  emailValidation,
  passwordValidation,
} from '../../../../utils/validations';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({
  email: emailValidation(),
  password: passwordValidation(),
});

export function LoginFormComponent({ onSubmit, isLoading }) {
  const s = getStyle();

  return (
    <div className="auth__form">
      <Box>
        <Typography variant="h3" className={s.authFormTitle}>
          Логін
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
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
            <Link
              className={s.formFooter_link}
              to={routes.FORGOT_PASSWORD}
            >
              <Typography variant="body2">Забули пароль</Typography>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className={s.formFooter_button}
            >
              Увійти
              {isLoading && (
                <CircularProgress
                  size={18}
                  className={s.loginLoader}
                />
              )}
            </Button>
          </Box>
        </Form>
      </Formik>

      <Box display="flex" justifyContent="center">
        <Button size="large" className={s.googleButton}>
          Увійти через Gmail
        </Button>
      </Box>
      <Box className={s.auth__form_footer}>
        <Typography variant="body1" color="textPrimary">
          Ще не зареєcторовані
        </Typography>
        <Box ml={1}>
          <Link
            to={routes.REGISTER}
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
    </div>
  );
}

LoginFormComponent.propTypes = {
  isLoading: bool,
  onSubmit: func.isRequired,
};

LoginFormComponent.defaultProps = { isLoading: false };
