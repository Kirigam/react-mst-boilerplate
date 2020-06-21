import React, { useState } from 'react';
import s from './firstStepOrder.module.scss';
import { Box, Button, TextField } from '@material-ui/core';
import { CardManager } from '../CardManager/CardManager';
import Select from 'react-select';

import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Form, Formik } from 'formik';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

export const FirstStepOrder = ({ ...props }) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const {
    directions,
    Nomenclature,
    onDirections,
    onNomenclature,
    manager,
  } = props;
  // console.log(directions);

  return (
    <>
      <Box className={s.first_order}>
        <Box className={s.first_order__sections}>
          <Box>
            <Formik>
              <Form className={s.FormOrderStart}>
                <Select
                  className={s.input}
                  fullWidth
                  placeholder="Напрям"
                  options={directions.list}
                  isLoading={directions.isLoading}
                  onChange={onDirections}
                  value={directions.value}
                />
                <Select
                  className={s.input}
                  fullWidth
                  placeholder="Номенклатура"
                  options={Nomenclature.tempList}
                  isLoading={Nomenclature.isLoading}
                  value={Nomenclature.value}
                  onChange={onNomenclature}
                />
                <TextField
                  className={s.input}
                  fullWidth
                  name="count"
                  id="count"
                  type="text"
                  variant="outlined"
                  placeholder="Кількість"
                ></TextField>
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
