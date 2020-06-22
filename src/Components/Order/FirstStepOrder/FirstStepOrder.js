import React, { useState } from 'react';
import s from './firstStepOrder.module.scss';
import { Box, Button, TextField } from '@material-ui/core';
import { CardManager } from '../CardManager/CardManager';
import Select from 'react-select';
import * as Yup from 'yup';

import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Form, Formik, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { CustomInput } from '../../Form/Elements/input/input';

export const FirstStepOrder = ({ ...props }) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const {
    directions,
    Nomenclature,
    onDirections,
    onNomenclature,
    manager,
  } = props;

  const initialValues = {
    directions: '',
    nomenclature: '',
    count: '',
  };

  const testSchema = Yup.object().shape({
    directions: Yup.string().ensure().required('Topic is required!'),
    nomenclature: Yup.string()
      .ensure()
      .required('Topic is required!'),
    count: Yup.string().required("Поле обов'язкове для заповнення "),
    // year: Yup.string().required("Select Year")
  });

  return (
    <>
      <Box className={s.first_order}>
        <Box className={s.first_order__sections}>
          <Box>
            <Formik
              validationSchema={testSchema}
              initialValues={initialValues}
            >
              <Form className={s.FormOrderStart} >
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
                  options={Nomenclature.tempList}
                  isLoading={Nomenclature.isLoading}
                  value={Nomenclature.value}
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
                <TextField
                  className={s.input}
                  fullWidth
                  name="deliveri_addres"
                  id="deliveri_addres"
                  variant="outlined"
                  placeholder="Адреса поставки"
                ></TextField>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    className={s.first_order__btn}
                    type="submit"
                  >
                    Далі
                  </Button>
                </Box>
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
