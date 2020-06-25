import React from 'react';
import { Avatar, Button, Typography, Box } from '@material-ui/core';
import s from './UserSetings.module.scss';
// import { CustomInput } from "../../form/input/input";
import { Formik, Form, Field } from 'formik';
// import { CustomInputMask } from "../../form/inputMask/inputMask";
import { CustomInput } from '../../Form/Elements/input/input';
import { CustomInputMask } from '../../Form/Elements/inputMask/inputMask';
import { useStore } from '../../../stores/stores';
import * as Yup from 'yup';
// import * as Api from '../../../Api';
import storageService from '../../../utils/storageService';
import { NameStorage } from '../../../Constants/Index';

export const UserSetings = () => {
  const { users } = useStore();
  const AuthUser = users.authUser;
  console.log(AuthUser );
  
  const infoUser = {
    companyName: '',
    companyEdrpou: '',
  };

  if (AuthUser.client_profile.company !== null) {
    if (!!AuthUser.client_profile.company.edrpou) {
      infoUser.companyEdrpou = AuthUser.client_profile.company.edrpou;
    }
    if (!!AuthUser.client_profile.company.name) {
      infoUser.companyName = AuthUser.client_profile.company.name;
    }
  }

  const initialValues = {
    full_name: AuthUser.full_name,
    email: AuthUser.email,
    phone_number: !!AuthUser.phone_number
    ? AuthUser.phone_number
    : '',
    nameCompani: infoUser.companyName,

    edrpou: infoUser.companyEdrpou,
    adresss: !!AuthUser.client_profile.address
      ? AuthUser.client_profile.address
      : '',
    web_site: !!AuthUser.client_profile.site
      ? AuthUser.client_profile.site
      : '',
    // oldpassword: '',
    // password: '',
    // RepeatPassword: '',
  };
  const validationSchema = Yup.object({
    full_name: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
    phone_number: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
    email: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .email('Введіть E-mail адресу'),

    // RepeatPassword: Yup.string()
    //   // .required("Поле обов'язкове для заповнення")
    //   .oneOf(
    //     [Yup.ref('password'), null],
    //     'Паролі повинні співпадати',
    //   ),
    // password: Yup.string()
    //   // .required("Поле обов'язкове для заповнення")
    //   .oneOf(
    //     [Yup.ref('RepeatPassword'), null],
    //     'Паролі повинні співпадати',
    //   ),
  });

  const onSubmit = (value) => {
    const userID = storageService.get(NameStorage.USERID);

    // value.user_id = Number(userID);
    // value.order_id = newOrder.orderID;
    console.log(value );

    Promise.resolve(users.setingsUser(userID, value))
      .then((result) => {
        console.log(result);
        // if (result.data.status == 'ok') {
        //   console.log(result.data.message);
        //    storageService.set(NameStorage.USERORDE,1);

        //   history.push(PrivateRoute.HOME);
        // }if (result.data.status == 'bad') {
        //   setIsError({ ...isError, open: true, text: result.data.messages[0].message });
        // } else {

        // }
      })
      .catch((result) => {
        console.log(result);
      });
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
                {/* <Button>Завантажити фото </Button> */}
              </div>
              <div className={s.userInfoBlock}>
                <Field
                  placeholder="Прізвище Ім'я Побатькові"
                  name="full_name"
                  id="full_name"
                  type="text"
                  component={CustomInput}
                />
                <Field
                  placeholder="Номер телефону"
                  name="phone_number"
                  id="phone_number"
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
                  component={CustomInput}
                />
              </div>

              {/* <div className="">
                <Typography className={s.InpunTitle} variant="body2">
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
              </div> */}
            </div>

            <div className={`${s.conteiner} `}>
              <Typography
                className={s.SetingTitle}
                variant="h4"
                fontWeight="600"
              >
                Особиста інформація
              </Typography>
              <div className={s.userInfoCompany}>
                <div>
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
                    disabled={!!infoUser.companyName}
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
                    placeholder=""
                    name="edrpou"
                    id="edrpou"
                    type="text"
                    disabled={!!infoUser.companyEdrpou}
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
            </div>
          </Box>
          <Box>
            {/* <Button>Змінити пароль</Button> */}
            {/* <Button
              className={s.btn_standart}
              type="submit"
              onSubmit={onSubmit}
            >
              Зберегти дані
            </Button> */}
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
