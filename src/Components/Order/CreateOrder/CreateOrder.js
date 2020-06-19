import React, { useState, useEffect } from 'react';
import useStyles from './CreateOrderStyle.js';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Avatar,
} from '@material-ui/core';
// import Api from './../../../api';
import { Form, Formik } from 'formik';
import Api from './../../../Api';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  // TimePicker,
  // DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Select from 'react-select';
// import { Link } from 'react-router-dom';
// import { IconSvg } from '../../svg_icons/svg.js';
import { SetingsSVG } from '../../../assetc/svg/setings.js';
export const CreateOrder = () => {
  const s = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [directions, setdirections] = useState({});
  const [options, setoptions] = useState([
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]);
  const [Nomenclature, setNomenclature] = useState([]);

  // const nomenclature = Api.Order.getDirections();
  // // expected output: 'resolved'

  // Promise.all([nomenclature]).then((values) => {
  //   setNomenclature(values[0].data);
  // })

  // useEffect(()=>(

  // ))

  // const res =

  // console.log(nomenclature );
  // console.log("CreateOrder -> nomenclature", nomenclature)

  // await store.auth.login.run({
  //   password: values.password,
  //   email: values.email,
  // });

  useEffect(()=>{
    const directions = Api.Order.getDirections();
    directions.then((response) => {
      console.log(response );
      
      // let derection = response.data.map(item => {
      //  value:'wwere',
      //  value1:'wwereqe',
      // })

      // const derection = {}

      // setdirections(response)
      // console.log(derection);
    });
  })
   
  

  return (
    <>
      <Box my={6} mx={4}>
        <Typography className={s.MainTitle} variant="h4">
          Створення замовлення
        </Typography>
        <Box my={2} mb={6}>
          <Typography variant="body1" className={s.SubMainTitle}>
            Додайте товар до замовлення.{' '}
          </Typography>
        </Box>
        <Box>
          <Grid item={true} xs={6}>
            <Box maxWidth={400}>
              <Formik>
                <Form className={s.FormOrderStart}>
                  <Select
                    className={s.input}
                    fullWidth
                    placeholder="Напрям"
                    options={options}
                  />
                  <Select
                    className={s.input}
                    fullWidth
                    placeholder="Номенклатура"
                    options={options}
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
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
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
                    <Button>Далі</Button>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Grid>
          <Grid item={true} xs={6}>
            <Card p={3} className={s.card}>
              <Typography className={s.cardTitle}>
                Ваш менеджер
              </Typography>
              <Box variant="outlined" display="flex">
                <Box mr={2}>
                  {/* User Photo */}
                  <Avatar
                    style={{
                      width: 40,
                      height: 40,
                      transition: '0.3s',
                    }}
                  />
                </Box>
                <Box>
                  <Typography className={s.cardName} variant="body2">
                    Романенко Роман
                  </Typography>
                  <a href={`mailto:aandrienko@gmail.com`}>
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      aandrienko@gmail.com
                    </Typography>
                  </a>
                  <a href={`tel:38034344334`}>
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      +380 (34) 344 33 84
                    </Typography>
                  </a>

                  <a href={`mailto:aandrienko@gmail.com`}>
                    <Button
                      className={s.seting}
                      startIcon={
                        <SetingsSVG
                          color="#5866a1"
                          name="setings"
                        ></SetingsSVG>
                      }
                    >
                      Написати менеджеру
                    </Button>
                  </a>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
