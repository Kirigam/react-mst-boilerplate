import React from 'react';
import { Avatar, Button, Typography, Box } from '@material-ui/core';
import s from './UserSetings.module.scss';
// import { CustomInput } from "../../form/input/input";
import { Field, Form, Formik } from 'formik';
// import { CustomInputMask } from "../../form/inputMask/inputMask";
import { CustomInput } from '../../Form/Elements/input/input';
import { CustomInputMask } from '../../Form/Elements/inputMask/inputMask';
import { useStore } from '../../../stores/stores';
import * as Yup from 'yup';

export const UserSetings = () => {
   
  const { users } = useStore();
  const AuthUser = users.authUser;

  const initialValues = {
    email: '',
    phone: '',
    nameCompani: '',
    edrpou: '',
    adresss: '',
    web_site: '',
    oldpassword: '',
    password: '',
    RepeatPassword: '',
  };
  const validationSchema = Yup.object({
    phone: Yup.string().required("Поле обов'язкове для заповнення"),
    email: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .email('Введіть E-mail адресу'),

    RepeatPassword: Yup.string()
      // .required("Поле обов'язкове для заповнення")
      .oneOf(
        [Yup.ref('password'), null],
        'Паролі повинні співпадати',
      ),
    password: Yup.string()
      // .required("Поле обов'язкове для заповнення")
      .oneOf(
        [Yup.ref('RepeatPassword'), null],
        'Паролі повинні співпадати',
      ),
  });

  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <Box p={3}>
      <Typography variant="h2" className={s.title} fontWeight="600">
        Налаштування профілю
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Box mt={2} className={s.setings}>
            <div className={s.conteiner}>
              <Typography
                className={s.SetingTitle}
                variant="h4"
                fontWeight="600"
              >
                Особиста інформація
              </Typography>
              <div className={s.SetingAvatar}>
                <Avatar className={s.SetingAvatarFoto}></Avatar>
                <Button>Завантажити фото </Button>
              </div>
              <Field
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                value={AuthUser.full_name}
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
                disabled
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                value={AuthUser.email}
                component={CustomInput}
              />

              <div className="">
                <Typography
                  className={s.InpunTitle}
                  variant="body2"
                >
                  Пароль
                </Typography>

                <Field
                  name="oldpassword"
                  id="oldpassword"
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
              </div>
            </div>

            <div className={s.conteiner}>
              <Typography
                className={s.SetingTitle}
                variant="h4"
                fontWeight="600"
              >
                Особиста інформація
              </Typography>

              <div className="">
                <Typography
                  className={s.InpunTitle}
                  variant="body2"
                >
                  Назва компанії
                </Typography>

                <Field
                  placeholder=""
                  name="nameCompani"
                  id="nameCompani"
                  type="text"
                  // value="ТОВ Добробут"
                  // disabled
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography
                  className={s.InpunTitle}
                  variant="body2"
                >
                  Код ЄДРПОУ
                </Typography>

                <Field
                  // disabled
                  placeholder=""
                  name="edrpou"
                  id="edrpou"
                  type="text"
                  // value="1263712631267838712"
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography
                  className={s.InpunTitle}
                  variant="body2"
                >
                  Адреса поставки
                </Typography>

                <Field
                  placeholder=""
                  name="adresss"
                  id="adresss"
                  type="text"
                  // value="м. Тернопіль, С.Будного 32 А"
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography
                  className={s.InpunTitle}
                  variant="body2"
                >
                  Сайт
                </Typography>

                <Field
                  placeholder=""
                  name="web_site"
                  id="web_site"
                  type="text"
                  // value="www.company-site.com"
                  component={CustomInput}
                />
              </div>
            </div>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
