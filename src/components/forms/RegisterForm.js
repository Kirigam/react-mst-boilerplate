import React from 'react';
import {
  Box,
  Typography,
  Button as MaterialButton,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
import { Formik, Field, Form } from 'formik';

import Button from '../Button/Button';
import { CustomInput } from '../../components/Form/Elements/input/input';
import { CustomInputMask } from '../../components/Form/Elements/inputMask/inputMask';

import useStyle from './style';
import { publicRoutes } from '../../constants/routes';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from '../../utils/validations';

const initialValues = {
  phone: '',
  email: '',
  full_name: '',
  password: '',
  passwordConfirm: '',
};
const validationSchema = Yup.object({
  full_name: nameValidation("Ім'я"),
  phone: Yup.string().required("Поле обов'язкове для заповнення"),
  email: emailValidation(),
  password: passwordValidation(),
  passwordConfirm: passwordValidation().oneOf(
    [Yup.ref('password'), null],
    'Паролі повинні співпадати',
  ),
});

export function RegisterForm({ onSubmit, isLoading }) {
  const s = useStyle();

  return (
    <>
      <Box>
        <Typography variant="h3" className={s.formTitle}>
          Реєстрація
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <Field
            placeholder="Прізвище Ім'я Побатькові"
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
            name="password"
            id="password"
            type="password"
            component={CustomInput}
          />
          <Field
            placeholder="Повторіть пароль"
            name="passwordConfirm"
            id="passwordConfirm"
            key="passwordConfirm"
            type="password"
            component={CustomInput}
          />

          <Box className={s.formFooterRegister}>
            <Box className={s.formFooterRegisterInfo}>
              <Typography variant="body1" color="textPrimary">
                Вже зареєстровані?
              </Typography>
              <Link
                className={s.formFooterLink}
                to={publicRoutes.LOGIN}
              >
                <Typography variant="body2">Увійти</Typography>
              </Link>
            </Box>
            <Button
              text="Зареєструватись"
              type="submit"
              isLoading={isLoading}
            />
          </Box>
        </Form>
      </Formik>

      <Box display="flex" justifyContent="center">
        <MaterialButton size="large" className={s.googleButton}>
          Реєстрація через Gmail
        </MaterialButton>
      </Box>
    </>
  );
}

RegisterForm.propTypes = {
  isLoading: bool,
  onSubmit: func.isRequired,
};

RegisterForm.defaultProps = { isLoading: false };
