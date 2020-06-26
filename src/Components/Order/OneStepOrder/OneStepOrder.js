import React, { useState, useContext } from 'react';
import s from './firstStepOrder.module.scss';
import { Box, Button, Typography } from '@material-ui/core';
import { CardManager } from '../CardManager/CardManager';
import Select from 'react-select';
import * as Yup from 'yup';
import moment from 'moment';
import {
  DatePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { Form, Formik, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { CustomInput } from '../../Form/Elements/input/input';

import * as Api from '../../../Api';
import storageService from '../../../utils/storageService';
import { NameStorage } from '../../../Constants/Index.js';
import { useStore } from '../../../stores/stores';
import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';
// import { getSnapshot } from 'mobx-state-tree';
export const OneStepOrder = ({ ...props }) => {
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { users } = useStore();

  const { setOrderInfo, ...orderInfo } = useContext(CreateInfoOrder);
  const { directions, nomenclature, newOrder, manager } = orderInfo;

  const { onDirections, onNomenclature, setActiveStep } = props;
  console.log(selectedDate);

  const initialValues = {
    directions: '',
    nomenclature: '',
    count: '',
    data: selectedDate,
    deliveri_addres: '',
  };

  const validationSchema = Yup.object().shape({
    directions: Yup.string(),
    nomenclature: Yup.string(),
    count: Yup.number()
      .typeError('Введіть кількість в числовому форматі')
      .required("Поле обов'язкове для заповнення "),
    data: Yup.string().required("Поле обов'язкове для заповнення "),
    deliveri_addres: Yup.string().required(
      "Поле обов'язкове для заповнення ",
    ),
    // topic: Yup.string()
    //   .ensure()
    //   .required("Topic is required!")
  });

  async function onSubmit(value) {
    console.log(value);

    const clientProfileUser = users.authUser.client_profile.id;

    const userID = storageService.get(NameStorage.USERID);

    Promise.resolve(Api.createOrder(clientProfileUser))
      .then((results) => {
        const OrderId = results.data.id;

        let nomenclatureObject = {
          order_id: OrderId,
          nomenclature_id: nomenclature.value.id,
          amount: value.count,
          address: value.deliveri_addres,
          date: moment(new Date(selectedDate)).format('DD.MM.YYYY'),
        };
        return Api.addOrderedNomenclatures(nomenclatureObject);
      })
      .then((results) => {
        setActiveStep(1);

        setOrderInfo({
          ...orderInfo,
          directions: {
            ...orderInfo.directions,
            value: [],
          },
          nomenclature: {
            ...orderInfo.nomenclature,
            value: [],
          },
          newOrder: {
            ...orderInfo.newOrder,
            orderID: results.data.order_id,
            nomenclatures: newOrder.nomenclatures.concat(
              results.data,
            ),
          },
        });
      });
  }
  return (
    <>
      <Box className={s.first_order}>
        <Box className={s.first_order__sections}>
          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className={s.Form_wrap}>
                  <div>
                    <Typography
                      className={s.InpunTitle}
                      variant="body1"
                    >
                      Напрям номенклатури
                    </Typography>

                    <Select
                      className={s.input}
                      fullWidth
                      placeholder="Виберіть напрям"
                      options={directions.list}
                      isLoading={directions.isLoading}
                      onChange={onDirections}
                      value={directions.value}
                      name="directions"
                      id="directions"
                    />
                  </div>
                  <div>
                    <Typography
                      className={s.InpunTitle}
                      variant="body1"
                    >
                      Номенклатура
                    </Typography>

                    <Select
                      className={s.input}
                      fullWidth
                      placeholder="Виберіть номенклатуру"
                      options={nomenclature.tempList}
                      isLoading={nomenclature.isLoading}
                      value={nomenclature.value}
                      onChange={onNomenclature}
                      name="nomenclature"
                      id="nomenclature"
                      // error={touched.file && Boolean(errors.file)}
                    />
                  </div>
                  <div>
                    <Typography
                      className={s.InpunTitle}
                      variant="body1"
                    >
                      Кількість номенклвтури
                    </Typography>

                    <Field
                      placeholder="Введіть кількість номенклатури"
                      name="count"
                      id="count"
                      type="text"
                      component={CustomInput}
                    />
                  </div>
                  <div>
                    <Typography
                      className={s.InpunTitle}
                      variant="body1"
                    >
                      Дата доставки
                    </Typography>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        // variant=""
                        variant="inline"
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="dataPicer"
                        fullWidth
                        // label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>

                  <div>
                    <Typography
                      className={s.InpunTitle}
                      variant="body1"
                    >
                      Адреса доставки
                    </Typography>

                    <Field
                      placeholder="Введіть адресу доставки"
                      name="deliveri_addres"
                      id="deliveri_addres"
                      type="text"
                      component={CustomInput}
                    />
                  </div>
                </div>
                <div className={s.butoon__order_wrap}>
                  <Button className={s.butoon__order} type="submit">
                    Створити замовлення
                  </Button>
                </div>
              </Form>
            </Formik>
          </Box>
        </Box>
        <Box className={s.first_order__sections}>
          <CardManager manager={manager}></CardManager>
        </Box>
      </Box>
    </>
  );
};
