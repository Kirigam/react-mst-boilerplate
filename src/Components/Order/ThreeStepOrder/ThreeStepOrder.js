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

export const ThreeStepOrder = () => {
  const history = useHistory();
  const { setOrderInfo, ...orderInfo } = useContext(CreateInfoOrder);
  const { directions, nomenclature, newOrder, manager } = orderInfo;

  const [isError, setIsError] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
  });
   
  const { vertical, horizontal, open, text } = isError;

  const handleClose = () => {
    setIsError({ ...isError, open: false });
  };

  const { users } = useStore();
  const AuthUser = users.authUser;
  console.log(AuthUser);

  // AuthUser.client_profile.company !== null;

  const initialValues = {
    company_name:
      AuthUser.client_profile.company !== null &&
      !!AuthUser.client_profile.company.name
        ? AuthUser.client_profile.company.name
        : '',
    edrpou:
      AuthUser.client_profile.company !== null &&
      !!AuthUser.client_profile.company.edrpou
        ? AuthUser.client_profile.company.edrpou
        : '',
    full_name: !!AuthUser.full_name ? AuthUser.full_name : '',
    phone: !!AuthUser.phone ? AuthUser.phone : '',
    email: !!AuthUser.email ? AuthUser.email : '',
    address: !!AuthUser.client_profile.address
      ? AuthUser.client_profile.address
      : '',
    website: !!AuthUser.client_profile.site
      ? AuthUser.client_profile.site
      : '',
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
    if (newOrder.orderID) {
      Promise.resolve(Api.orderFinishStep(value)).then((result) => {
        console.log(result);
        if (result.data.status == 'ok') {
          console.log(result.data.message);
           storageService.set(NameStorage.USERORDE,1);
  
          history.push(PrivateRoute.HOME);
        }if (result.data.status == 'bad') {
          setIsError({ ...isError, open: true, text: result.data.messages[0].message });
        } else {
          
        }
      }).catch(result=>{
        console.log( result);
        
      })
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
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Код ЄДРПО"
                name="edrpou"
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
                Відправитии на розціннку
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>


      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">
          <AlertTitle>Помилка</AlertTitle>
          {text}
        </Alert>
      </Snackbar>
    </>
  );
};
