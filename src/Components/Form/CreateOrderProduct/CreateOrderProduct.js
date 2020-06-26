import React, { useContext, useState } from 'react';
import s from './CreateOrderProduct.module.scss';
import { Button } from '@material-ui/core';
import { CustomInput } from '../Elements/input/input';
import Select from 'react-select';
import * as Yup from 'yup';
import moment from 'moment';
import { Form, Formik, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CreateInfoOrder from '../../Order/CreateOrder/CreateInfoOrderContext';
import * as Api from '../../../Api';

export const CreateOrderProduct = ({ ...props }) => {
  const { setOrderInfo, ...orderInfo } = useContext(CreateInfoOrder);
  const { directions, nomenclature, newOrder, manager } = orderInfo;

  const { onNomenclature, onDirections, handleClose } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
  });

  async function onSubmit(value) {
    console.log(value);

    let nomenclatureObject = {
      order_id: newOrder.orderID,
      nomenclature_id: nomenclature.value.id,
      amount: value.count,
      address: value.deliveri_addres,
      date: moment(new Date(selectedDate)).format('DD.MM.YYYY'),
    };
    return Api.addOrderedNomenclatures(nomenclatureObject).then(
      (results) => {
        console.log(results);

        setOrderInfo({
          ...orderInfo,
          newOrder: {
            ...orderInfo.newOrder,
            orderID: results.data.order_id,
            nomenclatures: newOrder.nomenclatures.concat(
              results.data,
            ),
          },
        });

        handleClose();
      },
    );
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        className={s.Form_wrap}
      >
        <Form>
          <div className={s.Form_wrap}>
            <Select
              className={s.input}
              fullWidth
              placeholder="Напрям"
              options={directions.list}
              isLoading={directions.isLoading}
              onChange={onDirections}
              value={directions.value}
              name="directions"
              id="directions"
            />

            <Select
              className={s.input}
              fullWidth
              placeholder="Номенклатура"
              options={nomenclature.tempList}
              isLoading={nomenclature.isLoading}
              value={nomenclature.value}
              onChange={onNomenclature}
              name="nomenclature"
              id="nomenclature"
              // error={touched.file && Boolean(errors.file)}
            />
            <Field
              placeholder="Кількість"
              name="count"
              id="count"
              type="text"
              component={CustomInput}
            />
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
            <Field
              placeholder="Адрес доставки"
              name="deliveri_addres"
              id="deliveri_addres"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className={s.butoon__order_wrap}>
            <div>
              <Button className={s.btn_back} onClick={handleClose}>
                Назад
              </Button>
              <Button
                className={s.btn_standart}
                type="Submit"
                onSubmit={onSubmit}
              >
                Додати
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
