import React from 'react';
import s from './chengPassword.module.scss';
import { Button, Box, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../Elements/input/input';
import * as Yup from 'yup';
import { useStore } from '../../../stores/stores';
import storageService from '../../../utils/storageService';
import { NameStorage } from '../../../Constants/Index';
import { useSnackbar } from 'notistack';

export const ChengPassword = ({ onChange }) => {
  const { users } = useStore();
  const validationSchemaPassword = {
    old_password: '',
    password: '',
    RepeatPassword: '',
  };

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }
  const { enqueueSnackbar } = useSnackbar();

  const validationSchemaUser = Yup.object({
    old_password: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
    RepeatPassword: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .oneOf(
        [Yup.ref('password'), null],
        'Паролі повинні співпадати',
      ),
    password: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .oneOf(
        [Yup.ref('RepeatPassword'), null],
        'Паролі повинні співпадати',
      ),
  });

  
  function onChange(value){
    console.log(value);

    const userID = storageService.get(NameStorage.USERID);
    value.user_id = Number(userID);
    
    Promise.resolve(users.changePassword(value))
      .then((result) => {
        result.data.messages.length > 0 &&
          result.data.messages.map((item) =>
            infoMassege(item.status, item.text),
          );
      })
      .catch((result) => {
        console.log(result);
      });
  }




  return (
    <>
      <Formik
        initialValues={validationSchemaPassword}
        validationSchema={validationSchemaUser}
        onSubmit={onChange}
      >
        <Form className={s.password_box}>
          <Box mt={2} className={s.setings}>
            <div className={s.conteiner}>
              <Typography className={s.InpunTitle} variant="body2">
                Пароль
              </Typography>
              <Box mt={2} className={s.password_box}>
                <Field
                  name="old_password"
                  id="old_password"
                  type="password"
                  placeholder="Старий пароль"
                  component={CustomInput}
                />
                <Field
                  placeholder="Новий пароль"
                  name="password"
                  id="password"
                  type="password"
                  component={CustomInput}
                />
                <Field
                  placeholder="Повторити пароль"
                  name="RepeatPassword"
                  id="RepeatPassword"
                  type="password"
                  component={CustomInput}
                />
              </Box>
            </div>
            <div className={s.conteiner}></div>
          </Box>
          <div>
            <Button className={s.btn_standart} type="submit">
              Зберегти
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
