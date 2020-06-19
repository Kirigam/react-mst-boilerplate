import React from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { PublicRoute } from '../../../../../Constants/Index';
import { CustomInput } from '../../../Elements/input/input';
import { CustomInputMask } from './../../../Elements/inputMask/inputMask';

import useStyles from '../../AuthStyle';
// import google from './../../../../assetc/svg/google.svg';

export const RegisterFormComponent = ({ onSubmit, isLoading }) => {
  const initialValues = {
    full_name: 'Собська Наталя Григорівна ',
    phone: '+380 (073) 094 2345',
    email: 'Sobtest@gmail.com',
    password1: '123123123',
    password2: '123123123',
  };
  const validationSchema = Yup.object({
    full_name: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
    phone: Yup.string().required("Поле обов'язкове для заповнення"),
    email: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .email('Введіть E-mail адресу'),
    password1: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
    password2: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .oneOf(
        [Yup.ref('password1'), null],
        'Паролі повинні співпадати',
      ),
  });

  var classes = useStyles();

  return (
    <>
      <div className="auth__form">
        <Box>
          <Typography variant="h3" className={classes.authFormTitle}>
            Реєстрація
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div>
              <Field
                placeholder="Ім'я"
                name="full_name"
                id="full_name"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Номер телефону"
                name="phone"
                id="phone"
                mask="+380(99)999-99-99"
                type="tel"
                component={CustomInputMask}
              />
              <Field
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Пароль"
                name="password1"
                id="password1"
                type="password"
                component={CustomInput}
              />
              <Field
                placeholder="Повторіть пароль"
                name="password2"
                id="password2"
                type="password"
                component={CustomInput}
              />
            </div>

            <Box className={classes.formFooterRegister}>
              <Box className={classes.formFooterRegister_info}>
                <Typography variant="body1" color="textPrimary">
                  Вже зареєстровані?
                </Typography>
                <Link
                  className={classes.formFooter_link}
                  to={PublicRoute.LOGIN}
                >
                  <Typography variant="body2">Увійти</Typography>
                </Link>
              </Box>
              <Button
                type="submit"
                className={classes.formFooter_button}
              >
                {isLoading ? (
                  <CircularProgress
                    size={22}
                    className={classes.loginLoader}
                  />
                ) : null}
                Зареєструватись
              </Button>
            </Box>
          </Form>
        </Formik>

        {/* <LineSeparator></LineSeparator> */}
        <Box display="flex" justifyContent="center">
          <Button size="large" className={classes.googleButton}>
            {/* <img
              src={google}
              alt="google"
              className={classes.googleIcon}
            /> */}
            Реєстрація через Gmail
          </Button>
        </Box>
      </div>
    </>
  );
};
