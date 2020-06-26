import React, { useContext, useState } from 'react';
import s from './ThreeStepOrder.module.scss';
import { Button, Typography, Box, Snackbar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { CustomInput } from '../../Form/Elements/input/input';
import { CustomInputMask } from '../../Form/Elements/inputMask/inputMask';
import * as Yup from 'yup';
// import {orderFinishStep} from './'
import * as Api from '../../../Api';
import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';
import storageService from '../../../utils/storageService';
import { NameStorage, PrivateRoute } from '../../../Constants/Index';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../stores/stores';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

export const ThreeStepOrder = () => {
  const history = useHistory();
  const { setOrderInfo, ...orderInfo } = useContext(CreateInfoOrder);
  const { directions, nomenclature, newOrder, manager } = orderInfo;

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }

  const { enqueueSnackbar } = useSnackbar();

  // const { vertical, horizontal, open, text } = isError;

  const { users } = useStore();
  const AuthUser = users.authUser;

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
      infoUser.companyName.visible = true;
  }

  const initialValues = {
    company_name: infoUser.companyName.value,
    edrpou: infoUser.companyEdrpou.value,
    full_name: infoUser.full_name.value,
    phone: infoUser.phone_number.value,
    email: infoUser.email.value,
    address: infoUser.address.value,
    website: infoUser.webSite.value,
  };
  const error = {
    form: {
      required: "Поле обов'язкове для заповнення",
    },
  };

  const validationSchema = Yup.object({
    company_name: Yup.string().required(error.form.required),
    edrpou: Yup.string().required(error.form.required),
    full_name: Yup.string().required(error.form.required),
    phone: Yup.string().required(error.form.required),
    email: Yup.string()
      .required(error.form.required)
      .email('Введіть E-mail адресу'),
    address: Yup.string().required(error.form.required),
    website: Yup.string().required(error.form.required),
  });

  function onSubmit(value) {
    const userID = storageService.get(NameStorage.USERID);

    value.user_id = Number(userID);
    value.order_id = newOrder.orderID;
    console.log(newOrder);

    if (newOrder.orderID) {
      Promise.resolve(Api.orderFinishStep(value))
        .then((result) => {
          console.log(result);

          result.data.messages.map((item) =>
            infoMassege(item.status, item.text),
          );

          return users.fetchUser(userID);
        })
        .then((result) => {
          history.push(PrivateRoute.HOME);
        })
        .catch((result) => {
          console.log(result);
        });
    }
  }

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className={s.form_wrap}>
              <Field
                placeholder="Назва компанії"
                name="company_name"
                id="company_name"
                disabled={!!infoUser.companyName.visible}
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Код ЄДРПО"
                name="edrpou"
                disabled={!!infoUser.companyEdrpou.visible}
                id="edrpou"
                type="tel"
                component={CustomInput}
              />
              <Field
                placeholder="Прізвище Ім'я Побатькові"
                name="full_name"
                id="full_name"
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
                name="address"
                id="address"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Сайт"
                name="website"
                id="website"
                type="text"
                component={CustomInput}
              />
            </div>

            <Box className={s.butoon__order_wrap}>
              <Button
                type="submit"
                onSubmit={onSubmit}
                className={s.butoon__order}
              >
                Відправити на розцінення
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </>
  );
};
