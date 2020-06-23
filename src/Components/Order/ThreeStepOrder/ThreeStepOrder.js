import React from 'react';
import s from './ThreeStepOrder.module.scss';
import { Button, Typography, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { CustomInput } from '../../Form/Elements/input/input';
import { CustomInputMask } from '../../Form/Elements/inputMask/inputMask';
import * as Yup from 'yup';

export const ThreeStepOrder = () => {
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

  function onSubmit(value) {
    console.log(value);
  }

  return (
    <>
      <div  >
        

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className={s.form_wrap}>
              <Field
                placeholder="Назва компанії"
                name="full_name"
                id="full_name"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Код ЄДРПО"
                name="phone"
                id="phone"
                mask="+380(99)999-99-99"
                type="tel"
                component={CustomInputMask}
              />
              <Field
                placeholder="Прізвище Ім'я Побатькові"
                name="email"
                id="email"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Телефон"
                name="phone"
                id="phone"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Адреса поставки"
                name="delivery"
                id="delivery"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Сайт"
                name="web_sait"
                id="web_sait"
                type="text"
                component={CustomInput}
              />
            </div>

            <Box className={s.butoon__order_wrap}>
              <Button type="submit" className={s.butoon__order}>
                Відправитии на розціннку
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </>
  );
};
