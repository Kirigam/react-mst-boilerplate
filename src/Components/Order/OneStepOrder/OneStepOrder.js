import React, { useState, useContext } from 'react';
import s from './firstStepOrder.module.scss';
import { Box, Button } from '@material-ui/core';
import { CardManager } from '../CardManager/CardManager';
import Select from 'react-select';
import * as Yup from 'yup';
import moment from 'moment';
import {
  DatePicker,
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
  const [selectedDate, handleDateChange] = useState(new Date());

  const { users } = useStore();

  const { directions, nomenclature, newOrder , manager } = useContext(
    CreateInfoOrder,
  );



  const {
    onDirections,
    onNomenclature,
    //   newOrder,
    //   setNewOrder,
    //   setOrderStep,
  } = props;

  // const infoOrder = useContext(CreateOrder);

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
    count: Yup.string().required("Поле обов'язкове для заповнення "),
    data: Yup.string().required("Поле обов'язкове для заповнення "),
    deliveri_addres: Yup.string().required(
      "Поле обов'язкове для заповнення ",
    ),
  });

  async function onSubmit(value) {
    const clientProfileUser = users.authUser.client_profile.id;
    try {
      const userID = storageService.get(NameStorage.USERID);
      const responseOrder = await Api.createOrder(clientProfileUser);

      let results = await Promise.all([responseOrder])
        .then((results) => {
          const OrderId = results[0].data.id;
          let nomenclatureObject = {
            order_id: OrderId,
            nomenclature_id: nomenclature.value.id,
            amount: value.count,
            address: value.deliveri_addres,
            date: moment(new Date(value.data)).format('YYYY.MM.DD'),
          };
          return Api.addOrderedNomenclatures(nomenclatureObject);
        })
        .then((results) => {
          console.log(results );
          console.log(newOrder);
          newOrder.nomenclature.unsift(results.data);
          newOrder.orderID = results.data.order_id;
          console.log( directions, nomenclature, newOrder , manager);
          
          console.log(newOrder);
          // setOrderStep(2);
          // console.log();
        });
    } catch (error) {}
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
                <div>
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
                    <DatePicker
                      className={s.input}
                      fullWidth
                      disableToolbar
                      variant="inline"
                      format="MM.dd.yyyy"
                      minDate={new Date()}
                      placeholder="Дата"
                      margin="normal"
                      inputVariant="outlined"
                      value={selectedDate}
                      onChange={handleDateChange}
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

                <Button type="submit">Створити замовлення</Button>
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

{
  /* <Formik
// validationSchema={testSchema}
initialValues={initialValues}
onSubmit={onSubmit}
>
{/* { {(props) => { */
}
{
  /* const {
    onSubmit,
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset, 
  } = props; */
}
{
  /* return ( */
}
// {/* <Form onSubmit={onSubmit} className={s.FormOrderStart}>
//   <Select
//     className={s.input}
//     fullWidth
//     placeholder="Напрям"
//     options={directions.list}
//     isLoading={directions.isLoading}
//     onChange={onDirections}
//     value={directions.value}
//     name="directions"
//     id="directions"
//   />

//   <Field
//   placeholder="Кількість"
//   name="count"
//   id="count"
//   type="text"
//   component={CustomInput}
// />

//   {/* <TextField
//     className={s.input}
//     fullWidth
//     placeholder="Кількість"
//     name="count"
//     id="count"
//     type="text"
//     variant="outlined"
//     // error={errors.count && touched.count}
//     // onChange={handleChange}
//     // onBlur={handleBlur}
//     // helperText={
//     //   errors.count && touched.count && errors.count
//     // }
//   ></TextField> */}

//   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//     <DatePicker
//       className={s.input}
//       fullWidth
//       disableToolbar
//       variant="inline"
//       format="MM.dd.yyyy"
//       minDate={new Date()}
//       placeholder="Дата"
//       margin="normal"
//       inputVariant="outlined"
//       value={selectedDate}
//       onChange={handleDateChange}
//     />
//   </MuiPickersUtilsProvider>
//   <Field
//   placeholder="Адреса поставки"
//   name="deliveri_addres"
//   id="deliveri_addres"
//   type="text"
//   component={CustomInput}
// />
//   {/* <TextField
//     className={s.input}
//     fullWidth
//     name="deliveri_addres"
//     id="deliveri_addres"
//     variant="outlined"
//     placeholder="Адреса поставки"
//     // error={
//     //   errors.deliveri_addres &&
//     //   touched.deliveri_addres
//     // }
//     // onChange={handleChange}
//     // onBlur={handleBlur}
//     // helperText={
//     //   errors.deliveri_addres &&
//     //   touched.deliveri_addres &&
//     //   errors.deliveri_addres
//     // }
//   ></TextField> */}
//   <Box display="flex" justifyContent="flex-end">
//     <Button
//       className={s.first_order__btn}
//       type="submit"
//     >
//       Далі
//     </Button>
//   </Box>
// </Form>
// {/* ); */}
// {/* }} */}
// </Formik> */} */}
