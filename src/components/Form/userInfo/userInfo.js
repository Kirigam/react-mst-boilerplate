import React from 'react';
import s from './userInfoModule.module.scss';
import { useSnackbar } from 'notistack';
import { useStore } from '../../../stores/stores';
import storageService from '../../../utils/storageService';
import localStorageKeys from '../../../constants/localStorageKeys';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Avatar, Button } from '@material-ui/core';
import { CustomInput } from '../Elements/input/input';
import { CustomInputMask } from '../Elements/inputMask/inputMask';
import * as Yup from 'yup';

export const UserInfo = ({ ...props }) => {
  const { users } = useStore();
  const AuthUser = users.authUser;
  const { isOpenBox } = props;

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }

  const { enqueueSnackbar } = useSnackbar();

  function onSubmit(value) {
    console.log(value);

    const userID = storageService.get(localStorageKeys.USER_ID);
    value.user_id = Number(userID);

    Promise.resolve(users.updateUser(value))
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

  const infoUser = {
    full_name: {
      value: !!AuthUser.full_name ? AuthUser.full_name : '',
      visible: false,
    },
    email: {
      value: !!AuthUser.email ? AuthUser.email : '',
      visible: !!AuthUser.email ? true : false,
    },
    phone_number: {
      value: !!AuthUser.phone_number ? AuthUser.phone_number : '',
      visible: false,
    },
    companyName: {
      value: '',
      visible: false,
    },
    companyEdrpou: {
      value: '',
      visible: false,
    },
    address: {
      value: !!AuthUser.client_profile.address
        ? AuthUser.client_profile.address
        : '',
      visible: false,
    },
    webSite: {
      value: !!AuthUser.client_profile.site
        ? AuthUser.client_profile.site
        : '',
      visible: false,
    },
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
    company_edrpou: Yup.number().typeError(
      'Код ЄДРПУ повинен містити числові дані',
    ),
  });
  if (AuthUser.client_profile.company !== null) {
    if (!!AuthUser.client_profile.company.edrpou)
      infoUser.companyEdrpou.value = Number(
        AuthUser.client_profile.company.edrpou,
      );
    if (!AuthUser.client_profile.is_admin)
      infoUser.companyEdrpou.visible = true;
    if (!!AuthUser.client_profile.company.name) {
      infoUser.companyName.value =
        AuthUser.client_profile.company.name;
    }
    if (!AuthUser.client_profile.is_admin)
      infoUser.client_profile.visible = true;
  }

  const initialValues = {
    full_name: infoUser.full_name.value,
    email: infoUser.email.value,
    phone_number: infoUser.phone_number.value,
    company_name: infoUser.companyName.value,
    company_edrpou: infoUser.companyEdrpou.value,
    address: infoUser.address.value,
    website: infoUser.webSite.value,
  };

  return (
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
                disabled={!!infoUser.full_name.visible}
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Номер телефону"
                name="phone_number"
                id="phone_number"
                mask="+380(99)999-99-99"
                disabled={!!infoUser.phone_number.visible}
                type="tel"
                component={CustomInputMask}
              />

              <Field
                disabled
                placeholder="E-mail"
                name="email"
                id="email"
                disabled={!!infoUser.email.visible}
                type="text"
                component={CustomInput}
              />
            </div>
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
                <Typography className={s.InpunTitle} variant="body2">
                  Назва компанії
                </Typography>

                <Field
                  placeholder=""
                  name="company_name"
                  id="company_name"
                  type="text"
                  disabled={!!infoUser.companyName.visible}
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={s.InpunTitle} variant="body2">
                  Код ЄДРПОУ
                </Typography>

                <Field
                  placeholder=""
                  name="company_edrpou"
                  id="company_edrpou"
                  type="text"
                  disabled={!!infoUser.companyEdrpou.visible}
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={s.InpunTitle} variant="body2">
                  Адреса поставки
                </Typography>

                <Field
                  placeholder=""
                  name="address"
                  id="address"
                  type="text"
                  disabled={!!infoUser.address.visible}
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={s.InpunTitle} variant="body2">
                  Сайт
                </Typography>

                <Field
                  placeholder=""
                  name="website"
                  id="website"
                  type="text"
                  disabled={!!infoUser.webSite.visible}
                  component={CustomInput}
                />
              </div>
            </div>
          </div>
        </Box>
        <Box>
          <Button
            className={s.btn_standart}
            type="submit"
            // onSubmit={onSubmit}
          >
            Зберегти дані
          </Button>
          <Button onClick={isOpenBox}>Змінити пароль</Button>
        </Box>
      </Form>
    </Formik>
  );
};
